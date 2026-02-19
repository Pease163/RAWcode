const isDev = import.meta.env.DEV;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

// Замените на ваш реальный ID счётчика Яндекс.Метрики
const YM_ID = 0; // XXXXXXXX

export function trackGoal(goal: string, params?: Record<string, string | number>) {
  if (isDev) {
    console.log(`[Analytics] Goal: ${goal}`, params || '');
    return;
  }

  // Яндекс.Метрика
  if (window.ym && YM_ID) {
    window.ym(YM_ID, 'reachGoal', goal, params);
  }

  // Microsoft Clarity
  if (window.clarity) {
    window.clarity('set', goal, params ? JSON.stringify(params) : '');
  }
}

export function trackPageView(url: string, title: string) {
  if (isDev) {
    console.log(`[Analytics] PageView: ${url} — ${title}`);
    return;
  }

  if (window.ym && YM_ID) {
    window.ym(YM_ID, 'hit', url, { title });
  }
}
