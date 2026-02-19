import { motion } from 'motion/react';
import { staggerContainer, staggerItemScale } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';

const socials = [
  { name: 'Tg', label: 'Telegram', href: 'https://t.me/rawcodeW' },
  { name: 'Vk', label: 'VK', href: 'https://vk.com/rawcodew' }
];

export function SocialLinks() {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.3)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex gap-4 mt-12"
    >
      {socials.map((social) => (
        <motion.a
          key={social.name}
          variants={staggerItemScale}
          whileHover={{ y: -4, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#1E1E22] border-2 border-transparent flex items-center justify-center text-[#F4F4F0] font-bold hover:bg-[#CCFF00] hover:text-[#0F0F11] hover:border-[#CCFF00] transition-colors duration-300 ${focusRingClass}`}
          aria-label={social.label}
        >
          {social.name}
        </motion.a>
      ))}
    </motion.div>
  );
}
