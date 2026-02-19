import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { focusRingClass } from '@/app/lib/styles';

interface BreadcrumbItem {
  label: string;
  to?: string;
  scrollTo?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Хлебные крошки"
      className="flex items-center gap-2 text-sm mb-8 flex-wrap"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight size={14} className="text-[#D4D4D0]/40 flex-shrink-0" />
            )}
            {isLast ? (
              <span className="text-[#CCFF00] font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.to || '/'}
                state={item.scrollTo ? { scrollTo: item.scrollTo } : undefined}
                className={`text-[#D4D4D0] hover:text-[#CCFF00] transition-colors ${focusRingClass} rounded-sm`}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
