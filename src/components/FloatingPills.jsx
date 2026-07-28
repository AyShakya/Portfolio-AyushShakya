import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function FloatingPills() {
  const containerRef = useRef(null);

  const pills = [
    { 
      text: 'BRAND DESIGNER', 
      type: 'oval',
      x: '15%', 
      y: '10%', 
      rotate: -3,
      driftX: [0, 15, -10, 0],
      driftY: [0, -15, 10, 0]
    },
    { 
      text: 'KIX \u25CF', 
      type: 'kix',
      x: '50%', 
      y: '20%', 
      rotate: 5,
      driftX: [0, -12, 15, 0],
      driftY: [0, 10, -15, 0]
    },
    { 
      text: '*', 
      type: 'circle', 
      x: '30%', 
      y: '45%', 
      rotate: 0,
      driftX: [0, 8, -8, 0],
      driftY: [0, -10, 12, 0]
    },
    { 
      text: 'CREATIVE DIRECTOR', 
      type: 'oval', 
      x: '60%', 
      y: '50%', 
      rotate: -6,
      driftX: [0, 10, -12, 0],
      driftY: [0, 12, -10, 0]
    },
    { 
      text: '\u2193', 
      type: 'circle-arrow', 
      x: '75%', 
      y: '30%', 
      rotate: 0,
      driftX: [0, -10, 10, 0],
      driftY: [0, -15, 15, 0]
    },
    { 
      text: 'AKIO', 
      type: 'oval-small', 
      x: '80%', 
      y: '65%', 
      rotate: 4,
      driftX: [0, 12, -15, 0],
      driftY: [0, 10, -12, 0]
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden select-none bg-transparent"
    >
      {pills.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';
        
        return (
          <motion.div
            key={idx}
            drag
            dragConstraints={containerRef}
            dragElastic={0.4}
            dragTransition={{ power: 0.2, bounceStiffness: 100, bounceDamping: 10 }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
            initial={{ 
              left: pill.x, 
              top: pill.y, 
              rotate: pill.rotate,
              scale: 0.9,
              opacity: 0
            }}
            animate={{ 
              x: pill.driftX,
              y: pill.driftY,
              scale: 1,
              opacity: 1,
              transition: {
                x: {
                  repeat: Infinity,
                  duration: 8 + idx * 2,
                  ease: "easeInOut"
                },
                y: {
                  repeat: Infinity,
                  duration: 7 + idx * 2,
                  ease: "easeInOut"
                },
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 }
              }
            }}
            whileHover={{ scale: 1.05 }}
            className={`absolute cursor-grab select-none font-mono text-xs md:text-sm tracking-widest border transition-colors duration-300 ${
              isCircle 
                ? 'w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl font-sans' 
                : 'px-6 py-2.5 md:px-8 md:py-3.5 rounded-full'
            } ${
              pill.type === 'circle'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.15)] font-bold'
                : pill.type === 'circle-arrow'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.15)] font-sans'
                : 'bg-transparent text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 backdrop-blur-sm'
            }`}
          >
            {pill.text}
          </motion.div>
        );
      })}
    </div>
  );
}
