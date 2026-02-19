import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  srcWebp?: string;
}

export function ImageSkeleton({ src, alt, className = '', loading = 'lazy', width, height, srcWebp }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  const imgElement = (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      onLoad={() => setLoaded(true)}
      className={`${className} ${loaded ? '' : 'opacity-0'} transition-opacity duration-500`}
    />
  );

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#1E1E22] overflow-hidden"
          >
            <div className="absolute inset-0 shimmer-overlay" />
          </motion.div>
        )}
      </AnimatePresence>
      {srcWebp ? (
        <picture>
          <source srcSet={srcWebp} type="image/webp" />
          {imgElement}
        </picture>
      ) : (
        imgElement
      )}
    </div>
  );
}
