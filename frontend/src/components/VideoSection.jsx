import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      data-testid="video-section"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--black-rich)' }}
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
            src="https://customer-assets.emergentagent.com/job_0b42685e-05d6-4cc8-96a2-cc86172006b2/artifacts/pnnglkcr_Adastra%20Ad.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Gradient overlay at bottom for smooth transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--black-rich) 100%)'
          }}
        />

        {/* Video Controls */}
        <motion.div 
          className="absolute bottom-6 right-6 flex gap-3 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            onClick={togglePlay}
            data-testid="video-play-toggle"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {isPlaying ? (
              <Pause size={18} color="var(--white-pure)" />
            ) : (
              <Play size={18} color="var(--white-pure)" />
            )}
          </button>
          <button
            onClick={toggleMute}
            data-testid="video-mute-toggle"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {isMuted ? (
              <VolumeX size={18} color="var(--white-pure)" />
            ) : (
              <Volume2 size={18} color="var(--white-pure)" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
