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
            const drawH = canvasH * 0.92;
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
                const idx = (y * w + x) * 4;
                const a = data[idx + 3];
                if (a > 20) {
                  const r = data[idx];
                  const g = data[idx + 1];
                  const b = data[idx + 2];
                  const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                  if (lum < 0.97) {
                    points.push({ nx: x / w, ny: y / h, lum });
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
                x: tx + (Math.random() - 0.5) * 600,
                y: ty + (Math.random() - 0.5) * 600,
                tx, ty,
                size: 0.6 + p.lum * 1.4,
                lum: p.lum,
                alpha: 0.3 + p.lum * 0.7,
                pulse: Math.random() * Math.PI * 2,
              };
            });
            resolve(particles);
          };
          img.onerror = () => { URL.revokeObjectURL(url); resolve([]); };
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
    let start = 0;

    const init = async () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const pts = await sampleSVG(canvas.width, canvas.height);
      if (!active) return;
      particlesRef.current = pts;
      start = performance.now();
      setLoaded(true);
    };
    init();

    const onResize = async () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const pts = await sampleSVG(canvas.width, canvas.height);
      if (!active) return;
      particlesRef.current = pts;
      start = performance.now();
    };
    window.addEventListener('resize', onResize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const animate = () => {
      if (!active) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      const now = performance.now();
      const elapsed = (now - start) / 1000;
      const t = now * 0.001;
      const particles = particlesRef.current;
      const len = particles.length;

      const prog = Math.min(elapsed / 2.5, 1);
      const ease = prog * prog * (3 - 2 * prog);

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.pulse += 0.01;

        let targetX = p.tx + Math.sin(t * 0.3 + p.pulse) * 0.4;
        let targetY = p.ty + Math.cos(t * 0.2 + p.pulse) * 0.3;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dSq = dx * dx + dy * dy;
        if (dSq < 6400 && ease > 0.7) {
          const d = Math.sqrt(dSq);
          const f = (1 - d / 80) * 28;
          targetX += (dx / d) * f;
          targetY += (dy / d) * f;
        }

        const spd = 0.025 + ease * 0.075;
        p.x += (targetX - p.x) * spd;
        p.y += (targetY - p.y) * spd;
      }

      // Draw connection lines (check a subset for performance)
      ctx.lineWidth = 0.3;
      const step = len > 5000 ? 3 : 1;
      for (let i = 0; i < len; i += step) {
        const a = particles[i];
        for (let j = i + step; j < Math.min(i + 30, len); j += step) {
          const b = particles[j];
          const dd = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (dd < 144) {
            const opacity = (1 - Math.sqrt(dd) / 12) * 0.12;
            ctx.strokeStyle = `rgba(232,96,28,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const glow = Math.sin(p.pulse) * 0.1 + 0.9;
        const al = p.alpha * glow;
        const l = p.lum;

        // Color mapping: dark parts = deep brown/orange, bright = vivid orange/gold
        const r = Math.round(180 + l * 72);   // 180-252
        const g = Math.round(50 + l * 80);    // 50-130
        const b = Math.round(10 + l * 50);    // 10-60

        ctx.fillStyle = `rgba(${r},${g},${b},${al})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow for brighter particles
        if (l > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,96,28,${al * 0.03})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
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
