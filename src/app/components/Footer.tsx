import { motion } from 'motion/react';
import { fadeInLeft, fadeInRight } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';
import { ContactForm } from '@/app/components/footer/ContactForm';
import { ContactInfo } from '@/app/components/footer/ContactInfo';
import { SocialLinks } from '@/app/components/footer/SocialLinks';

export function Footer() {
  return (
    <footer id="footer" className="relative py-16 md:py-24 lg:py-32 px-6 overflow-hidden border-t border-[#CCFF00]/10 scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CCFF00]/5 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 mb-16 md:mb-24 lg:mb-32">
          {/* Left: Mega CTA */}
          <motion.div
            {...fadeInLeft}
            className="flex flex-col justify-center"
          >
            <ContactInfo />
            <SocialLinks />
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            {...fadeInRight}
            className="flex items-center"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-[#CCFF00]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#D4D4D0]">
            <div className="text-sm">
              <p>© 2026 RawCode Studio. Калининград.</p>
              <p className="text-[#D4D4D0]/50 mt-1">ИП Сторожев Д.М. ИНН 390612020954 ОГРНИП 324390000044121</p>
            </div>
            <div className="flex gap-8 text-sm">
              <a
                href="/privacy"
                className={`hover:text-[#CCFF00] transition-colors ${focusRingClass} rounded-sm px-2 py-1`}
              >
                Конфиденциальность
              </a>
              <a
                href="/terms"
                className={`hover:text-[#CCFF00] transition-colors ${focusRingClass} rounded-sm px-2 py-1`}
              >
                Условия
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
