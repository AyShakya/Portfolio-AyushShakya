import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const hoursStr = String(hours).padStart(2, '0');
      setTimeStr(`${hoursStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36 py-12 md:py-16 mt-auto border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start text-left">
        {/* Left Column - Contact Info */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Interested to work with me?</p>
          <a 
            href="mailto:INFO@AKIO.DESIGN" 
            className="text-lg md:text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-neutral-100 hover:underline hover:opacity-80 transition-all"
          >
            INFO@AKIO.DESIGN
          </a>
        </div>

        {/* Center Column - Socials */}
        <div className="flex flex-col gap-1 md:items-center">
          <div className="flex flex-col gap-1 md:text-center text-left">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://behance.net" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Behance
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://dribbble.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Dribbble
            </a>
          </div>
        </div>

        {/* Right Column - Live Clock */}
        <div className="flex flex-col gap-2 md:items-end text-left md:text-right">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Local Time</p>
          <p className="text-lg md:text-xl font-bold font-pixel tracking-wide text-neutral-900 dark:text-neutral-100 select-none">
            {timeStr || '12:00:00 AM'}
          </p>
        </div>
      </div>
    </footer>
  );
}
