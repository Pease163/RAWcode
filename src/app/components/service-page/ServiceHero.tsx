import { motion } from 'motion/react';
import type { ServiceCategory } from '@/app/data/services-data';
import { Breadcrumbs } from '@/app/components/ui/Breadcrumbs';

export function ServiceHero({ service }: { service: ServiceCategory }) {
  const Icon = service.icon;

  const stats = [
    { label: 'Стартовая цена', value: service.tiers[0].price },
    { label: 'Мин. срок', value: service.tiers[0].duration },
    { label: 'Тарифов', value: String(service.tiers.length) },
    { label: 'Код', value: '100% уникальный' }
  ];

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
      {/* Decorative blur glow */}
      <div className="absolute top-20 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#CCFF00]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Главная', to: '/' },
            { label: 'Услуги', to: '/', scrollTo: 'services' },
            { label: service.title },
          ]}
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-full mb-8"
        >
          <Icon className="w-5 h-5 text-[#CCFF00]" />
          <span className="text-[#CCFF00] text-sm font-bold uppercase tracking-wider">{service.title}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight leading-[1.05] mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-[#F4F4F0]">{service.title}</span>
        </motion.h1>

        {/* Long description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-[#D4D4D0] leading-relaxed max-w-3xl mb-16"
        >
          {service.longDescription}
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#1E1E22] border border-white/10 rounded-2xl p-4 md:p-6 text-center"
            >
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[#CCFF00] mb-2">{stat.value}</div>
              <div className="text-sm text-[#D4D4D0]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
