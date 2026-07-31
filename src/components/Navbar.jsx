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
      className="w-full px-[5vw] py-8 md:py-10 flex items-center justify-between border-b border-neutral-200/30 dark:border-transparent transition-colors duration-300 sticky top-0 z-50 bg-[#161618]/80 dark:bg-[#161618]/80 light:bg-white/80 backdrop-blur-md"
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="text-lg md:text-xl font-bold tracking-tight text-[#eaeaea] dark:text-[#eaeaea] font-sans hover:opacity-80 transition-opacity"
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
              className={`relative py-1 text-xs md:text-sm font-medium tracking-[0.2em] transition-colors duration-250 ${
                active ? 'text-[#eaeaea]' : 'text-neutral-500 hover:text-[#eaeaea]'
              }`}
            >
              <motion.span
                className="block"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {link.name}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      {/* Theme Switcher Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none"
        aria-label="Toggle theme"
      >
        <div className="w-3.5 h-3.5 rounded-full overflow-hidden flex border border-neutral-400 dark:border-[#eaeaea]/30">
          <div className={`w-1/2 h-full ${isLight ? 'bg-neutral-300' : 'bg-transparent dark:bg-transparent'}`}></div >
          <div className={`w-1/2 h-full ${isLight ? 'bg-neutral-950' : 'bg-transparent dark:bg-[#eaeaea]'}`}></div >
        </div>
      </motion.button>
    </motion.header>
  );
}
