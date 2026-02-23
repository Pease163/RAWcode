import { useState, useEffect } from 'react';

export function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(
    () => window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(pointer: coarse)');
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isCoarse;
}
