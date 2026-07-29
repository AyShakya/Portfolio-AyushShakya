import React, { useState } from 'react';

export default function DotMatrixCloud() {
  const [isHovered, setIsHovered] = useState(false);

  // 10 rows x 10 cols
  const cloudGrid = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0], // space for rain
    [0,1,0,0,1,0,0,1,0,0], // rain 1
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,0,0,1,0], // rain 2
  ];

  return (
    <div 
      className="w-32 h-32 md:w-36 md:h-36 bg-[#eaeaea] dark:bg-[#eaeaea] rounded-full border border-[#CFCFCF] shadow-sm flex items-center justify-center p-5 cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-10 gap-[3px] md:gap-[4px] w-full h-full aspect-square relative">
        {cloudGrid.flatMap((row, rIdx) => 
          row.map((val, cIdx) => {
            const isRain = rIdx >= 7;
            return (
              <div 
                key={`${rIdx}-${cIdx}`}
                className={`w-full aspect-square rounded-full transition-all duration-300 ${
                  val === 1 
                    ? 'bg-neutral-900 scale-100 shadow-[0_0_1px_rgba(0,0,0,0.1)]' 
                    : 'bg-neutral-200 dark:bg-neutral-100 scale-75 opacity-30'
                } ${
                  isRain && val === 1 && isHovered 
                    ? 'animate-bounce' 
                    : ''
                }`}
                style={isRain && val === 1 && isHovered ? { animationDelay: `${(cIdx % 3) * 0.1}s`, animationDuration: '0.6s' } : {}}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
