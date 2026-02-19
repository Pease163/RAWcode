import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { ServiceCategory } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { fadeInUp30, staggerDelay } from '@/app/lib/animations';

export function ServiceFeatures({ service }: { service: ServiceCategory }) {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CCFF00]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Что "
          titleAccent="входит"
          subtitle="Детальный список возможностей в каждой категории"
          className="mb-16"
        />

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.detailedFeatures.map((group, i) => (
            <motion.div
              key={group.category}
              {...fadeInUp30}
              {...staggerDelay(i)}
              className="bg-[#1E1E22] border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10"
            >
              <h3
                className="text-[#CCFF00] text-xl font-bold mb-6 uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className="text-[#CCFF00] mt-0.5 flex-shrink-0" />
                    <span className="text-[#F4F4F0] text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
