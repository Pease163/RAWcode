import { marqueeItems } from '@/app/data/marquee-data';

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-wrapper relative py-6 md:py-8 border-y border-white/10 overflow-hidden bg-[#1E1E22] group">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1E1E22] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1E1E22] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 whitespace-nowrap">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <span
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#CCFF00] uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {item}
            </span>
            <span className="text-xl sm:text-2xl md:text-4xl text-[#CCFF00]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
