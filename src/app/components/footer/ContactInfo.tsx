import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import {
  scaleIn,
  blurIn,
  fadeInUp,
  staggerContainer,
  staggerItemLeft,
} from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';

export function ContactInfo() {
  return (
    <>
      {/* Badge — scaleIn */}
      <motion.div
        {...scaleIn}
        className="inline-block px-6 py-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-full mb-6 md:mb-8 w-fit"
      >
        <span className="text-[#CCFF00] text-sm font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>Начнем?</span>
      </motion.div>

      {/* Heading — simple fadeInUp */}
      <motion.h2
        {...fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[1.05] mb-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span className="text-[#F4F4F0]">START</span>
        <br />
        <span className="text-[#CCFF00]">YOUR</span>
        <br />
        <span className="text-[#F4F4F0]">PROJECT</span>
      </motion.h2>

      {/* Description — blurIn */}
      <motion.p {...blurIn} className="text-base sm:text-lg md:text-xl text-[#D4D4D0] mb-12 leading-relaxed max-w-lg">
        Оставьте заявку, и мы свяжемся с вами в течение 24 часов, чтобы обсудить детали проекта
      </motion.p>

      {/* Contact links — stagger from left */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 md:space-y-6"
      >
        <motion.a
          variants={staggerItemLeft}
          href="mailto:denisdikarvit@gmail.com"
          className={`flex items-center gap-4 group ${focusRingClass} rounded-lg p-2 -ml-2`}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center group-hover:bg-[#CCFF00] transition-all"
          >
            <Mail className="w-6 h-6 text-[#CCFF00] group-hover:text-[#0F0F11] transition-colors" />
          </motion.div>
          <div>
            <div className="text-xs text-[#D4D4D0] uppercase tracking-wider mb-1">Email</div>
            <div className="text-base md:text-lg text-[#F4F4F0] group-hover:text-[#CCFF00] transition-colors">denisdikarvit@gmail.com</div>
          </div>
        </motion.a>

        <motion.a
          variants={staggerItemLeft}
          href="tel:+79211095430"
          className={`flex items-center gap-4 group ${focusRingClass} rounded-lg p-2 -ml-2`}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-14 h-14 rounded-2xl bg-[#FF3B00]/10 flex items-center justify-center group-hover:bg-[#FF3B00] transition-all"
          >
            <Phone className="w-6 h-6 text-[#FF3B00] group-hover:text-white transition-colors" />
          </motion.div>
          <div>
            <div className="text-xs text-[#D4D4D0] uppercase tracking-wider mb-1">Телефон</div>
            <div className="text-base md:text-lg text-[#F4F4F0] group-hover:text-[#FF3B00] transition-colors">+7 (921) 109-54-30</div>
          </div>
        </motion.a>
      </motion.div>
    </>
  );
}
