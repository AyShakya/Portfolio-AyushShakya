import React, { useState, useEffect } from 'react';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    <div className="w-36 h-36 md:w-40 md:h-40 bg-neutral-900 dark:bg-neutral-900 rounded-full flex items-center justify-center relative shadow-md border border-neutral-800">
      {/* Dial indicators (subtle markers) */}
      <div className="absolute inset-2 border border-dashed border-neutral-800 rounded-full opacity-50"></div>
      
      {/* Center Pin */}
      <div className="absolute w-2 h-2 bg-neutral-100 rounded-full z-30"></div>

      {/* Hour Hand */}
      <div 
        className="absolute w-1.5 h-10 bg-neutral-100 rounded-full origin-bottom z-10 transition-transform duration-300"
        style={{
          transform: `rotate(${hourDegrees}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Minute Hand */}
      <div 
        className="absolute w-1 h-14 bg-neutral-300 rounded-full origin-bottom z-20 transition-transform duration-300"
        style={{
          transform: `rotate(${minuteDegrees}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Second Hand */}
      <div 
        className="absolute w-0.5 h-16 bg-neutral-500 origin-bottom z-25"
        style={{
          transform: `rotate(${secondDegrees}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Red Dot (Aesthetic reference in Nothing Tech style, bottom left position or center offset) */}
      <div className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
    </div>
  );
}
