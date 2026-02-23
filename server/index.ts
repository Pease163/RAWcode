import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { submitRouter } from './routes/submit.js';
import { telegramRouter } from './routes/telegram.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust first proxy (Nginx/Cloudflare) for correct IP in rate limiter
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://mc.yandex.ru", "https://www.clarity.ms", "https://vk.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://mc.yandex.ru", "https://vk.com"],
      connectSrc: ["'self'", "https://mc.yandex.ru", "https://www.clarity.ms"],
      fontSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

app.use(compression());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiter: 30 requests per minute for telegram webhook
const telegramLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter: 5 submissions per hour per IP
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Слишком много заявок. Попробуйте позже.' },
});

app.use('/api/submit', submitLimiter, submitRouter);
app.use('/api/telegram', telegramLimiter, telegramRouter);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.timeout = 30_000;
server.keepAliveTimeout = 65_000;
server.headersTimeout = 70_000;
