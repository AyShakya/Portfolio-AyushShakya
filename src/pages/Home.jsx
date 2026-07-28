import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingPills from '../components/FloatingPills';
import DotMatrixFace from '../components/DotMatrixFace';
import DotMatrixCloud from '../components/DotMatrixCloud';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';

export default function Home() {
  const experiences = [
    { year: '2019', role: 'Design Intern', company: 'Luxe Brands' },
    { year: '2020', role: 'Junior Brand Designer', company: 'Creativio Agency' },
    { year: '2021', role: 'Brand Consultant', company: 'Freelance' },
    { year: '2023', role: 'Creative Director', company: 'Fisga' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-10 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-between min-h-[50vh] pt-6 pb-12">
        {/* Floating Interactive Canvas */}
        <div className="w-full relative z-10">
          <FloatingPills />
        </div>

        {/* Huge Hero Title */}
        <h1 className="text-[11vw] font-black tracking-tighter leading-none select-none text-neutral-900 dark:text-neutral-100 font-sans w-full text-center mt-6 uppercase">
          AKIO HIROSHI
        </h1>
      </section>

      {/* INTERACTIVE COMPONENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
        
        {/* Left Card: Light Gray Container with Interactive Panels */}
        <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-6 md:p-8 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-900 transition-colors">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 w-full">
            
            {/* Column 1: Dot Face */}
            <div className="flex-shrink-0">
              <DotMatrixFace />
            </div>

            {/* Column 2: Status Pills */}
            <div className="flex flex-col gap-3 flex-shrink-0 w-36">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-neutral-100 dark:bg-neutral-900/90 dark:text-neutral-100 rounded-full border border-neutral-800 text-xs font-mono font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-100 animate-pulse"></span>
                Sunny
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950 text-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 rounded-full border border-neutral-900 text-xs font-mono font-medium shadow-sm hover:text-white cursor-pointer hover:bg-neutral-900 transition-all">
                <span className="text-[10px]">&#9632;</span>
                TV remote
              </div>
            </div>

            {/* Column 3: Slat Portrait with Spotify overlay */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden border border-neutral-300 dark:border-neutral-800 shadow-sm flex-shrink-0">
              <img 
                src="/images/portrait_slats.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
              <div className="absolute top-3 right-3 bg-neutral-900/80 p-1.5 rounded-full border border-neutral-850">
                <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.978-.336.077-.67-.138-.747-.474-.077-.336.138-.67.474-.747 3.856-.88 7.15-.506 9.818 1.13.295.18.387.563.208.862zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.574 11.35 1.335.367.226.487.707.26 1.074.002.001.002.001.002.001.001 0 .001.001.002.001.001.001.001.001.001.002zm.107-2.83C14.484 8.76 8.784 8.57 5.484 9.57c-.52.158-1.07-.14-1.228-.66-.158-.52.14-1.07.66-1.228 3.79-1.15 10.09-.93 14.09 1.45.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34v.001z"/>
                </svg>
              </div>
            </div>

            {/* Column 4: Dot Cloud */}
            <div className="flex-shrink-0">
              <DotMatrixCloud />
            </div>

          </div>
        </div>

        {/* Right Card: Turntable Mockup & Phone Dashboard */}
        <div className="bg-[#121212] rounded-[32px] overflow-hidden relative group border border-neutral-900/60 shadow-lg min-h-[300px]">
          <img 
            src="/images/turntable_phone.jpg" 
            alt="Turntable Phone Mockup" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle glowing dashboard gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent pointer-events-none"></div>
        </div>

      </section>

      {/* BIO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 md:my-24 text-left border-t border-neutral-800/40 dark:border-neutral-900 pt-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Hi, I'm Akio, a japanse
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans max-w-xl">
          Product designer, specializing in crafting user-friendly products and brands with expertise in 3D Rendering, Motion Design, Product design, Prototyping and Front-end development.
        </p>
      </section>

      {/* SELECTED WORKS SECTION */}
      <section className="my-16 text-left">
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Selected Works
          </h2>
          <span className="text-xs font-mono text-neutral-500">2021 - 2024</span>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: N1 Widgets (Interactive widget elements preview) */}
          <Link to="/works/n1-widgets" className="group block">
            <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-8 aspect-video border border-neutral-200/50 dark:border-neutral-900 flex flex-wrap md:flex-nowrap items-center justify-center gap-6 shadow-sm overflow-hidden transition-all duration-300 hover:border-neutral-350 dark:hover:border-neutral-800">
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

          {/* Card 2: H23 Mockup */}
          <div className="group block cursor-pointer">
            <div className="bg-[#121212] rounded-[32px] aspect-video border border-neutral-900/60 overflow-hidden relative flex items-center justify-center shadow-md">
              <img 
                src="/images/h23_laptop.jpg" 
                alt="H23 Laptop Mockup" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="flex justify-between items-start mt-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  H23
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Branding</p>
              </div>
              <span className="text-xs font-mono text-neutral-500">2024</span>
            </div>
          </div>

          {/* Card 3: Glod Water Mockup */}
          <div className="group block cursor-pointer col-span-1 lg:col-span-2">
            <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-6 overflow-hidden border border-neutral-200/50 dark:border-neutral-900 flex items-center justify-center shadow-sm">
              <div className="w-full max-w-4xl aspect-[21/9] rounded-2xl overflow-hidden relative">
                <img 
                  src="/images/glod_water.jpg" 
                  alt="Glod Water Cans" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            </div>
            <div className="flex justify-between items-start mt-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Glod Water
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Packaging design</p>
              </div>
              <span className="text-xs font-mono text-neutral-500">2024</span>
            </div>
          </div>

        </div>
      </section>

      {/* EXPERIENCES & PLAYGROUND SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-20 border-t border-neutral-800/40 dark:border-neutral-900 pt-16 text-left">
        
        {/* Left Column: Playground Link */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <Link 
            to="/archive" 
            className="text-lg md:text-xl font-medium underline text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
          >
            See playground
          </Link>
          <div className="hidden lg:block"></div>
        </div>

        {/* Right Columns: Experiences Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
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

      </section>

    </div>
  );
}
