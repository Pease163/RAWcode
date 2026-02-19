import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { faqItems } from '@/app/data/faq-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { useAccordion } from '@/app/hooks/useAccordion';
import { staggerContainer, staggerItem, fadeInUp30, withDelay } from '@/app/lib/animations';
import { ctaButtonClass, sectionClass, focusRingClass } from '@/app/lib/styles';

export function FAQ() {
  const { toggle, isOpen } = useAccordion();

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(index);
    }
  };

  return (
    <section id="faq" className={`${sectionClass} scroll-mt-20`}>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <SectionHeader
          badge="FAQ"
          titleWhite="Ответы на "
          titleAccent="вопросы"
          subtitle="Все, что нужно знать о работе с нами"
          className="mb-12 md:mb-16 lg:mb-24"
        />

        {/* FAQ Accordion — stagger */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="space-y-4 md:space-y-6 mb-12 md:mb-16 lg:mb-24"
        >
          {faqItems.map((faq, index) => {
            const open = isOpen(index);

            return (
              <motion.div key={faq.id} variants={staggerItem}>
                <button
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                  className={`
                    w-full p-5 sm:p-6 md:p-8 rounded-2xl transition-all duration-300 text-left
                    ${focusRingClass}
                    ${open
                      ? 'bg-[#CCFF00]/5 border-2 border-[#CCFF00]'
                      : 'bg-[#1E1E22] border-2 border-transparent hover:border-[#CCFF00]/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                    {/* Number Badge — spring pulse on open */}
                    <motion.div
                      animate={open ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                        ${open ? 'bg-[#CCFF00] text-[#0F0F11]' : 'bg-[#0F0F11] text-[#CCFF00]'}
                      `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 transition-colors ${open ? 'text-[#CCFF00]' : 'text-[#F4F4F0]'}`}>
                        {faq.question}
                      </h3>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            id={`faq-answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                            role="region"
                          >
                            <p className="text-[#D4D4D0] text-base md:text-lg leading-relaxed pt-6">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Icon — Framer Motion rotate */}
                    <motion.div
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#0F0F11]
                      `}
                      aria-hidden="true"
                    >
                      <Plus className="w-6 h-6 text-[#CCFF00]" />
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Prominent CTA */}
        <motion.div
          {...fadeInUp30}
          {...withDelay(0.3)}
          className="p-8 md:p-12 lg:p-16 text-center border border-[#CCFF00]/20 rounded-3xl bg-[#1E1E22]"
        >
            <h3
              className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[#F4F4F0]">Остались </span>
              <span className="text-[#CCFF00]">вопросы?</span>
            </h3>

            <p className="text-[#D4D4D0] mb-8 max-w-xl mx-auto">
              Свяжитесь с нами напрямую — ответим на все вопросы
            </p>

            <a
              href="#footer"
              className={`inline-flex items-center ${ctaButtonClass} ${focusRingClass}`}
            >
              Связаться с нами
            </a>
        </motion.div>
      </div>
    </section>
  );
}
