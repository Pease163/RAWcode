export interface CalculatorOption {
  label: string;
  value: number;
}

export interface CalculatorQuestion {
  id: string;
  question: string;
  options: CalculatorOption[];
}

export interface CategoryChoice {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const categories: CategoryChoice[] = [
  { id: 'web', label: 'Веб-разработка', description: 'Лендинги, корпоративные сайты, портфолио', icon: 'Globe' },
  { id: 'systems', label: 'Системы и платформы', description: 'E-commerce, CRM, админ-панели', icon: 'Server' },
  { id: 'apps', label: 'Приложения', description: 'Мобильные, PWA, SaaS', icon: 'Smartphone' },
];

export const categoryQuestions: Record<string, CalculatorQuestion[]> = {
  web: [
    {
      id: 'type',
      question: 'Какой сайт вам нужен?',
      options: [
        { label: 'Лендинг (1 страница)', value: 25000 },
        { label: 'Корпоративный сайт', value: 50000 },
        { label: 'Мультистраничный сайт', value: 100000 },
      ],
    },
    {
      id: 'design',
      question: 'Какой уровень дизайна?',
      options: [
        { label: 'Минимальный — чисто и просто', value: 0 },
        { label: 'Стандартный — уникальный дизайн', value: 10000 },
        { label: 'Премиум — анимации и эффекты', value: 25000 },
      ],
    },
    {
      id: 'features',
      question: 'Нужны дополнительные функции?',
      options: [
        { label: 'Нет, базовый функционал', value: 0 },
        { label: 'Форма обратной связи + аналитика', value: 5000 },
        { label: 'CMS / админ-панель', value: 15000 },
        { label: 'Интеграции с API / CRM', value: 25000 },
      ],
    },
    {
      id: 'deadline',
      question: 'Какие сроки?',
      options: [
        { label: 'Стандартные (без спешки)', value: 0 },
        { label: 'Ускоренные (x1.3)', value: -1 },
        { label: 'Срочно (x1.5)', value: -2 },
      ],
    },
  ],
  systems: [
    {
      id: 'type',
      question: 'Какой тип системы?',
      options: [
        { label: 'Админ-панель / дашборд', value: 80000 },
        { label: 'Интернет-магазин', value: 150000 },
        { label: 'Корпоративная CRM', value: 250000 },
      ],
    },
    {
      id: 'complexity',
      question: 'Какой уровень сложности?',
      options: [
        { label: 'Базовый — стандартный функционал', value: 0 },
        { label: 'Средний — кастомная логика', value: 30000 },
        { label: 'Высокий — сложные сценарии', value: 60000 },
      ],
    },
    {
      id: 'integrations',
      question: 'Какие интеграции нужны?',
      options: [
        { label: 'Не нужны', value: 0 },
        { label: 'Оплата (эквайринг)', value: 15000 },
        { label: 'CRM + доставка + рассылки', value: 30000 },
        { label: 'Полный набор интеграций', value: 50000 },
      ],
    },
    {
      id: 'deadline',
      question: 'Какие сроки?',
      options: [
        { label: 'Стандартные (без спешки)', value: 0 },
        { label: 'Ускоренные (x1.3)', value: -1 },
        { label: 'Срочно (x1.5)', value: -2 },
      ],
    },
  ],
  apps: [
    {
      id: 'platform',
      question: 'Какая платформа?',
      options: [
        { label: 'Веб-приложение (PWA)', value: 120000 },
        { label: 'Мобильное (iOS + Android)', value: 200000 },
        { label: 'SaaS-платформа', value: 350000 },
      ],
    },
    {
      id: 'features',
      question: 'Какой набор функций?',
      options: [
        { label: 'MVP — минимум для запуска', value: 0 },
        { label: 'Стандартный (push, геолокация, чат)', value: 40000 },
        { label: 'Расширенный (AI, биллинг)', value: 80000 },
      ],
    },
    {
      id: 'backend',
      question: 'Какой бэкенд?',
      options: [
        { label: 'BaaS (Firebase / Supabase)', value: 0 },
        { label: 'Кастомный Node.js', value: 30000 },
        { label: 'Микросервисы + облако', value: 60000 },
      ],
    },
    {
      id: 'deadline',
      question: 'Какие сроки?',
      options: [
        { label: 'Стандартные (без спешки)', value: 0 },
        { label: 'Ускоренные (x1.3)', value: -1 },
        { label: 'Срочно (x1.5)', value: -2 },
      ],
    },
  ],
};
