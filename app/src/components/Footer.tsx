import { Link } from 'react-router';
import { Linkedin, Phone, Mail, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/about' },
  { label: 'Industries', path: '/industries' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const productLinks = [
  { label: 'Hydrostatic Pressure Test Apparatus', path: '/products/hydrostatic-pressure' },
  { label: 'Bursting Pressure Testing Machine', path: '/products/bursting-pressure' },
  { label: 'Impact Testing Machine (Falling Weight)', path: '/products/impact-testing' },
  { label: 'Ring Stiffness Testing Machine', path: '/products/ring-stiffness' },
  { label: 'Tensile Testing Machine', path: '/products/tensile-testing' },
  { label: 'Vicat Softening Point Apparatus', path: '/products/vicat-softening' },
  { label: 'Melt Flow Index Tester', path: '/products/melt-flow-index' },
  { label: 'Pipe Notching Machine', path: '/products/pipe-notching' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2A170B' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo + Description + Social */}
          <div>
            <Link to="/" className="flex flex-col items-start leading-none">
              <span className="font-display text-[22px] font-extrabold" style={{ color: '#F3C623' }}>
                SUNRISE
              </span>
              <span
                className="font-body text-[9px] font-semibold tracking-[0.15em] mt-0.5"
                style={{ color: '#FEF3E2' }}
              >
                ENTERPRISES
              </span>
            </Link>
            <p className="mt-4 font-body text-[14px] leading-relaxed" style={{ color: 'rgba(254,243,226,0.5)' }}>
              Premium plastic pipe testing machine manufacturer based in Jaipur, Rajasthan. Delivering precision engineering since 1999.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Phone, href: 'https://wa.me/919829050308' },
                { icon: Youtube, href: '#' },
                { icon: Mail, href: 'mailto:info@sunriseenterprises.in' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(254,243,226,0.5)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F3C623'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(254,243,226,0.5)'; }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body text-[14px] font-semibold mb-4" style={{ color: '#FEF3E2', letterSpacing: '0.08em' }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-200 hover:text-[#F3C623]"
                    style={{ color: 'rgba(254,243,226,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="font-body text-[14px] font-semibold mb-4" style={{ color: '#FEF3E2', letterSpacing: '0.08em' }}>
              OUR PRODUCTS
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-[14px] transition-colors duration-200 hover:text-[#F3C623]"
                    style={{ color: 'rgba(254,243,226,0.5)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-body text-[14px] font-semibold mb-4" style={{ color: '#FEF3E2', letterSpacing: '0.08em' }}>
              CONTACT US
            </h4>
            <div className="space-y-3 font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.5)' }}>
              <p>
                Plot no 3 sarna dungar industrial area jaipur
              </p>
              <p>
                <a href="tel:+919829050308" className="hover:text-[#F3C623] transition-colors">
                  +91 98290 50308
                </a>
              </p>
              <p>
                <a href="mailto:info@sunriseenterprises.in" className="hover:text-[#F3C623] transition-colors">
                  info@sunriseenterprises.in
                </a>
              </p>
            </div>
            <a
              href="https://wa.me/919829050308"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-body text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: '#25D366', color: '#fff' }}
            >
              <Phone size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(243,198,35,0.1)' }}
        >
          <p className="font-body text-[12px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
            2025 Sunrise Enterprises. All rights reserved.
          </p>
          <p className="font-body text-[12px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
            Crafted in Jaipur, India
          </p>
        </div>
      </div>
    </footer>
  );
}
