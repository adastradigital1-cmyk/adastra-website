import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Upload } from 'lucide-react';
import { ParticleField } from './ParticleField';

const ease = [0.25, 0.46, 0.45, 0.94];

export const CTASection = ({ onConsultation, onSubmitCV }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="cta-section"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="cta-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--orange-core)] opacity-[0.04] rounded-full blur-[150px]" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Ready to Find Exceptional Talent?
          </h2>
          <p className="font-body text-[1.0625rem] mt-5 max-w-[500px] mx-auto" style={{ color: 'var(--text-on-dark-muted)' }}>
            Let's build your next high-performing team together.
          </p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <button onClick={onConsultation} data-testid="cta-consultation-btn" className="btn-primary">
              Schedule Consultation <ArrowRight size={16} />
            </button>
            <button onClick={onSubmitCV} data-testid="cta-cv-btn" className="btn-secondary btn-secondary-dark">
              <Upload size={16} /> Submit CV
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
