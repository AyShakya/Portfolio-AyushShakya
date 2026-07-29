import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FloatingPills() {
  const containerRef = useRef(null);
  const [randomizedPills, setRandomizedPills] = useState([]);

  useEffect(() => {
    // Base setup for components (rebranded AKIO -> AYUSH)
    const basePills = [
      { text: 'BRAND DESIGNER', type: 'oval' },
      { text: 'KIX \u25CF', type: 'kix' },
      { text: '*', type: 'circle' },
      { text: 'CREATIVE DIRECTOR', type: 'oval' },
      { text: '\u2193', type: 'circle-arrow' },
      { text: 'AYUSH', type: 'oval-small' }
    ];

    const generated = basePills.map((pill, idx) => {
      // Spread pills horizontally across columns so they don't overlap completely
      const segmentWidth = 85 / basePills.length;
      const minX = 3 + idx * segmentWidth;
      const maxX = minX + segmentWidth;
      const xPercent = minX + Math.random() * (maxX - minX);

      // Resting gravity boundary is at the bottom of the container (just above the name)
      // Standardize height: Circles/ovals sit at the bottom 72% to 83% range
      const yPercent = 70 + Math.random() * 12;

      // Drop starting point from above the screen container (-350px to -150px)
      const startY = -250 - Math.random() * 200;

      // Settle rotations
      const startRotate = -120 + Math.random() * 240;
      const endRotate = -15 + Math.random() * 30;

      // Sequential delay
      const delay = idx * 0.12 + Math.random() * 0.1;

      return {
        ...pill,
        x: `${xPercent}%`,
        y: `${yPercent}%`,
        startY,
        startRotate,
        endRotate,
        delay
      };
    });

    setRandomizedPills(generated);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden select-none bg-transparent"
    >
      {randomizedPills.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';
        
        return (
          <motion.div
            key={idx}
            drag
            dragConstraints={containerRef}
            dragElastic={0.4}
            dragTransition={{ power: 0.15, bounceStiffness: 120, bounceDamping: 12 }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
            initial={{ 
              left: pill.x,
              top: pill.y,
              y: pill.startY,
              rotate: pill.startRotate,
              scale: 0.9,
              opacity: 0
            }}
            animate={{ 
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
            whileHover={{ scale: 1.05 }}
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
