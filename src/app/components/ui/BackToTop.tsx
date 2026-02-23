import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const visibleRef = useRef(false);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const shouldShow = latest > 0.15;
    if (shouldShow !== visibleRef.current) {
      visibleRef.current = shouldShow;
      setVisible(shouldShow);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-[#1E1E22] border border-white/10 text-[#D4D4D0] hover:bg-[#CCFF00] hover:text-[#0F0F11] hover:border-[#CCFF00] transition-colors duration-300 hidden md:flex items-center justify-center shadow-lg cursor-pointer"
          aria-label="Наверх"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
