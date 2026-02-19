import dotenv from 'dotenv';
import { deleteWebhook, getUpdates, handleStartCommand } from './lib/telegram.js';
import type { TelegramUpdate } from './lib/telegram.js';

dotenv.config();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

let lastUpdateId = 0;
let backoffMs = 100;
const MAX_BACKOFF = 30_000;

const processUpdate = async (update: TelegramUpdate): Promise<void> => {
  const message = update.message;
  if (!message?.text) return;

  const chatId = message.chat.id;
  const text = message.text.trim();
  const firstName = message.from?.first_name || 'Пользователь';

  if (text === '/start' || text.startsWith('/start ')) {
    const token = text.split(' ')[1] || '';
    await handleStartCommand(chatId, firstName, token, ADMIN_TOKEN);
  }
};

const poll = async (): Promise<void> => {
  try {
    const data = await getUpdates(lastUpdateId + 1);

    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        lastUpdateId = update.update_id;
        await processUpdate(update);
      }
    }

    // Reset backoff on success
    backoffMs = 100;
  } catch (err) {
    console.error('Polling error:', err);
    // Exponential backoff: 100 → 200 → 400 → ... → 30000
    backoffMs = Math.min(backoffMs * 2, MAX_BACKOFF);
  }

  setTimeout(poll, backoffMs);
};

const start = async () => {
  if (!ADMIN_TOKEN) {
    console.warn('WARNING: ADMIN_TOKEN is not set — admin registration will be disabled');
  }
  await deleteWebhook();
  console.log('Telegram polling started');
  poll();
};

start();
