import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'cookies_accepted';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E1E22] border-t border-white/10 px-6 py-4"
        >
          <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#D4D4D0]/70 text-center sm:text-left">
              Мы используем cookies для аналитики и улучшения сайта.{' '}
              <Link to="/privacy" className="text-[#CCFF00] hover:underline">
                Подробнее
              </Link>
            </p>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-[#CCFF00] text-[#0F0F11] rounded-full text-sm font-bold hover:bg-[#CCFF00]/90 transition-colors flex-shrink-0 cursor-pointer"
            >
              Принять
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
