import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for optimized loading speed and bundle code-splitting
const Home = React.lazy(() => import('./pages/Home'));
const Works = React.lazy(() => import('./pages/Works'));
const Archive = React.lazy(() => import('./pages/Archive'));

import 'lenis/dist/lenis.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
};

// Premium minimal loader aligning with the Nothing Tech hardware design
function PageLoader() {
  return (
    <div className="w-full flex-grow min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center font-mono">
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900 border border-neutral-850 dark:bg-neutral-900/90 dark:border-neutral-800 rounded-full text-xs text-neutral-400 font-medium select-none shadow-sm animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        LOADING...
      </div>
    </div>
  );
}

function PageWrapper({ children }) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full flex-grow flex flex-col"
    >
      <React.Suspense fallback={<PageLoader />}>
        {children}
      </React.Suspense>
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
        <div className="min-h-screen flex flex-col bg-[#161618] text-[#eaeaea] selection:bg-neutral-800 selection:text-[#eaeaea] dark:bg-[#161618] dark:text-[#eaeaea] transition-colors duration-300">
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
