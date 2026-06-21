import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  Award, Settings, Shield, Phone, DollarSign, Clock,
  CheckCircle, MapPin, Users, FileCheck, Factory,
} from 'lucide-react';
import GradientText from '../components/GradientText';
import AnimatedCounter from '../components/AnimatedCounter';
import WhatsAppButton from '../components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── DATA ─────────────────── */

const products = [
  { name: 'Hydrostatic Pressure Test Apparatus', spec: 'Up to 160 bar, multi-station', slug: 'hydrostatic-pressure-test', image: '/machine-hydrostatic.webp' },
  { name: 'Bursting Pressure Testing Machine', spec: 'Digital display, automatic test', slug: 'bursting-pressure-test', image: '/machine-bursting.webp' },
  { name: 'Impact Testing Machine (Falling Weight)', spec: 'EN 744/ISO 3127 compliant', slug: 'impact-testing', image: '/machine-impact.webp' },
  { name: 'Ring Stiffness Testing Machine', spec: 'ISO 9969, EN 1228 standard', slug: 'ring-stiffness-test', image: '/machine-ring-stiffness.webp' },
  { name: 'Tensile Testing Machine', spec: '50kN capacity, servo-controlled', slug: 'tensile-testing', image: '/machine-tensile.webp' },
  { name: 'Vicat Softening Point Apparatus', spec: 'ISO 306, ASTM D1525', slug: 'vicat-softening-point', image: '/machine-vicat.webp' },
  { name: 'Melt Flow Index Tester', spec: 'ISO 1133, ASTM D1238', slug: 'melt-flow-index', image: '/machine-melt-flow.webp' },
  { name: 'Pipe Notching Machine', spec: 'Precise sample preparation', slug: 'pipe-notching', image: '/machine-notching.webp' },
];

const features = [
  { icon: Award, title: '25+ Years Experience', description: 'Decades of expertise in plastic pipe testing machine manufacturing, trusted by industry leaders across India.' },
  { icon: Settings, title: 'Customized Solutions', description: 'Every machine tailored to your specific testing requirements, pipe dimensions, and industry standards.' },
  { icon: Shield, title: 'Precision Engineering', description: 'ISO-compliant testing accuracy with calibrated instruments and rigorous quality control at every stage.' },
  { icon: Phone, title: 'PAN India Support', description: 'Comprehensive service network covering every state, with trained technicians and quick spare parts availability.' },
  { icon: DollarSign, title: 'Competitive Pricing', description: 'Direct-from-manufacturer pricing without middlemen, ensuring the best value for your investment.' },
  { icon: Clock, title: 'Reliable After-Sales', description: 'Dedicated support team, annual maintenance contracts, and remote troubleshooting assistance.' },
];

const industries = [
  { name: 'PVC & uPVC Manufacturing', line: 'Pipe extrusion & quality testing', accent: '#FA812F' },
  { name: 'HDPE & PPR Manufacturing', line: 'Pressure pipe testing solutions', accent: '#FFB22C' },
  { name: 'Irrigation Systems', line: 'Drip & sprinkler pipe testing', accent: '#F3C623' },
  { name: 'Testing Laboratories', line: 'R&D and compliance testing', accent: 'linear-gradient(90deg, #FA812F, #FFB22C)' },
];

const testimonials = [
  { quote: 'Sunrise Enterprises delivered our hydrostatic testing machine within 4 weeks. The build quality is exceptional and their Jaipur team provided excellent installation support.', name: 'Rajesh Sharma', title: 'Plant Head, Apex Pipes Ltd, Delhi' },
  { quote: 'We\'ve purchased three machines from Sunrise over the past two years. Their after-sales support across Rajasthan is prompt and their engineers truly understand pipe testing.', name: 'Priya Mehta', title: 'QA Manager, HDPE Solutions, Ahmedabad' },
  { quote: 'The customized ring stiffness tester they built for our large-diameter pipes works flawlessly. Truly a partner who understands manufacturing needs.', name: 'Vikram Patel', title: 'Director, Gujarat Polymer Industries' },
  { quote: 'Their PAN India service network gave us confidence to choose Sunrise. The Vicat apparatus is precise and calibration-ready. Highly recommended.', name: 'Anil Kumar', title: 'Lab Incharge, Central Testing Lab, Bangalore' },
];

const certifications = [
  { icon: Award, label: 'ISO 9001:2015', sublabel: 'Quality Management' },
  { icon: Shield, label: 'CE Certified', sublabel: 'European Conformity' },
  { icon: FileCheck, label: 'BIS Compliant', sublabel: 'Indian Standards' },
  { icon: Factory, label: 'Made in India', sublabel: 'Jaipur, Rajasthan' },
];

/* ─────────────────── HOME PAGE ─────────────────── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  /* GSAP Hero animation + parallax */
  useEffect(() => {
    if (!heroRef.current || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo('.hero-bg', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' })
        .fromTo('.hero-gradient-mesh', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
        .fromTo('.hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
        .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
        .fromTo('.hero-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* Section reveal observer */
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
      );

      document.querySelectorAll('.reveal-section, .reveal-stagger').forEach((el) => observer!.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <div>
      <style>{`
        .reveal-section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-section.revealed { opacity: 1; transform: translateY(0); }
        .reveal-stagger > * { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-stagger.revealed > * { opacity: 1; transform: translateY(0); }
        .reveal-stagger.revealed > *:nth-child(1) { transition-delay: 0s; }
        .reveal-stagger.revealed > *:nth-child(2) { transition-delay: 0.1s; }
        .reveal-stagger.revealed > *:nth-child(3) { transition-delay: 0.2s; }
        .reveal-stagger.revealed > *:nth-child(4) { transition-delay: 0.3s; }
        .reveal-stagger.revealed > *:nth-child(5) { transition-delay: 0.4s; }
        .reveal-stagger.revealed > *:nth-child(6) { transition-delay: 0.5s; }
        .reveal-stagger.revealed > *:nth-child(7) { transition-delay: 0.6s; }
        .reveal-stagger.revealed > *:nth-child(8) { transition-delay: 0.7s; }
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-2%, 1%); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* ─── SECTION 1: HERO ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="hero-bg absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/pipes-water-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1]" style={{ backgroundColor: 'rgba(42,23,11,0.65)' }} />
        {/* Animated Gradient Mesh */}
        <div
          className="hero-gradient-mesh absolute inset-0 z-[2] opacity-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(250,129,47,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,178,44,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(243,198,35,0.1) 0%, transparent 50%)',
            animation: 'gradient-shift 15s ease infinite',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 z-[3]"
          style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(42,23,11,0.5) 100%)' }}
        />

        {/* Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 text-center px-6 max-w-[900px] mx-auto"
        >
          <p
            className="hero-eyebrow font-body text-[12px] font-semibold tracking-[0.12em] uppercase mb-6"
            style={{ color: '#F3C623' }}
          >
            PLASTIC PIPE TESTING MACHINES
          </p>

          <h1 className="hero-headline font-display text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[1.05] tracking-[-0.02em] text-shadow-hero" style={{ color: '#FEF3E2' }}>
            Precision Testing
            <br />
            <GradientText as="span">for Every Pipe</GradientText>
          </h1>

          <p
            className="hero-subtitle font-body text-[16px] lg:text-[18px] leading-relaxed max-w-[640px] mx-auto mt-6"
            style={{ color: 'rgba(254,243,226,0.8)' }}
          >
            Leading manufacturer of hydrostatic, bursting, impact, and specialized testing equipment for PVC, HDPE, PPR & CPVC pipe manufacturers across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/products"
              className="hero-cta font-body text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: '#F3C623', color: '#2A170B' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#FFB22C';
                (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(243,198,35,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#F3C623';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Explore Our Machines
            </Link>
            <Link
              to="/contact"
              className="hero-cta font-body text-[14px] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ border: '2px solid #F3C623', color: '#F3C623' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#F3C623';
                (e.target as HTMLElement).style.color = '#2A170B';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = '#F3C623';
              }}
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown
            size={24}
            className="animate-bounce-slow"
            style={{ color: 'rgba(254,243,226,0.5)' }}
          />
        </div>
      </section>

      {/* ─── SECTION 2: STATS BAR ─── */}
      <StatsBar />

      {/* ─── SECTION 3: PRODUCT SHOWCASE ─── */}
      <ProductShowcase />

      {/* ─── SECTION 4: WHY CHOOSE US ─── */}
      <WhyChooseUs />

      {/* ─── SECTION 5: INDUSTRIES PREVIEW ─── */}
      <IndustriesPreview />

      {/* ─── SECTION 6: TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── SECTION 7: TRUST & CERTIFICATIONS ─── */}
      <TrustCertifications />

      {/* ─── SECTION 8: FINAL CTA ─── */}
      <FinalCTA />

      <WhatsAppButton />
    </div>
  );
}

/* ─────────────────── SECTION 2: STATS BAR ─────────────────── */

function StatsBar() {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#2B1B0E', padding: '64px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { value: '25+', label: 'Years of Excellence' },
            { value: '8', label: 'Testing Machine Types' },
            { value: '500+', label: 'Machines Delivered' },
            { value: 'PAN', label: 'India Service Network' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter value={stat.value} delay={i * 150} />
              <div className="w-10 h-0.5 mx-auto mt-4 mb-3" style={{ backgroundColor: 'rgba(243,198,35,0.3)' }} />
              <p className="font-body text-[14px] font-medium" style={{ color: 'rgba(254,243,226,0.6)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 3: PRODUCT SHOWCASE ─────────────────── */

function ProductShowcase() {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#FEF3E2', padding: '120px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-[600px] mb-16">
          <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase mb-4" style={{ color: '#FA812F' }}>
            OUR PRODUCT RANGE
          </p>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-tight" style={{ color: '#2B1B0E' }}>
            8 Precision Testing
            <br />
            <GradientText>Machines</GradientText>
          </h2>
          <p className="font-body text-[16px] lg:text-[18px] mt-4 leading-relaxed" style={{ color: 'rgba(43,27,14,0.7)' }}>
            From hydrostatic pressure to melt flow index — complete testing solutions for every pipe type.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
            style={{ border: '2px solid #2B1B0E', color: '#2B1B0E' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2B1B0E';
              (e.target as HTMLElement).style.color = '#FEF3E2';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#2B1B0E';
            }}
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
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
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 12px 40px rgba(43,27,14,0.08)';
        el.style.borderColor = 'rgba(243,198,35,0.15)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 24px rgba(43,27,14,0.04)';
        el.style.borderColor = 'rgba(43,27,14,0.06)';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(42,23,11,0.7), transparent)' }}
        >
          <span className="font-body text-[13px] font-medium flex items-center gap-1" style={{ color: '#FEF3E2' }}>
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-body text-[16px] font-semibold leading-snug" style={{ color: '#2B1B0E' }}>
          {product.name}
        </h3>
        <p className="font-body text-[13px] mt-1" style={{ color: 'rgba(43,27,14,0.5)' }}>
          {product.spec}
        </p>
        <span className="inline-flex items-center gap-1 mt-3 font-body text-[13px] font-semibold" style={{ color: '#FA812F' }}>
          Learn More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────── SECTION 4: WHY CHOOSE US ─────────────────── */

function WhyChooseUs() {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#2B1B0E', padding: '120px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase mb-4" style={{ color: '#F3C623' }}>
            WHY SUNRISE
          </p>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-tight" style={{ color: '#FEF3E2' }}>
            Built on Trust,
            <br />
            Engineered for Precision
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(254,243,226,0.03)',
                border: '1px solid rgba(243,198,35,0.06)',
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(243,198,35,0.1)' }}
              >
                <feature.icon size={24} style={{ color: '#F3C623' }} />
              </div>
              <h3 className="font-body text-[18px] font-semibold" style={{ color: '#FEF3E2' }}>
                {feature.title}
              </h3>
              <p className="font-body text-[14px] mt-3 leading-relaxed" style={{ color: 'rgba(254,243,226,0.6)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge Strip */}
        <div className="reveal-section flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-16">
          {[
            { icon: CheckCircle, label: 'ISO 9001:2015' },
            { icon: Award, label: 'CE Certified' },
            { icon: MapPin, label: 'Made in India' },
            { icon: Users, label: '100+ Clients' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && (
                <div className="hidden sm:block w-px h-6 mr-3" style={{ backgroundColor: 'rgba(243,198,35,0.15)' }} />
              )}
              <badge.icon size={16} style={{ color: '#F3C623' }} />
              <span className="font-body text-[13px] font-medium" style={{ color: 'rgba(254,243,226,0.5)' }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 5: INDUSTRIES PREVIEW ─────────────────── */

function IndustriesPreview() {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#FEF3E2', padding: '120px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase mb-4" style={{ color: '#FA812F' }}>
            INDUSTRIES WE SERVE
          </p>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-tight" style={{ color: '#2B1B0E' }}>
            Trusted Across
            <br />
            <GradientText>Every Pipe Industry</GradientText>
          </h2>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(43,27,14,0.1) 0%, rgba(42,23,11,0.85) 100%), url(/industry-${['pvc', 'hdpe', 'irrigation', 'lab'][i]}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="font-body text-[18px] font-semibold" style={{ color: '#FEF3E2' }}>
                {ind.name}
              </h3>
              <p className="font-body text-[13px] mt-1" style={{ color: 'rgba(254,243,226,0.6)' }}>
                {ind.line}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: ind.accent }}
              />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
            style={{ border: '2px solid #2B1B0E', color: '#2B1B0E' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2B1B0E';
              (e.target as HTMLElement).style.color = '#FEF3E2';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#2B1B0E';
            }}
          >
            Explore All Industries
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 6: TESTIMONIALS ─────────────────── */

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="reveal-section" style={{ backgroundColor: '#FEF3E2', padding: '120px 0' }}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase mb-4" style={{ color: '#FA812F' }}>
            CLIENT TESTIMONIALS
          </p>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold" style={{ color: '#2B1B0E' }}>
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          className="relative rounded-2xl p-8 sm:p-12 text-center transition-all duration-300"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 24px rgba(43,27,14,0.04)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon */}
          <span className="absolute top-6 left-6 font-display text-[48px] leading-none" style={{ color: 'rgba(243,198,35,0.2)' }}>
            &ldquo;
          </span>

          <p className="font-body text-[16px] lg:text-[18px] italic leading-relaxed max-w-[700px] mx-auto" style={{ color: 'rgba(43,27,14,0.8)' }}>
            {t.quote}
          </p>

          <div className="w-10 h-px mx-auto my-8" style={{ backgroundColor: 'rgba(243,198,35,0.3)' }} />

          <p className="font-body text-[15px] font-semibold" style={{ color: '#2B1B0E' }}>
            {t.name}
          </p>
          <p className="font-body text-[13px] mt-1" style={{ color: 'rgba(43,27,14,0.5)' }}>
            {t.title}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ border: '1px solid rgba(43,27,14,0.1)' }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} style={{ color: 'rgba(43,27,14,0.5)' }} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: i === current ? '#F3C623' : 'rgba(43,27,14,0.15)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ border: '1px solid rgba(43,27,14,0.1)' }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} style={{ color: 'rgba(43,27,14,0.5)' }} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 7: TRUST & CERTIFICATIONS ─────────────────── */

function TrustCertifications() {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#2B1B0E', padding: '80px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Certifications Row */}
        <div className="reveal-stagger flex flex-wrap items-center justify-center gap-12 lg:gap-16">
          {certifications.map((cert, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <cert.icon size={32} style={{ color: '#F3C623' }} />
              <div>
                <p className="font-body text-[15px] font-semibold" style={{ color: '#FEF3E2' }}>
                  {cert.label}
                </p>
                <p className="font-body text-[12px] mt-0.5" style={{ color: 'rgba(254,243,226,0.5)' }}>
                  {cert.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12" style={{ height: '1px', backgroundColor: 'rgba(243,198,35,0.1)' }} />

        {/* Quality Promise */}
        <p className="text-center font-body text-[16px] lg:text-[18px] italic max-w-[700px] mx-auto leading-relaxed" style={{ color: 'rgba(254,243,226,0.7)' }}>
          Every machine undergoes rigorous calibration and testing before dispatch. We provide complete documentation, operation training, and comprehensive warranty.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 8: FINAL CTA ─────────────────── */

function FinalCTA() {
  return (
    <section className="reveal-section relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)', padding: '120px 0' }}>
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none" style={{ border: '1px solid rgba(43,27,14,0.2)' }} />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none" style={{ border: '1px solid rgba(43,27,14,0.2)' }} />

      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <h2 className="font-display text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-tight" style={{ color: '#2A170B' }}>
          Ready to Ensure
          <br />
          Your Pipe Quality?
        </h2>

        <p className="font-body text-[16px] lg:text-[18px] mt-5" style={{ color: 'rgba(42,23,11,0.8)' }}>
          Get in touch for a customized testing solution. Our engineers will analyze your requirements and recommend the perfect machine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/contact"
            className="font-body text-[15px] font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{ backgroundColor: '#2A170B', color: '#F3C623' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2B1B0E';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2A170B';
            }}
          >
            Request a Quote
          </Link>
          <a
            href="tel:+919829050308"
            className="font-body text-[15px] font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{ border: '2px solid #2A170B', color: '#2A170B' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2A170B';
              (e.target as HTMLElement).style.color = '#F3C623';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#2A170B';
            }}
          >
            Call Us Now
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          <Phone size={16} style={{ color: 'rgba(42,23,11,0.7)' }} />
          <span className="font-mono text-[15px]" style={{ color: 'rgba(42,23,11,0.7)' }}>
            +91 98290 50308
          </span>
        </div>
      </div>
    </section>
  );
}
