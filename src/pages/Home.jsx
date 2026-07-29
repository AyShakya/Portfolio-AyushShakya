import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadPortfolioData } from '../utils/contentLoader';
import FloatingPills from '../components/FloatingPills';
import DotMatrixFace from '../components/DotMatrixFace';
import DotMatrixCloud from '../components/DotMatrixCloud';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PhoneWidgetDashboard from '../components/PhoneWidgetDashboard';

// Variants for Scroll Entrance Animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12 // 120ms Card Stagger
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 700ms Entrance
      ease: [0.16, 1, 0.3, 1] // Primary Easing
    }
  }
};

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load decentralized markdown data
    const portfolioData = loadPortfolioData();
    setData(portfolioData);
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center font-mono text-sm text-neutral-500">
        Loading portfolio specs...
      </div>
    );
  }

  const { bio, experiences, works } = data;
  const allWorks = [works.find(w => w.id === 'n1-widgets'), ...works.filter(w => w.id !== 'n1-widgets')].filter(Boolean);

  return (
    <div className="w-full py-0 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-between min-h-[45vh] pt-6 pb-8 border-b border-neutral-200/50 dark:border-neutral-900 w-full">
        {/* Floating Draggable Badges */}
        <div className="w-full relative z-10">
          <FloatingPills />
        </div>

        {/* Big Hero Title with Masked Reveal */}
        <div className="overflow-hidden w-full text-center mt-6 px-[4vw] md:px-[6vw]">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[13vw] sm:text-[8.5vw] md:text-[9vw] font-black tracking-tighter leading-[0.9] select-none text-neutral-900 dark:text-neutral-100 font-sans w-full uppercase flex flex-wrap sm:flex-nowrap justify-center gap-x-[3vw] gap-y-[1vw]"
          >
            <span>AYUSH</span>
            <span>SHAKYA</span>
          </motion.h1>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT GRID */}
      <motion.section 
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch"
      >
        
        {/* Left Card: Light Gray Container with Interactive Panels */}
        <div className="bg-neutral-100 dark:bg-neutral-900/30 p-8 md:p-12 xl:p-[5vw] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 transition-colors w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center w-full">
            
            {/* Column 1: Dot Face */}
            <div className="w-full flex justify-center">
              <DotMatrixFace />
            </div>

            {/* Column 2: Status Pills */}
            <div className="flex flex-col gap-3 w-full max-w-[130px] justify-center">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-neutral-100 dark:bg-neutral-900/90 dark:text-neutral-100 rounded-full border border-neutral-800 text-xs font-mono font-medium shadow-sm w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-100 animate-pulse"></span>
                Sunny
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950 text-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 rounded-full border border-neutral-900 text-xs font-mono font-medium shadow-sm hover:text-white cursor-pointer hover:bg-neutral-900 transition-all w-full">
                <span className="text-[10px]">&#9632;</span>
                TV remote
              </div>
            </div>

            {/* Column 3: Portrait Slat Placeholder */}
            <div className="w-full flex justify-center group/slat">
              <ImagePlaceholder 
                description="Clean monochromatic slit profile photo card with Spotify logo overlay" 
                className="w-32 h-32 md:w-36 md:h-36 rounded-3xl !p-2 !min-h-0 transition-transform duration-300 group-hover/slat:scale-[1.04]"
              />
            </div>

            {/* Column 4: Dot Cloud */}
            <div className="w-full flex justify-center">
              <DotMatrixCloud />
            </div>

          </div>
        </div>

        {/* Right Card: Turntable Mockup & Phone Dashboard */}
        <div className="group flex items-stretch bg-neutral-100 dark:bg-neutral-900/30 w-full overflow-hidden">
          <PhoneWidgetDashboard />
        </div>

      </motion.section>

      {/* BIO SECTION - Fades in at 1100ms */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-0 my-0 text-left border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch"
      >
        <div className="p-8 md:p-[5vw] border-b md:border-b-0 md:border-r border-neutral-200/50 dark:border-neutral-900 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
            {bio.tagline}
          </h2>
        </div>
        <div className="p-8 md:p-[5vw] flex items-center">
          <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-xl xl:max-w-2xl">
            {bio.description}
          </p>
        </div>
      </motion.section>

      {/* SELECTED WORKS SECTION */}
      <section className="my-0 text-left w-full border-b border-neutral-200/50 dark:border-neutral-900">
        <motion.div 
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="flex items-baseline justify-between p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900"
        >
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Selected Works
          </h2>
          <span className="text-xs font-mono text-neutral-500">2021 - 2024</span>
        </motion.div>

        {/* Works Grid with Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full"
        >
          {allWorks.map((work, idx) => {
            const isLeft = idx % 2 === 0;
            const isN1 = work.id === 'n1-widgets';

            return (
              <motion.div 
                key={work.id} 
                variants={cardVariants} 
                className={`group p-8 md:p-[5vw] flex flex-col justify-between border-b border-neutral-200/50 dark:border-neutral-900 ${
                  isLeft ? 'lg:border-r' : ''
                }`}
              >
                <Link to={isN1 ? "/works/n1-widgets" : `/works/${work.id}`} className="block">
                  {isN1 ? (
                    <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-900 flex flex-col md:flex-row items-center justify-center gap-6 shadow-sm overflow-hidden transition-all duration-300 hover:border-neutral-350 dark:hover:border-neutral-800 aspect-video">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full transition-transform duration-300 group-hover:scale-[1.04]">
                        <CompassWidget />
                        <ClockWidget />
                      </div>
                      <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.04]">
                        <WeatherWidget />
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-video">
                      <ImagePlaceholder 
                        description={work.placeholder} 
                        className="w-full h-full !min-h-0 !rounded-[32px] transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start mt-6">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline transition-transform duration-300 ease-out group-hover:translate-x-[6px] inline-block">
                        {work.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                        {isN1 ? "Branding UI/UX" : work.category}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">{work.year}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* EXPERIENCES & PLAYGROUND SECTION */}
      <motion.section 
        variants={scrollRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-0 w-full items-stretch border-b border-neutral-200/50 dark:border-neutral-900"
      >
        
        {/* Left Column: Playground Link */}
        <div className="p-8 md:p-[5vw] border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex flex-col justify-between gap-8">
          <Link 
            to="/archive" 
            className="text-lg md:text-xl font-medium underline text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity inline-block"
          >
            <motion.span
              className="block"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              See playground
            </motion.span>
          </Link>
          <div className="hidden lg:block"></div>
        </div>

        {/* Right Columns: Description & Experiences Timeline */}
        <div className="lg:col-span-2 p-8 md:p-[5vw] flex flex-col gap-12">
          {/* Repeated bio description */}
          <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-2xl xl:max-w-3xl">
            {bio.description}
          </p>

          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Experiences
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-neutral-400">{exp.year}</span>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{exp.role}</h4>
                    <span className="text-xs text-neutral-500">{exp.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.section>

    </div>
  );
}
