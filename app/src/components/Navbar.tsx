import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/about' },
  { label: 'Industries', path: '/industries' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(42,23,11,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(243,198,35,0.08)',
          boxShadow: scrolled ? '0 1px 20px rgba(243,198,35,0.08)' : 'none',
          height: '80px',
        }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none">
            <span
              className="font-display text-[22px] font-extrabold tracking-tight"
              style={{ color: '#F3C623' }}
            >
              SUNRISE
            </span>
            <span
              className="font-body text-[9px] font-semibold tracking-[0.15em] mt-0.5"
              style={{ color: '#FEF3E2' }}
            >
              ENTERPRISES
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-[14px] font-medium transition-colors duration-200 hover:text-[#F3C623]"
                style={{ color: 'rgba(254,243,226,0.7)' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#F3C623';
                  (e.target as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(254,243,226,0.7)';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex font-body text-[13px] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: '#F3C623',
              color: '#2A170B',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#FFB22C';
              (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(243,198,35,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#F3C623';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Get Quote
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} style={{ color: '#FEF3E2' }} />
            ) : (
              <Menu size={24} style={{ color: '#FEF3E2' }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay — outside nav so it sits on root stacking context */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[80px] lg:hidden flex flex-col items-center pt-16 gap-8"
          style={{ backgroundColor: '#2A170B', zIndex: 9999 }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="font-body text-xl font-medium transition-all duration-300"
              style={{
                color: 'rgba(254,243,226,0.9)',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 font-body text-[14px] font-semibold px-8 py-3 rounded-full"
            style={{ backgroundColor: '#F3C623', color: '#2A170B' }}
          >
            Get Quote
          </Link>
        </div>
      )}
    </>
  );
}
