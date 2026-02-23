import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { staggerContainer, staggerItem } from '@/app/lib/animations';
import { focusRingClass } from '@/app/lib/styles';
import { trackGoal } from '@/app/lib/analytics';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const prevScroll = useRef(0);
  const hiddenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingSectionRef = useRef<string | null>(null);

  // Hide navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - prevScroll.current;
    let next = hiddenRef.current;
    if (latest > 100 && diff > 5) {
      next = true;
    } else if (diff < -5) {
      next = false;
    }
    if (next !== hiddenRef.current) {
      hiddenRef.current = next;
      setHidden(next);
    }
    prevScroll.current = latest;
  });

  // Scroll to pending section after menu closes and overflow is unlocked
  useEffect(() => {
    if (!isOpen && pendingSectionRef.current) {
      const sectionId = pendingSectionRef.current;
      pendingSectionRef.current = null;
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [isOpen]);

  const navigateToSection = useCallback((sectionId: string) => {
    if (isOpen) {
      pendingSectionRef.current = sectionId;
      setIsOpen(false);
    } else if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  }, [isOpen, location.pathname, navigate]);

  // Show sticky CTA after scrolling past hero, hide when footer visible
  useEffect(() => {
    const heroEl = document.querySelector('section');
    const footerEl = document.getElementById('footer');
    if (!heroEl || !footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) {
            setShowStickyCTA(!entry.isIntersecting);
          }
          if (entry.target === footerEl && entry.isIntersecting) {
            setShowStickyCTA(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Close mobile menu on Escape and return focus
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { label: 'О нас', section: 'about' },
    { label: 'Услуги', section: 'services' },
    { label: 'Кейсы', section: 'portfolio' },
    { label: 'Контакты', section: 'footer' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F11]/95 supports-[backdrop-filter]:bg-[#0F0F11]/90 supports-[backdrop-filter]:backdrop-blur-md border-b border-white/10"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-2xl font-bold tracking-wide text-[#F4F4F0]">RawCode</span>
              <div className="w-2 h-2 bg-[#CCFF00] rounded-full shadow-[0_0_6px_rgba(204,255,0,0.6)]"></div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => navigateToSection(link.section)}
                  className={`relative text-[#F4F4F0] hover:text-[#CCFF00] transition-colors cursor-pointer ${focusRingClass} rounded-sm bg-transparent border-none group py-1`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CCFF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => { trackGoal('cta_click', { location: 'navbar', label: 'start_project' }); navigateToSection('footer'); }}
              className={`hidden md:block px-8 py-3 bg-[#CCFF00] text-[#0F0F11] rounded-full font-medium hover:bg-[#FF3B00] hover:text-white transition-all duration-300 cursor-pointer ${focusRingClass}`}
            >
              Начать проект
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(true)}
              className={`md:hidden text-[#F4F4F0] ${focusRingClass} rounded-sm`}
              aria-label="Открыть меню"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0F0F11] flex flex-col md:hidden"
          >
            {/* Drawer header with close button */}
            <div className="flex items-center justify-end px-6 py-4">
              <button
                onClick={() => setIsOpen(false)}
                className={`text-[#F4F4F0] ${focusRingClass} rounded-sm`}
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer navigation */}
            <motion.div
              variants={staggerContainer(0.08, 0.15)}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.section}
                  variants={staggerItem}
                  onClick={() => navigateToSection(link.section)}
                  className={`text-2xl text-[#F4F4F0] hover:text-[#CCFF00] transition-colors cursor-pointer ${focusRingClass} rounded-sm bg-transparent border-none`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                variants={staggerItem}
                onClick={() => navigateToSection('footer')}
                className={`mt-4 px-10 py-4 bg-[#CCFF00] text-[#0F0F11] rounded-full font-bold text-lg hover:bg-[#FF3B00] hover:text-white transition-all duration-300 text-center cursor-pointer ${focusRingClass}`}
              >
                Начать проект
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 left-4 right-4 z-40 md:hidden"
          >
            <button
              onClick={() => navigateToSection('footer')}
              className="block w-full py-4 bg-[#CCFF00] text-[#0F0F11] rounded-full font-bold text-center text-lg hover:bg-[#FF3B00] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.3)] cursor-pointer"
            >
              Обсудить проект
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
