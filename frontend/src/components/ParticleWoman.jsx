import React, { useRef, useEffect, useCallback } from 'react';

// Silhouette of an empowered woman standing confidently - defined as normalized [0-1] coordinate pairs
const SILHOUETTE_POINTS = [];

// Generate silhouette shape programmatically - standing woman with confident pose
function generateSilhouette() {
  const points = [];
  const addPoint = (x, y) => points.push([x, y]);

  // Head - circle of points
  for (let a = 0; a < Math.PI * 2; a += 0.15) {
    addPoint(0.5 + Math.cos(a) * 0.06, 0.08 + Math.sin(a) * 0.06);
  }

  // Neck
  addPoint(0.49, 0.15); addPoint(0.51, 0.15);

  // Shoulders and torso
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    // Left side
    addPoint(0.38 + t * 0.04, 0.17 + t * 0.05);
    // Right side  
    addPoint(0.62 - t * 0.04, 0.17 + t * 0.05);
  }

  // Left arm - extended outward (power pose)
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    addPoint(0.38 - t * 0.18, 0.2 - t * 0.04 + Math.sin(t * Math.PI) * 0.02);
  }
  // Left hand
  addPoint(0.18, 0.14); addPoint(0.17, 0.13); addPoint(0.16, 0.15);

  // Right arm - hand on hip
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    addPoint(0.62 + t * 0.08, 0.2 + t * 0.12);
  }
  addPoint(0.68, 0.34); addPoint(0.65, 0.36);

  // Torso body
  for (let i = 0; i < 15; i++) {
    const t = i / 14;
    const y = 0.22 + t * 0.22;
    const narrowing = Math.sin(t * Math.PI) * 0.03;
    addPoint(0.42 + narrowing, y);
    addPoint(0.58 - narrowing, y);
    // Inner detail
    if (i % 3 === 0) {
      addPoint(0.48, y);
      addPoint(0.52, y);
    }
  }

  // Waist
  addPoint(0.44, 0.44); addPoint(0.56, 0.44);

  // Hips
  addPoint(0.40, 0.46); addPoint(0.60, 0.46);

  // Saree/skirt flowing lines
  for (let i = 0; i < 20; i++) {
    const t = i / 19;
    const y = 0.46 + t * 0.38;
    const spread = 0.12 + t * 0.10;
    addPoint(0.50 - spread, y);
    addPoint(0.50 + spread, y);
    // Fabric folds
    if (i % 2 === 0) {
      addPoint(0.50 - spread * 0.6, y);
      addPoint(0.50 + spread * 0.5, y);
      addPoint(0.50 - spread * 0.3, y);
    }
  }

  // Bottom hem
  for (let x = 0.28; x <= 0.72; x += 0.03) {
    addPoint(x, 0.84 + Math.sin(x * 30) * 0.01);
  }

  // Left leg visible through
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    addPoint(0.44 - t * 0.02, 0.7 + t * 0.14);
  }

  // Feet
  addPoint(0.36, 0.86); addPoint(0.34, 0.87); addPoint(0.38, 0.87);
  addPoint(0.60, 0.86); addPoint(0.62, 0.87); addPoint(0.58, 0.87);

  // Hair flowing
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    addPoint(0.44 - t * 0.06, 0.04 + t * 0.14);
    addPoint(0.56 + t * 0.02, 0.04 + t * 0.10);
  }

  // Dupatta/scarf flowing from shoulder
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    addPoint(0.38 - t * 0.04, 0.22 + t * 0.3);
    addPoint(0.36 - t * 0.05, 0.25 + t * 0.3);
  }

  // Add more density in the center/torso area
  for (let i = 0; i < 30; i++) {
    const x = 0.40 + Math.random() * 0.20;
    const y = 0.20 + Math.random() * 0.30;
    addPoint(x, y);
  }

  // Add more density to the lower garment
  for (let i = 0; i < 40; i++) {
    const y = 0.46 + Math.random() * 0.38;
    const spread = 0.12 + ((y - 0.46) / 0.38) * 0.10;
    const x = 0.50 + (Math.random() - 0.5) * spread * 2;
    addPoint(x, y);
  }

  return points;
}

const silhouetteData = generateSilhouette();

export const ParticleWoman = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const initParticles = useCallback((width, height) => {
    const offsetX = width * 0.1;
    const offsetY = height * 0.02;
    const scaleX = width * 0.8;
    const scaleY = height * 0.96;

    return silhouetteData.map(([nx, ny]) => {
      const tx = offsetX + nx * scaleX;
      const ty = offsetY + ny * scaleY;
      return {
        x: tx + (Math.random() - 0.5) * 8,
        y: ty + (Math.random() - 0.5) * 8,
        tx,
        ty,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const time = Date.now() * 0.001;

      for (const p of particlesRef.current) {
        p.pulse += 0.02;

        // Mouse interaction - push particles away
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 100;

        let targetX = p.tx;
        let targetY = p.ty;

        if (dist < interactionRadius) {
          const force = (1 - dist / interactionRadius) * 50;
          targetX = p.tx + (dx / dist) * force;
          targetY = p.ty + (dy / dist) * force;
        }

        // Gentle floating motion
        targetX += Math.sin(time * 0.5 + p.pulse) * 2;
        targetY += Math.cos(time * 0.3 + p.pulse) * 1.5;

        // Ease towards target
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Draw particle
        const glow = Math.sin(p.pulse) * 0.2 + 0.8;
        const alpha = p.alpha * glow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 96, 28, ${alpha})`;
        ctx.fill();

        // Glow effect for larger particles
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 96, 28, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 25) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(232, 96, 28, ${0.08 * (1 - d / 25)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [initParticles]);

  return (
    <div className="relative w-full h-full" data-testid="particle-woman">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
};
