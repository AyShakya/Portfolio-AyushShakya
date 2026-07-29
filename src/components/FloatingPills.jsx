import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FloatingPills() {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Initialize randomized values once on mount to ensure stability
  const [randomizedPills] = useState(() => {
    const basePills = [
      { text: 'BRAND DESIGNER', type: 'oval' },
      { text: 'KIX \u25CF', type: 'kix' },
      { text: '*', type: 'circle' },
      { text: 'CREATIVE DIRECTOR', type: 'oval' },
      { text: '\u2193', type: 'circle-arrow' },
      { text: 'AYUSH', type: 'oval-small' }
    ];

    return basePills.map((pill, idx) => {
      // Divide container width horizontally
      const segmentWidth = 85 / basePills.length;
      const minX = 3 + idx * segmentWidth;
      const maxX = minX + segmentWidth;
      const xPercent = minX + Math.random() * (maxX - minX);

      // Resting position (bottom range: 70% to 83% height)
      const yPercent = 70 + Math.random() * 12;

      // Drop entry position offsets: drop diagonally with random starting point
      const startY = -400 - Math.random() * 250;
      const startX = -120 + Math.random() * 240;

      // Settle rotations
      const startRotate = -180 + Math.random() * 360;
      const endRotate = -15 + Math.random() * 30;

      // Drop delays
      const delay = idx * 0.12 + Math.random() * 0.12;

      return {
        ...pill,
        xPercent,
        yPercent,
        startX,
        startY,
        startRotate,
        endRotate,
        delay
      };
    });
  });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Run observer for precise measurements
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', updateSize);
      resizeObserver.disconnect();
    };
  }, []);

  const getConstraints = (pill) => {
    if (containerSize.width === 0 || containerSize.height === 0) return { top: 0, left: 0, right: 0, bottom: 0 };

    const isMobile = containerSize.width < 768;
    const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';
    
    let pillW = 150;
    let pillH = 50;

    if (isCircle) {
      pillW = isMobile ? 64 : 80;
      pillH = isMobile ? 64 : 80;
    } else {
      if (pill.type === 'oval-small') {
        pillW = isMobile ? 100 : 120;
      } else if (pill.text.length > 12) {
        pillW = isMobile ? 180 : 220;
      } else {
        pillW = isMobile ? 120 : 150;
      }
      pillH = isMobile ? 48 : 56;
    }

    const restingX = (pill.xPercent / 100) * containerSize.width;
    const restingY = (pill.yPercent / 100) * containerSize.height;

    return {
      left: -restingX + 10,
      right: containerSize.width - restingX - pillW - 10,
      top: -restingY + 10,
      bottom: containerSize.height - restingY - pillH - 10
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden select-none bg-transparent"
    >
      {randomizedPills.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';
        const constraints = getConstraints(pill);

        return (
          <motion.div
            key={idx}
            drag
            dragConstraints={constraints}
            dragElastic={0.45}
            dragTransition={{ power: 0.12, bounceStiffness: 220, bounceDamping: 10 }}
            whileDrag={{ scale: 1.08, cursor: 'grabbing', zIndex: 50 }}
            initial={{ 
              left: `${pill.xPercent}%`,
              top: `${pill.yPercent}%`,
              x: pill.startX,
              y: pill.startY,
              rotate: pill.startRotate,
              scale: 0.9,
              opacity: 0
            }}
            animate={{ 
              x: 0,
              y: 0,
              rotate: pill.endRotate,
              scale: 1,
              opacity: 1
            }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 13,
              mass: 1.1,
              delay: pill.delay
            }}
            whileHover={{ scale: 1.04 }}
            className={`absolute cursor-grab select-none font-mono tracking-widest border transition-colors duration-300 ${
              isCircle 
                ? 'w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-sans' 
                : 'px-8 py-3.5 md:px-10 md:py-4.5 rounded-full text-sm md:text-base'
            } ${
              pill.type === 'circle'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.15)] font-bold'
                : pill.type === 'circle-arrow'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.15)] font-sans'
                : 'bg-transparent text-neutral-850 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 backdrop-blur-sm'
            }`}
          >
            {pill.text}
          </motion.div>
        );
      })}
    </div>
  );
}
