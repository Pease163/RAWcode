import { motion, useMotionValue, useSpring } from 'motion/react';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import { useIsCoarsePointer } from '@/app/hooks/useIsCoarsePointer';
import { Link } from 'react-router-dom';
import type { ServiceCategory } from '@/app/data/services-data';
import { fadeInUp30, staggerDelay } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';
import { dispatchSelectPackage } from '@/app/lib/events';

const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };

export function ServiceCard({
  service,
  index,
}: {
  service: ServiceCategory;
  index: number;
}) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCoarse = useIsCoarsePointer();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarse || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateX.set(((y - centerY) / centerY) * -10);
    rawRotateY.set(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleSelectPackage = () => {
    dispatchSelectPackage(`${service.title} (${service.priceRange})`);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      {...fadeInUp30}
      {...staggerDelay(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        borderColor: 'rgba(204, 255, 0, 0.4)',
        boxShadow: '0 0 30px rgba(204, 255, 0, 0.08)',
      }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      transition={{ duration: 0.3 }}
      className="relative p-6 md:p-8 rounded-3xl border bg-[#1E1E22] border-white/10 text-[#F4F4F0] focus-within:ring-2 focus-within:ring-[#CCFF00]"
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#CCFF00]/10">
          <Icon className="w-7 h-7 text-[#CCFF00]" />
        </div>

        <h3
          className="text-2xl font-bold mb-2 uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {service.title}
        </h3>
        <div className="mb-6">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{service.priceRange}</span>
        </div>
        <p className="mb-8 text-[#F4F4F0]/85">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, i) => (
            <li key={`${service.id}-feature-${i}`} className="flex items-start gap-2">
              <Check
                size={20}
                className="text-[#CCFF00] mt-0.5 flex-shrink-0"
              />
              <span className="text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to={`/services/${service.slug}`}
            className={`w-full py-3 rounded-full font-medium transition-all duration-300 text-center block bg-[#CCFF00] text-[#0F0F11] hover:bg-[#FF3B00] hover:text-white ${focusRingClass}`}
          >
            Подробнее
          </Link>
          <button
            onClick={handleSelectPackage}
            className={`w-full py-3 rounded-full font-medium transition-all duration-300 cursor-pointer border border-white/20 text-[#F4F4F0] hover:bg-white/5 ${focusRingClass}`}
          >
            Обсудить проект
          </button>
        </div>
      </div>
    </motion.div>
  );
}
