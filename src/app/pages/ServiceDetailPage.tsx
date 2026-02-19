import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { services } from '@/app/data/services-data';
import { ServiceHero } from '@/app/components/service-page/ServiceHero';
import { ServicePricing } from '@/app/components/service-page/ServicePricing';
import { ServiceFeatures } from '@/app/components/service-page/ServiceFeatures';
import { ServiceTechStack } from '@/app/components/service-page/ServiceTechStack';
import { ServiceProcess } from '@/app/components/service-page/ServiceProcess';
import { ServiceFAQ } from '@/app/components/service-page/ServiceFAQ';
import { ServiceCTA } from '@/app/components/service-page/ServiceCTA';
import { Footer } from '@/app/components/Footer';
import { trackGoal } from '@/app/lib/analytics';
import { useSEO } from '@/app/lib/seo';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Analytics: track service page view
  useEffect(() => {
    if (service) {
      trackGoal('service_page_view', { service: service.slug });
    }
  }, [service]);

  const seoConfig = useMemo(() => {
    if (!service) return null;

    const url = `https://rawcode.studio/services/${service.slug}`;
    const ogImage = service.ogImage ? `https://rawcode.studio${service.ogImage}` : undefined;

    return {
      title: service.seoTitle,
      description: service.seoDescription,
      canonical: url,
      ogImage,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.seoDescription,
          provider: {
            '@type': 'Organization',
            name: 'RawCode Studio',
            url: 'https://rawcode.studio'
          },
          url,
          offers: service.tiers.map(tier => ({
            '@type': 'Offer',
            name: tier.name,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: tier.price.replace(/[^\d]/g, ''),
              priceCurrency: 'RUB'
            }
          }))
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Главная',
              item: 'https://rawcode.studio/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Услуги',
              item: 'https://rawcode.studio/#services'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: service.title,
              item: url
            }
          ]
        }
      ]
    };
  }, [service]);

  useSEO(seoConfig);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServicePricing service={service} />
      <ServiceFeatures service={service} />
      <ServiceTechStack service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
      <Footer />
    </>
  );
}
