import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { scaleIn, fadeInUp } from '@/app/lib/animations';
import { ctaButtonClass } from '@/app/lib/styles';

export function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#CCFF00]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center">
        <motion.h1
          {...scaleIn}
          className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[250px] font-bold leading-none text-[#CCFF00] select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          404
        </motion.h1>

        <motion.p
          {...fadeInUp}
          className="text-2xl md:text-3xl font-bold text-[#F4F4F0] mb-4 uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Страница не найдена
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#D4D4D0] text-lg mb-10 max-w-md mx-auto"
        >
          Возможно, страница была удалена или вы ввели неверный адрес
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/" className={ctaButtonClass}>
            На главную
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
