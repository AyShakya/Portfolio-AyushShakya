import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function FloatingPills({ delay = 0.5 }) {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [startSim, setStartSim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartSim(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  // Motion values to update coordinates at 60fps without triggering React renders
  const motionValues = [
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) },
    { x: useMotionValue(0), y: useMotionValue(0), rotate: useMotionValue(0), opacity: useMotionValue(0) }
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
    cx: 0,
    cy: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    va: 0,
    mass: 1.0,
    inertia: 1.0,
    restitution: 0.6,
    isDragging: false,
    width: 0,
    height: 0,
    motionX: motionValues[idx].x,
    motionY: motionValues[idx].y,
    motionRotate: motionValues[idx].rotate,
    motionOpacity: motionValues[idx].opacity
  })));

  const [activeDragIndex, setActiveDragIndex] = useState(null);
  const draggingIndexRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  // Initialize container size and pills layout
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        setContainerSize({ width: w, height: h });

        const isMobile = w < 768;
        const pad = 10;

        pillsRef.current.forEach((pill, idx) => {
          let pillW = pill.w;
          let pillH = pill.h;
          
          if (pill.type === 'circle' || pill.type === 'circle-arrow') {
            pillW = (isMobile ? 48 : 64) * 2;
            pillH = (isMobile ? 48 : 64) * 2;
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
          }
          
          pill.width = pillW;
          pill.height = pillH;
          
          // Mass proportional to area
          pill.mass = (pillW * pillH) / 1000;
          // Moment of inertia for a rectangle
          pill.inertia = (1 / 12) * pill.mass * (pillW * pillW + pillH * pillH);

          // If not initialized, randomize initial position and fall parameters
          if (pill.cx === 0 && pill.cy === 0) {
            const dropHeight = -80; // Same starting Y level for all pills

            // Randomize starting X coordinate within boundaries
            const minCx = pad + pill.width / 2;
            const maxCx = w - pad - pill.width / 2;
            pill.cx = minCx + Math.random() * (maxCx - minCx);
            pill.cy = dropHeight;
            
            // Fall downwards with slight horizontal variation
            pill.vx = (Math.random() - 0.5) * 2;
            pill.vy = 4 + Math.random() * 3;
            pill.angle = (Math.random() - 0.5) * 0.5;
            pill.va = (Math.random() - 0.5) * 0.05;
          } else {
            // Keep inside new boundaries if resized
            const minCx = pad + pill.width / 2;
            const maxCx = w - pad - pill.width / 2;
            const minCy = pad + pill.height / 2;
            const maxCy = h - pad - pill.height / 2;

            pill.cx = Math.max(minCx, Math.min(maxCx, pill.cx));
            pill.cy = Math.max(minCy, Math.min(maxCy, pill.cy));
          }

          // Set initial motion values so they are positioned correctly before simulation starts
          pill.motionX.set(pill.cx - pill.width / 2);
          pill.motionY.set(pill.cy - pill.height / 2);
          pill.motionRotate.set(pill.angle * (180 / Math.PI));
          pill.motionOpacity.set(0);
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
    if (!startSim) return;
    let animationFrameId;

    const step = () => {
      const w = containerSize.width;
      const h = containerSize.height;

      if (w > 0 && h > 0 && isReady) {
        const pills = pillsRef.current;
        const dragIdx = draggingIndexRef.current;

        // Run multiple substeps per frame for physics stability
        const SUBSTEPS = 4;
        
        // Gravity and damping coefficients per substep
        const gravity = 0.08; // Adjusted downward acceleration
        const friction = 0.96; // Adjusted air resistance damping
        const angularFriction = 0.992; // Angular damping
        const pad = 10;

        // Helper function to compute circles for a pill (capsule approximation)
        const getPillCircles = (pill) => {
          const R = pill.height / 2;
          const W = pill.width;
          const H = pill.height;
          const N = Math.max(1, Math.ceil(W / H));
          const circles = [];
          const cosA = Math.cos(pill.angle);
          const sinA = Math.sin(pill.angle);

          if (N === 1) {
            circles.push({ wx: pill.cx, wy: pill.cy, r: R, rx: 0, ry: 0 });
          } else {
            const stepDist = (W - H) / (N - 1);
            const startX = -(W - H) / 2;
            for (let k = 0; k < N; k++) {
              const lx = startX + k * stepDist;
              const ly = 0;
              const rx = lx * cosA - ly * sinA;
              const ry = lx * sinA + ly * cosA;
              circles.push({ wx: pill.cx + rx, wy: pill.cy + ry, r: R, rx: rx, ry: ry });
            }
          }
          return circles;
        };

        for (let sub = 0; sub < SUBSTEPS; sub++) {
          // 1. Update velocities and positions
          pills.forEach((pill, idx) => {
            if (idx === dragIdx) {
              // Apply gravity to the dragged pill so it hangs/swings down
              pill.vy += gravity;
              pill.vx *= friction;
              pill.vy *= friction;
              pill.va *= angularFriction;

              // Calculate mouse/spring force at the local grab point
              const targetX = pointerRef.current.x;
              const targetY = pointerRef.current.y;

              const lx = pill.dragLocalX || 0;
              const ly = pill.dragLocalY || 0;

              const cosA = Math.cos(pill.angle);
              const sinA = Math.sin(pill.angle);

              // World coordinate offset of the grab point from center of mass
              const rx = lx * cosA - ly * sinA;
              const ry = lx * sinA + ly * cosA;

              // World position of the grab point
              const wx = pill.cx + rx;
              const wy = pill.cy + ry;

              // Velocity of the grabbed point on the pill
              const vpx = pill.vx - pill.va * ry;
              const vpy = pill.vy + pill.va * rx;

              // Spring coefficients (kSpring = stiffness, kDamp = damping)
              const kSpring = 0.08;
              const kDamp = 0.15;

              // Acceleration applied at the grab point
              const ax = kSpring * (targetX - wx) - kDamp * vpx;
              const ay = kSpring * (targetY - wy) - kDamp * vpy;

              // Update center of mass velocities
              pill.vx += ax;
              pill.vy += ay;

              // Update angular velocity based on torque
              const inertiaRatio = (pill.width * pill.width + pill.height * pill.height) / 12;
              const alpha = (rx * ay - ry * ax) / inertiaRatio;
              pill.va += alpha;

              // Cap velocities to prevent clipping/excessive speed
              const maxVel = 18;
              const speed = Math.sqrt(pill.vx * pill.vx + pill.vy * pill.vy);
              if (speed > maxVel) {
                pill.vx = (pill.vx / speed) * maxVel;
                pill.vy = (pill.vy / speed) * maxVel;
              }

              const maxAngVel = 0.25;
              if (Math.abs(pill.va) > maxAngVel) {
                pill.va = Math.sign(pill.va) * maxAngVel;
              }

              // Update coordinates
              pill.cx += pill.vx;
              pill.cy += pill.vy;
              pill.angle += pill.va;

              // Enforce boundary walls using pill circles (to keep it inside container boundaries)
              let pushLeft = 0;
              let pushRight = 0;
              let pushTop = 0;
              let pushBottom = 0;

              const circles = getPillCircles(pill);
              circles.forEach((c) => {
                if (c.wx - c.r < pad) {
                  pushLeft = Math.max(pushLeft, pad - (c.wx - c.r));
                }
                if (c.wx + c.r > w - pad) {
                  pushRight = Math.max(pushRight, (c.wx + c.r) - (w - pad));
                }
                if (c.wy + c.r > h - pad) {
                  pushBottom = Math.max(pushBottom, (c.wy + c.r) - (h - pad));
                }
                if (pill.cy - pill.height / 2 > pad && c.wy - c.r < pad) {
                  pushTop = Math.max(pushTop, pad - (c.wy - c.r));
                }
              });

              if (pushLeft > 0) pill.cx += pushLeft;
              else if (pushRight > 0) pill.cx -= pushRight;

              if (pushBottom > 0) pill.cy -= pushBottom;
              else if (pushTop > 0) pill.cy += pushTop;
            } else {
              // Apply gravity and damping
              pill.vy += gravity;
              pill.vx *= friction;
              pill.vy *= friction;
              pill.va *= angularFriction;

              // Cap velocities to prevent clipping
              const maxVel = 18;
              const speed = Math.sqrt(pill.vx * pill.vx + pill.vy * pill.vy);
              if (speed > maxVel) {
                pill.vx = (pill.vx / speed) * maxVel;
                pill.vy = (pill.vy / speed) * maxVel;
              }

              const maxAngVel = 0.25;
              if (Math.abs(pill.va) > maxAngVel) {
                pill.va = Math.sign(pill.va) * maxAngVel;
              }

              pill.cx += pill.vx;
              pill.cy += pill.vy;
              pill.angle += pill.va;
            }
          });

          // 2. Resolve Wall Collisions
          pills.forEach((pill, idx) => {
            if (idx === dragIdx) return;

            const circles = getPillCircles(pill);
            let maxDepth = 0;
            let collisionType = ''; // 'left', 'right', 'floor', 'ceiling'
            let collidedCircle = null;

            circles.forEach((c) => {
              // Left Wall
              if (c.wx - c.r < pad) {
                const depth = pad - (c.wx - c.r);
                if (depth > maxDepth) {
                  maxDepth = depth;
                  collisionType = 'left';
                  collidedCircle = c;
                }
              }

              // Right Wall
              if (c.wx + c.r > w - pad) {
                const depth = (c.wx + c.r) - (w - pad);
                if (depth > maxDepth) {
                  maxDepth = depth;
                  collisionType = 'right';
                  collidedCircle = c;
                }
              }

              // Bottom Wall (Floor)
              if (c.wy + c.r > h - pad) {
                const depth = (c.wy + c.r) - (h - pad);
                if (depth > maxDepth) {
                  maxDepth = depth;
                  collisionType = 'floor';
                  collidedCircle = c;
                }
              }

              // Top Wall (Ceiling - only if already fully inside)
              if (pill.cy - pill.height / 2 > pad && c.wy - c.r < pad) {
                const depth = pad - (c.wy - c.r);
                if (depth > maxDepth) {
                  maxDepth = depth;
                  collisionType = 'ceiling';
                  collidedCircle = c;
                }
              }
            });

            if (collisionType !== '') {
              const c = collidedCircle;
              const depth = maxDepth;
              const bounce = 0.25; // Lower bounciness for soft, solid collisions

              if (collisionType === 'left') {
                pill.cx += depth;
                const ry = c.wy - pill.cy;
                const vCx = pill.vx - pill.va * ry;
                if (vCx < 0) {
                  const rn = -ry;
                  const j = -(1 + bounce) * vCx / (1 / pill.mass + (rn * rn) / pill.inertia);
                  pill.vx += j / pill.mass;
                  pill.va += (j * rn) / pill.inertia;
                }
              } else if (collisionType === 'right') {
                pill.cx -= depth;
                const ry = c.wy - pill.cy;
                const vCx = pill.vx - pill.va * ry;
                if (vCx > 0) {
                  const rn = ry;
                  const j = -(1 + bounce) * (-vCx) / (1 / pill.mass + (rn * rn) / pill.inertia);
                  pill.vx -= j / pill.mass;
                  pill.va += (j * rn) / pill.inertia;
                }
              } else if (collisionType === 'floor') {
                pill.cy -= depth;
                const rx = c.wx - pill.cx;
                const vCy = pill.vy + pill.va * rx;
                if (vCy > 0) {
                  const rn = -rx;
                  const j = -(1 + bounce * 0.3) * (-vCy) / (1 / pill.mass + (rn * rn) / pill.inertia);
                  pill.vy -= j / pill.mass;
                  pill.va += (j * rn) / pill.inertia;
                }
                // Damping on the floor to stabilize sliding
                pill.vx *= 0.93;
                pill.va *= 0.90;
              } else if (collisionType === 'ceiling') {
                pill.cy += depth;
                const rx = c.wx - pill.cx;
                const vCy = pill.vy + pill.va * rx;
                if (vCy < 0) {
                  const rn = rx;
                  const j = -(1 + bounce) * vCy / (1 / pill.mass + (rn * rn) / pill.inertia);
                  pill.vy += j / pill.mass;
                  pill.va += (j * rn) / pill.inertia;
                }
              }
            }
          });

          // 3. Resolve Pill-to-Pill Collisions
          for (let i = 0; i < pills.length; i++) {
            for (let j = i + 1; j < pills.length; j++) {
              const p1 = pills[i];
              const p2 = pills[j];

              const circles1 = getPillCircles(p1);
              const circles2 = getPillCircles(p2);

              let deepestCollision = null;
              let maxDepth = 0;

              circles1.forEach((c1) => {
                circles2.forEach((c2) => {
                  const dx = c1.wx - c2.wx;
                  const dy = c1.wy - c2.wy;
                  const distSq = dx * dx + dy * dy;
                  const minDist = c1.r + c2.r;

                  if (distSq < minDist * minDist) {
                    const dist = Math.sqrt(distSq) || 0.001;
                    const depth = minDist - dist;
                    if (depth > maxDepth) {
                      maxDepth = depth;
                      deepestCollision = { c1, c2, dx, dy, dist, depth };
                    }
                  }
                });
              });

              if (deepestCollision) {
                const { c2, dx, dy, dist, depth } = deepestCollision;
                const nx = dx / dist;
                const ny = dy / dist;

                const invMass1 = (i === dragIdx) ? 0 : 1 / p1.mass;
                const invInertia1 = (i === dragIdx) ? 0 : 1 / p1.inertia;
                const invMass2 = (j === dragIdx) ? 0 : 1 / p2.mass;
                const invInertia2 = (j === dragIdx) ? 0 : 1 / p2.inertia;

                const totalInvMass = invMass1 + invMass2;
                if (totalInvMass > 0) {
                  // Positional correction (Baumgarte) - soft to avoid jitter
                  const percent = 0.28;
                  const slop = 0.08;
                  const correctionAmount = Math.max(depth - slop, 0) / totalInvMass * percent;
                  const correctionX = correctionAmount * nx;
                  const correctionY = correctionAmount * ny;

                  if (i !== dragIdx) {
                    p1.cx += correctionX * invMass1;
                    p1.cy += correctionY * invMass1;
                  }
                  if (j !== dragIdx) {
                    p2.cx -= correctionX * invMass2;
                    p2.cy -= correctionY * invMass2;
                  }

                  // Contact point offsets from centers
                  const contactX = c2.wx + nx * c2.r;
                  const contactY = c2.wy + ny * c2.r;

                  const r1x = contactX - p1.cx;
                  const r1y = contactY - p1.cy;
                  const r2x = contactX - p2.cx;
                  const r2y = contactY - p2.cy;

                  const v1x = p1.vx - p1.va * r1y;
                  const v1y = p1.vy + p1.va * r1x;
                  const v2x = p2.vx - p2.va * r2y;
                  const v2y = p2.vy + p2.va * r2x;

                  const rvx = v1x - v2x;
                  const rvy = v1y - v2y;
                  const velAlongNormal = rvx * nx + rvy * ny;

                  if (velAlongNormal < 0) { // Moving towards each other
                    const rn1 = r1x * ny - r1y * nx;
                    const rn2 = r2x * ny - r2y * nx;

                    const e = 0.22; // Low restitution for a solid, premium feel (no rattle/jitter)
                    const denom = invMass1 + invMass2 + (rn1 * rn1) * invInertia1 + (rn2 * rn2) * invInertia2;
                    const impulse = -(1 + e) * velAlongNormal / denom;

                    if (i !== dragIdx) {
                      p1.vx += impulse * invMass1 * nx;
                      p1.vy += impulse * invMass1 * ny;
                      p1.va += impulse * rn1 * invInertia1;
                    }
                    if (j !== dragIdx) {
                      p2.vx -= impulse * invMass2 * nx;
                      p2.vy -= impulse * invMass2 * ny;
                      p2.va -= impulse * rn2 * invInertia2;
                    }
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

          // Update motion values
          pill.motionX.set(pill.cx - pill.width / 2);
          pill.motionY.set(pill.cy - pill.height / 2);
          pill.motionRotate.set(pill.angle * (180 / Math.PI));
        });
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerSize, isReady, startSim]);

  // Pointer dragging implementation
  const handlePointerDown = (e, index) => {
    e.preventDefault();
    const pill = pillsRef.current[index];
    draggingIndexRef.current = index;
    pill.isDragging = true;
    setActiveDragIndex(index);

    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    pointerRef.current = { x: pointerX, y: pointerY };
    dragStartPosRef.current = { x: pointerX, y: pointerY };
    pointerOffsetRef.current = {
      x: pointerX - pill.cx,
      y: pointerY - pill.cy
    };

    // Calculate local click offset relative to the pill's rotated coordinate frame
    const dx = pointerX - pill.cx;
    const dy = pointerY - pill.cy;
    const cosA = Math.cos(pill.angle);
    const sinA = Math.sin(pill.angle);
    pill.dragLocalX = dx * cosA + dy * sinA;
    pill.dragLocalY = -dx * sinA + dy * cosA;

    pill.vx = 0;
    pill.vy = 0;
    pill.va = 0;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      const idx = draggingIndexRef.current;
      if (idx === null || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      pointerRef.current = { x: pointerX, y: pointerY };
    };

    const handlePointerUp = () => {
      const idx = draggingIndexRef.current;
      if (idx !== null) {
        const pill = pillsRef.current[idx];
        pill.isDragging = false;

        // Check if it's a quick click on the down arrow
        const dx = pointerRef.current.x - dragStartPosRef.current.x;
        const dy = pointerRef.current.y - dragStartPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 5 && (pill.type === 'circle-arrow' || pill.text === '\u2193')) {
          window.scrollTo({
            top: window.innerHeight * 0.85,
            behavior: 'smooth'
          });
        }
      }
      draggingIndexRef.current = null;
      setActiveDragIndex(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden select-none bg-transparent"
    >
      {isReady && pillsRef.current.map((pill, idx) => {
        const isCircle = pill.type === 'circle' || pill.type === 'circle-arrow';
        const isSquircle = pill.type === 'kix' || pill.type === 'oval-small';
        const isDragged = activeDragIndex === idx;

        return (
          <motion.div
            key={idx}
            style={{
              x: pill.motionX,
              y: pill.motionY,
              opacity: pill.motionOpacity,
              rotate: pill.motionRotate,
              width: pill.width,
              height: pill.height
            }}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.08 }}
            className={`absolute left-0 top-0 cursor-grab active:cursor-grabbing select-none font-mono tracking-[0.12em] border flex items-center justify-center text-center transition-[border-color,background-color,box-shadow,color] duration-300 ${
              isCircle 
                ? `rounded-full font-sans text-4xl md:text-6xl font-bold leading-none bg-[#eaeaea] text-[#161618] border-transparent light:bg-[#161618] light:text-[#eaeaea] ${
                    isDragged ? 'shadow-[0_12px_28px_rgba(0,0,0,0.22)]' : 'shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
                  }` 
                : isSquircle
                  ? `rounded-[16px] text-xs md:text-sm font-normal text-[#eaeaea] bg-transparent hover:bg-white/5 hover:border-white/40 light:text-[#161618] light:border-[#161618]/25 light:hover:bg-black/5 ${
                      isDragged 
                        ? 'border-white/60 bg-white/5 shadow-[0_8px_24px_rgba(255,255,255,0.08)] light:border-neutral-900/60 light:bg-black/5' 
                        : 'border-[#eaeaea]/25 shadow-sm'
                    }`
                  : `rounded-full text-xs md:text-sm font-normal text-[#eaeaea] bg-transparent hover:bg-white/5 hover:border-white/40 light:text-[#161618] light:border-[#161618]/25 light:hover:bg-black/5 ${
                      isDragged 
                        ? 'border-white/60 bg-white/5 shadow-[0_8px_24px_rgba(255,255,255,0.08)] light:border-neutral-900/60 light:bg-black/5' 
                        : 'border-[#eaeaea]/25 shadow-sm'
                    }`
            }`}
          >
            {pill.text}
          </motion.div>
        );
      })}
    </div>
  );
}
