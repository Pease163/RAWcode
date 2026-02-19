import { motion } from 'motion/react';
import { fadeInUp, withDelay } from '@/app/lib/animations';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'lime' | 'orange';
  titleWhite: string;
  titleAccent: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const badgeColors = {
  lime: 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]',
  orange: 'bg-[#FF3B00]/10 border-[#FF3B00]/30 text-[#FF3B00]',
} as const;

export function SectionHeader({
  badge,
  badgeColor = 'lime',
  titleWhite,
  titleAccent,
  subtitle,
  centered = true,
  className = 'mb-12 md:mb-16 lg:mb-20',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <motion.div
          {...fadeInUp}
          className={`inline-block px-6 py-3 border rounded-full mb-8 ${badgeColors[badgeColor]}`}
        >
          <span className="text-sm font-bold uppercase tracking-wider">{badge}</span>
        </motion.div>
      )}

      <motion.h2
        {...fadeInUp}
        {...(badge ? withDelay(0.1) : {})}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span className="text-[#F4F4F0]">{titleWhite}</span>
        <span className="text-[#CCFF00]">{titleAccent}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          {...fadeInUp}
          {...withDelay(badge ? 0.2 : 0.1)}
          className={`text-base md:text-lg text-[#D4D4D0] ${centered ? 'max-w-2xl mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
