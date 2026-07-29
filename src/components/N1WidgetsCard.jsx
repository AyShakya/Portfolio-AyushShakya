import React, { useState, useEffect } from 'react';

export default function N1WidgetsCard() {
  const [time, setTime] = useState(new Date());
  const [compassAngle, setCompassAngle] = useState(45); // default pointer angle (pointing top-right)

  // Update clock hands every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle mouse movement over compass to rotate it dynamically
  const handleCompassMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setCompassAngle(angle);
  };

  const handleCompassMouseLeave = () => {
    // Reset to default top-right pointing (45 deg)
    setCompassAngle(45);
  };

  // Clock calculations
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  // Weather forecast mock data from screenshot
  const forecast = [
    { day: 'WED', icon: 'snow', temp: '-3°', low: '-6°' },
    { day: 'THU', icon: 'snow-heavy', temp: '-1°', low: '-9°' },
    { day: 'FRI', icon: 'cloudy', temp: '-9°', low: '-10°' },
    { day: 'SAT', icon: 'sun-cloud', temp: '-4°', low: '-6°' },
    { day: 'SUM', icon: 'snow', temp: '-4°', low: '-6°' },
    { day: 'Mon', icon: 'snow', temp: '-4°', low: '-6°' },
  ];

  // Render small dot-matrix icon based on type
  const renderDotIcon = (type) => {
    if (type === 'snow' || type === 'snow-heavy') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-white light:fill-neutral-800">
          <circle cx="12" cy="6" r="1" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="12" cy="10" r="1.5" />
          <circle cx="16" cy="10" r="1" />
          <circle cx="10" cy="14" r="1" />
          <circle cx="14" cy="14" r="1" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      );
    }
    // cloudy / sun-cloud
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" className="fill-white light:fill-neutral-800">
        <circle cx="9" cy="12" r="2" />
        <circle cx="13" cy="10" r="3" />
        <circle cx="17" cy="12" r="2" />
        <circle cx="11" cy="14" r="2.5" />
        <circle cx="15" cy="14" r="2" />
      </svg>
    );
  };

  return (
    <div className="w-full rounded-3xl bg-[#e5e4e7] light:bg-[#f3f3f3] dark:bg-[#1c1c1e] p-6 md:p-8 flex flex-col items-center gap-6 transition-colors duration-300 shadow-inner">
      {/* Top row: Compass and Clock widgets */}
      <div className="flex w-full justify-center gap-6 md:gap-10">
        {/* Compass Widget */}
        <div 
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#121212] flex items-center justify-center cursor-pointer select-none group border border-neutral-800/40"
          onMouseMove={handleCompassMouseMove}
          onMouseLeave={handleCompassMouseLeave}
        >
          {/* Outer Letters */}
          <span className="absolute top-2 left-4 text-[9px] font-mono text-neutral-500 font-bold">E</span>
          <span className="absolute top-2 right-4 text-[9px] font-mono text-neutral-500 font-bold">S</span>
          <span className="absolute bottom-2 right-4 text-[9px] font-mono text-neutral-500 font-bold">W</span>
          <span className="absolute bottom-2 left-4 text-[9px] font-mono text-red-500 font-bold">N</span>

          {/* Dotted pointer */}
          <div 
            className="w-16 h-16 relative flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `rotate(${compassAngle}deg)` }}
          >
            {/* Arrow made of dots */}
            <div className="flex flex-col items-center justify-center gap-[3px]">
              <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]"></div>
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/60"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/60"></div>
              </div>
              <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/80"></div>
              <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/60"></div>
              <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/40"></div>
              <div className="w-[3px] h-[3px] rounded-full bg-[#eaeaea]/20"></div>
            </div>
          </div>
        </div>

        {/* Clock Widget */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#121212] flex items-center justify-center border border-neutral-800/40">
          {/* Red dot at bottom-left */}
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-red-500 shadow-md shadow-red-500/50"></div>

          {/* Clock Hands Container */}
          <div className="relative w-20 h-20">
            {/* Hour hand */}
            <div 
              className="absolute top-10 left-10 w-1.5 h-6 bg-[#eaeaea] origin-bottom rounded-full -translate-x-[3px] -translate-y-6"
              style={{ transform: `rotate(${hourAngle}deg)` }}
            ></div>
            {/* Minute hand */}
            <div 
              className="absolute top-10 left-10 w-1 h-8 bg-neutral-300 origin-bottom rounded-full -translate-x-[2px] -translate-y-8"
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            ></div>
            {/* Second hand */}
            <div 
              className="absolute top-10 left-10 w-0.5 h-9 bg-red-500 origin-bottom -translate-x-[1px] -translate-y-9 opacity-80"
              style={{ transform: `rotate(${secondAngle}deg)` }}
            ></div>
            {/* Center Pin */}
            <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-[#eaeaea] border border-neutral-800 -translate-x-[5px] -translate-y-[5px]"></div>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="w-full rounded-2xl bg-[#121212] p-5 md:p-6 flex flex-col justify-between border border-neutral-800/40 text-[#eaeaea]">
        {/* Top Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            {/* Huge Temperature */}
            <div className="flex flex-col">
              <span className="font-pixel text-5xl md:text-6xl tracking-tighter leading-none">30°</span>
              <span className="font-mono text-[10px] tracking-wider text-neutral-400 mt-1 uppercase">H 35° L 16°</span>
            </div>

            {/* Sun/cloud dot matrix icon */}
            <div className="flex items-center justify-center p-1.5 rounded-lg bg-neutral-800/50">
              <svg width="40" height="40" viewBox="0 0 24 24" className="fill-white">
                <circle cx="12" cy="7" r="1.5" />
                <circle cx="16" cy="9" r="1.5" />
                <circle cx="8" cy="9" r="1.5" />
                <circle cx="12" cy="11" r="2.5" />
                <circle cx="7" cy="13" r="1.5" />
                <circle cx="17" cy="13" r="1.5" />
                <circle cx="10" cy="15" r="2" />
                <circle cx="14" cy="15" r="2" />
              </svg>
            </div>
          </div>

          <div className="text-right font-mono">
            <h4 className="text-xs font-semibold tracking-wider">Toronto</h4>
            <p className="text-[10px] text-neutral-400 tracking-widest mt-0.5 uppercase">Party Cloudy</p>
          </div>
        </div>

        {/* 6-Day Forecast Grid */}
        <div className="grid grid-cols-6 border-t border-neutral-800/60 pt-4 gap-1">
          {forecast.map((dayData, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="font-mono text-[9px] tracking-wider text-neutral-500 font-semibold">{dayData.day}</span>
              {renderDotIcon(dayData.icon)}
              <div className="flex flex-col items-center">
                <span className="font-pixel text-xs leading-none">{dayData.temp}</span>
                <span className="font-pixel text-[9px] text-neutral-500 leading-none mt-0.5">{dayData.low}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
