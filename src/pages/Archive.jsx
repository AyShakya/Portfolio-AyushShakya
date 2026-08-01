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

  // Split items dynamically by index to distribute all archive items evenly
  const leftColItems = archive.filter((_, idx) => idx % 2 === 0);
  const rightColItems = archive.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-full py-0 text-left transition-colors duration-300">
      
      {/* Responsive layout: Stacks on mobile, split columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full items-stretch border-b border-neutral-200/50 dark:border-neutral-900">
        
        {/* Left Column on Desktop - Staggered Container */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="flex flex-col gap-0 border-r-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 w-full"
        >
          
          {/* Header block (pinned to top of Left Column) */}
          <motion.div variants={cardVariants} className="p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900 flex flex-col justify-center min-h-[35vh]">
            <h1 className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 uppercase mb-4 leading-none">
              Archived works
            </h1>
            <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-md xl:max-w-xl mt-6">
              Series of past experiments and client work i've done along the years
            </p>
          </motion.div>

          {/* Left Column Archive Cards */}
          {leftColItems.map((item, idx) => (
            <motion.div key={idx} variants={cardVariants} className="group block p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
              <div className="rounded-none overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-[4/3]">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <ImagePlaceholder 
                    description={item.placeholder} 
                    className="w-full h-full !min-h-0 !rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="flex justify-between items-start mt-6">
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
          viewport={{ once: true, margin: "-15% 0px" }}
          className="flex flex-col gap-0 w-full"
        >
          
          {/* Right Column Archive Cards */}
          {rightColItems.map((item, idx) => (
            <motion.div key={idx} variants={cardVariants} className="group block p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
              <div className="rounded-none overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-[4/3]">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <ImagePlaceholder 
                    description={item.placeholder} 
                    className="w-full h-full !min-h-0 !rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="flex justify-between items-start mt-6">
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
