import { motion } from 'motion/react';
import { steps } from '@/app/data/process-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { AnimatedNumber } from '@/app/components/ui/AnimatedNumber';
import { staggerContainer, staggerItem } from '@/app/lib/animations';
import { sectionClass } from '@/app/lib/styles';

const formatStepNumber = (v: number) => String(Math.round(v)).padStart(2, '0');

export function Process() {
  return (
    <section
      id="process"
      className={`${sectionClass} scroll-mt-20`}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          badge="Наш подход"
          badgeColor="orange"
          titleWhite="Процесс "
          titleAccent="работы"
          subtitle="От идеи до запуска — прозрачно, структурировано и без лишней бюрократии."
          className="mb-12 md:mb-16 lg:mb-24"
        />

        {/* Steps Grid — stagger */}
        <div className="relative">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  className="group"
                >
                  <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col group-hover:border-[#CCFF00]/50 group-hover:shadow-[0_20px_50px_rgba(204,255,0,0.1)] transition-[border-color,box-shadow] duration-300">
                    {/* Step number — animated counter */}
                    <span
                      className="absolute top-4 right-6 text-5xl md:text-7xl font-extrabold text-white/[0.04] group-hover:text-[#CCFF00]/10 transition-colors duration-300 select-none pointer-events-none leading-none"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <AnimatedNumber to={parseInt(step.number, 10)} duration={1.2} format={formatStepNumber} />
                    </span>

                    {/* Icon box */}
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#CCFF00] group-hover:text-[#0F0F11] transition-colors duration-300" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold mb-3 text-[#F4F4F0] uppercase tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#D4D4D0]/60 text-sm mb-5 leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <div className="mb-5">
                      <span className="text-xs text-[#FF3B00] font-bold uppercase tracking-wider">
                        {step.duration}
                      </span>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-2.5 pt-5 border-t border-white/[0.06]">
                      {step.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <div className="w-1 h-1 bg-[#CCFF00] rounded-full flex-shrink-0" />
                          <span className="text-xs text-[#F4F4F0]/40 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Total duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.04] border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-[#CCFF00] rounded-full" />
              <span className="text-[#D4D4D0] text-sm">
                Средний срок проекта: <span className="text-[#F4F4F0] font-bold">2–8 недель</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
