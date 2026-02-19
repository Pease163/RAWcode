import { useRef, useEffect } from 'react';
import { useMotionValue, useInView, animate } from 'motion/react';
import { easeOutExpo } from '@/app/lib/animations';

interface AnimatedNumberProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  format?: (value: number) => string;
}

export function AnimatedNumber({
  to,
  suffix = '',
  prefix = '',
  duration = 2,
  format = (v) => String(Math.round(v)),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(motionVal, to, {
      duration,
      ease: easeOutExpo as unknown as number[],
    });
    const unsub = motionVal.on('change', (v) => {
      if (ref.current) ref.current.textContent = prefix + format(v) + suffix;
    });
    return () => {
      ctrl.stop();
      unsub();
    };
  }, [isInView, to, suffix, prefix, duration, format, motionVal]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
