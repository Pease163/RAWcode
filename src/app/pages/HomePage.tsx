import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/app/components/Hero';
import { Marquee } from '@/app/components/Marquee';
import { About } from '@/app/components/About';
import { Services } from '@/app/components/Services';
import { CostCalculator } from '@/app/components/CostCalculator';
import { Process } from '@/app/components/Process';
import { Portfolio } from '@/app/components/Portfolio';
import { Testimonials } from '@/app/components/Testimonials';
import { FAQ } from '@/app/components/FAQ';
import { Footer } from '@/app/components/Footer';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clear the state so it doesn't scroll again on re-render
      window.history.replaceState({}, '');
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Marquee />
      <div className="cv-auto"><About /></div>
      <div className="cv-auto"><Services /></div>
      <div className="cv-auto"><CostCalculator /></div>
      <div className="cv-auto"><Process /></div>
      <div className="cv-auto"><Portfolio /></div>
      <div className="cv-auto"><Testimonials /></div>
      <div className="cv-auto"><FAQ /></div>
      <Footer />
    </>
  );
}
