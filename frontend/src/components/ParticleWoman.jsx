import React, { useRef, useEffect, useCallback } from 'react';

// Generate a woman's face silhouette - just the face, neck and hair
function generateFacePoints() {
  const points = [];
  const add = (x, y) => points.push([x, y]);

  // Face oval
  for (let a = 0; a < Math.PI * 2; a += 0.06) {
    const rx = 0.22;
    const ry = 0.28;
    add(0.5 + Math.cos(a) * rx, 0.48 + Math.sin(a) * ry);
  }

  // Inner face contour
  for (let a = 0; a < Math.PI * 2; a += 0.10) {
    const rx = 0.17;
    const ry = 0.23;
    add(0.5 + Math.cos(a) * rx, 0.47 + Math.sin(a) * ry);
  }

  // Left eye
  for (let a = 0; a < Math.PI * 2; a += 0.25) {
    add(0.41 + Math.cos(a) * 0.04, 0.42 + Math.sin(a) * 0.015);
  }
  // Left eyebrow
  for (let t = 0; t <= 1; t += 0.15) {
    add(0.36 + t * 0.10, 0.38 - Math.sin(t * Math.PI) * 0.02);
  }

  // Right eye
  for (let a = 0; a < Math.PI * 2; a += 0.25) {
    add(0.59 + Math.cos(a) * 0.04, 0.42 + Math.sin(a) * 0.015);
  }
  // Right eyebrow
  for (let t = 0; t <= 1; t += 0.15) {
    add(0.54 + t * 0.10, 0.38 - Math.sin(t * Math.PI) * 0.02);
  }

  // Nose
  add(0.50, 0.45); add(0.49, 0.49); add(0.50, 0.51);
  add(0.51, 0.49); add(0.48, 0.52); add(0.52, 0.52);

  // Lips
  for (let t = 0; t <= 1; t += 0.12) {
    // Upper lip
    add(0.43 + t * 0.14, 0.58 - Math.sin(t * Math.PI) * 0.015);
    // Lower lip
    add(0.43 + t * 0.14, 0.59 + Math.sin(t * Math.PI) * 0.018);
  }

  // Jaw line
  for (let t = 0; t <= 1; t += 0.06) {
    const angle = -Math.PI * 0.3 + t * Math.PI * 0.6;
    add(0.5 + Math.cos(angle) * 0.23, 0.55 + Math.sin(angle) * 0.22);
  }

  // Chin
  add(0.49, 0.76); add(0.50, 0.77); add(0.51, 0.76);

  // Neck
  for (let t = 0; t <= 1; t += 0.12) {
    add(0.46, 0.76 + t * 0.12);
    add(0.54, 0.76 + t * 0.12);
  }

  // Hair — flowing left side
  for (let t = 0; t <= 1; t += 0.04) {
    const y = 0.15 + t * 0.65;
    const curve = Math.sin(t * Math.PI * 0.7) * 0.06;
    add(0.28 - curve - t * 0.06, y);
  }
  // Hair — flowing right side
  for (let t = 0; t <= 1; t += 0.04) {
    const y = 0.15 + t * 0.55;
    const curve = Math.sin(t * Math.PI * 0.7) * 0.04;
    add(0.72 + curve + t * 0.03, y);
  }

  // Hair top
  for (let t = 0; t <= 1; t += 0.04) {
    const x = 0.30 + t * 0.40;
    const bump = Math.sin(t * Math.PI) * 0.10;
    add(x, 0.18 - bump);
  }

  // Hair crown
  for (let t = 0; t <= 1; t += 0.05) {
    const x = 0.32 + t * 0.36;
    const bump = Math.sin(t * Math.PI) * 0.07;
    add(x, 0.22 - bump);
  }

  // Hair parting and volume
  for (let i = 0; i < 20; i++) {
    const t = Math.random();
    add(0.35 + t * 0.30, 0.12 + Math.random() * 0.15);
  }

  // Hair side volume left
  for (let t = 0; t <= 1; t += 0.06) {
    add(0.26 - Math.random() * 0.05, 0.22 + t * 0.40);
  }

  // Hair side volume right
  for (let t = 0; t <= 1; t += 0.06) {
    add(0.74 + Math.random() * 0.04, 0.22 + t * 0.35);
  }

  // Bindi / forehead accent
  add(0.50, 0.34); add(0.50, 0.33);

  // Cheek contours
  for (let i = 0; i < 5; i++) {
    add(0.35 + Math.random() * 0.04, 0.50 + Math.random() * 0.08);
    add(0.61 + Math.random() * 0.04, 0.50 + Math.random() * 0.08);
  }

  // Face fill density
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.18;
    const x = 0.5 + Math.cos(angle) * r;
    const y = 0.47 + Math.sin(angle) * r * 1.2;
    if (y > 0.25 && y < 0.72) add(x, y);
  }

  // Hair fill
  for (let i = 0; i < 30; i++) {
    const x = 0.30 + Math.random() * 0.40;
    const y = 0.10 + Math.random() * 0.20;
    add(x, y);
  }

  // Earring left
  add(0.28, 0.48); add(0.27, 0.50); add(0.27, 0.52);
  // Earring right
  add(0.72, 0.48); add(0.73, 0.50); add(0.73, 0.52);

  return points;
}

const faceData = generateFacePoints();

export const ParticleWoman = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const initParticles = useCallback((width, height) => {
    const offsetX = width * 0.05;
    const offsetY = height * 0.02;
    const scaleX = width * 0.9;
    const scaleY = height * 0.96;

    return faceData.map(([nx, ny]) => {
      const tx = offsetX + nx * scaleX;
      const ty = offsetY + ny * scaleY;
      return {
        x: tx + (Math.random() - 0.5) * 6,
        y: ty + (Math.random() - 0.5) * 6,
        tx, ty,
        size: 1 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
        pulse: Math.random() * Math.PI * 2,
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
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 90;

        let targetX = p.tx + Math.sin(time * 0.5 + p.pulse) * 1.5;
        let targetY = p.ty + Math.cos(time * 0.3 + p.pulse) * 1.2;

        if (dist < radius) {
          const force = (1 - dist / radius) * 40;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        const glow = Math.sin(p.pulse) * 0.2 + 0.8;
        const alpha = p.alpha * glow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 96, 28, ${alpha})`;
        ctx.fill();

        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 96, 28, ${alpha * 0.06})`;
          ctx.fill();
        }
      }

      // Connection lines
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 20) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(232, 96, 28, ${0.1 * (1 - d / 20)})`;
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
