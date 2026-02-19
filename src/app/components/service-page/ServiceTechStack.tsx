import { motion } from 'motion/react';
import type { ServiceCategory } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { fadeInUp, staggerDelay } from '@/app/lib/animations';

const groupLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  infrastructure: 'Инфраструктура',
  tools: 'Инструменты'
};

export function ServiceTechStack({ service }: { service: ServiceCategory }) {
  const groups = Object.entries(service.techStack).filter(
    ([, items]) => items && items.length > 0
  ) as [string, string[]][];

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Технологии "
          titleAccent="2026"
          subtitle="Используем актуальный стек для надёжных и быстрых продуктов"
          className="mb-16"
        />

        {/* Tech groups */}
        <div className="space-y-12">
          {groups.map(([key, items], groupIndex) => (
            <motion.div
              key={key}
              {...fadeInUp}
              {...staggerDelay(groupIndex)}
            >
              <h3 className="text-sm font-bold text-[#D4D4D0] uppercase tracking-widest mb-4">
                {groupLabels[key] || key}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 + i * 0.05 }}
                    className="px-4 py-2 md:px-6 md:py-3 bg-[#1E1E22] border border-white/10 rounded-full text-[#F4F4F0] text-base font-medium hover:border-[#CCFF00]/30 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
