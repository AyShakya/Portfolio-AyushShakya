import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';

export default function Works() {
  const { projectId } = useParams();

  // If projectId is specified, render the detail page
  if (projectId === 'n1-widgets') {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left transition-colors duration-300">
        {/* Back Link */}
        <Link 
          to="/" 
          className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 inline-block transition-colors"
        >
          &larr; Back to Home
        </Link>

        {/* Header Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 pb-10 border-b border-neutral-850 dark:border-neutral-900">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
            N1 widgets
          </h1>
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Overview</h4>
            <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans max-w-xl">
              This project is entirely independent. I deeply admire and respect the teams at Nothing. I learned from their work and recreated Figma elements to help others design. This is why I love to make these resources. Made by Kaysar — <a href="https://kawsar.design" target="_blank" rel="noreferrer" className="underline hover:opacity-80">kawsar.design</a>
            </p>
          </div>
        </section>

        {/* Row 1: Widget Display & Speaker Mockup */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {/* Left: Widgets container */}
          <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-8 border border-neutral-200/50 dark:border-neutral-900 flex flex-wrap md:flex-nowrap items-center justify-center gap-6 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <CompassWidget />
              <ClockWidget />
            </div>
            <div className="flex items-center justify-center">
              <WeatherWidget />
            </div>
          </div>

          {/* Right: Speaker device with white phone */}
          <div className="bg-[#121212] rounded-[32px] overflow-hidden relative group border border-neutral-900/60 shadow-lg min-h-[300px]">
            <img 
              src="/images/speaker_phone.jpg" 
              alt="Speaker Phone Mockup" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-103"
            />
          </div>
        </section>

        {/* Row 2: Metadata Columns & About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-16 border-t border-neutral-800/40 dark:border-neutral-900 pt-12">
          {/* Left Columns - Metadata */}
          <div className="lg:col-span-1 grid grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Year</span>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">2024</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Role</span>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">UI Designer</p>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">Creative Director</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Services</span>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">UI Animation</p>
              <p className="text-sm font-bold text-neutral-850 dark:text-neutral-200">Type Designer</p>
            </div>
          </div>

          {/* Right Column - About Project text */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100">
              About the project
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans">
              For this Widgets, I've used two great fonts: Roboto and NDOT 47 and 45 (Inspired by Nothing). Yoy may find a folder for these font and others. To download and install this font for use within Figma, Once installed, restart Figma! Project by: <a href="https://kawsar.design" target="_blank" rel="noreferrer" className="underline hover:opacity-80">kawsar.design</a>
            </p>
          </div>
        </section>

        {/* Row 3: Turntable image & Additional widget card details */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {/* Left: Turntable Phone Mockup */}
          <div className="bg-[#121212] rounded-[32px] overflow-hidden relative group border border-neutral-900/60 shadow-lg min-h-[300px]">
            <img 
              src="/images/turntable_phone.jpg" 
              alt="Turntable Phone Mockup" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-103"
            />
          </div>

          {/* Right: Detailed cards container */}
          <div className="bg-neutral-100 dark:bg-neutral-900/30 rounded-[32px] p-8 border border-neutral-200/50 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-sm">
            {/* Steps & Streak */}
            <div className="w-full sm:w-1/3 bg-white dark:bg-white text-neutral-900 p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-200 shadow-sm">
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
            <div className="w-full sm:w-1/3 bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-800 shadow-md">
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
            <div className="w-full sm:w-1/3 bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between aspect-square border border-neutral-800 shadow-md relative overflow-hidden group/sp shadow-[0_0_15px_rgba(30,215,96,0.05)]">
              {/* Spotify Floating Icon */}
              <div className="absolute top-4 right-4 text-green-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.978-.336.077-.67-.138-.747-.474-.077-.336.138-.67.474-.747 3.856-.88 7.15-.506 9.818 1.13.295.18.387.563.208.862zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.574 11.35 1.335.367.226.487.707.26 1.074.002.001.002.001.002.001.001 0 .001.001.002.001.001.001.001.001.001.002zm.107-2.83C14.484 8.76 8.784 8.57 5.484 9.57c-.52.158-1.07-.14-1.228-.66-.158-.52.14-1.07.66-1.228 3.79-1.15 10.09-.93 14.09 1.45.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34v.001z"/>
                </svg>
              </div>

              {/* Music Vinyl Icon */}
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 animate-spin" style={{ animationDuration: '4s' }}>
                <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-600"></div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 mt-auto">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Now Playing</span>
                <p className="text-sm font-bold text-neutral-100 truncate group-hover/sp:text-green-500 transition-colors">Jim Hall — Concierto</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }

  // List of Selected Works (fallback / /works router)
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase mb-4">
        Selected Works
      </h1>
      <p className="text-neutral-500 max-w-xl font-sans mb-12">
        A list of branding projects, industrial UI design widgets, and premium packaging design concepts developed over the years.
      </p>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* N1 Widgets */}
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

        {/* H23 */}
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

        {/* Glod Water */}
        <div className="group block cursor-pointer md:col-span-2">
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
    </div>
  );
}
