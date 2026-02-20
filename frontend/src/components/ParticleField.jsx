import React, { useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

let engineReady = false;
initParticlesEngine(async (engine) => {
  await loadSlim(engine);
  engineReady = true;
});

export const ParticleField = ({ id = 'hero-particles', density = 'normal' }) => {
  const count = density === 'light' ? 25 : density === 'normal' ? 50 : 80;
  const speed = density === 'light' ? 0.3 : 0.5;

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: count,
        density: { enable: true, area: 1200 },
      },
      color: { value: ['#E8601C', '#F07A3A', '#FFFFFF', '#D4993D'] },
      opacity: {
        value: { min: 0.08, max: 0.35 },
        animation: { enable: true, speed: 0.4, minimumValue: 0.05, sync: false },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 1, minimumValue: 0.5, sync: false },
      },
      links: {
        enable: true,
        color: '#E8601C',
        opacity: 0.06,
        distance: 160,
        width: 0.5,
      },
      move: {
        enable: true,
        speed: speed,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.12, color: '#E8601C' } },
      },
    },
    detectRetina: true,
  }), [count, speed]);

  return (
    <Particles
      id={id}
      options={options}
      className="absolute inset-0 pointer-events-auto"
      style={{ position: 'absolute', inset: 0 }}
    />
  );
};
