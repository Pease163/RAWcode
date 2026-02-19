import { services } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { ServiceCard } from '@/app/components/ServiceCard';

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 px-6 relative overflow-x-hidden scroll-mt-20">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Что мы "
          titleAccent="создаём"
          subtitle="Full-stack разработка под ключ. От идеи до запуска."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
