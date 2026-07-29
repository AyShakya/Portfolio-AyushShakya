import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import Archive from './pages/Archive';

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
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-neutral-100 selection:bg-neutral-800 selection:text-white dark:bg-[#0d0d0d] dark:text-neutral-100 transition-colors duration-300">
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
  );
}

export default App;
