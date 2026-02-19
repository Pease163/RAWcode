import { motion } from 'motion/react';
import type { ServiceCategory } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { fadeInLeft, staggerDelay } from '@/app/lib/animations';

export function ServiceProcess({ service }: { service: ServiceCategory }) {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CCFF00]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Как мы "
          titleAccent="работаем"
          subtitle="Прозрачный процесс с контрольными точками на каждом этапе"
          className="mb-16"
        />

        {/* Timeline steps */}
        <div className="space-y-8">
          {service.processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              {...fadeInLeft}
              {...staggerDelay(i, 0.15)}
              className="flex gap-4 md:gap-6 lg:gap-8"
            >
              {/* Step number */}
              <div className="flex-shrink-0">
                <div
                  className="w-14 h-14 bg-[#CCFF00] text-[#0F0F11] rounded-xl flex items-center justify-center text-xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {String(step.step).padStart(2, '0')}
                </div>
              </div>

              {/* Step content */}
              <div className="bg-[#1E1E22] border border-white/10 rounded-2xl p-6 md:p-8 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3
                    className="text-xl font-bold text-[#F4F4F0] uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.title}
                  </h3>
                  <span className="text-sm text-[#CCFF00] bg-[#CCFF00]/10 px-4 py-1.5 rounded-full font-medium w-fit">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[#D4D4D0] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
