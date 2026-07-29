import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadPortfolioData } from '../utils/contentLoader';
import ImagePlaceholder from '../components/ImagePlaceholder';

// Variants for Fade + Scale + Stagger + Play Once Entrance
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12 // 120ms card stagger
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] // Primary easing
    }
  }
};

export default function Archive() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load decentralized markdown data
    setData(loadPortfolioData());
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center font-mono text-sm text-neutral-500">
        Loading archive specs...
      </div>
    );
  }

  const { archive } = data;

  // Split items to construct the exact staggered layout:
  // Left Column on Desktop: Puke Logo, Personal Photography
  // Right Column on Desktop: Glod Water Cans, Radial Vent, Oscar Olsson
  const leftColItems = archive.filter(item => 
    item.title.includes('Puke') || item.title.includes('Personal')
  );
  
  const rightColItems = archive.filter(item => 
    item.title.includes('Glod') || item.title.includes('Radial') || item.title.includes('OSCAR')
  );

  return (
    <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36 py-10 text-left transition-colors duration-300">
      
      {/* Responsive layout: Stacks on mobile, split columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 2xl:gap-20">
        
        {/* Left Column on Desktop - Staggered Container */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }} // Play Once, Trigger at ~85% viewport
          className="flex flex-col gap-10 xl:gap-16 2xl:gap-20"
        >
          
          {/* Header block (pinned to top of Left Column) */}
          <motion.div variants={cardVariants} className="pb-10 border-b border-neutral-200/50 dark:border-neutral-900 pt-6">
            <h1 className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase mb-4 leading-none">
              Archived works
            </h1>
            <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-md xl:max-w-xl mt-6">
              Series of past experiments and client work i've done along the years
            </p>
          </motion.div>

          {/* Left Column Archive Cards */}
          {leftColItems.map((item, idx) => (
            <motion.div key={idx} variants={cardVariants} className="group block">
              <div className="rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-[4/3]">
                <ImagePlaceholder 
                  description={item.placeholder} 
                  className="w-full h-full !min-h-0 !rounded-[32px] transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline transition-transform duration-300 ease-out group-hover:translate-x-[6px] inline-block">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 transition-opacity duration-300 opacity-80 group-hover:opacity-100">{item.category}</p>
                </div>
                <span className="text-xs font-mono text-neutral-500">{item.year}</span>
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Right Column on Desktop - Staggered Container */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }} // Play Once, Trigger at ~85% viewport
          className="flex flex-col gap-10 xl:gap-16 2xl:gap-20"
        >
          
          {/* Right Column Archive Cards */}
          {rightColItems.map((item, idx) => (
            <motion.div key={idx} variants={cardVariants} className="group block">
              <div className="rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-[4/3]">
                <ImagePlaceholder 
                  description={item.placeholder} 
                  className="w-full h-full !min-h-0 !rounded-[32px] transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline transition-transform duration-300 ease-out group-hover:translate-x-[6px] inline-block">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 transition-opacity duration-300 opacity-80 group-hover:opacity-100">{item.category}</p>
                </div>
                <span className="text-xs font-mono text-neutral-500">{item.year}</span>
              </div>
            </motion.div>
          ))}

        </motion.div>

      </div>

    </div>
  );
}
