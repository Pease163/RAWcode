import { motion } from 'motion/react';
import { Check, Clock } from 'lucide-react';
import type { ServiceCategory, Tier } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { fadeInUp30, staggerDelay } from '@/app/lib/animations';
import { dispatchSelectPackage } from '@/app/lib/events';

export function ServicePricing({ service }: { service: ServiceCategory }) {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Выберите "
          titleAccent="тариф"
          subtitle="Три варианта для разных масштабов и бюджетов"
          className="mb-16"
        />

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {service.tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} service={service} />
          ))}
        </div>

        <p className="text-center text-sm text-[#D4D4D0]/40 mt-8 max-w-[600px] mx-auto leading-relaxed">
          Указанные цены являются ориентировочными и не являются публичной офертой
          (ст. 437 ГК РФ). Точная стоимость определяется в индивидуальном договоре.
        </p>
      </div>
    </section>
  );
}

function PricingCard({ tier, index, service }: { tier: Tier; index: number; service: ServiceCategory }) {
  const isRecommended = tier.recommended;

  const handleSelectTier = () => {
    dispatchSelectPackage(`${service.title} — ${tier.name} (${tier.price})`);
  };

  return (
    <motion.div
      {...fadeInUp30}
      {...staggerDelay(index)}
      className={`
        relative rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col
        ${isRecommended
          ? 'bg-[#CCFF00] text-[#0F0F11] lg:scale-105'
          : 'bg-[#1E1E22] text-[#F4F4F0] border border-white/10'
        }
      `}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="inline-flex self-start px-4 py-1.5 bg-[#FF3B00] text-white rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
          Рекомендуем
        </div>
      )}

      {/* Premium badge — removed by design decision */}

      {/* Tier name */}
      <h3
        className="text-xl font-bold mb-4 uppercase tracking-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {tier.name}
      </h3>

      {/* Price */}
      <div className="text-4xl md:text-5xl font-bold mb-3">
        {tier.price}
      </div>

      {/* Audience */}
      <p className={`text-base mb-6 ${isRecommended ? 'text-[#0F0F11]/70' : 'text-[#F4F4F0]/60'}`}>
        {tier.audience}
      </p>

      {/* Duration */}
      <div className={`flex items-center gap-2 text-sm mb-8 ${isRecommended ? 'text-[#0F0F11]/70' : 'text-[#F4F4F0]/60'}`}>
        <Clock size={16} className="flex-shrink-0" />
        <span>{tier.duration}</span>
      </div>

      {/* Divider */}
      <div className={`border-t mb-8 ${isRecommended ? 'border-[#0F0F11]/15' : 'border-white/10'}`} />

      {/* Features */}
      <ul className="space-y-3 mb-10 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              size={18}
              className={`mt-0.5 flex-shrink-0 ${isRecommended ? 'text-[#0F0F11]' : 'text-[#CCFF00]'}`}
            />
            <span className="text-base leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleSelectTier}
        className={`
          w-full py-4 rounded-full font-bold text-lg transition-all duration-300 cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          ${isRecommended
            ? 'bg-[#0F0F11] text-[#CCFF00] hover:bg-[#FF3B00] hover:text-white focus-visible:ring-[#0F0F11] focus-visible:ring-offset-[#CCFF00]'
            : 'bg-transparent border-2 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#0F0F11] focus-visible:ring-[#CCFF00] focus-visible:ring-offset-[#0F0F11]'
          }
        `}
      >
        Выбрать тариф
      </button>
    </motion.div>
  );
}
