import type { Transition, Variants } from 'motion/react';

// --- Easing curves ---
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

// --- Basic fade/slide presets (spread into motion.div) ---
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
} as const;

export const fadeInUp30 = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
} as const;

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
} as const;

// --- Scale presets ---
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.6, ease: easeOutExpo },
} as const;

export const scaleInSm = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.5, ease: easeOutExpo },
} as const;

// --- Soft scale preset (GPU-friendly, replaces old filter:blur) ---
export const blurIn = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.7, ease: easeOutExpo },
} as const;

// --- Clip-path reveal presets ---
export const clipRevealUp = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.8, ease: easeOutExpo },
} as const;

export const clipRevealLeft = {
  initial: { clipPath: 'inset(0% 100% 0% 0%)' },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.8, ease: easeOutExpo },
} as const;

// --- Stagger system (variants-based) ---
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo as unknown as number[] },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo as unknown as number[] },
  },
};

// --- Delay helpers ---
export const staggerDelay = (index: number, base = 0.1) => ({
  transition: { delay: index * base } satisfies Transition,
});

export const withDelay = (delay: number) => ({
  transition: { delay } satisfies Transition,
});

// --- Hover presets ---
export const hoverLift = {
  whileHover: { y: -8, transition: { duration: 0.3, ease: 'easeOut' } },
} as const;

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' } },
} as const;

export const hoverGlow = (color = '#CCFF00') => ({
  whileHover: {
    boxShadow: `0 0 30px ${color}33, 0 0 60px ${color}1a`,
    transition: { duration: 0.3 },
  },
});

// --- Character animation (kinetic typography) ---
export const charContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const charVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo as unknown as number[] },
  },
};

/** Split text into individual characters, preserving spaces as non-breaking */
export function splitTextToChars(text: string): string[] {
  return text.split('').map((ch) => (ch === ' ' ? '\u00A0' : ch));
}
