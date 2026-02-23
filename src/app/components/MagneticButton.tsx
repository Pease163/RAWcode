import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useIsCoarsePointer } from '@/app/hooks/useIsCoarsePointer';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

export function MagneticButton({ children, className = '', href, onClick }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isCoarse = useIsCoarsePointer();

  const handleMouseMove = (e: React.MouseEvent) => {
    const ref = href ? anchorRef.current : buttonRef.current;
    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 50;

    if (distance < maxDistance) {
      const strength = 0.3;
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Touch devices: render plain elements without motion wrappers
  if (isCoarse) {
    if (href) return <a className={className} href={href}>{children}</a>;
    return <button className={className} onClick={onClick}>{children}</button>;
  }

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{ x: springX, y: springY }}
        href={href}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ x: springX, y: springY }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
