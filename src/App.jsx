import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import Archive from './pages/Archive';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-neutral-100 selection:bg-neutral-800 selection:text-white dark:bg-[#0d0d0d] dark:text-neutral-100 transition-colors duration-300">
        {/* Navigation header */}
        <Navbar />

        {/* Main page content area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:projectId" element={<Works />} />
            <Route path="/archive" element={<Archive />} />
            {/* Fallback route to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global page footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
