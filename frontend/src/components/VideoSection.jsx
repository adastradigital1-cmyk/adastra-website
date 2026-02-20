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
      className="relative w-full pt-20"
      style={{ backgroundColor: 'var(--black-rich)', zIndex: 1, marginBottom: '-15vh' }}
    >
      {/* Video Container - extends into hero section */}
      <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '90vh' }}>
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

        {/* Particle overlay on video - full coverage with pointer events */}
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <ParticleField id="video-particles" density="normal" />
        </div>

        {/* Gradient overlay at bottom for seamless blend into hero */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '40%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(12,12,12,0.3) 40%, rgba(12,12,12,0.7) 70%, var(--black-rich) 100%)',
            zIndex: 6
          }}
        />
      </div>
    </section>
  );
};
