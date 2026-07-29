import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'WORKS', path: '/works' },
    { name: 'ARCHIVE', path: '/archive' }
  ];

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-[5vw] py-8 md:py-10 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-300 sticky top-0 z-50 bg-[#0d0d0d]/80 dark:bg-[#0d0d0d]/80 light:bg-[#f9f9f9]/80 backdrop-blur-md"
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans hover:opacity-80 transition-opacity"
      >
        MARYA©
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-6 md:gap-10 relative">
        {navLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-1 text-xs md:text-sm font-medium tracking-widest transition-colors duration-250 ${
                active ? 'text-neutral-900 dark:text-neutral-100 font-semibold' : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-250'
              }`}
            >
              <motion.span
                className="block"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {link.name}
              </motion.span>
              {active && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 dark:bg-neutral-100"
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Switcher Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden flex">
          <div className="w-2.5 h-5 bg-neutral-900 dark:bg-neutral-100"></div>
          <div className="w-2.5 h-5 bg-transparent border-l border-neutral-900 dark:border-neutral-100"></div>
        </div>
      </motion.button>
    </motion.header>
  );
}
