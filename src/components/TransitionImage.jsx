import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function TransitionImage({ src, alt, className = '', style = {}, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  const transitionEffect = shouldReduceMotion
    ? { opacity: { duration: 0.25 } }
    : {
        opacity: { duration: 0.45 },
        scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.4 }
      };

  return (
    <div className={`relative overflow-hidden w-full h-full bg-neutral-900/10 dark:bg-neutral-900/30 ${className}`} style={style}>
      {/* Pulse Skeleton during loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800/60 animate-pulse" />
      )}

      {src && (
        <motion.img
          src={src}
          alt={alt}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={transitionEffect}
          className="w-full h-full object-cover"
          {...props}
        />
      )}
    </div>
  );
}
