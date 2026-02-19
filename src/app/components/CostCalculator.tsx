import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Calculator } from 'lucide-react';
import { questions } from '@/app/data/calculator-data';
import { AnimatedNumber } from '@/app/components/ui/AnimatedNumber';
import { fadeInUp30 } from '@/app/lib/animations';
import { ctaButtonClass, sectionClass, focusRingClass } from '@/app/lib/styles';
import { trackGoal } from '@/app/lib/analytics';

const formatPrice = (v: number) => `${Math.round(v).toLocaleString('ru-RU')}`;

interface AnswerDetail {
  value: number;
  label: string;
  questionId: string;
}

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerDetail[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAnswer = (value: number, label: string) => {
    const newAnswers = [...answers, { value, label, questionId: questions[step].id }];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    let multiplier = 1;

    answers.forEach((a) => {
      if (a.value === -1) multiplier = 1.3;
      else if (a.value === -2) multiplier = 1.5;
      else total += a.value;
    });

    return Math.round(total * multiplier);
  };

  const getBreakdown = () => {
    const items: { label: string; value: string }[] = [];
    let multiplier = 1;

    answers.forEach((a) => {
      if (a.value === -1) {
        multiplier = 1.3;
        items.push({ label: a.label, value: 'x1.3' });
      } else if (a.value === -2) {
        multiplier = 1.5;
        items.push({ label: a.label, value: 'x1.5' });
      } else if (a.value > 0) {
        items.push({ label: a.label, value: `${a.value.toLocaleString('ru-RU')} ₽` });
      }
    });

    return { items, multiplier };
  };

  const isComplete = answers.length === questions.length;
  const total = calculateTotal();

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className={sectionClass}>
      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Toggle Button */}
        <motion.div
          {...fadeInUp30}
          className="text-center"
        >
          {!isOpen && (
            <div
              className="p-6 sm:p-8 md:p-12 lg:p-16 text-center border border-[#CCFF00]/20 rounded-3xl bg-[#1E1E22] cursor-pointer group hover:border-[#CCFF00]/50 transition-all"
              onClick={() => setIsOpen(true)}
            >
                <Calculator className="w-12 h-12 text-[#CCFF00] mx-auto mb-6" />
                <h3
                  className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span className="text-[#F4F4F0]">Калькулятор </span>
                  <span className="text-[#CCFF00]">стоимости</span>
                </h3>
                <p className="text-[#D4D4D0] mb-8 max-w-xl mx-auto">
                  Ответьте на 5 вопросов и узнайте примерную стоимость вашего проекта
                </p>
                <span className={`inline-flex items-center gap-2 ${ctaButtonClass}`}>
                  Рассчитать стоимость
                  <ArrowRight size={20} />
                </span>
            </div>
          )}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1E1E22] rounded-3xl border border-[#CCFF00]/20 p-5 sm:p-6 md:p-8 lg:p-12"
              >
                {!isComplete ? (
                  <>
                    {/* Progress — spring animated bars */}
                    <div className="flex gap-2 mb-8">
                      {questions.map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-1 flex-1 rounded-full"
                          animate={{
                            backgroundColor: i <= step ? '#CCFF00' : 'rgba(255,255,255,0.1)',
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      ))}
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-[#D4D4D0] text-sm mb-2">
                          Вопрос {step + 1} из {questions.length}
                        </p>
                        <h4 className="text-2xl font-bold text-[#F4F4F0] mb-8">
                          {questions[step].question}
                        </h4>

                        <div className="space-y-3">
                          {questions[step].options.map((option) => (
                            <motion.button
                              key={option.label}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswer(option.value, option.label)}
                              className={`w-full text-left p-5 rounded-2xl bg-[#0F0F11] border-2 border-white/10 text-[#F4F4F0] hover:border-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all duration-200 ${focusRingClass}`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Back button */}
                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="mt-6 flex items-center gap-2 text-[#D4D4D0] hover:text-[#CCFF00] transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Назад
                      </button>
                    )}
                  </>
                ) : (
                  /* Result with animated counter */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onAnimationComplete={() => trackGoal('calculator_complete', { total: String(total) })}
                    className="text-center py-8"
                  >
                    <p className="text-[#CCFF00] text-sm font-bold uppercase tracking-wider mb-4">
                      Примерная стоимость
                    </p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F4F0] mb-2">
                      <AnimatedNumber to={total} prefix="от " suffix=" ₽" duration={1.5} format={formatPrice} />
                    </p>
                    <p className="text-xs text-[#D4D4D0]/50 mb-6">* Окончательная цена может отличаться</p>

                    {/* Price breakdown */}
                    {(() => {
                      const { items } = getBreakdown();
                      return items.length > 0 ? (
                        <div className="bg-[#0F0F11] rounded-2xl p-5 mb-8 text-left max-w-sm mx-auto border border-white/5">
                          <p className="text-xs text-[#D4D4D0]/50 uppercase tracking-wider mb-3">Детализация</p>
                          {items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                              <span className="text-sm text-[#D4D4D0] truncate mr-4">{item.label}</span>
                              <span className="text-sm text-[#CCFF00] font-medium whitespace-nowrap">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : null;
                    })()}

                    <p className="text-[#D4D4D0] mb-8 max-w-md mx-auto">
                      Точную стоимость рассчитаем после обсуждения деталей вашего проекта
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="#footer"
                        className={`${ctaButtonClass} inline-flex items-center justify-center gap-2`}
                      >
                        Обсудить проект
                        <ArrowRight size={20} />
                      </a>
                      <button
                        onClick={reset}
                        className="px-8 py-4 border-2 border-white/20 text-[#F4F4F0] rounded-full font-bold hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300"
                      >
                        Пересчитать
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Close button */}
                <button
                  onClick={() => { setIsOpen(false); reset(); }}
                  className="mt-6 text-[#D4D4D0] text-sm hover:text-[#CCFF00] transition-colors mx-auto block"
                >
                  Закрыть калькулятор
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
