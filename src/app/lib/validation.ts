export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let normalized = digits;
  if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1);
  if (!normalized.startsWith('7') && normalized.length > 0) normalized = '7' + normalized;
  normalized = normalized.slice(0, 11);

  if (normalized.length === 0) return '';
  if (normalized.length <= 1) return '+' + normalized;
  if (normalized.length <= 4) return `+7 (${normalized.slice(1)}`;
  if (normalized.length <= 7) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4)}`;
  if (normalized.length <= 9) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7)}`;
  return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
};

export const looksLikePhone = (value: string): boolean => {
  const trimmed = value.trim();
  return /^[+\d(]/.test(trimmed) || /\d{4,}/.test(trimmed.replace(/\D/g, ''));
};

const KNOWN_DOMAINS = ['gmail.com', 'mail.ru', 'yandex.ru', 'outlook.com', 'yahoo.com', 'icloud.com', 'hotmail.com', 'rambler.ru', 'bk.ru', 'list.ru', 'inbox.ru', 'ya.ru'];

const levenshtein = (a: string, b: string): number => {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
  return dp[m][n];
};

const findDomainSuggestion = (domain: string): string | null => {
  if (KNOWN_DOMAINS.includes(domain)) return null;
  for (const known of KNOWN_DOMAINS) {
    if (levenshtein(domain, known) <= 2) return known;
  }
  return null;
};

export const validateContact = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return 'Укажите способ связи';

  if (looksLikePhone(trimmed)) {
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 11) return `Номер должен содержать 11 цифр (сейчас ${digits.length})`;
    if (digits.length > 11) return `Слишком много цифр в номере (${digits.length} из 11)`;
    return null;
  }

  if (trimmed.includes('@')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Проверьте правильность email';
    const domain = trimmed.split('@')[1]?.toLowerCase();
    if (domain) {
      const suggestion = findDomainSuggestion(domain);
      if (suggestion) return `Возможно, вы имели в виду @${suggestion}?`;
    }
    return null;
  }

  return null;
};
