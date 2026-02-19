import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { values } from '@/app/data/about-data';
import { fadeInUp, fadeInUp30, withDelay, staggerContainer, staggerItem, hoverLift } from '@/app/lib/animations';
import { sectionClass } from '@/app/lib/styles';

export function About() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });

  const circle1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="about" className={`${sectionClass} scroll-mt-20`}>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-[#F4F4F0]">О </span>
            <span className="text-[#CCFF00]">Студии</span>
          </motion.h2>

          <motion.div
            {...fadeInUp}
            {...withDelay(0.1)}
            className="max-w-3xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F4F4F0] mb-8 leading-relaxed">
              Мы — <span className="text-[#CCFF00] font-bold">RawCode</span>.
              Команда разработчиков и дизайнеров из Калининграда, которые создают <motion.span
                className="text-[#FF3B00] inline-block"
                initial={{ backgroundSize: '0% 2px' }}
                whileInView={{ backgroundSize: '100% 2px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  backgroundImage: 'linear-gradient(#FF3B00, #FF3B00)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left bottom',
                }}
              >цифровые продукты нового поколения</motion.span>.
            </p>
            <p className="text-base md:text-lg text-[#D4D4D0] leading-relaxed">
              Забудьте про скучные шаблоны и типовые решения. Мы не просто делаем сайты — мы создаём цифровые продукты:
              от лендингов до сложных платформ и приложений. Каждый проект — уникальный код с нуля,
              который работает на ваш бизнес.
            </p>
          </motion.div>
        </div>

        {/* Manifesto with parallax circles */}
        <motion.div
          ref={manifestoRef}
          {...fadeInUp30}
          {...withDelay(0.2)}
          className="mb-20 p-6 sm:p-8 md:p-12 bg-[#CCFF00] rounded-3xl relative overflow-hidden"
        >
          {/* Background Pattern — parallax */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              style={{ y: circle1Y }}
              className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 border-[20px] md:border-[40px] border-[#0F0F11] rounded-full -mr-32 -mt-32"
            />
            <motion.div
              style={{ y: circle2Y }}
              className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 border-[15px] md:border-[30px] border-[#0F0F11] rounded-full -ml-24 -mb-24"
            />
          </div>

          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0F0F11] uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              НАШ МАНИФЕСТ
            </h3>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#0F0F11] leading-relaxed font-medium">
              "Дизайн должен быть смелым. Код должен быть чистым.
              Продукт должен решать задачу.
              Мы создаём цифровые решения, которые двигают бизнес вперёд."
            </p>
          </div>
        </motion.div>

        {/* Values Grid — stagger + hoverLift */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={staggerItem}
                {...hoverLift}
                className="group p-6 md:p-8 bg-[#1E1E22] border border-white/10 rounded-3xl hover:border-[#CCFF00] transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/0 to-[#CCFF00]/0 group-hover:from-[#CCFF00]/5 group-hover:to-transparent transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#CCFF00] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#CCFF00] group-hover:text-[#0F0F11] transition-colors duration-300" />
                  </div>

                  <h4
                    className="text-xl font-bold mb-3 text-[#F4F4F0] uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {value.title}
                  </h4>

                  <p className="text-[#F4F4F0]/85 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
