import React, { useState } from 'react';

export default function DotMatrixFace() {
  const [isHovered, setIsHovered] = useState(false);

  // 12 rows x 10 columns grid
  // 0 = off, 1 = on
  const baseFace = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0], // Speaker
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0], // Outer frame top
    [1,0,0,0,0,0,0,0,0,1], // Frame sides
    [1,0,1,0,0,0,0,1,0,1], // Eyes (open)
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,1], // Nose
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,1,0,1], // Mouth sides
    [1,0,0,1,1,1,1,0,0,1], // Mouth smile
    [0,1,1,1,1,1,1,1,1,0], // Frame bottom
  ];

  const winkFace = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,1], // Left eye open, Right eye wink
    [1,0,1,0,0,1,1,1,0,1], // Wink line
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,0,1,1,1,1,0,0,1],
    [0,1,1,1,1,1,1,1,1,0],
  ];

  const currentGrid = isHovered ? winkFace : baseFace;

  return (
    <div 
      className="w-32 h-32 md:w-36 md:h-36 bg-[#eaeaea] dark:bg-[#eaeaea] rounded-3xl border border-[#CFCFCF] shadow-sm flex items-center justify-center p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-10 gap-[3px] md:gap-[4px] w-full h-full aspect-square">
        {currentGrid.flatMap((row, rIdx) => 
          row.map((val, cIdx) => (
            <div 
              key={`${rIdx}-${cIdx}`}
              className={`w-full aspect-square rounded-full transition-all duration-150 ${
                val === 1 
                  ? 'bg-neutral-900 scale-100 shadow-[0_0_2px_rgba(0,0,0,0.15)]' 
                  : 'bg-neutral-200 dark:bg-neutral-100 scale-75 opacity-30'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
}
