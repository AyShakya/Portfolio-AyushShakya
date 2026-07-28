import React, { useState, useRef, useEffect } from 'react';

export default function CompassWidget() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate angle in degrees
    const angleRad = Math.atan2(mouseY - centerY, mouseX - centerX);
    let angleDeg = angleRad * (180 / Math.PI) + 90; // Add 90 to align arrow pointing to mouse
    setRotation(angleDeg);
  };

  const handleMouseLeave = () => {
    // Smooth reset back to 45 degrees (default pointing top-right as in the design)
    let current = rotation % 360;
    // Set rotation to a value close to 45 to avoid spinning all the way around
    setRotation(45);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-36 h-36 md:w-40 md:h-40 bg-neutral-900 dark:bg-neutral-900 rounded-full flex items-center justify-center relative shadow-md border border-neutral-800 cursor-pointer select-none transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Outer markings */}
      <span className="absolute top-2 text-xs font-mono font-bold text-neutral-500">S</span>
      <span className="absolute right-3 text-xs font-mono font-bold text-neutral-500 font-semibold text-red-500">E</span>
      <span className="absolute bottom-2 text-xs font-mono font-bold text-neutral-500">N</span>
      <span className="absolute left-3 text-xs font-mono font-bold text-neutral-500">W</span>

      {/* Center Dial / Pointer */}
      <div 
        className="w-20 h-20 rounded-full border border-neutral-800 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Needle / Dotted line pointer */}
        <div className="flex flex-col items-center gap-[4px]">
          {/* Arrow top pointer */}
          <div className="w-1.5 h-1.5 bg-neutral-100 rounded-full"></div>
          <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
          <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
          <div className="w-1 h-1 bg-neutral-500 rounded-full opacity-60"></div>
          <div className="w-1 h-1 bg-neutral-600 rounded-full opacity-35"></div>
          <div className="w-1 h-1 bg-neutral-700 rounded-full opacity-15"></div>
        </div>
      </div>

      {/* Subtle indicator dots */}
      <div className="absolute w-28 h-28 border border-neutral-800 rounded-full border-dotted opacity-20 pointer-events-none"></div>
    </div>
  );
}
