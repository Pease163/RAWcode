import saysBarbers from '@/assets/says-barbers.jpg';
import olmastroy from '@/assets/olmastroy.jpg';
import appgrade from '@/assets/appgrade.jpg';
import saysWebp from '@/assets/says-barbers.jpg?format=webp&quality=85';
import olmastroyWebp from '@/assets/olmastroy.jpg?format=webp&quality=85';
import appgradeWebp from '@/assets/appgrade.jpg?format=webp&quality=85';

export interface PortfolioCase {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  imageWebp: string;
  width: number;
  height: number;
  tags: string[];
  url: string;
  reverse?: boolean;
}

export const cases: PortfolioCase[] = [
  {
    id: 1,
    title: 'SAYS BARBERS',
    category: 'Barbershop',
    description: 'Премиальный барбершоп в центре Калининграда. Современный дизайн с фокусом на онлайн-запись и удобную навигацию. Реальный проект — работает и приносит клиентов.',
    image: saysBarbers,
    imageWebp: saysWebp,
    width: 1600,
    height: 1200,
    tags: ['Landing', 'Booking System', 'Barbershop'],
    url: 'https://saysbarbers.ru'
  },
  {
    id: 2,
    title: 'ОЛМАСТРОЙ',
    category: 'Корпоративный',
    description: 'Корпоративный сайт строительной компании, специализирующейся на нефтегазовой инфраструктуре. Каталог проектов, блог, вакансии, админ-панель с RBAC и 2FA, SEO-оптимизация с JSON-LD.',
    image: olmastroy,
    imageWebp: olmastroyWebp,
    width: 1600,
    height: 1200,
    tags: ['Corporate', 'Flask + React', 'Full-Stack'],
    url: ''
  },
  {
    id: 3,
    title: 'APPGRADE',
    category: 'E-Commerce',
    description: 'Интернет-магазин электроники Apple в Калининграде. Каталог товаров с фильтрацией, корзина, админ-панель, блог и оптимизация изображений. Современный стек на React 19 + Express 5.',
    image: appgrade,
    imageWebp: appgradeWebp,
    width: 1600,
    height: 1200,
    tags: ['E-Commerce', 'React', 'Full-Stack'],
    url: 'https://appgrade39.ru',
    reverse: true
  }
];
