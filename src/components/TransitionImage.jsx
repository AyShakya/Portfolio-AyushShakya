import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function TransitionImage({ src, alt, className = '', style = {}, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!src) return;
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  // Use transition-all to handle opacity, transform (scale), and filter (blur) transitions smoothly
  const transitionClass = shouldReduceMotion
    ? 'transition-opacity duration-250 ease-out'
    : 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

  // Base state classes for image loading transition
  const stateClass = isLoaded
    ? 'opacity-100 scale-100 blur-none'
    : shouldReduceMotion
      ? 'opacity-0'
      : 'opacity-0 scale-[1.02] blur-[8px]';

  // Smooth hover scaling on both parent-group hover and direct image hover
  const hoverClass = shouldReduceMotion
    ? ''
    : 'group-hover:scale-105 hover:scale-105';

  return (
    <div className={`relative overflow-hidden w-full h-full bg-neutral-900/10 dark:bg-neutral-900/30 ${className}`} style={style}>
      {/* Pulse Skeleton during loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800/60 animate-pulse" />
      )}

      {src && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${transitionClass} ${stateClass} ${hoverClass}`}
          {...props}
        />
      )}
    </div>
  );
}
