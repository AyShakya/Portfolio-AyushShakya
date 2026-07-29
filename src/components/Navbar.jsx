import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial state
    const bodyClass = document.body.classList;
    setIsLight(bodyClass.contains('light'));
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('light')) {
      body.classList.remove('light');
      setIsLight(false);
    } else {
      body.classList.add('light');
      setIsLight(true);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-36 py-8 md:py-10 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      {/* Logo */}
      <Link 
        to="/" 
        className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans hover:opacity-80 transition-opacity"
      >
        MARYA©
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-6 md:gap-10">
        <Link
          to="/"
          className={`text-xs md:text-sm font-medium tracking-widest hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
            isActive('/') ? 'text-neutral-900 dark:text-neutral-100 font-semibold' : 'text-neutral-500'
          }`}
        >
          HOME
        </Link>
        <Link
          to="/works"
          className={`text-xs md:text-sm font-medium tracking-widest hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
            isActive('/works') || location.pathname.startsWith('/works/')
              ? 'text-neutral-900 dark:text-neutral-100 font-semibold'
              : 'text-neutral-500'
          }`}
        >
          WORKS
        </Link>
        <Link
          to="/archive"
          className={`text-xs md:text-sm font-medium tracking-widest hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
            isActive('/archive') ? 'text-neutral-900 dark:text-neutral-100 font-semibold' : 'text-neutral-500'
          }`}
        >
          ARCHIVE
        </Link>
      </nav>

      {/* Theme Switcher Button */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden flex">
          <div className="w-2.5 h-5 bg-neutral-900 dark:bg-neutral-100"></div>
          <div className="w-2.5 h-5 bg-transparent border-l border-neutral-900 dark:border-neutral-100"></div>
        </div>
      </button>
    </header>
  );
}
