import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import N1WidgetsCard from '../components/N1WidgetsCard';
import PhoneWidgetDashboard from '../components/PhoneWidgetDashboard';
import { ArrowLeft, Play, Pause, Music, Disc, RefreshCw, Volume2 } from 'lucide-react';

export default function WorkDetail() {
  const { projectId } = useParams();

  // Redirect back if project doesn't exist, default to n1-widgets
  const id = projectId || 'n1-widgets';

  // Custom data for the detail page
  const projects = {
    'n1-widgets': {
      title: 'N1 widgets',
      overview: 'This project is entirely independent. I deeply admire and respect the teams at Nothing. I learned from their work and recreated Figma elements to help others design. This is why I love to make these resources. Made by Kaysar - kawsar.design',
      year: '2024',
      role: 'UI Designer / Creative Director',
      services: 'UI Animation / Type Designer',
      about: "For this Widgets, I've used two great fonts: Roboto and NDOT 47 and 45 (Inspired by Nothing). Yoy may find a folder for these font and others. To download and install this font for use within Figma, Once installed, restart Figma! Project by: kawsar.design",
    },
    'h23': {
      title: 'H23',
      overview: 'H23 is a comprehensive branding and identity project designed to showcase minimalist and futuristic aesthetic values. Featuring clean shapes, bright neon-orange accents, and robust typography layout, this project redefined client presence in technology markets.',
      year: '2024',
      role: 'Brand Designer / Motion Designer',
      services: 'Corporate Identity / Product Mockups',
      about: "The H23 branding framework emphasizes the tension between high-contrast orange backdrops and structured layouts. By leveraging grid systems and raw typography elements, the identity communicates authority, technology, and elegance in every application.",
    },
    'glod-water': {
      title: 'Glod Water',
      overview: 'Glod Water is a premier sparkling beverage packaging design project. Inspired by modernist aluminum shapes and minimalist technical notations, the package design blends aesthetic purity with detailed nutritional transparency.',
      year: '2024',
      role: 'Package Designer / 3D Modeler',
      services: '3D Product Rendering / Typography Layout',
      about: "For Glod Water, the core design language features organic black wave shapes contrasted against vivid orange canisters. Every visual element has been carefully structured to resemble blueprint details, incorporating custom smiley, asterisk, and technical symbols.",
    }
  };

  const project = projects[id] || projects['n1-widgets'];

  useEffect(() => {
    document.title = `${project.title} — Akio Hiroshi`;
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [project.title]);

  // Detail content rendering based on active project
  const renderN1WidgetsDetail = () => {
    return (
      <div className="flex flex-col gap-16 md:gap-24">
        {/* First Grid: Interactive Card & Speaker Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left card: N1 Widgets */}
          <div className="w-full flex items-center justify-center">
            <N1WidgetsCard />
          </div>

          {/* Right card: Speaker blueprint + phone mockup */}
          <div className="w-full rounded-3xl bg-[#121212] border border-neutral-900 p-6 md:p-8 flex items-center justify-center overflow-hidden min-h-[360px] relative">
            
            {/* Speaker hardware visual representation in CSS */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-between p-6">
              {/* Coils and speaker lines */}
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border border-neutral-800 rounded-full"></div>
                </div>
                <div className="text-right text-[8px] font-mono text-neutral-500">
                  <p>100-240V ~ 3.15A</p>
                  <p>POWER</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex gap-2">
                  <div className="w-6 h-12 border border-neutral-800 rounded-sm"></div>
                  <div className="w-6 h-12 border border-neutral-800 rounded-sm"></div>
                </div>
                {/* Speaker coil spiral */}
                <div className="w-20 h-20 border border-dashed border-neutral-800 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '60s' }}>
                  <Volume2 size={24} className="text-neutral-700" />
                </div>
              </div>
            </div>

            {/* The white widgets phone overlay */}
            <motion.div 
              initial={{ rotate: -2, y: 10 }}
              animate={{ rotate: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-44 h-80 bg-white text-black rounded-[28px] border-[5px] border-neutral-300 p-3 flex flex-col gap-2.5 shadow-2xl z-10 hover:rotate-0 transition-transform duration-300 select-none"
            >
              {/* Large Clock Display */}
              <div className="text-center mt-2">
                <span className="font-pixel text-3xl font-black tracking-tight text-neutral-900">16H 32M</span>
              </div>

              {/* Stacked Widget Cards */}
              <div className="flex flex-col gap-2 mt-2">
                {/* 1. Steps Widget */}
                <div className="bg-[#121212] text-white rounded-xl p-2.5 flex flex-col justify-between border border-neutral-800">
                  <div className="flex justify-between items-center">
                    <span className="text-[6px] font-mono text-neutral-400">STEPS</span>
                    <span className="font-pixel text-sm text-neutral-200">5,543</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[6px] font-mono text-neutral-400">STREAK</span>
                    <span className="font-pixel text-xs text-red-500">3 DAYS</span>
                  </div>
                </div>

                {/* 2. Clock/Details Mini Widget */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Temp */}
                  <div className="bg-[#121212] text-white rounded-xl p-2 flex flex-col justify-center items-center border border-neutral-800">
                    <span className="text-[5px] font-mono text-neutral-400 leading-none">TORONTO</span>
                    <span className="font-pixel text-sm mt-0.5">34°</span>
                  </div>
                  {/* Battery */}
                  <div className="bg-[#121212] text-white rounded-xl p-2 flex flex-col justify-center items-center border border-neutral-800">
                    <span className="text-[5px] font-mono text-neutral-400 leading-none">BATTERY</span>
                    <span className="font-pixel text-sm mt-0.5">85%</span>
                  </div>
                </div>

                {/* 3. Wi-Fi status widget */}
                <div className="bg-[#121212] text-white rounded-xl p-2 flex items-center justify-between border border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[6px] font-mono tracking-wider text-neutral-300">CONNECTED</span>
                  </div>
                  <span className="text-[6px] font-mono text-neutral-400">N1_NET</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Info Columns: YEAR, ROLE, SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-neutral-900 dark:border-neutral-900 light:border-neutral-200 py-10">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Year</span>
            <span className="font-sans text-sm font-semibold text-neutral-300 light:text-neutral-700">{project.year}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Role</span>
            <span className="font-sans text-sm font-semibold text-neutral-300 light:text-neutral-700">{project.role}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Services</span>
            <span className="font-sans text-sm font-semibold text-neutral-300 light:text-neutral-700">{project.services}</span>
          </div>
        </div>

        {/* Section: About the Project */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          <div className="md:col-span-4">
            <h3 className="font-sans text-lg font-bold text-neutral-100 light:text-neutral-900">
              About the project
            </h3>
          </div>
          <div className="md:col-span-8">
            <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-400 light:text-neutral-600">
              {project.about}
            </p>
          </div>
        </section>

        {/* Second Grid: Phone Widget Dashboard & Widgets row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Turntable Phone Dashboard */}
          <PhoneWidgetDashboard />

          {/* Right: Stacked widgets in light gray card */}
          <div className="w-full rounded-3xl bg-[#e5e4e7] light:bg-[#f3f3f3] dark:bg-[#1c1c1e] p-6 md:p-8 flex items-center justify-center transition-colors duration-300 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              
              {/* White Steps Widget */}
              <div className="rounded-2xl bg-white border border-neutral-300 p-4 flex flex-col justify-between h-32 text-black shadow-md">
                <div>
                  <span className="text-[8px] font-bold text-neutral-400 tracking-wider block font-mono">TOTAL STEPS</span>
                  <span className="font-pixel text-xl font-bold mt-2 block">5,543</span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-neutral-400 tracking-wider block font-mono">STREAK</span>
                  <span className="font-pixel text-sm text-neutral-700 font-bold block">3 DAYS</span>
                </div>
              </div>

              {/* Black Time Widget */}
              <div className="rounded-2xl bg-[#121212] border border-neutral-800 p-4 flex flex-col justify-between h-32 text-white shadow-md">
                <div className="flex gap-[2px] w-full">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-[3px] h-1.5 rounded-2xs ${
                        i < 8 ? 'bg-red-500' : 'bg-neutral-800'
                      }`}
                    ></div>
                  ))}
                </div>
                <div>
                  <span className="font-pixel text-xl font-bold block">6H 20</span>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase block mt-1 tracking-widest">TOTAL TIME</span>
                </div>
              </div>

              {/* Black Spotify Track Widget */}
              <div className="rounded-2xl bg-[#121212] border border-neutral-800 p-4 flex flex-col justify-between h-32 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-2 right-2 text-neutral-600">
                  <Music size={12} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold font-mono text-neutral-500 tracking-wider uppercase">NOW PLAYING</span>
                  <span className="font-sans text-xs font-bold text-neutral-200 truncate mt-1">Jim Hall</span>
                  <span className="font-sans text-[10px] text-neutral-400 truncate mt-0.5">Concierto</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-900">
                  <span className="text-[8px] font-mono text-[#1db954] tracking-widest font-bold">SPOTIFY</span>
                  <Disc size={16} className="text-neutral-500 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDefaultDetail = () => {
    return (
      <div className="flex flex-col gap-12 items-center text-center max-w-xl mx-auto py-16">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
          <RefreshCw className="text-neutral-500 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <h2 className="font-sans text-2xl font-bold">{project.title}</h2>
        <p className="font-sans text-sm text-neutral-400 leading-relaxed light:text-neutral-600">
          {project.overview}
        </p>

        <div className="w-full border-t border-neutral-900 py-6 mt-6 grid grid-cols-3 text-left">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500 font-mono">YEAR</span>
            <span className="text-sm font-semibold mt-1">{project.year}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500 font-mono">ROLE</span>
            <span className="text-sm font-semibold mt-1 truncate">{project.role}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500 font-mono">SERVICES</span>
            <span className="text-sm font-semibold mt-1 truncate">{project.services}</span>
          </div>
        </div>

        <p className="font-sans text-xs text-neutral-500 text-left leading-relaxed mt-4 border-t border-neutral-900 pt-6">
          {project.about}
        </p>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-6 md:px-12 py-10 md:py-16 flex flex-col gap-12"
    >
      {/* Back Button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-500 hover:light:text-black hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Detail Page Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-neutral-900 dark:border-neutral-900 light:border-neutral-200 pb-12">
        <div className="md:col-span-4">
          <h1 className="font-sans text-3xl md:text-5xl font-black text-neutral-100 light:text-neutral-900 tracking-tight leading-none uppercase">
            {project.title}
          </h1>
        </div>
        <div className="md:col-span-8 flex flex-col">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2 font-bold block">Overview</span>
          <p className="font-sans text-sm md:text-base leading-relaxed text-neutral-400 light:text-neutral-600">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Render details based on project id */}
      {id === 'n1-widgets' ? renderN1WidgetsDetail() : renderDefaultDetail()}

    </motion.div>
  );
}
