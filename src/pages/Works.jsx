import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadPortfolioData } from '../utils/contentLoader';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PhoneWidgetDashboard from '../components/PhoneWidgetDashboard';

// Framer Motion Variants for Staggered Details Reveal
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12 // 120ms Children Stagger
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] // Primary easing
    }
  }
};

// Variants for Main List Grid Entrance
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
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

const titleRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Works() {
  const { projectId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load decentralized markdown data
    setData(loadPortfolioData());
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center font-mono text-sm text-neutral-500">
        Loading project specs...
      </div>
    );
  }

  const { works } = data;

  // 1. If we are on a project detail page
  if (projectId) {
    const work = works.find(w => w.id === projectId);
    if (!work) {
      return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4 text-left px-6">
          <p className="font-mono text-sm text-neutral-500">Project "{projectId}" not found.</p>
          <Link to="/works" className="text-xs uppercase underline tracking-widest text-neutral-400 hover:text-white">
            View All Works
          </Link>
        </div>
      );
    }

    const currentIdx = works.findIndex(w => w.id === projectId);
    const nextWork = works[(currentIdx + 1) % works.length];

    // Special detailed view for N1 widgets
    if (projectId === 'n1-widgets') {
      return (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full py-0 text-left transition-colors duration-300 border-b border-neutral-200/50 dark:border-neutral-900"
        >
          {/* Back to Home Link */}
          <motion.div variants={childVariants} className="p-8 md:p-[5vw] pb-0">
            <Link 
              to="/" 
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 inline-block transition-colors"
            >
              <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
                &larr; Back to Home
              </motion.span>
            </Link>
          </motion.div>

          {/* Header Grid */}
          <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 my-0 p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
            <h1 className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 uppercase leading-none">
              {work.title}
            </h1>
            <div className="flex flex-col gap-2 justify-center mt-6 lg:mt-0">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-400">Overview</h4>
              <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-xl xl:max-w-2xl">
                {work.overview}
              </p>
            </div>
          </motion.section>

          {/* Row 1: Widget Display & Phone Dashboard */}
          <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
            {/* Left: Widgets container */}
            <div className="bg-neutral-100 dark:bg-neutral-900/30 p-8 md:p-[5vw] border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex flex-wrap md:flex-nowrap items-center justify-center gap-6 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <CompassWidget />
                <ClockWidget />
              </div>
              <div className="flex items-center justify-center">
                <WeatherWidget />
              </div>
            </div>

            {/* Right: Phone Dashboard */}
            <div className="group flex items-stretch bg-neutral-100 dark:bg-neutral-900/30 w-full overflow-hidden">
              <PhoneWidgetDashboard />
            </div>
          </motion.section>

          {/* Row 2: Metadata Columns & About Section */}
          <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
            {/* Left Columns - Metadata */}
            <div className="p-8 md:p-[5vw] border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 grid grid-cols-3 lg:grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Year</span>
                <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{work.year}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Role</span>
                {work.role.map((r, i) => (
                  <p key={i} className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{r}</p>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Services</span>
                {work.services.map((s, i) => (
                  <p key={i} className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{s}</p>
                ))}
              </div>
            </div>

            {/* Right Column - About Project text */}
            <div className="lg:col-span-2 p-8 md:p-[5vw] flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                About the project
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans">
                {work.about}
              </p>
            </div>
          </motion.section>

          {/* Row 3: Phone Dashboard & Additional widget card details */}
          <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
            {/* Left: Phone Dashboard */}
            <div className="group flex items-stretch bg-neutral-100 dark:bg-neutral-900/30 w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900">
              <PhoneWidgetDashboard />
            </div>

            {/* Right: Detailed cards container */}
            <div className="bg-neutral-100 dark:bg-neutral-900/30 p-8 md:p-[5vw] flex flex-col gap-6 justify-center">
              
              {/* Row 3A: Steps, Time, Spotify cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {/* Steps & Streak */}
                <div className="bg-[#E3E3E1] dark:bg-[#E3E3E1] text-[#111111] p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-200 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Total Steps</span>
                    <p className="text-3xl font-pixel font-bold leading-none">5,543</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Streak</span>
                    <p className="text-2xl font-pixel font-bold leading-none">3 DAYS</p>
                  </div>
                </div>

                {/* Total Time & Progress Bars */}
                <div className="bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-800 shadow-md">
                  <div className="flex flex-wrap gap-[3px] opacity-40">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className={`w-[6px] h-[6px] rounded-full ${i < 15 ? 'bg-red-500 opacity-80' : 'bg-neutral-600'}`}></div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1 mt-auto">
                    <p className="text-3xl font-pixel font-bold leading-none">6H 20</p>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Total Time</span>
                  </div>
                </div>

                {/* Spotify Player widget */}
                <div className="bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-800 shadow-md relative overflow-hidden group/sp">
                  <div className="absolute top-4 right-4 text-green-500">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.978-.336.077-.67-.138-.747-.474-.077-.336.138-.67.474-.747 3.856-.88 7.15-.506 9.818 1.13.295.18.387.563.208.862zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.574 11.35 1.335.367.226.487.707.26 1.074.002.001.002.001.002.001.001 0 .001.001.002.001.001.001.001.001.001.002zm.107-2.83C14.484 8.76 8.784 8.57 5.484 9.57c-.52.158-1.07-.14-1.228-.66-.158-.52.14-1.07.66-1.228 3.79-1.15 10.09-.93 14.09 1.45.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34v.001z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 animate-spin" style={{ animationDuration: '6s' }}>
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-600"></div>
                  </div>
                  <div className="flex flex-col gap-1 mt-auto">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Now Playing</span>
                    <p className="text-xs font-bold text-neutral-100 truncate">Jim Hall — Concierto</p>
                  </div>
                </div>
              </div>

              {/* Row 3B: Buttons Grid + Dot Activity Graph */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch w-full">
                
                {/* 2x2 Circle Buttons panel */}
                <div className="md:col-span-1 grid grid-cols-2 gap-3 justify-items-center items-center py-2">
                  <button className="w-12 h-12 md:w-14 md:h-14 bg-[#E3E3E1] dark:bg-[#E3E3E1] border border-[#CFCFCF] rounded-full flex items-center justify-center text-[#111111] cursor-pointer shadow-sm hover:scale-[1.03] active:scale-95 transition-all">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect width="20" height="15" x="2" y="3" rx="2"/>
                      <path d="M12 18H5M12 18H19M12 18v3"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 md:w-14 md:h-14 bg-neutral-900 dark:bg-neutral-950 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-200 cursor-pointer shadow-md hover:scale-[1.03] active:scale-95 transition-all">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect width="18" height="18" x="3" y="3" rx="2"/>
                      <path d="M7 8h10M7 12h10M7 16h6"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 md:w-14 md:h-14 bg-[#E3E3E1] dark:bg-[#E3E3E1] border border-[#CFCFCF] rounded-full flex items-center justify-center text-[#111111] cursor-pointer shadow-sm hover:scale-[1.03] active:scale-95 transition-all">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 md:w-14 md:h-14 bg-red-600 border border-transparent rounded-full flex items-center justify-center text-[#E3E3E1] cursor-pointer shadow-sm hover:scale-[1.03] active:scale-95 transition-all">
                    <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="#E3E3E1" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>

                {/* Dot Matrix Activity Chart */}
                <div className="md:col-span-2 bg-[#E3E3E1] dark:bg-[#E3E3E1] border border-[#CFCFCF] rounded-2xl p-5 flex flex-col justify-between shadow-sm min-h-[140px] text-[#111111]">
                  {/* Dot Plot matrix */}
                  <div className="flex justify-between items-end h-20 px-2">
                    {/* Sun to Sat Column dot data */}
                    {['9H26', '9H14', '5H35', '5H16', '8H11', '6H34', '9H34'].map((val, colIdx) => {
                      const hours = parseInt(val.split('H')[0]);
                      const dotCount = Math.min(Math.round(hours / 1.5), 6);
                      return (
                        <div key={colIdx} className="flex flex-col gap-[3px] items-center">
                          {Array.from({ length: 6 }).map((_, dotIdx) => {
                            const isFilled = 5 - dotIdx < dotCount;
                            return (
                              <div 
                                key={dotIdx} 
                                className={`w-[5px] h-[5px] rounded-full ${
                                  isFilled ? 'bg-red-500 shadow-[0_0_2px_rgba(239,68,68,0.5)]' : 'bg-neutral-250 dark:bg-neutral-200'
                                }`}
                              ></div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Labels */}
                  <div className="grid grid-cols-7 text-[8px] font-mono text-center text-neutral-400 mt-2">
                    <div>SUN<br/>9H26</div>
                    <div>MON<br/>9H14</div>
                    <div>TUE<br/>5H35</div>
                    <div>WED<br/>5H16</div>
                    <div>THU<br/>8H11</div>
                    <div>FRI<br/>6H34</div>
                    <div>SAT<br/>9H34</div>
                  </div>
                </div>

              </div>

            </div>
          </motion.section>

          {/* Next Navigation */}
          <motion.div variants={childVariants} className="text-right p-8 md:p-[5vw]">
            <Link 
              to={`/works/${nextWork.id}`}
              className="text-lg md:text-xl font-bold tracking-widest text-neutral-800 dark:text-neutral-200 hover:opacity-85 inline-block uppercase"
            >
              <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
                NEXT &rarr;
              </motion.span>
            </Link>
          </motion.div>

        </motion.div>
      );
    }

    // Default detailed view for other works (H23, Glod Water)
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full py-0 text-left transition-colors duration-300 border-b border-neutral-200/50 dark:border-neutral-900"
      >
        {/* Back Link */}
        <motion.div variants={childVariants} className="p-8 md:p-[5vw] pb-0">
          <Link 
            to="/" 
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 inline-block transition-colors"
          >
            <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
              &larr; Back to Home
            </motion.span>
          </Link>
        </motion.div>

        {/* Header Grid */}
        <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 my-0 p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
          <h1 className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 uppercase leading-none">
            {work.title}
          </h1>
          <div className="flex flex-col gap-2 justify-center mt-6 lg:mt-0">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Overview</h4>
            <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-xl xl:max-w-2xl">
              {work.overview}
            </p>
          </div>
        </motion.section>

        {/* Mockups Grid Placeholders */}
        <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
          <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch p-8 md:p-[5vw]">
            <ImagePlaceholder 
              description={`${work.placeholder} (Primary Perspective)`}
              className="w-full h-full !min-h-[300px] !rounded-[32px] transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
          <div className="group flex items-stretch p-8 md:p-[5vw]">
            <ImagePlaceholder 
              description={`Detail closeup shot representing the ${work.title} project framework details.`}
              className="w-full h-full !min-h-[300px] !rounded-[32px] transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
        </motion.section>

        {/* Metadata Details */}
        <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
          {/* Metadata */}
          <div className="p-8 md:p-[5vw] border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 grid grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Year</span>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{work.year}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Role</span>
              {work.role.map((r, i) => (
                <p key={i} className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{r}</p>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Services</span>
              {work.services.map((s, i) => (
                <p key={i} className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{s}</p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2 p-8 md:p-[5vw] flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100">
              About the project
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans">
              {work.about}
            </p>
          </div>
        </motion.section>

        {/* Next Link */}
        <motion.div variants={childVariants} className="text-right p-8 md:p-[5vw]">
          <Link 
            to={`/works/${nextWork.id}`}
            className="text-lg md:text-xl font-bold tracking-widest text-neutral-800 dark:text-neutral-200 hover:opacity-85 inline-block uppercase"
          >
            <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
              NEXT &rarr;
            </motion.span>
          </Link>
        </motion.div>

      </motion.div>
    );
  }

  // 2. Default works list if no projectId parameter
  const allWorks = [works.find(w => w.id === 'n1-widgets'), ...works.filter(w => w.id !== 'n1-widgets')].filter(Boolean);

  return (
    <div className="w-full py-0 text-left transition-colors duration-300">
      <div className="p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
        <motion.h1 
          variants={titleRevealVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 uppercase mb-4"
        >
          Selected Works
        </motion.h1>
        <motion.p 
          variants={titleRevealVariants}
          initial="hidden"
          animate="visible"
          className="text-neutral-500 max-w-xl font-sans"
        >
          A list of branding projects, industrial UI design widgets, and premium packaging design concepts developed over the years.
        </motion.p>
      </div>

      {/* Grid List with Entrance animations on scroll */}
      <motion.div 
        variants={gridContainerVariants}
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
    </div>
  );
}
