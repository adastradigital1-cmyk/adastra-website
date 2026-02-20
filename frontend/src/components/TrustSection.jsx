import React from 'react';
import { motion } from 'framer-motion';
import { awards, testimonials, mediaLogos } from '../data/mock';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

export const TrustSection = () => (
  <section
    className="py-32 lg:py-40"
    style={{ backgroundColor: 'var(--white-cream)' }}
    data-testid="trust-section"
  >
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      {/* Header */}
      <motion.div
        className="mb-20"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp} transition={{ duration: 0.8, ease }}
      >
        <div className="accent-line mb-6" />
        <span className="section-label">04 — Recognition</span>
        <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>
          Trusted by Industry Leaders
        </h2>
      </motion.div>

      {/* Media logos */}
      <motion.div
        className="flex flex-wrap items-center gap-10 lg:gap-16 mb-20"
        initial="hidden" whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08 }}
      >
        {mediaLogos.map((logo) => (
          <motion.div key={logo} variants={fadeUp} transition={{ duration: 0.5, ease }} className="group cursor-default" data-testid={`media-${logo.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="font-display text-[1.125rem] font-600 tracking-wide transition-colors duration-500" style={{ color: '#C8C0B8' }}>
              {logo}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Awards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        {awards.map((award, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ duration: 0.7, ease }}
            className="glass-card-light !p-6 !rounded-2xl"
            data-testid={`award-${i}`}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--orange-ghost)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
            </div>
            <p className="font-body text-[0.875rem] leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>
              <span className="font-600" style={{ color: 'var(--text-on-light)' }}>{award.highlight}</span>
              {' — '}{award.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Pull quote testimonial */}
      <motion.div
        className="max-w-[700px]"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp} transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <blockquote className="pull-quote">
          <p className="font-display text-[1.5rem] lg:text-[2rem] font-500 italic leading-[1.45]" style={{ color: 'var(--text-on-light)' }}>
            "{testimonials[0].quote}"
          </p>
          <footer className="mt-6">
            <p className="font-body font-600 text-[0.9375rem]" style={{ color: 'var(--text-on-light)' }}>
              {testimonials[0].name}
            </p>
            <p className="font-mono text-[0.6875rem] mt-1" style={{ color: 'var(--text-on-light-muted)' }}>
              {testimonials[0].title}, {testimonials[0].company}
            </p>
          </footer>
        </blockquote>
      </motion.div>
    </div>
  </section>
);
