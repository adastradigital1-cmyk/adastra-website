import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/mock';

const NavLink = ({ item, className, onClick }) => {
  if (item.href.startsWith('/')) {
    return <Link to={item.href} className={className} onClick={onClick}>{item.label}</Link>;
  }
  return <a href={item.href} className={className} onClick={onClick}>{item.label}</a>;
};

export const Navbar = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-[24px] shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(12,12,12,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-dark)' : 'none',
        zIndex: 9999,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <img
              src="/logo-white.png"
              alt="Ad Astra"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav — exclude Contact (shown as CTA) */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.filter(i => i.label !== 'Contact').map((item) => (
              <NavLink
                key={item.label}
                item={item}
                className={`nav-link text-[0.8125rem] ${
                  (item.href === location.pathname)
                    ? 'text-[var(--white-pure)]'
                    : 'text-[var(--text-on-dark-muted)] hover:text-[var(--white-pure)]'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              data-testid="navbar-contact-btn"
              className="btn-primary !py-2.5 !px-7 !text-[0.8125rem] no-underline"
            >
              Get in Touch
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-[var(--text-on-dark)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[var(--text-on-dark)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[var(--text-on-dark)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backgroundColor: 'var(--black-rich)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
          {navItems.filter(i => i.label !== 'Contact').map((item, i) => (
            <NavLink
              key={item.label}
              item={item}
              className="font-display text-[2rem] text-[var(--text-on-dark)] hover:text-[var(--orange-core)] transition-colors duration-300 no-underline"
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4 no-underline"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
};
