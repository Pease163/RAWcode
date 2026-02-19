import { Search, Palette, Code, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export const steps: ProcessStep[] = [
  {
    number: '01',
    icon: Search,
    title: 'ИССЛЕДОВАНИЕ',
    description: 'Погружаемся в ваш бизнес. Изучаем аудиторию и конкурентов. Формируем стратегию, которая будет работать.',
    duration: '2–3 дня',
    deliverables: ['Заполнение брифа', 'Анализ конкурентов', 'Разработка User Flow']
  },
  {
    number: '02',
    icon: Palette,
    title: 'ДИЗАЙН',
    description: 'Создаем уникальный визуальный стиль. Прорабатываем UX/UI, чтобы интерфейс был удобным и запоминающимся.',
    duration: '5–7 дней',
    deliverables: ['Wireframes', 'Дизайн-концепция', 'UI-кит и анимации']
  },
  {
    number: '03',
    icon: Code,
    title: 'РАЗРАБОТКА',
    description: 'Пишем чистый, валидный код. Фронтенд на современных фреймворках, надежный бэкенд и быстрые API.',
    duration: '7–14 дней',
    deliverables: ['Верстка (Pixel Perfect)', 'Интеграция CMS/Admin', 'Тестирование и отладка']
  },
  {
    number: '04',
    icon: Rocket,
    title: 'ЗАПУСК',
    description: 'Финальный этап. Деплой на хостинг, подключение домена, настройка аналитики и обучение работе с сайтом.',
    duration: '1–2 дня',
    deliverables: ['Перенос на хостинг', 'Настройка HTTPS/SEO', 'Передача доступов']
  }
];
