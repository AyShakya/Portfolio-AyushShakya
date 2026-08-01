import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function FloatingPills() {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);

  // Motion values to update coordinates at 60fps without triggering React renders
  const motionValues = [
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), opacity: useMotionValue(0) }
  ];

  // Physics state stored in a ref for frame-by-frame updates
  const pillsRef = useRef([
    { text: 'BRAND DESIGNER', type: 'oval', w: 150, h: 50, rotate: 1 },
    { text: 'KIX \u25CF', type: 'kix', w: 100, h: 50, rotate: 0 },
    { text: '*', type: 'circle', w: 64, h: 64, rotate: 0 },
    { text: 'CREATIVE DIRECTOR', type: 'oval', w: 200, h: 50, rotate: -5 },
    { text: '\u2193', type: 'circle-arrow', w: 64, h: 64, rotate: 0 },
    { text: 'AYUSH', type: 'oval-small', w: 110, h: 50, rotate: 0 }
  ].map((pill, idx) => ({
    ...pill,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: pill.type === 'circle' || pill.type === 'circle-arrow' ? 1.0 : 1.8,
    radius: 0,
    width: 0,
    height: 0,
    motionX: motionValues[idx].x,
    motionY: motionValues[idx].y,
    motionOpacity: motionValues[idx].opacity
  })));

  const draggingIndexRef = useRef(null);
  const pointerOffsetRef = useRef({ x: 0, y: 0 });

  // Initialize container size and pills layout
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        setContainerSize({ width: w, height: h });

        const isMobile = w < 768;
        pillsRef.current.forEach((pill) => {
          let pillW = pill.w;
          let pillH = pill.h;
          
          if (pill.type === 'circle' || pill.type === 'circle-arrow') {
            pillW = (isMobile ? 48 : 64) * 2;
            pillH = (isMobile ? 48 : 64) * 2;
            pill.radius = pillW / 2;
          } else {
            if (pill.text === 'AYUSH') {
              pillW = (isMobile ? 80 : 100) * 2;
            } else if (pill.text === 'CREATIVE DIRECTOR') {
              pillW = (isMobile ? 160 : 200) * 2;
            } else if (pill.text === 'BRAND DESIGNER') {
              pillW = (isMobile ? 140 : 170) * 2;
            } else if (pill.text === 'KIX ●') {
              pillW = (isMobile ? 90 : 110) * 2;
            } else {
              pillW = (isMobile ? 100 : 130) * 2;
            }
            pillH = (isMobile ? 38 : 46) * 2;
            // Bounding radius is average of width and height / 2 to make capsule stacking look natural
            pill.radius = (pillW + pillH) / 4;
          }
          
          pill.width = pillW;
          pill.height = pillH;

          // If not initialized, place them at columns and start falling from random top coordinates
          if (pill.x === 0 && pill.y === 0) {
            let targetXPercent = 0.5;
            let dropHeight = -150;
            
            if (pill.text === 'CREATIVE DIRECTOR') {
              targetXPercent = 0.16;
              dropHeight = -350; // drops later, stacks on arrow
            } else if (pill.text === '\u2193') {
              targetXPercent = 0.12;
              dropHeight = -150; // drops first
            } else if (pill.text === 'KIX \u25CF') {
              targetXPercent = 0.35;
              dropHeight = -220;
            } else if (pill.text === 'BRAND DESIGNER') {
              targetXPercent = 0.52;
              dropHeight = -150; // drops first
            } else if (pill.text === '*') {
              targetXPercent = 0.56;
              dropHeight = -350; // drops later, stacks on BRAND DESIGNER
            } else if (pill.text === 'AYUSH') {
              targetXPercent = 0.85;
              dropHeight = -200;
            }

            // Set initial position
            pill.x = w * targetXPercent - pillW / 2;
            pill.x = Math.max(15, Math.min(w - pillW - 15, pill.x));
            pill.y = dropHeight - Math.random() * 50;
            
            // Subtle random horizontal velocity so it feels natural, but minimal to prevent scattering
            pill.vx = -1 + Math.random() * 2;
            pill.vy = 4 + Math.random() * 3;
          }
        });
        setIsReady(true);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Frame-by-frame physics loop
  useEffect(() => {
    let animationFrameId;

    const step = () => {
      const w = containerSize.width;
      const h = containerSize.height;

      if (w > 0 && h > 0 && isReady) {
        const pills = pillsRef.current;
        const dragIdx = draggingIndexRef.current;

        // 1. Update positions & velocities
        pills.forEach((pill, idx) => {
          if (idx === dragIdx) return; // Managed by pointer events

          pill.vy += 0.35; // Gravity acceleration
          pill.vx *= 0.985; // Air friction
          pill.vy *= 0.985;

          pill.x += pill.vx;
          pill.y += pill.vy;
        });

        // 2. Resolve Pill-to-Pill Box Collisions & Enforce strict boundary walls
        const bounce = 0.55;
        const pad = 10;

        for (let pass = 0; pass < 4; pass++) {
          // Pass A: Resolve pill-to-pill AABB overlaps
          for (let i = 0; i < pills.length; i++) {
            for (let j = i + 1; j < pills.length; j++) {
              const p1 = pills[i];
              const p2 = pills[j];

              // Bounding box bounds
              const minX1 = p1.x;
              const maxX1 = p1.x + p1.width;
              const minY1 = p1.y;
              const maxY1 = p1.y + p1.height;

              const minX2 = p2.x;
              const maxX2 = p2.x + p2.width;
              const minY2 = p2.y;
              const maxY2 = p2.y + p2.height;

              // Check box intersection
              const overlapX = Math.min(maxX1, maxX2) - Math.max(minX1, minX2);
              const overlapY = Math.min(maxY1, maxY2) - Math.max(minY1, minY2);

              if (overlapX > 0 && overlapY > 0) {
                let nx = 0;
                let ny = 0;
                let overlap = 0;

                // Push along axis of minimum penetration
                if (overlapX < overlapY) {
                  overlap = overlapX;
                  nx = (p1.x + p1.width / 2 < p2.x + p2.width / 2) ? 1 : -1;
                } else {
                  overlap = overlapY;
                  ny = (p1.y + p1.height / 2 < p2.y + p2.height / 2) ? 1 : -1;
                }

                // Resolve overlaps
                if (i === dragIdx) {
                  p2.x += nx * overlap;
                  p2.y += ny * overlap;
                  p2.vx += nx * 1.5;
                  p2.vy += ny * 1.5;
                } else if (j === dragIdx) {
                  p1.x -= nx * overlap;
                  p1.y -= ny * overlap;
                  p1.vx -= nx * 1.5;
                  p1.vy -= ny * 1.5;
                } else {
                  const totalMass = p1.mass + p2.mass;
                  const ratio1 = p2.mass / totalMass;
                  const ratio2 = p1.mass / totalMass;

                  p1.x -= nx * overlap * ratio1;
                  p1.y -= ny * overlap * ratio1;
                  p2.x += nx * overlap * ratio2;
                  p2.y += ny * overlap * ratio2;

                  // Elastic velocity exchange
                  const rvx = p2.vx - p1.vx;
                  const rvy = p2.vy - p1.vy;
                  const velAlongNormal = rvx * nx + rvy * ny;

                  if (velAlongNormal < 0) {
                    const restitution = 0.5;
                    const impulse = -(1 + restitution) * velAlongNormal / (1 / p1.mass + 1 / p2.mass);
                    p1.vx -= (impulse / p1.mass) * nx;
                    p1.vy -= (impulse / p1.mass) * ny;
                    p2.vx += (impulse / p2.mass) * nx;
                    p2.vy += (impulse / p2.mass) * ny;
                  }
                }
              }
            }
          }

          // Pass B: Enforce boundaries immediately
          pills.forEach((pill, idx) => {
            if (idx === dragIdx) return;

            // Left Wall
            if (pill.x < pad) {
              pill.x = pad;
              pill.vx = -pill.vx * bounce;
            }
            // Right Wall
            if (pill.x > w - pill.width - pad) {
              pill.x = w - pill.width - pad;
              pill.vx = -pill.vx * bounce;
            }
            // Top Wall
            if (pill.y < pad) {
              pill.y = pad;
              pill.vy = -pill.vy * bounce;
            }
            // Bottom Wall
            if (pill.y > h - pill.height - pad) {
              pill.y = h - pill.height - pad;
              pill.vy = -pill.vy * 0.45; // settle quicker
              pill.vx *= 0.93; // ground friction
            }
          });
        }

        // 3. Sync positions and increment opacities
        pills.forEach((pill) => {
          const op = pill.motionOpacity.get();
          if (op < 1) pill.motionOpacity.set(op + 0.035);

          pill.motionX.set(pill.x);
          pill.motionY.set(pill.y);
        });
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerSize, isReady]);

  // Pointer dragging implementation
  const handlePointerDown = (e, index) => {
    e.preventDefault();
    const pill = pillsRef.current[index];
    draggingIndexRef.current = index;

    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    pointerOffsetRef.current = {
      x: pointerX - pill.x,
      y: pointerY - pill.y
    };

    pill.vx = 0;
    pill.vy = 0;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      const idx = draggingIndexRef.current;
      if (idx === null || !containerRef.current) return;

      const pill = pillsRef.current[idx];
      const rect = containerRef.current.getBoundingClientRect();

      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      let targetX = pointerX - pointerOffsetRef.current.x;
      let targetY = pointerY - pointerOffsetRef.current.y;

      const w = containerSize.width;
      const h = containerSize.height;
      const pad = 10;

      targetX = Math.max(pad, Math.min(w - pill.width - pad, targetX));
      targetY = Math.max(pad, Math.min(h - pill.height - pad, targetY));

      pill.vx = (targetX - pill.x) * 0.75;
      pill.vy = (targetY - pill.y) * 0.75;

      pill.x = targetX;
      pill.y = targetY;
    };

    const handlePointerUp = () => {
      draggingIndexRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [containerSize]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden select-none bg-transparent"
    >
      {isReady && pillsRef.current.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';

        return (
          <motion.div
            key={idx}
            style={{
              x: pill.motionX,
              y: pill.motionY,
              opacity: pill.motionOpacity,
              rotate: pill.rotate || 0,
              width: pill.width,
              height: pill.height
            }}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            whileHover={{ scale: 1.05 }}
            className={`absolute left-0 top-0 cursor-grab active:cursor-grabbing select-none font-mono tracking-[0.1em] border transition-colors duration-300 rounded-full flex items-center justify-center text-center ${
              isCircle 
                ? 'font-sans text-4xl md:text-6xl font-bold leading-none' 
                : 'text-sm md:text-lg font-bold px-4'
            } ${
              pill.type === 'circle' || pill.type === 'circle-arrow'
                ? 'bg-[#eaeaea] dark:bg-[#eaeaea] text-[#0d0d0e] dark:text-[#0d0d0e] border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
                : 'bg-white/10 dark:bg-black/40 text-neutral-900 dark:text-[#eaeaea] border-neutral-300 dark:border-[#eaeaea]/20 backdrop-blur-md'
            }`}
          >
            {pill.text}
          </motion.div>
        );
      })}
    </div>
  );
}
