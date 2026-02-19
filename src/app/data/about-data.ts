import { Code2, Zap, Target, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AboutValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: AboutValue[] = [
  {
    icon: Code2,
    title: 'ЧИСТЫЙ КОД',
    description: 'Никаких шаблонов и конструкторов. Только ручная разработка с нуля.'
  },
  {
    icon: Zap,
    title: 'БЕЗУМНАЯ СКОРОСТЬ',
    description: 'Оптимизация до миллисекунды. Ваш сайт будет быстрее конкурентов.'
  },
  {
    icon: Target,
    title: 'ФОКУС НА ЦЕЛИ',
    description: 'Не просто красиво — работает на конверсию и продажи.'
  },
  {
    icon: Users,
    title: 'ПРЯМОЙ КОНТАКТ',
    description: 'Без менеджеров-посредников. Вы общаетесь напрямую с разработчиками.'
  }
];
