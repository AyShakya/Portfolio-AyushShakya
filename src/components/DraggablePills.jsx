import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function DraggablePills() {
  const containerRef = useRef(null);

  // Define pills with initial custom offsets and angles
  const pills = [
    {
      id: 'brand-designer',
      text: 'BRAND DESIGNER',
      type: 'text',
      x: '35%',
      y: '15%',
      rotate: -3,
    },
    {
      id: 'kix',
      text: 'KIX ●',
      type: 'text',
      x: '45%',
      y: '30%',
      rotate: 4,
    },
    {
      id: 'asterisk',
      text: '*',
      type: 'icon',
      x: '48%',
      y: '45%',
      rotate: 0,
      customClass: 'bg-white text-black font-sans text-2xl font-bold flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-neutral-200',
    },
    {
      id: 'creative-director',
      text: 'CREATIVE DIRECTOR',
      type: 'text',
      x: '25%',
      y: '55%',
      rotate: -5,
    },
    {
      id: 'down-arrow',
      text: '↓',
      type: 'icon',
      x: '60%',
      y: '55%',
      rotate: 0,
      customClass: 'bg-white text-black font-sans text-xl font-bold flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-neutral-200 cursor-pointer',
      action: () => {
        window.scrollTo({
          top: window.innerHeight * 0.8,
          behavior: 'smooth'
        });
      }
    },
    {
      id: 'akio-badge',
      text: 'AKIO',
      type: 'text',
      x: '75%',
      y: '55%',
      rotate: 8,
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[400px] overflow-visible select-none cursor-grab active:cursor-grabbing"
    >
      {pills.map((pill) => {
        const isIcon = pill.type === 'icon';

        return (
          <motion.div
            key={pill.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.4}
            dragTransition={{ power: 0.2, bounceStiffness: 150, bounceDamping: 15 }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            initial={{ 
              x: 0, 
              y: 0, 
              left: pill.x, 
              top: pill.y,
              rotate: pill.rotate,
            }}
            onClick={pill.action}
            className={`absolute z-10 select-none ${
              isIcon 
                ? pill.customClass 
                : 'px-6 py-2.5 rounded-full border border-neutral-700 light:border-neutral-300 bg-neutral-900/40 light:bg-neutral-100/40 backdrop-blur-sm shadow-md transition-shadow hover:shadow-lg'
            }`}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            {!isIcon ? (
              <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-200 light:text-neutral-800 font-semibold select-none">
                {pill.text}
              </span>
            ) : (
              <span className="select-none flex items-center justify-center h-full w-full">
                {pill.text}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
