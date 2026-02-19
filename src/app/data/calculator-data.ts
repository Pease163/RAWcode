export interface CalculatorOption {
  label: string;
  value: number;
}

export interface CalculatorQuestion {
  id: string;
  question: string;
  options: CalculatorOption[];
}

export const questions: CalculatorQuestion[] = [
  {
    id: 'type',
    question: 'Какой сайт вам нужен?',
    options: [
      { label: 'Лендинг (1 страница)', value: 25000 },
      { label: 'Корпоративный сайт', value: 60000 },
      { label: 'Интернет-магазин', value: 100000 },
      { label: 'Веб-приложение', value: 150000 }
    ]
  },
  {
    id: 'design',
    question: 'Какой уровень дизайна?',
    options: [
      { label: 'Минимальный — чисто и просто', value: 0 },
      { label: 'Стандартный — уникальный дизайн', value: 10000 },
      { label: 'Премиум — анимации и эффекты', value: 25000 }
    ]
  },
  {
    id: 'features',
    question: 'Нужны дополнительные функции?',
    options: [
      { label: 'Нет, базовый функционал', value: 0 },
      { label: 'Форма обратной связи + аналитика', value: 5000 },
      { label: 'CMS / админ-панель', value: 15000 },
      { label: 'Интеграции с API / CRM', value: 25000 }
    ]
  },
  {
    id: 'deadline',
    question: 'Какие сроки?',
    options: [
      { label: 'Стандартные (без спешки)', value: 0 },
      { label: 'Ускоренные (x1.3)', value: -1 },
      { label: 'Срочно (x1.5)', value: -2 }
    ]
  },
  {
    id: 'seo',
    question: 'Нужна SEO-оптимизация?',
    options: [
      { label: 'Базовая (входит в стоимость)', value: 0 },
      { label: 'Расширенная + настройка метрик', value: 10000 }
    ]
  }
];
