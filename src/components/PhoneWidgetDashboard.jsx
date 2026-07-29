import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Compass, Plane, Shield, Music, Disc } from 'lucide-react';

export default function PhoneWidgetDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState(5543);
  const [flightTime, setFlightTime] = useState(19);
  const [compassAngle, setCompassAngle] = useState(0);
  const waveformIntervalRef = useRef(null);
  const [barHeights, setBarHeights] = useState([20, 40, 15, 60, 30]);

  // Handle Spotify waveform animation
  useEffect(() => {
    if (isPlaying) {
      waveformIntervalRef.current = setInterval(() => {
        setBarHeights(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 10)
        );
      }, 150);
    } else {
      if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
      setBarHeights([10, 10, 10, 10, 10]);
    }

    return () => {
      if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
    };
  }, [isPlaying]);

  // Slowly increment steps occasionally to feel alive
  useEffect(() => {
    const stepsInterval = setInterval(() => {
      setSteps(prev => prev + Math.floor(Math.random() * 3));
    }, 6000);

    // Count down flight minutes
    const flightInterval = setInterval(() => {
      setFlightTime(prev => (prev > 1 ? prev - 1 : 59));
    }, 60000);

    return () => {
      clearInterval(stepsInterval);
      clearInterval(flightInterval);
    };
  }, []);

  // Animate compass rotation slightly
  useEffect(() => {
    const compassInterval = setInterval(() => {
      setCompassAngle(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(compassInterval);
  }, []);

  const handlePhoneClick = () => {
    // Interactive feedback when phone background is clicked
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] bg-neutral-900/10 dark:bg-[#111112] light:bg-[#eaeaea] p-4 flex items-center justify-center overflow-hidden border border-neutral-800/10 light:border-neutral-200 shadow-inner group @container"
      onClick={handlePhoneClick}
    >
      {/* Vinyl record/turntable blueprint-styled background to represent the record player photo */}
      <div className="absolute inset-0 opacity-10 light:opacity-5 pointer-events-none transition-opacity duration-300">
        {/* Vinyl grooves */}
        <div className="absolute top-1/2 left-[15%] w-[400px] h-[400px] -translate-y-1/2 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-[15%] w-[300px] h-[300px] -translate-y-1/2 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-[15%] w-[200px] h-[200px] -translate-y-1/2 border border-white rounded-full"></div>
        {/* Turntable components */}
        <div className="absolute top-10 right-10 w-24 h-48 border border-white rounded-lg"></div>
        <div className="absolute bottom-10 right-20 w-8 h-8 bg-neutral-700 rounded-full"></div>
      </div>

      {/* The Phone Mockup */}
      <div 
        className="relative w-[300px] h-[550px] bg-black rounded-[42px] p-3 shadow-2xl border-[6px] border-neutral-800 transition-all duration-500 group-hover:-rotate-1 origin-center"
        style={{
          transform: 'scale(min(0.95, calc(65cqw / 550)))'
        }}
      >
        {/* Screen Bezel */}
        <div className="w-full h-full bg-[#050505] rounded-[36px] overflow-y-auto no-scrollbar p-3 pt-6 flex flex-col gap-3 relative border border-neutral-900 text-white">
          
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-3">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
            {isPlaying && (
              <div className="flex gap-[2px] items-center h-2">
                <div className="w-[1.5px] bg-[#1db954] animate-pulse" style={{ height: '6px' }}></div>
                <div className="w-[1.5px] bg-[#1db954] animate-pulse" style={{ height: '8px', animationDelay: '0.2s' }}></div>
                <div className="w-[1.5px] bg-[#1db954] animate-pulse" style={{ height: '5px', animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div className="w-2 h-2 rounded-full bg-indigo-900/30"></div>
          </div>

          {/* Phone Status bar */}
          <div className="flex justify-between items-center px-3 text-[9px] font-mono text-neutral-500 mt-1 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-neutral-600 rounded-sm p-[1px]">
                <div className="w-full h-full bg-neutral-400 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Flight Tracker Widget */}
          <div className="w-full rounded-2xl bg-[#0f0f10] p-3.5 border border-neutral-900 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest font-mono">STANSTED AIRPORT</span>
              <span className="text-[9px] text-neutral-500 font-mono mt-0.5">RYANAIR FLIGHT</span>
              <h5 className="font-sans text-sm font-bold text-neutral-200 mt-1.5">LDN TO BER</h5>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="bg-red-500/20 text-red-400 p-1.5 rounded-full border border-red-500/30 animate-pulse">
                <Plane size={12} className="rotate-90" />
              </div>
              <span className="font-pixel text-xs text-neutral-300">IN {flightTime} MIN</span>
            </div>
          </div>

          {/* Steps & Total Time Widget Row */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Steps (White Card) */}
            <div className="rounded-2xl bg-white text-black p-3.5 flex flex-col justify-between h-[110px]">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 tracking-wider block leading-none font-mono">TOTAL STEPS</span>
                <span className="font-pixel text-2xl font-bold tracking-tight block mt-2 text-neutral-900">{steps.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[8px] font-bold text-neutral-400 tracking-wider block font-mono">STREAK</span>
                <span className="font-pixel text-base font-bold text-neutral-800 leading-none">3 DAYS</span>
              </div>
            </div>

            {/* Total Time (Black Card) */}
            <div className="rounded-2xl bg-[#0f0f10] border border-neutral-900 p-3 flex flex-col justify-between h-[110px] text-white">
              {/* Dot activity bars */}
              <div className="flex gap-[2px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1 rounded-[1px] ${
                      i < 8 ? 'bg-red-500' : 'bg-neutral-800'
                    }`}
                  ></div>
                ))}
              </div>

              <div>
                <span className="font-pixel text-2xl font-bold tracking-tighter block">6H 20</span>
                <span className="text-[9px] font-semibold text-neutral-400 tracking-widest uppercase block font-mono mt-1">TOTAL TIME</span>
              </div>
            </div>
          </div>

          {/* Weekly Activities Grid */}
          <div className="w-full rounded-2xl bg-[#0f0f10] p-3 border border-neutral-900 flex flex-col">
            {/* Weekly activity bars and headers */}
            <div className="grid grid-cols-7 gap-1 pt-1">
              {[
                { day: 'SUN', active: 3, steps: '9H26' },
                { day: 'MON', active: 2, steps: '9H14' },
                { day: 'TUE', active: 1, steps: '5H35' },
                { day: 'WED', active: 3, steps: '9H11' },
                { day: 'THU', active: 1, steps: '7H14' },
                { day: 'FRI', active: 2, steps: '6H34' },
                { day: 'SAT', active: 0, steps: '9H34' },
              ].map((dayItem, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="text-[7px] font-mono text-neutral-500 font-bold">{dayItem.day}</span>
                  
                  {/* Three vertical dots indicator */}
                  <div className="flex flex-col gap-[2px] items-center py-1">
                    <div className={`w-[3px] h-[3px] rounded-full ${dayItem.active >= 3 ? 'bg-red-500' : 'bg-neutral-800'}`}></div>
                    <div className={`w-[3px] h-[3px] rounded-full ${dayItem.active >= 2 ? 'bg-red-500' : 'bg-neutral-800'}`}></div>
                    <div className={`w-[3px] h-[3px] rounded-full ${dayItem.active >= 1 ? 'bg-neutral-300' : 'bg-neutral-800'}`}></div>
                  </div>
                  
                  <span className="text-[8px] font-mono text-neutral-400">{dayItem.steps}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: Spotify Player & Mini Compass */}
          <div className="grid grid-cols-3 gap-2 mt-auto">
            {/* Spotify Player (Spans 2 columns) */}
            <div className="col-span-2 rounded-2xl bg-[#0f0f10] p-3 border border-neutral-900 flex flex-col justify-between gap-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col max-w-[85px]">
                  <span className="text-[8px] font-semibold text-neutral-400 font-mono tracking-widest leading-none">SPOTIFY</span>
                  <span className="font-sans text-[10px] font-semibold text-neutral-200 mt-1 truncate leading-tight">Jim Hall</span>
                  <span className="font-sans text-[8px] text-neutral-400 truncate mt-0.5 leading-none">Concierto</span>
                </div>
                <div className="text-[#1db954]">
                  <Music size={11} className={isPlaying ? "animate-bounce" : ""} />
                </div>
              </div>

              {/* Player control & Waveform */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors focus:outline-none"
                >
                  {isPlaying ? (
                    <Pause size={10} className="fill-white text-white" />
                  ) : (
                    <Play size={10} className="fill-white text-white ml-0.5" />
                  )}
                </button>

                {/* Simulated Equalizer Waveform */}
                <div className="flex gap-[2px] h-5 items-end justify-center w-12 pb-1.5">
                  {barHeights.map((height, i) => (
                    <div 
                      key={i} 
                      className="w-[2.5px] rounded-t-xs bg-white transition-all duration-150"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Compass Widget (1 column) */}
            <div className="rounded-2xl bg-[#0f0f10] border border-neutral-900 p-2 flex flex-col items-center justify-center gap-1.5 relative overflow-hidden group">
              <div className="text-[8px] font-mono text-neutral-500 absolute top-1">N</div>
              
              <div 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-transform duration-100 mt-1"
                style={{ transform: `rotate(${compassAngle}deg)` }}
              >
                <div className="w-[1px] h-6 bg-red-500 origin-center absolute"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f0f10] border border-neutral-700 z-10"></div>
              </div>

              <span className="text-[8px] font-pixel text-neutral-400 mt-0.5">34° N</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
