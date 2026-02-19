import { Router, Request, Response } from 'express';
import { createHash } from 'crypto';
import { getAdmins, sendTelegramMessage, escapeHtml } from '../lib/telegram.js';

const router = Router();

interface SubmitRequest {
  name: string;
  contact: string;
  project: string;
  _hp?: string;
}

const ALLOWED_FIELDS = new Set(['name', 'contact', 'project', '_hp']);

const NAME_RE = /^[\p{L}\s.\-']{1,100}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;
const TELEGRAM_RE = /^@[\w]{4,32}$/;

// Double-submit protection: hash → timestamp
const recentSubmissions = new Map<string, number>();
const DEDUP_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const DEDUP_MAX_ENTRIES = 1000;

function cleanupDedup() {
  if (recentSubmissions.size <= DEDUP_MAX_ENTRIES) return;
  const now = Date.now();
  for (const [key, ts] of recentSubmissions) {
    if (now - ts > DEDUP_WINDOW_MS) {
      recentSubmissions.delete(key);
    }
  }
}

function isValidContact(value: string): boolean {
  return EMAIL_RE.test(value) || PHONE_RE.test(value) || TELEGRAM_RE.test(value);
}

router.post('/', async (req: Request<object, object, SubmitRequest>, res: Response) => {
  try {
    const body = req.body;

    // Check for unexpected fields
    const bodyKeys = Object.keys(body);
    if (bodyKeys.some(key => !ALLOWED_FIELDS.has(key))) {
      res.status(400).json({ error: 'Неверный формат данных' });
      return;
    }

    const { name, contact, project, _hp } = body;

    // Honeypot check — if filled, it's a bot
    if (_hp) {
      console.warn('Honeypot triggered');
      res.json({ success: true, message: 'Заявка отправлена' });
      return;
    }

    // Type validation
    if (typeof name !== 'string' || typeof contact !== 'string' || typeof project !== 'string') {
      res.status(400).json({ error: 'Неверный формат данных' });
      return;
    }

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedProject = project.trim();

    if (!trimmedName || !trimmedContact || !trimmedProject) {
      res.status(400).json({ error: 'Все поля обязательны' });
      return;
    }

    if (trimmedName.length > 100) {
      res.status(400).json({ error: 'Имя слишком длинное' });
      return;
    }

    if (!NAME_RE.test(trimmedName)) {
      res.status(400).json({ error: 'Имя содержит недопустимые символы' });
      return;
    }

    if (trimmedContact.length > 200) {
      res.status(400).json({ error: 'Контакт слишком длинный' });
      return;
    }

    if (!isValidContact(trimmedContact)) {
      res.status(400).json({ error: 'Укажите email, телефон или Telegram (@username)' });
      return;
    }

    if (trimmedProject.length > 2000) {
      res.status(400).json({ error: 'Описание проекта слишком длинное' });
      return;
    }

    // Double-submit protection (hashed key to limit memory usage)
    const dedupKey = createHash('sha256').update(`${trimmedName}|${trimmedContact}|${trimmedProject}`).digest('hex');
    const now = Date.now();
    const lastSubmit = recentSubmissions.get(dedupKey);
    if (lastSubmit && now - lastSubmit < DEDUP_WINDOW_MS) {
      res.json({ success: true, message: 'Заявка отправлена' });
      return;
    }
    recentSubmissions.set(dedupKey, now);
    cleanupDedup();

    const admins = getAdmins();

    if (admins.length === 0) {
      console.warn('Нет зарегистрированных админов');
      res.status(500).json({ error: 'Нет получателей для заявки' });
      return;
    }

    const message = `
<b>Новая заявка с сайта RawCode</b>

<b>Имя:</b> ${escapeHtml(trimmedName)}
<b>Контакт:</b> ${escapeHtml(trimmedContact)}

<b>Описание проекта:</b>
${escapeHtml(trimmedProject)}
    `.trim();

    const results = await Promise.all(
      admins.map(chatId => sendTelegramMessage(chatId, message))
    );

    const successCount = results.filter(Boolean).length;

    if (successCount > 0) {
      res.json({ success: true, message: 'Заявка отправлена' });
    } else {
      res.status(500).json({ error: 'Не удалось отправить заявку' });
    }
  } catch (error) {
    console.error('Submit route error:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

export { router as submitRouter };
