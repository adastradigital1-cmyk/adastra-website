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

        const gap = 4;
        const points = [];
        for (let y = 0; y < drawH; y += gap) {
          for (let x = 0; x < drawW; x += gap) {
            const i = (y * drawW + x) * 4;
            const a = data[i + 3];
            if (a > 30) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
              if (brightness < 0.96) {
                points.push({ nx: x / drawW, ny: y / drawH, brightness });
              }
            }
          }
        }

        const offsetX = (canvasW - drawW) / 2;
        const offsetY = (canvasH - drawH) / 2;

        const particles = points.map((p) => {
          const tx = offsetX + p.nx * drawW;
          const ty = offsetY + p.ny * drawH;
          const b = p.brightness;
          return {
            x: tx + (Math.random() - 0.5) * 400,
            y: ty + (Math.random() - 0.5) * 400,
            tx,
            ty,
            size: 1.0 + b * 1.8,
            brightness: b,
            alpha: 0.4 + b * 0.6,
            pulse: Math.random() * Math.PI * 2,
            vx: 0,
            vy: 0,
            arrived: false,
          };
        });
        resolve(particles);
      };
      img.onerror = () => resolve([]);
      img.src = process.env.PUBLIC_URL + '/face.svg';
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let active = true;
    let startTime = 0;

    const init = async () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const pts = await sampleSVG(canvas.width, canvas.height);
      if (!active) return;
      particlesRef.current = pts;
      startTime = performance.now();
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
      startTime = performance.now();
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
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const time = now * 0.001;
      const particles = particlesRef.current;
      const len = particles.length;

      const assembleSpeed = Math.min(elapsed / 2.0, 1);
      const ease = assembleSpeed * assembleSpeed * (3 - 2 * assembleSpeed);

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.pulse += 0.012;

        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const radius = 85;
        const radiusSq = radius * radius;

        let targetX = p.tx + Math.sin(time * 0.35 + p.pulse) * 0.6;
        let targetY = p.ty + Math.cos(time * 0.25 + p.pulse) * 0.5;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 30;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        const spd = 0.04 + ease * 0.06;
        p.x += (targetX - p.x) * spd;
        p.y += (targetY - p.y) * spd;

        const glow = Math.sin(p.pulse) * 0.12 + 0.88;
        const a = p.alpha * glow;

        const b = p.brightness;
        const pr = Math.round(232 * (0.3 + b * 0.7));
        const pg = Math.round(96 * (0.2 + b * 0.8));
        const pb = Math.round(28 + b * 50);

        ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${a * 0.05})`;
          ctx.fill();
        }
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
        style={{ display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 1s ease' }}
      />
    </div>
  );
};
