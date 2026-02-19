import { useEffect } from 'react';

export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  jsonLd?: object[];
}

function setMeta(attr: string, key: string, value: string): () => void {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector);
  const prev = el?.getAttribute('content') ?? null;

  if (el) {
    el.setAttribute('content', value);
  } else {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('content', value);
    document.head.appendChild(el);
  }

  return () => {
    const current = document.querySelector(selector);
    if (current && prev !== null) {
      current.setAttribute('content', prev);
    } else if (current && prev === null) {
      current.remove();
    }
  };
}

export function useSEO(config: SEOConfig | null): void {
  const jsonLdStr = config?.jsonLd ? JSON.stringify(config.jsonLd) : '';

  useEffect(() => {
    if (!config) return;

    const cleanups: (() => void)[] = [];

    // Title
    const prevTitle = document.title;
    document.title = config.title;
    cleanups.push(() => { document.title = prevTitle; });

    // Meta description
    cleanups.push(setMeta('name', 'description', config.description));

    // Robots
    cleanups.push(setMeta('name', 'robots', config.robots ?? 'index, follow'));

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.getAttribute('href') ?? null;
    if (canonical) {
      canonical.setAttribute('href', config.canonical);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', config.canonical);
      document.head.appendChild(canonical);
    }
    cleanups.push(() => {
      const can = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (can && prevCanonical !== null) {
        can.setAttribute('href', prevCanonical);
      } else if (can && prevCanonical === null) {
        can.remove();
      }
    });

    // OG tags
    cleanups.push(setMeta('property', 'og:title', config.title));
    cleanups.push(setMeta('property', 'og:description', config.description));
    cleanups.push(setMeta('property', 'og:url', config.canonical));
    cleanups.push(setMeta('property', 'og:type', config.ogType ?? 'website'));
    if (config.ogImage) {
      cleanups.push(setMeta('property', 'og:image', config.ogImage));
    }

    // Twitter Card
    cleanups.push(setMeta('name', 'twitter:title', config.title));
    cleanups.push(setMeta('name', 'twitter:description', config.description));
    if (config.ogImage) {
      cleanups.push(setMeta('name', 'twitter:image', config.ogImage));
    }

    // JSON-LD
    const scripts: HTMLScriptElement[] = [];
    if (config.jsonLd) {
      for (const schema of config.jsonLd) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        scripts.push(script);
      }
    }
    cleanups.push(() => {
      for (const s of scripts) s.remove();
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.title, config?.description, config?.canonical, config?.ogImage, config?.ogType, config?.robots, jsonLdStr]);
}
