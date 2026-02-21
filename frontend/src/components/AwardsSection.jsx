import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import awardImg from '../assets/images/award.png';

const ease = [0.25, 0.46, 0.45, 0.94];

const awards = [
  {
    text: "We're proud recipients of",
    bold: "Cummins'",
    rest: "prestigious Diversity Supplier of the Year Award.",
  },
  {
    text: 'Ranked first amongst the top 5 fastest growing HR firms by',
    bold: 'Silicon India.',
    rest: '',
  },
  {
    text: "We're uniquely recognized as the sole Indian company featured as a \"Case Study\" by",
    bold: 'Oxford Economics',
    rest: 'in an Amex study on SME Pulse, showcasing how global SMEs are driving growth.',
  },
  {
    text: 'Our global outreach was spotlighted by',
    bold: 'Forbes Magazine.',
    rest: '',
  },
];

const logos = ['Forbes', 'Silicon India', 'Oxford Economics'];

export const AwardsSection = () => (
  <section
    className="relative py-24 lg:py-32 overflow-hidden"
    style={{ backgroundColor: 'var(--black-rich)' }}
    data-testid="awards-section"
  >
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="mb-14"
      >
        <div className="accent-line mb-6" />
        <span className="section-label">Recognition</span>
        <h2
          className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.08]"
          style={{ color: 'var(--white-pure)' }}
        >
          Awards & Recognition
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Award Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <img
            src={awardImg}
            alt="Cummins Diversity Supplier of the Year Award — Ad Astra Consultants"
            className="max-h-[420px] lg:max-h-[480px] w-auto object-contain drop-shadow-[0_0_40px_rgba(232,96,28,0.15)]"
            data-testid="award-image"
          />
        </motion.div>

        {/* Award Points */}
        <div className="space-y-7">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
            >
              <Star
                size={20}
                className="flex-shrink-0 mt-1"
                style={{ color: 'var(--orange-core)' }}
                fill="var(--orange-core)"
              />
              <p
                className="font-body text-[0.9375rem] lg:text-base leading-[1.75]"
                style={{ color: 'var(--text-on-dark-muted)' }}
              >
                {a.text}{' '}
                <span className="font-600" style={{ color: 'var(--white-pure)' }}>
                  {a.bold}
                </span>{' '}
                {a.rest}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured In Logos */}
      <motion.div
        className="mt-20 pt-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      >
        <p
          className="font-mono text-[0.625rem] tracking-[0.2em] uppercase mb-8 text-center"
          style={{ color: 'var(--text-on-dark-muted)' }}
        >
          Featured In
        </p>
        <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
          {logos.map((name) => (
            <span
              key={name}
              className="font-display text-lg lg:text-xl font-700 tracking-wide opacity-40 hover:opacity-70 transition-opacity duration-300"
              style={{ color: 'var(--white-pure)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
