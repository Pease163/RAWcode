import { useState, useCallback } from 'react';

export function useAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const isOpen = useCallback(
    (index: number) => openIndex === index,
    [openIndex],
  );

  return { openIndex, toggle, isOpen } as const;
}
