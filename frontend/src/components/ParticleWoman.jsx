import React, { useRef, useEffect, useCallback, useState } from 'react';

export const ParticleWoman = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const sampleSVG = useCallback((canvasW, canvasH) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const offscreen = document.createElement('canvas');
        const aspect = img.naturalWidth / img.naturalHeight;
        const drawH = canvasH * 0.92;
        const drawW = drawH * aspect;
        offscreen.width = drawW;
        offscreen.height = drawH;
        const octx = offscreen.getContext('2d');
        octx.drawImage(img, 0, 0, drawW, drawH);

        const imageData = octx.getImageData(0, 0, drawW, drawH);
        const data = imageData.data;

        const gap = 3;
        const points = [];
        for (let y = 0; y < drawH; y += gap) {
          for (let x = 0; x < drawW; x += gap) {
            const i = (y * drawW + x) * 4;
            const a = data[i + 3];
            if (a > 30) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const brightness = (r + g + b) / 3;
              if (brightness < 245) {
                points.push({ nx: x / drawW, ny: y / drawH, r, g, b });
              }
            }
          }
        }

        const offsetX = (canvasW - drawW) / 2;
        const offsetY = (canvasH - drawH) / 2;

        const particles = points.map((p) => {
          const tx = offsetX + p.nx * drawW;
          const ty = offsetY + p.ny * drawH;
          return {
            x: tx + (Math.random() - 0.5) * 300,
            y: ty + (Math.random() - 0.5) * 300,
            tx,
            ty,
            size: 1.0 + Math.random() * 1.5,
            r: p.r,
            g: p.g,
            b: p.b,
            alpha: 0.6 + Math.random() * 0.4,
            pulse: Math.random() * Math.PI * 2,
            vx: 0,
            vy: 0,
          };
        });
        resolve(particles);
      };
      img.onerror = () => resolve([]);
      img.src = '/face.svg';
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let active = true;

    const init = async () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const pts = await sampleSVG(canvas.width, canvas.height);
      if (!active) return;
      particlesRef.current = pts;
      setLoaded(true);
    };

    init();

    const handleResize = async () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const pts = await sampleSVG(canvas.width, canvas.height);
      if (!active) return;
      particlesRef.current = pts;
    };

    window.addEventListener('resize', handleResize);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    const animate = () => {
      if (!active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const time = performance.now() * 0.001;
      const particles = particlesRef.current;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.pulse += 0.015;

        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const radius = 80;
        const radiusSq = radius * radius;

        let targetX = p.tx + Math.sin(time * 0.4 + p.pulse) * 0.8;
        let targetY = p.ty + Math.cos(time * 0.3 + p.pulse) * 0.6;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 35;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        p.vx = (targetX - p.x) * 0.08;
        p.vy = (targetY - p.y) * 0.08;
        p.x += p.vx;
        p.y += p.vy;

        const glow = Math.sin(p.pulse) * 0.15 + 0.85;
        const a = p.alpha * glow;

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${a})`;
        ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [sampleSVG]);

  return (
    <div className="relative w-full h-full" data-testid="particle-woman">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  );
};
