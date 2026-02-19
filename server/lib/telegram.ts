import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getTelegramToken = () => process.env.TELEGRAM_BOT_TOKEN;
export const ADMINS_FILE = path.join(__dirname, '../data/admins.json');
export const MAX_ADMINS = 2;

// Promise-based mutex for admin file operations
let adminLockPromise: Promise<void> = Promise.resolve();

export const withAdminLock = <T>(fn: () => Promise<T>): Promise<T> => {
  const prev = adminLockPromise;
  let release: () => void;
  adminLockPromise = new Promise<void>((resolve) => { release = resolve; });
  return prev.then(async () => {
    try {
      return await fn();
    } finally {
      release!();
    }
  });
};

export const getAdmins = (): number[] => {
  try {
    const data = fs.readFileSync(ADMINS_FILE, 'utf-8');
    return JSON.parse(data).admins || [];
  } catch {
    return [];
  }
};

export const saveAdmins = (admins: number[]): void => {
  fs.writeFileSync(ADMINS_FILE, JSON.stringify({ admins }, null, 2));
};

export const sendTelegramMessage = async (chatId: number, text: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const response = await fetch(`https://api.telegram.org/bot${getTelegramToken()}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!response.ok) {
      console.error('sendTelegramMessage HTTP error:', response.status);
    }
    return response.ok;
  } catch (error) {
    console.error('sendTelegramMessage failed:', error instanceof Error ? error.message : error);
    return false;
  }
};

export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const deleteWebhook = async (): Promise<void> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    await fetch(`https://api.telegram.org/bot${getTelegramToken()}/deleteWebhook`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
  } catch (error) {
    console.error('deleteWebhook failed:', error instanceof Error ? error.message : error);
  }
};

// --- Telegram API types ---
export interface TelegramMessage {
  chat: { id: number };
  from?: { first_name?: string };
  text?: string;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export const getUpdates = async (offset: number): Promise<{ ok: boolean; result: TelegramUpdate[] }> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35_000);
    const res = await fetch(
      `https://api.telegram.org/bot${getTelegramToken()}/getUpdates?offset=${offset}&timeout=30`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    return res.json() as Promise<{ ok: boolean; result: TelegramUpdate[] }>;
  } catch (error) {
    console.error('getUpdates failed:', error instanceof Error ? error.message : error);
    return { ok: false, result: [] };
  }
};

export const handleStartCommand = async (
  chatId: number,
  firstName: string,
  token: string,
  adminToken: string,
): Promise<void> => {
  if (!adminToken) {
    await sendTelegramMessage(chatId, 'Регистрация админов отключена. Задайте ADMIN_TOKEN в .env');
    return;
  }

  if (token !== adminToken) {
    await sendTelegramMessage(chatId, 'Неверный токен. Используйте: /start <токен>');
    return;
  }

  await withAdminLock(async () => {
    const admins = getAdmins();

    if (admins.includes(chatId)) {
      await sendTelegramMessage(chatId, `${firstName}, вы уже зарегистрированы как админ.`);
      return;
    }

    if (admins.length >= MAX_ADMINS) {
      await sendTelegramMessage(chatId, `Достигнут лимит админов (${MAX_ADMINS}). Регистрация невозможна.`);
      return;
    }

    admins.push(chatId);
    saveAdmins(admins);
    await sendTelegramMessage(chatId, `${firstName}, вы зарегистрированы как админ!\n\nТеперь вы будете получать заявки с сайта RawCode.`);
  });
};
