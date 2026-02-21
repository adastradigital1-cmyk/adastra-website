import React, { useRef, useEffect, useCallback, useState } from 'react';

export const ParticleWoman = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const sampleSVG = useCallback((canvasW, canvasH) => {
    return new Promise((resolve) => {
      fetch('/face.svg')
        .then((res) => res.text())
        .then((svgText) => {
          const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(url);
            const offscreen = document.createElement('canvas');
            const aspect = 337.88 / 512;
            const drawH = canvasH * 0.9;
            const drawW = drawH * aspect;
            offscreen.width = Math.round(drawW);
            offscreen.height = Math.round(drawH);
            const octx = offscreen.getContext('2d');
            octx.drawImage(img, 0, 0, offscreen.width, offscreen.height);

            const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
            const data = imageData.data;
            const w = offscreen.width;
            const h = offscreen.height;

            const gap = 3;
            const points = [];
            for (let y = 0; y < h; y += gap) {
              for (let x = 0; x < w; x += gap) {
                const i = (y * w + x) * 4;
                const a = data[i + 3];
                if (a > 20) {
                  const r = data[i];
                  const g = data[i + 1];
                  const b = data[i + 2];
                  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                  if (brightness < 0.97) {
                    points.push({ nx: x / w, ny: y / h, brightness });
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
                x: tx + (Math.random() - 0.5) * 500,
                y: ty + (Math.random() - 0.5) * 500,
                tx,
                ty,
                size: 0.8 + b * 1.6,
                brightness: b,
                alpha: 0.35 + b * 0.65,
                pulse: Math.random() * Math.PI * 2,
              };
            });
            resolve(particles);
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve([]);
          };
          img.src = url;
        })
        .catch(() => resolve([]));
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

      const assembleProgress = Math.min(elapsed / 2.5, 1);
      const ease = assembleProgress * assembleProgress * (3 - 2 * assembleProgress);

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.pulse += 0.012;

        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const radius = 80;
        const radiusSq = radius * radius;

        let targetX = p.tx + Math.sin(time * 0.35 + p.pulse) * 0.5;
        let targetY = p.ty + Math.cos(time * 0.25 + p.pulse) * 0.4;

        if (distSq < radiusSq && ease > 0.8) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 30;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        const spd = 0.03 + ease * 0.07;
        p.x += (targetX - p.x) * spd;
        p.y += (targetY - p.y) * spd;

        const glow = Math.sin(p.pulse) * 0.1 + 0.9;
        const a = p.alpha * glow;
        const b = p.brightness;

        const pr = Math.round(232 * (0.25 + b * 0.75));
        const pg = Math.round(96 * (0.15 + b * 0.85));
        const pb = Math.round(20 + b * 55);

        ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${a * 0.04})`;
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
