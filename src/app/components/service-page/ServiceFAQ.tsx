import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import type { ServiceCategory } from '@/app/data/services-data';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { useAccordion } from '@/app/hooks/useAccordion';
import { fadeInUp, staggerDelay } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';

export function ServiceFAQ({ service }: { service: ServiceCategory }) {
  const { toggle, isOpen } = useAccordion();

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-[900px] mx-auto relative z-10">
        <SectionHeader
          titleWhite="Частые "
          titleAccent="вопросы"
          subtitle={`Ответы на популярные вопросы о ${service.title.toLowerCase()}`}
          className="mb-16"
        />

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {service.faqs.map((faq, index) => {
            const open = isOpen(index);

            return (
              <motion.div
                key={index}
                {...fadeInUp}
                {...staggerDelay(index, 0.05)}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={open}
                  className={`
                    w-full p-6 md:p-8 rounded-2xl transition-all duration-300 text-left cursor-pointer
                    ${focusRingClass}
                    ${open
                      ? 'bg-[#CCFF00]/5 border-2 border-[#CCFF00]'
                      : 'bg-[#1E1E22] border-2 border-transparent hover:border-[#CCFF00]/30'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className={`text-lg md:text-xl font-bold transition-colors ${open ? 'text-[#CCFF00]' : 'text-[#F4F4F0]'}`}>
                        {faq.question}
                      </h3>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#D4D4D0] text-base leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-[#0F0F11]"
                    >
                      <Plus className={`w-5 h-5 transition-all ${open ? 'text-[#CCFF00] rotate-45' : 'text-[#CCFF00]'}`} />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
