import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ParticleField } from '../components/ParticleField';
import { Calendar, Clock, ArrowRight, Tag, User, ChevronRight } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Executive Search in a Post-AI World',
    excerpt: 'How artificial intelligence is reshaping leadership recruitment and what it means for organizations seeking top talent.',
    category: 'Industry Trends',
    author: 'Anuradha Das Mathur',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Diverse Leadership Teams: A Strategic Imperative',
    excerpt: 'Why diversity at the top drives better business outcomes and how to make it happen.',
    category: 'Leadership',
    author: 'Meera Shankar',
    date: 'Feb 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    featured: true,
  },
  {
    id: 3,
    title: 'RPO vs. Traditional Recruitment: Making the Right Choice',
    excerpt: 'A comprehensive guide to understanding when recruitment process outsourcing makes sense for your organization.',
    category: 'Best Practices',
    author: 'Rajesh Kumar',
    date: 'Feb 5, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    featured: false,
  },
  {
    id: 4,
    title: 'Talent Acquisition Trends Shaping 2026',
    excerpt: 'From skills-based hiring to AI-powered assessments, explore the trends defining modern recruitment.',
    category: 'Industry Trends',
    author: 'Vikram Desai',
    date: 'Jan 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    featured: false,
  },
  {
    id: 5,
    title: 'The Art of Candidate Experience in Executive Hiring',
    excerpt: 'How to create a world-class candidate experience that attracts and retains top executive talent.',
    category: 'Best Practices',
    author: 'Anuradha Das Mathur',
    date: 'Jan 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
    featured: false,
  },
  {
    id: 6,
    title: 'Navigating Cross-Border Hiring Challenges',
    excerpt: 'Best practices for recruiting talent across different geographies and regulatory environments.',
    category: 'Global Insights',
    author: 'Meera Shankar',
    date: 'Jan 12, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    featured: false,
  },
];

const categories = ['All', 'Industry Trends', 'Leadership', 'Best Practices', 'Global Insights'];

const WordReveal = ({ text, className, style, startDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: startDelay + i * 0.08, ease }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const BlogHero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 600], [0, 30]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 gradient-mesh" />
        <div className="noise-overlay absolute inset-0" />
        <ParticleField id="blog-hero-particles" density="normal" />
      </motion.div>
      
      <motion.div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 z-10 text-center" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="section-label">Insights & Perspectives</span>
        </motion.div>
        <h1 className="font-display text-[3rem] sm:text-[4rem] lg:text-[5rem] font-700 leading-[1.06] mt-6 max-w-[900px] mx-auto" style={{ color: 'var(--white-pure)' }}>
          <WordReveal text="Thought Leadership in Talent" startDelay={0.3} />
        </h1>
        <motion.p className="font-body text-[1.125rem] lg:text-[1.25rem] mt-7 max-w-[600px] mx-auto leading-[1.7]" style={{ color: 'var(--text-on-dark-muted)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
          Expert insights, industry trends, and best practices from our team of talent acquisition specialists.
        </motion.p>
      </motion.div>
    </section>
  );
};

const FeaturedPosts = () => {
  const featured = blogPosts.filter(p => p.featured);
  
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--white-warm)' }} data-testid="blog-featured">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{ background: 'linear-gradient(135deg, #E8601C 0%, #D4993D 100%)' }} />
      </div>
      
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <span className="section-label">Featured</span>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.15 }}>
          {featured.map((post) => (
            <motion.article key={post.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-0 overflow-hidden group cursor-pointer" data-testid={`featured-post-${post.id}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[0.6875rem] px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--orange-ghost)', color: 'var(--orange-core)' }}>{post.category}</span>
                  <span className="flex items-center gap-1.5 font-body text-[0.75rem]" style={{ color: 'var(--text-on-light-muted)' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-[1.5rem] lg:text-[1.75rem] font-600 leading-[1.25]" style={{ color: 'var(--text-on-light)' }}>{post.title}</h2>
                <p className="font-body text-[0.9375rem] mt-3 leading-[1.7]" style={{ color: 'var(--text-on-light-muted)' }}>{post.excerpt}</p>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <User size={14} style={{ color: 'var(--text-on-light-muted)' }} />
                    <span className="font-body text-[0.8125rem]" style={{ color: 'var(--text-on-light-muted)' }}>{post.author}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-body font-600 text-[0.875rem] transition-all duration-300 group-hover:gap-2" style={{ color: 'var(--orange-core)' }}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AllPosts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredPosts = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--white-cream)' }} data-testid="blog-all-posts">
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.8, ease }}>
          <div className="accent-line mb-6" />
          <span className="section-label">All Articles</span>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 mt-4 leading-[1.08]" style={{ color: 'var(--text-on-light)' }}>Explore Our Insights</h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div className="flex flex-wrap gap-3 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-body text-[0.875rem] font-500 transition-all duration-300 ${activeCategory === cat ? 'text-white' : ''}`}
              style={{
                backgroundColor: activeCategory === cat ? 'var(--orange-core)' : 'rgba(255,255,255,0.6)',
                color: activeCategory === cat ? 'var(--white-pure)' : 'var(--text-on-light-muted)',
                backdropFilter: 'blur(10px)',
              }}
              data-testid={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} transition={{ staggerChildren: 0.08 }}>
          {filteredPosts.map((post) => (
            <motion.article key={post.id} variants={fadeUp} transition={{ duration: 0.7, ease }} className="glass-card-light p-0 overflow-hidden group cursor-pointer" data-testid={`blog-post-${post.id}`}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[0.625rem] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--orange-ghost)', color: 'var(--orange-core)' }}>{post.category}</span>
                </div>
                <h3 className="font-display text-[1.125rem] font-600 leading-[1.3]" style={{ color: 'var(--text-on-light)' }}>{post.title}</h3>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-body text-[0.75rem]" style={{ color: 'var(--text-on-light-muted)' }}>{post.date}</span>
                  <span className="font-body text-[0.75rem]" style={{ color: 'var(--text-on-light-muted)' }}>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const NewsletterCTA = ({ onSubscribe }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-newsletter">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ParticleField id="blog-newsletter-particles" density="light" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--orange-core)] opacity-[0.04] rounded-full blur-[150px]" />
      
      <div className="relative max-w-[700px] mx-auto px-6 lg:px-12 text-center z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}>
          <h2 className="font-display text-[2.5rem] lg:text-[3rem] font-700 leading-[1.08]" style={{ color: 'var(--white-pure)' }}>Stay Ahead of the Curve</h2>
          <p className="font-body text-[1.0625rem] mt-5" style={{ color: 'var(--text-on-dark-muted)' }}>Subscribe to our newsletter for the latest insights on talent acquisition and workforce strategy.</p>
          <motion.div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            <input type="email" placeholder="Enter your email" className="glass-input px-5 py-3 w-full sm:w-[300px]" data-testid="newsletter-email" />
            <button className="btn-primary" data-testid="newsletter-subscribe-btn">Subscribe <ArrowRight size={16} /></button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function BlogPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black-rich)' }} data-testid="blog-page">
      <Navbar onContactClick={() => setContactOpen(true)} />
      <BlogHero />
      <FeaturedPosts />
      <AllPosts />
      <NewsletterCTA />
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
