import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import Archive from './pages/Archive';

import 'lenis/dist/lenis.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
};

function PageWrapper({ children }) {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/works" element={<PageWrapper><Works /></PageWrapper>} />
        <Route path="/works/:projectId" element={<PageWrapper><Works /></PageWrapper>} />
        <Route path="/archive" element={<PageWrapper><Archive /></PageWrapper>} />
        {/* Fallback route to home */}
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#111111] text-[#E3E3E1] selection:bg-neutral-800 selection:text-[#E3E3E1] dark:bg-[#111111] dark:text-[#E3E3E1] transition-colors duration-300">
          {/* Navigation header */}
          <Navbar />

          {/* Main page content area */}
          <main className="flex-grow flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Global page footer */}
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
