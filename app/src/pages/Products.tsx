import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

/* ─────────────────── DATA ─────────────────── */

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  standards: string;
  specTags: string[];
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Hydrostatic Pressure Test Apparatus',
    slug: 'hydrostatic-pressure-test',
    category: 'Pressure Testing',
    standards: 'ISO 1167, ASTM D1598',
    specTags: ['Up to 160 bar', 'Multi-station', 'Digital Timer', 'Auto Pressure Control'],
    description: 'Tests long-term pressure resistance of thermoplastic pipes under controlled temperature and pressure conditions.',
    image: '/machine-hydrostatic.webp',
  },
  {
    id: 2,
    name: 'Bursting Pressure Testing Machine',
    slug: 'bursting-pressure-test',
    category: 'Pressure Testing',
    standards: 'ISO 1167, ASTM D1599',
    specTags: ['Digital Display', 'Auto Test Cycle', 'Safety Enclosure', 'Data Logging'],
    description: 'Determines the maximum burst pressure capacity of plastic pipes with digital precision and automatic testing cycles.',
    image: '/machine-bursting.webp',
  },
  {
    id: 3,
    name: 'Impact Testing Machine (Falling Weight)',
    slug: 'impact-testing',
    category: 'Impact & Strength',
    standards: 'EN 744, ISO 3127',
    specTags: ['Falling Weight', '0.5-2kg Range', 'Digital Counter', 'EN/ISO Compliant'],
    description: 'Evaluates impact resistance of plastic pipes using standardized falling weight method for quality certification.',
    image: '/machine-impact.webp',
  },
  {
    id: 4,
    name: 'Ring Stiffness Testing Machine',
    slug: 'ring-stiffness-test',
    category: 'Impact & Strength',
    standards: 'ISO 9969, EN 1228',
    specTags: ['Flat Plate', 'Deformation Meas.', 'Load Cell', 'PC Interface'],
    description: 'Measures structural rigidity and deformation resistance of plastic pipes under radial load conditions.',
    image: '/machine-ring-stiffness.webp',
  },
  {
    id: 5,
    name: 'Tensile Testing Machine',
    slug: 'tensile-testing',
    category: 'Impact & Strength',
    standards: 'ISO 527, ASTM D638',
    specTags: ['50kN Capacity', 'Servo Motor', 'Auto Graph', 'Extensometer'],
    description: 'Accurately measures tensile strength, elongation at break, and modulus of elasticity for pipe materials.',
    image: '/machine-tensile.webp',
  },
  {
    id: 6,
    name: 'Vicat Softening Point Apparatus',
    slug: 'vicat-softening-point',
    category: 'Thermal & Material',
    standards: 'ISO 306, ASTM D1525',
    specTags: ['300°C Max Temp', 'Bath Method', 'Digital Display', 'Sample Support'],
    description: 'Determines the temperature at which plastic pipes soften under standardized load and heating conditions.',
    image: '/machine-vicat.webp',
  },
  {
    id: 7,
    name: 'Melt Flow Index Tester',
    slug: 'melt-flow-index',
    category: 'Thermal & Material',
    standards: 'ISO 1133, ASTM D1238',
    specTags: ['400°C Max', 'Auto Cut', 'Die Included', 'Compact Design'],
    description: 'Measures the flow rate of molten thermoplastic material to ensure batch consistency and material quality.',
    image: '/machine-melt-flow.webp',
  },
  {
    id: 8,
    name: 'Pipe Notching Machine',
    slug: 'pipe-notching',
    category: 'Sample Prep',
    standards: 'ISO 3127, EN 744',
    specTags: ['Precise Notching', 'Adjustable Angle', 'V-Notch', 'Manual/Electric'],
    description: 'Precisely prepares pipe samples with standardized notches for Charpy and Izod impact testing protocols.',
    image: '/machine-notching.webp',
  },
];

const categories = ['All', 'Pressure Testing', 'Impact & Strength', 'Thermal & Material', 'Sample Prep'];

const categoryFilterMap: Record<string, string[]> = {
  'All': [],
  'Pressure Testing': ['Pressure Testing'],
  'Impact & Strength': ['Impact & Strength'],
  'Thermal & Material': ['Thermal & Material'],
  'Sample Prep': ['Sample Prep'],
};

/* ─────────────────── ANIMATION VARIANTS ─────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/* ─────────────────── PRODUCTS PAGE ─────────────────── */

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  /* Section reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Filtered & sorted products */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      const allowed = categoryFilterMap[activeCategory] || [];
      result = result.filter((p) => allowed.includes(p.category));
    }

    if (sortBy === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Category') {
      result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div>
      <style>{`
        .reveal-section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-section.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ─── SECTION 1: PAGE HEADER ─── */}
      <section
        style={{ backgroundColor: '#2B1B0E', paddingTop: '160px', paddingBottom: '80px' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-[#F3C623]"
              style={{ color: 'rgba(254,243,226,0.4)' }}
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span style={{ color: 'rgba(254,243,226,0.6)' }}>Products</span>
          </nav>

          {/* Page Title */}
          <h1
            className="font-display text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-tight mt-6"
            style={{ color: '#FEF3E2' }}
          >
            Our Testing Machines
          </h1>

          {/* Page Subtitle */}
          <p
            className="font-body text-[16px] lg:text-[18px] leading-relaxed mt-4 max-w-[640px]"
            style={{ color: 'rgba(254,243,226,0.6)' }}
          >
            Eight precision-engineered testing machines for comprehensive quality
            assurance of plastic pipes — from pressure testing to thermal analysis.
          </p>

          {/* Product Count Badge */}
          <div
            className="inline-flex items-center mt-6 font-body text-[12px] font-semibold tracking-[0.08em] uppercase"
            style={{
              color: '#F3C623',
              backgroundColor: 'rgba(243,198,35,0.1)',
              border: '1px solid rgba(243,198,35,0.2)',
              borderRadius: '9999px',
              padding: '6px 16px',
            }}
          >
            8 Machines
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FILTER BAR ─── */}
      <section
        className="sticky top-[80px] z-40"
        style={{
          backgroundColor: '#FEF3E2',
          borderBottom: '1px solid rgba(43,27,14,0.06)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-body text-[13px] font-medium transition-all duration-200"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    backgroundColor: activeCategory === cat ? '#2B1B0E' : 'transparent',
                    color: activeCategory === cat ? '#FEF3E2' : 'rgba(43,27,14,0.7)',
                    border: activeCategory === cat ? 'none' : '1px solid rgba(43,27,14,0.15)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(43,27,14,0.3)';
                      (e.currentTarget as HTMLElement).style.color = '#2B1B0E';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(43,27,14,0.15)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(43,27,14,0.7)';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-body text-[13px]" style={{ color: 'rgba(43,27,14,0.5)' }}>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-body text-[13px] cursor-pointer outline-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#2B1B0E',
                }}
              >
                <option value="Featured">Featured</option>
                <option value="A-Z">Name A-Z</option>
                <option value="Category">Category</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PRODUCT GRID ─── */}
      <section style={{ backgroundColor: '#FEF3E2', paddingTop: '48px', paddingBottom: '120px' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-[16px]" style={{ color: 'rgba(43,27,14,0.5)' }}>
                No machines found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 4: CTA BANNER ─── */}
      <section
        className="reveal-section"
        style={{
          background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)',
          padding: '64px 0',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2
                className="font-body text-[24px] sm:text-[28px] font-bold"
                style={{ color: '#2A170B' }}
              >
                Need a Custom Testing Solution?
              </h2>
              <p
                className="font-body text-[14px] sm:text-[16px] mt-2 max-w-[560px]"
                style={{ color: 'rgba(42,23,11,0.75)' }}
              >
                We design and manufacture customized testing machines tailored to your
                specific pipe dimensions and testing requirements.
              </p>
            </div>
            <Link
              to="/contact?subject=custom"
              className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
              style={{ backgroundColor: '#2A170B', color: '#F3C623' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2B1B0E';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2A170B';
              }}
            >
              Discuss Your Requirements
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}

/* ─────────────────── PRODUCT CARD ─────────────────── */

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(43,27,14,0.06)',
        boxShadow: '0 4px 24px rgba(43,27,14,0.04)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-6px)';
        el.style.boxShadow = '0 16px 48px rgba(43,27,14,0.1)';
        el.style.borderColor = 'rgba(243,198,35,0.2)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 24px rgba(43,27,14,0.04)';
        el.style.borderColor = 'rgba(43,27,14,0.06)';
      }}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        <div
          className="absolute top-4 left-4 font-body text-[11px] font-medium"
          style={{
            backgroundColor: 'rgba(42,23,11,0.85)',
            color: '#FEF3E2',
            padding: '4px 12px',
            borderRadius: '9999px',
          }}
        >
          {product.category}
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(42,23,11,0.6)' }}
        >
          <span
            className="inline-flex items-center gap-2 font-body text-[13px] font-semibold px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: '#F3C623', color: '#2A170B' }}
          >
            View Details <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-7">
        <h3
          className="font-body text-[18px] lg:text-[20px] font-semibold leading-snug"
          style={{ color: '#2B1B0E' }}
        >
          {product.name}
        </h3>

        {/* Standards */}
        <p
          className="font-body text-[13px] mt-2"
          style={{ color: 'rgba(43,27,14,0.45)' }}
        >
          {product.standards}
        </p>

        {/* Spec Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {product.specTags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[12px]"
              style={{
                backgroundColor: '#FEF3E2',
                border: '1px solid rgba(243,198,35,0.2)',
                borderRadius: '6px',
                padding: '4px 12px',
                color: 'rgba(43,27,14,0.7)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="font-body text-[14px] leading-relaxed mt-4"
          style={{ color: 'rgba(43,27,14,0.6)' }}
        >
          {product.description}
        </p>

        {/* Bottom Row */}
        <div
          className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: '1px solid rgba(43,27,14,0.06)' }}
        >
          <span
            className="inline-flex items-center gap-1 font-body text-[14px] font-semibold transition-colors duration-200"
            style={{ color: '#FA812F' }}
          >
            Learn More <ArrowRight size={14} />
          </span>
          <Link
            to={`/contact?product=${product.slug}`}
            className="font-body text-[12px] font-semibold transition-all duration-200 hover:scale-[1.03]"
            style={{
              backgroundColor: '#F3C623',
              color: '#2A170B',
              padding: '8px 16px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFB22C';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#F3C623';
            }}
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </Link>
  );
}
