import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const leaders = [
  {
    name: 'Jayanthi Yeshwant Kumar',
    role: 'Chairperson & Founder',
    img: 'https://customer-assets.emergentagent.com/job_b9092369-b34a-41d6-a266-b0660555d408/artifacts/wqjgwqs0_Jayanti.png',
    message: `At Ad Astra Consultants, I have always believed that talent is not a resource — it is a responsibility. Every hiring decision influences strategy, culture, and long-term performance.\n\nFrom leadership search to workforce scale, our focus has been on building systems that combine insight with execution discipline. We approach every mandate with structure, research, and a deep understanding of business context. Speed matters — but precision matters more.\n\nOver the years, what has defined us is not just the number of placements, but the partnerships we have built. We work closely with organisations during pivotal moments of growth and transformation, ensuring that talent decisions strengthen their future.\n\nOur vision remains clear — to elevate recruitment into a strategic growth enabler that delivers measurable impact.`,
    signoff: 'Jayanthi',
  },
  {
    name: 'Nirupama VG',
    role: 'Managing Director & Co-Founder',
    img: 'https://customer-assets.emergentagent.com/job_b9092369-b34a-41d6-a266-b0660555d408/artifacts/c1zt23l3_nirupama.png',
    message: `When we founded Ad Astra Consultants, our intention was simple: to create a talent advisory firm rooted in integrity, long-term thinking, and meaningful relationships.\n\nTalent acquisition is often treated as a transaction. We see it differently. For organisations, it is about building capability and leadership resilience. For professionals, it is about life-defining opportunities.\n\nI am proud of the ecosystem we have built — one that combines industry insight, disciplined processes, and a people-centric approach. As industries evolve and workforce models transform, our commitment remains to stay ahead of change while staying grounded in values.\n\nWe are grateful for the trust our clients and candidates continue to place in us, and we remain focused on shaping futures with responsibility and clarity.`,
    signoff: 'Nirupama',
  },
];

export const LeadersMessageSection = () => (
  <section
    className="py-28 lg:py-36 relative overflow-hidden"
    style={{ backgroundColor: 'var(--white-warm)' }}
    data-testid="leaders-message-section"
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15" style={{ background: 'linear-gradient(135deg, #D4993D 0%, #E8601C 100%)' }} />
    </div>

    <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
      <motion.div
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.8, ease }}
      >
        <div className="accent-line mb-6" />
        <span className="section-label">Leader's Message</span>
        <h2 className="font-display text-[2.25rem] lg:text-[3rem] font-700 mt-4 leading-[1.12]" style={{ color: 'var(--text-on-light)' }}>
          A Word From Our Founders
        </h2>
      </motion.div>

      <div className="space-y-16">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.15 }}
          >
            {/* Photo & Name */}
            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden mx-auto lg:mx-0">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="mt-5 text-center lg:text-left">
                <h3 className="font-display text-[1.25rem] font-600" style={{ color: 'var(--text-on-light)' }}>{leader.name}</h3>
                <p className="font-mono text-[0.625rem] mt-1" style={{ color: 'var(--orange-core)' }}>{leader.role}</p>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease }} className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="glass-card-light p-8 lg:p-10" data-testid={`leader-message-${i}`}>
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-5 opacity-20">
                  <path d="M0 24V14.4C0 10.4 0.8 7.2 2.4 4.8C4 2.4 6.667 0.533 10.4 0.2L11.2 3C8.8 3.533 7 4.6 5.8 6.2C4.6 7.8 4 9.733 4 12H10V24H0ZM18 24V14.4C18 10.4 18.8 7.2 20.4 4.8C22 2.4 24.667 0.533 28.4 0.2L29.2 3C26.8 3.533 25 4.6 23.8 6.2C22.6 7.8 22 9.733 22 12H28V24H18Z" fill="var(--orange-core)" />
                </svg>
                {leader.message.split('\n\n').map((para, j) => (
                  <p key={j} className="font-body text-[0.9375rem] leading-[1.85] mb-4 last:mb-0" style={{ color: 'var(--text-on-light-muted)' }}>
                    {para}
                  </p>
                ))}
                <p className="font-display text-[1.125rem] font-600 mt-6 italic" style={{ color: 'var(--text-on-light)' }}>
                  — {leader.signoff}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
