import React, { useEffect, useRef } from 'react';

export const AnimatedGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(242, 101, 34, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < maxDist
          ? `rgba(242, 101, 34, ${0.3 * (1 - dist / maxDist)})`
          : `rgba(242, 101, 34, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections near mouse
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const mdx = mouse.x - (a.x + b.x) / 2;
            const mdy = mouse.y - (a.y + b.y) / 2;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const opacity = mDist < 200
              ? 0.12 * (1 - mDist / 200)
              : 0.02 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(242, 101, 34, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => { resize(); createParticles(); });
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'all', zIndex: 0 }}
    />
  );
};

export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-[15%] right-[10%] w-72 h-72 floating-shape-1">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(242,101,34,0.06)" strokeWidth="1" strokeDasharray="8 4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(242,101,34,0.04)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Hexagon */}
      <div className="absolute bottom-[20%] left-[5%] w-40 h-40 floating-shape-2 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="rgba(242,101,34,0.05)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Dot grid */}
      <div className="absolute top-[40%] right-[3%] w-24 h-24 hidden xl:block floating-shape-3">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {[...Array(5)].map((_, row) =>
            [...Array(5)].map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={6 + col * 12}
                cy={6 + row * 12}
                r="1.5"
                fill="rgba(242,101,34,0.08)"
              />
            ))
          )}
        </svg>
      </div>

      {/* Cross pattern */}
      <div className="absolute top-[60%] left-[8%] w-16 h-16 floating-shape-1 hidden lg:block">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(242,101,34,0.06)" strokeWidth="0.5" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(242,101,34,0.06)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export const DataFlowLines = ({ className }) => {
  return (
    <svg className={`absolute ${className}`} viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
      <path
        d="M0 50 Q100 20 200 50 Q300 80 400 50"
        stroke="rgba(242,101,34,0.08)"
        strokeWidth="1"
        className="data-flow-line"
      />
      <circle r="3" fill="rgba(242,101,34,0.3)" className="data-flow-dot">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M0 50 Q100 20 200 50 Q300 80 400 50"
        />
      </circle>
    </svg>
  );
};

export const PulsingRing = ({ size = 80, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border border-[#F26522]/10 animate-ping-slow"
      />
      <div
        className="absolute inset-2 rounded-full border border-[#F26522]/15"
      />
      <div
        className="absolute inset-4 rounded-full bg-[#F26522]/5"
      />
    </div>
  );
};
