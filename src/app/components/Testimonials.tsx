import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { testimonials } from '@/app/data/testimonials-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { staggerContainer, staggerItem, hoverLift } from '@/app/lib/animations';
import { sectionClass } from '@/app/lib/styles';

export function Testimonials() {
  return (
    <section className={sectionClass}>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          badge="Отзывы"
          titleWhite="Клиенты "
          titleAccent="о нас"
        />

        {/* Testimonial Cards — stagger system */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              {...hoverLift}
              className="p-6 md:p-8 bg-[#1E1E22] rounded-3xl border border-white/10 hover:border-[#CCFF00]/30 transition-colors duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-[#CCFF00] text-[#CCFF00]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#D4D4D0] text-base md:text-lg leading-relaxed mb-8 flex-1">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <div className="text-[#F4F4F0] font-bold">{item.name}</div>
                  <div className="text-[#D4D4D0] text-sm">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
