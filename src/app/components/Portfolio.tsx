import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cases } from '@/app/data/portfolio-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { ImageSkeleton } from '@/app/components/ui/ImageSkeleton';
import { clipRevealUp, staggerContainer, staggerItem, withDelay } from '@/app/lib/animations';
import { sectionClass, focusRingClass } from '@/app/lib/styles';

export function Portfolio() {
  return (
    <section id="portfolio" className={`${sectionClass} scroll-mt-20`}>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Избранные "
          titleAccent="Работы"
          subtitle="Проекты, которыми мы гордимся"
        />

        {/* Cases */}
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center
                ${caseItem.reverse ? 'lg:grid-flow-dense' : ''}
              `}
            >
              {/* Image — clip-path reveal */}
              <motion.a
                {...clipRevealUp}
                whileHover="hovered"
                href={caseItem.url || '#'}
                target={caseItem.url ? '_blank' : '_self'}
                rel={caseItem.url ? 'noopener noreferrer' : undefined}
                className={`relative overflow-hidden rounded-3xl group cursor-pointer block ${caseItem.reverse ? 'lg:col-start-2' : ''}`}
              >
                <div className="aspect-[4/3] relative bg-[#1E1E22]">
                  <motion.div
                    className="w-full h-full"
                    variants={{
                      hovered: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <ImageSkeleton
                      src={caseItem.image}
                      srcWebp={caseItem.imageWebp}
                      srcAvif={caseItem.imageAvif}
                      alt={`${caseItem.title} - ${caseItem.category} проект`}
                      loading="lazy"
                      width={caseItem.width}
                      height={caseItem.height}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 group-hover:will-change-[filter]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Overlay Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="px-4 py-2 bg-[#CCFF00] text-[#0F0F11] rounded-full text-sm font-bold">
                      {caseItem.category}
                    </div>
                  </div>
                </div>
              </motion.a>

              {/* Content */}
              <div className={caseItem.reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: caseItem.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  {...withDelay(0.2)}
                >
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 uppercase tracking-tight text-[#F4F4F0]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {caseItem.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#D4D4D0] mb-8 leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Tags — stagger */}
                  <motion.div
                    variants={staggerContainer(0.06)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 mb-8"
                  >
                    {caseItem.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        variants={staggerItem}
                        className="px-4 py-2 bg-[#1E1E22] border border-white/10 rounded-full text-sm text-[#F4F4F0]"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <a
                    href={caseItem.url || '#'}
                    target={caseItem.url ? '_blank' : '_self'}
                    rel={caseItem.url ? 'noopener noreferrer' : undefined}
                    className={`group inline-flex items-center gap-2 text-[#CCFF00] font-medium hover:text-[#FF3B00] transition-colors ${focusRingClass} rounded-sm`}
                  >
                    <span className="border-b-2 border-[#CCFF00] group-hover:border-[#FF3B00] transition-colors">
                      {caseItem.url ? 'Посетить сайт' : 'Смотреть кейс'}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
