import { Router, Request, Response } from 'express';
import { handleStartCommand } from '../lib/telegram.js';
import type { TelegramUpdate } from '../lib/telegram.js';

const router = Router();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

router.post('/', async (req: Request<object, object, TelegramUpdate>, res: Response) => {
  // Verify webhook secret — mandatory
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    console.error('TELEGRAM_WEBHOOK_SECRET is not configured — rejecting webhook request');
    res.sendStatus(403);
    return;
  }
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    res.sendStatus(403);
    return;
  }

  try {
    const { message } = req.body;

    if (!message?.text) {
      res.sendStatus(200);
      return;
    }

    const chatId = message.chat.id;
    const text = message.text.trim();
    const firstName = message.from?.first_name || 'Пользователь';

    if (text === '/start' || text.startsWith('/start ')) {
      const token = text.split(' ')[1] || '';
      await handleStartCommand(chatId, firstName, token, ADMIN_TOKEN);
    }
  } catch (error) {
    console.error('Telegram webhook error:', error);
  }

  res.sendStatus(200);
});

export { router as telegramRouter };
