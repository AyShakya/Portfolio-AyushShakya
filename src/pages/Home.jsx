import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPortfolioData } from '../utils/contentLoader';
import FloatingPills from '../components/FloatingPills';
import DotMatrixFace from '../components/DotMatrixFace';
import DotMatrixCloud from '../components/DotMatrixCloud';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PhoneWidgetDashboard from '../components/PhoneWidgetDashboard';

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

  return (
    <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36 py-6 md:py-10 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-between min-h-[45vh] pt-6 pb-8">
        {/* Floating Draggable Badges */}
        <div className="w-full relative z-10">
          <FloatingPills />
        </div>

        {/* Big Hero Title */}
        <h1 className="text-[11vw] font-black tracking-tighter leading-none select-none text-neutral-900 dark:text-neutral-100 font-sans w-full text-center mt-6 uppercase">
          AKIO HIROSHI
        </h1>
      </section>

      {/* INTERACTIVE COMPONENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 my-10 xl:my-16 items-stretch">
        
        {/* Left Card: Light Gray Container with Interactive Panels */}
        <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-6 md:p-8 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-900 transition-colors">
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
            <div className="w-full flex justify-center group">
              <ImagePlaceholder 
                description="Clean monochromatic slit profile photo card with Spotify logo overlay" 
                className="w-32 h-32 md:w-36 md:h-36 rounded-3xl !p-2 !min-h-0"
              />
            </div>

            {/* Column 4: Dot Cloud */}
            <div className="w-full flex justify-center">
              <DotMatrixCloud />
            </div>

          </div>
        </div>

        {/* Right Card: Turntable Mockup & Phone Dashboard */}
        <div className="group rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-md flex items-stretch bg-neutral-100 dark:bg-neutral-900/30">
          <PhoneWidgetDashboard />
        </div>

      </section>

      {/* BIO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 my-16 md:my-24 xl:my-32 text-left border-t border-neutral-200/50 dark:border-neutral-900 pt-12 xl:pt-16">
        <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          {bio.tagline}
        </h2>
        <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-xl xl:max-w-2xl">
          {bio.description}
        </p>
      </section>

      {/* SELECTED WORKS SECTION */}
      <section className="my-16 xl:my-24 text-left">
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Selected Works
          </h2>
          <span className="text-xs font-mono text-neutral-550">2021 - 2024</span>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16">
          
          {/* Card 1: N1 Widgets (Interactive widgets) */}
          <Link to="/works/n1-widgets" className="group block">
            <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-900 flex flex-col md:flex-row items-center justify-center gap-6 shadow-sm overflow-hidden transition-all duration-300 hover:border-neutral-350 dark:hover:border-neutral-800 aspect-video">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <CompassWidget />
                <ClockWidget />
              </div>
              <div className="flex items-center justify-center">
                <WeatherWidget />
              </div>
            </div>
            <div className="flex justify-between items-start mt-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                  N1 widgets
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Branding UI/UX</p>
              </div>
              <span className="text-xs font-mono text-neutral-500">2024</span>
            </div>
          </Link>

          {/* Loop over remaining works dynamically */}
          {works.filter(w => w.id !== 'n1-widgets').map((work, idx) => (
            <Link key={work.id} to={`/works/${work.id}`} className="group block">
              <div className="rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-video">
                <ImagePlaceholder 
                  description={work.placeholder} 
                  className="w-full h-full !min-h-0 !rounded-[32px]"
                />
              </div>
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                    {work.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">{work.category}</p>
                </div>
                <span className="text-xs font-mono text-neutral-500">{work.year}</span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* EXPERIENCES & PLAYGROUND SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16 my-20 xl:my-32 border-t border-neutral-200/50 dark:border-neutral-900 pt-16 xl:pt-20 text-left">
        
        {/* Left Column: Playground Link */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-4">
          <Link 
            to="/archive" 
            className="text-lg md:text-xl font-medium underline text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
          >
            See playground
          </Link>
          <div className="hidden lg:block"></div>
        </div>

        {/* Right Columns: Description & Experiences Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Repeated bio description as seen in screenshots */}
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

      </section>

    </div>
  );
}
