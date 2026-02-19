import { motion } from 'motion/react';
import type { ServiceCategory } from '@/app/data/services-data';
import { fadeInUp30 } from '@/app/lib/animations';
import { ctaButtonClass, focusRingClass } from '@/app/lib/styles';
import { dispatchSelectPackage } from '@/app/lib/events';

export function ServiceCTA({ service }: { service: ServiceCategory }) {
  const handleClick = () => {
    dispatchSelectPackage(`${service.title} (${service.priceRange})`);
  };

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.div
          {...fadeInUp30}
          className="relative bg-[#1E1E22] border border-[#CCFF00]/30 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 text-center overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight relative z-10"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-[#F4F4F0]">Готовы </span>
            <span className="text-[#CCFF00]">начать?</span>
          </h2>

          <p className="text-base md:text-lg text-[#D4D4D0] mb-10 max-w-xl mx-auto relative z-10">
            Оставьте заявку, и мы свяжемся с вами в течение 24 часов, чтобы обсудить ваш проект
          </p>

          <button
            onClick={handleClick}
            className={`inline-flex items-center px-10 py-5 text-lg ${ctaButtonClass} cursor-pointer ${focusRingClass} shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(255,59,0,0.4)] relative z-10`}
          >
            Обсудить проект
          </button>
        </motion.div>
      </div>
    </section>
  );
}
