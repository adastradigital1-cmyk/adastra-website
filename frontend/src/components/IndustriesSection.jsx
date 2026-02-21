import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industries } from '../data/mock';
import { Monitor, Factory, Landmark, HeartPulse, Truck, Zap, ShoppingBag } from 'lucide-react';
import { ParticleField } from './ParticleField';

const iconMap = { Monitor, Factory, Landmark, HeartPulse, Truck, Zap, ShoppingBag };
const ease = [0.25, 0.46, 0.45, 0.94];

export const IndustriesSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: 'var(--black-rich)' }}
      data-testid="industries-section"
    >
      {/* Background particles */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="industries-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="accent-line mb-6" />
          <span className="section-label">03 — Industries</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>
            Sectors We Serve
          </h2>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease }}
      >
        <div className="industries-scroll-container">
          <div className="industries-scroll-track">
            {[...industries, ...industries, ...industries].map((ind, i) => {
              const Icon = iconMap[ind.icon];
              return (
                <div key={`${ind.name}-${i}`} className="group flex-shrink-0 flex items-center gap-3 px-10 py-6 cursor-pointer">
                  <Link to="/industries" className="flex items-center gap-3 no-underline">
                    <Icon size={18} className="text-[var(--text-on-dark-muted)] group-hover:text-[var(--orange-core)] transition-colors duration-300 flex-shrink-0" />
                    <span className="relative font-body text-[0.9375rem] font-500 whitespace-nowrap transition-colors duration-300 text-[var(--text-on-dark-muted)] group-hover:text-[var(--text-on-dark)]">
                      {ind.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--orange-core)] rounded-full transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
