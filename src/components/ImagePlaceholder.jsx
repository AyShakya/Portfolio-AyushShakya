import React from 'react';

export default function ImagePlaceholder({ description, className = '', style = {} }) {
  return (
    <div 
      className={`relative @container bg-neutral-900/60 dark:bg-neutral-900/40 border border-dashed border-neutral-800 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center p-[6cqw] text-center select-none overflow-hidden transition-all duration-300 group-hover:border-neutral-700 ${className}`}
      style={{ minHeight: '200px', ...style }}
    >
      {/* Background blueprint grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Placeholder content info */}
      <div className="relative z-10 flex flex-col items-center gap-[3cqw] max-w-[85%]">
        {/* Aesthetic label badge */}
        <span className="px-[2.5cqw] py-[1cqw] rounded bg-neutral-800/80 text-[clamp(8px,3cqw,11px)] font-mono tracking-widest text-neutral-400 border border-neutral-700/50 uppercase leading-none">
          Image Placeholder
        </span>
        
        {/* Description text */}
        <p className="text-[clamp(9px,3.5cqw,13px)] font-mono leading-relaxed text-neutral-500 max-w-full">
          {description || "Visual asset content details"}
        </p>
      </div>

      {/* Decorative corner lines to look technical/premium */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-neutral-750 opacity-40"></div>
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-neutral-750 opacity-40"></div>
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-neutral-750 opacity-40"></div>
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-neutral-750 opacity-40"></div>
    </div>
  );
}
