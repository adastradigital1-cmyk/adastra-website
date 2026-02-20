import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/mock';
import { Menu, X } from 'lucide-react';

const NavLink = ({ item, className, onClick, style }) => {
  const isRoute = item.href.startsWith('/');
  if (isRoute) {
    return (
      <Link to={item.href} className={className} style={style} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} style={style} onClick={onClick}>
      {item.label}
    </a>
  );
};

export const Navbar = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center no-underline">
            <img
              src="/logo-color.png"
              alt="Ad Astra Consultants"
              className={`h-12 w-auto transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link-enhanced text-[13px] font-medium no-underline py-1 tracking-wide transition-colors duration-300 hover:text-[#F26522] ${
                  scrolled ? 'text-[#2B2B2B]' : 'text-white/90'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              className="px-7 py-2.5 text-[13px] font-semibold text-white rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0"
              style={{ backgroundColor: '#F26522', fontFamily: 'Inter, sans-serif' }}
              onClick={onContactClick}
              data-testid="navbar-contact-btn"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-[#2B2B2B]' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            mobileOpen ? 'max-h-[400px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`border-t pt-4 ${scrolled ? 'border-gray-100' : 'border-white/10'}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block py-3 text-[14px] font-medium hover:text-[#F26522] no-underline transition-colors duration-200 ${
                  scrolled ? 'text-[#2B2B2B]' : 'text-white/90'
                }`}
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="mt-4 w-full px-6 py-2.5 text-[13px] font-semibold text-white rounded-md"
              style={{ backgroundColor: '#F26522' }}
              onClick={onContactClick}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
