import React, { useRef, useEffect } from 'react';
import { ParticleField } from './ParticleField';

export const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      data-testid="video-section"
      className="relative w-full overflow-hidden pt-20"
      style={{ backgroundColor: 'var(--black-rich)', zIndex: 1 }}
    >
      {/* Video Container */}
      <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          data-testid="hero-video"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_0b42685e-05d6-4cc8-96a2-cc86172006b2/artifacts/750i6mch_Adastra%20Ad.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Particle overlay on video */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <ParticleField id="video-particles" density="light" />
        </div>

        {/* Gradient overlay at bottom for smooth transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--black-rich) 100%)',
            zIndex: 3
          }}
        />
      </div>
    </section>
  );
};
