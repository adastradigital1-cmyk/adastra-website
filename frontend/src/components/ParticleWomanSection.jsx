import React from 'react';
import { motion } from 'framer-motion';
import { ParticleWoman } from './ParticleWoman';

const ease = [0.25, 0.46, 0.45, 0.94];

export const ParticleWomanSection = () => (
  <section
    className="relative py-16 lg:py-24 overflow-hidden"
    style={{ backgroundColor: 'var(--black-rich)' }}
    data-testid="particle-woman-section"
  >
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label">Empowering Leadership</span>
          <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--white-pure)' }}>
            India's Largest Women-Owned Recruitment Firm
          </h2>
          <p className="font-body text-[1rem] mt-5 leading-[1.8] max-w-[500px]" style={{ color: 'var(--text-on-dark-muted)' }}>
            With 80% women workforce and pioneering female leadership, Ad Astra Consultants champions diversity and inclusion at every level.
          </p>
          <div className="mt-6" />
        </motion.div>

        {/* Particle Woman */}
        <motion.div
          className="relative h-[500px] lg:h-[600px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease }}
        >
          <ParticleWoman />
        </motion.div>
      </div>
    </div>
  </section>
);
