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
    { text: 'BRAND DESIGNER', type: 'oval', w: 150, h: 50 },
    { text: 'KIX \u25CF', type: 'kix', w: 100, h: 50 },
    { text: '*', type: 'circle', w: 64, h: 64 },
    { text: 'CREATIVE DIRECTOR', type: 'oval', w: 200, h: 50 },
    { text: '\u2193', type: 'circle-arrow', w: 64, h: 64 },
    { text: 'AYUSH', type: 'oval-small', w: 110, h: 50 }
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
        pillsRef.current.forEach((pill, idx) => {
          let pillW = pill.w;
          let pillH = pill.h;
          
          if (pill.type === 'circle' || pill.type === 'circle-arrow') {
            pillW = isMobile ? 64 : 80;
            pillH = isMobile ? 64 : 80;
            pill.radius = pillW / 2;
          } else {
            if (pill.type === 'oval-small') {
              pillW = isMobile ? 100 : 120;
            } else if (pill.text.length > 12) {
              pillW = isMobile ? 180 : 220;
            } else {
              pillW = isMobile ? 120 : 150;
            }
            pillH = isMobile ? 48 : 56;
            // Bounding radius is average of width and height / 2 to make capsule stacking look natural
            pill.radius = (pillW + pillH) / 4;
          }
          
          pill.width = pillW;
          pill.height = pillH;

          // If not initialized, place them at columns and start falling from random top coordinates
          if (pill.x === 0 && pill.y === 0) {
            const segment = w / pillsRef.current.length;
            pill.x = segment * idx + Math.random() * (segment - pillW);
            // Drop height starts randomly above screen boundary
            pill.y = -350 - Math.random() * 250;
            // Add diagonal drop vector velocity
            pill.vx = -4 + Math.random() * 8;
            pill.vy = 4 + Math.random() * 6;
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

          // 2. Boundary Collisions (bouncing with slide correction)
          const bounce = 0.55;
          const pad = 10;

          // Left Boundary
          if (pill.x < pad) {
            pill.x = pad;
            pill.vx = -pill.vx * bounce;
          }
          // Right Boundary
          if (pill.x > w - pill.width - pad) {
            pill.x = w - pill.width - pad;
            pill.vx = -pill.vx * bounce;
          }
          // Top Boundary
          if (pill.y < pad) {
            pill.y = pad;
            pill.vy = -pill.vy * bounce;
          }
          // Bottom Boundary (landing above title name)
          if (pill.y > h - pill.height - pad) {
            pill.y = h - pill.height - pad;
            pill.vy = -pill.vy * 0.45; // settle quicker
            pill.vx *= 0.93; // ground friction
          }
        });

        // 3. Resolve Pill-to-Pill Rigid Body Collisions
        // Run loop 3 times per frame to prevent overlap intersections
        for (let pass = 0; pass < 3; pass++) {
          for (let i = 0; i < pills.length; i++) {
            for (let j = i + 1; j < pills.length; j++) {
              const p1 = pills[i];
              const p2 = pills[j];

              // Centers
              const c1x = p1.x + p1.width / 2;
              const c1y = p1.y + p1.height / 2;
              const c2x = p2.x + p2.width / 2;
              const c2y = p2.y + p2.height / 2;

              const dx = c2x - c1x;
              const dy = c2y - c1y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const rSum = (p1.radius + p2.radius) * 0.92; // slight overlap tolerance for aesthetic layout

              if (dist < rSum) {
                const nx = dx / (dist || 1);
                const ny = dy / (dist || 1);
                const overlap = rSum - dist;

                // Overlap resolution
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
                  // Push away relative to mass
                  const totalMass = p1.mass + p2.mass;
                  p1.x -= nx * overlap * (p2.mass / totalMass);
                  p1.y -= ny * overlap * (p2.mass / totalMass);
                  p2.x += nx * overlap * (p1.mass / totalMass);
                  p2.y += ny * overlap * (p1.mass / totalMass);

                  // Elastic velocity response
                  const rvx = p2.vx - p1.vx;
                  const rvy = p2.vy - p1.vy;
                  const velAlongNormal = rvx * nx + rvy * ny;

                  if (velAlongNormal < 0) {
                    const restitution = 0.55;
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
        }

        // 4. Sync positions and increment opacities
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

      // Calculate throwing velocity
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
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden select-none bg-transparent"
    >
      {isReady && pillsRef.current.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';

        return (
          <motion.div
            key={idx}
            style={{
              x: pill.motionX,
              y: pill.motionY,
              opacity: pill.motionOpacity
            }}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            whileHover={{ scale: 1.04 }}
            className={`absolute left-0 top-0 cursor-grab active:cursor-grabbing select-none font-mono tracking-widest border transition-colors duration-300 ${
              isCircle 
                ? 'w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-sans' 
                : 'px-8 py-3.5 md:px-10 md:py-4.5 rounded-full text-sm md:text-base'
            } ${
              pill.type === 'circle'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.15)] font-bold'
                : pill.type === 'circle-arrow'
                ? 'bg-neutral-100 dark:bg-neutral-100 text-neutral-900 border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.15)] font-sans'
                : 'bg-transparent text-neutral-850 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 backdrop-blur-sm'
            }`}
          >
            {pill.text}
          </motion.div>
        );
      })}
    </div>
  );
}
