import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MagneticButton } from '@/app/components/MagneticButton';
import { AnimatedNumber } from '@/app/components/ui/AnimatedNumber';
import { charContainer, charVariants, splitTextToChars, blurIn } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';
import { trackGoal } from '@/app/lib/analytics';

function KineticTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = splitTextToChars(text);
  return (
    <motion.span
      variants={charContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      className={`inline-block ${className ?? ''}`}
    >
      {chars.map((ch, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block">
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax for background circles
  const circle1Y = useTransform(scrollY, [0, 500], [0, -100]);
  const circle2Y = useTransform(scrollY, [0, 500], [0, -60]);
  const circle3Y = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 px-6">

      {/* Animated Circles with Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ y: circle1Y, willChange: 'transform' }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ y: circle2Y, willChange: 'transform' }}
            className="absolute w-[220px] h-[220px] md:w-[450px] md:h-[450px] border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ y: circle3Y, willChange: 'transform' }}
            className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] border border-white/5 rounded-full"
          />
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]"></div>

      {/* Content */}
      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        {/* Main Title — kinetic typography on md+, simple fadeIn on mobile */}
        <h1
          className="text-[10.5vw] sm:text-[11vw] md:text-[11vw] lg:text-[10vw] xl:text-[9.5vw] font-bold mb-8 tracking-tighter uppercase leading-[0.85]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {/* Desktop: per-character animation */}
          <span className="hidden md:block">
            <KineticTitle text="DIGITAL" className="text-[#F4F4F0]" delay={0.2} />
            <br />
            <KineticTitle text="REALITY" className="text-[#CCFF00]" delay={0.5} />
            <br />
            <KineticTitle text="ARCHITECTS" className="text-[#F4F4F0]" delay={0.8} />
          </span>
          {/* Mobile: simple fade */}
          <motion.span
            className="md:hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-[#F4F4F0]">DIGITAL</span>
            <br />
            <span className="text-[#CCFF00]">REALITY</span>
            <br />
            <span className="text-[#F4F4F0]">ARCHITECTS</span>
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          {...blurIn}
          className="text-base md:text-lg lg:text-xl text-[#D4D4D0] max-w-2xl mb-8 leading-[1.6]"
        >
          Продуктовая студия в Калининграде. Создаём сайты, системы и приложения с нуля — <span className="font-bold text-[#F4F4F0]">без шаблонов, с фокусом на результат.</span> Чистый код и индивидуальный подход для вашего бизнеса.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start gap-4 mb-10"
        >
          <MagneticButton
            href="#footer"
            className={`min-h-[56px] px-8 sm:px-10 py-4 sm:py-5 bg-[#CCFF00] text-[#0F0F11] rounded-full font-bold text-base sm:text-lg hover:bg-[#FF3B00] hover:text-white transition-all duration-300 flex items-center gap-2 group uppercase ${focusRingClass} w-full sm:w-auto justify-center`}
            onClick={() => trackGoal('cta_click', { location: 'hero', label: 'discuss_project' })}
          >
            Обсудить проект
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </MagneticButton>
          <a
            href="#portfolio"
            onClick={() => trackGoal('cta_click', { location: 'hero', label: 'view_portfolio' })}
            className={`min-h-[56px] px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-[#F4F4F0] rounded-full font-bold text-base sm:text-lg transition-all duration-300 uppercase ${focusRingClass} w-full sm:w-auto text-center flex items-center justify-center shadow-[inset_0_0_0_2px_#F4F4F0] hover:shadow-[inset_0_0_0_2px_#CCFF00] hover:text-[#CCFF00]`}
          >
            Смотреть работы
          </a>
        </motion.div>

        {/* Mini Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center gap-6 text-[#D4D4D0] text-sm md:text-base"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#CCFF00] rounded-full"></div>
            <span><AnimatedNumber to={100} suffix="%" /> уникальный код</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#CCFF00] rounded-full"></div>
            <span>от <AnimatedNumber to={7} /> дней</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#CCFF00] rounded-full"></div>
            <span>от <AnimatedNumber to={25} suffix=" 000" /> ₽</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[#D4D4D0]/50 text-xs uppercase tracking-widest">Скролл</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#CCFF00]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
