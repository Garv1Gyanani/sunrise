import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Factory, Droplets, Layers, Flame, Shield, Sprout, Microscope, GraduationCap,
  CheckCircle, ArrowRight, Phone, Mail, FileText, Beaker, ClipboardCheck, HardHat,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── DATA ─────────────────── */

interface IndustryCard {
  name: string;
  description: string;
  image: string;
  machines: string[];
  icon: React.ElementType;
  gradient: string;
}

const industryCards: IndustryCard[] = [
  {
    name: 'PVC Pipe Manufacturing',
    description: 'Complete testing solutions for rigid PVC pipe extrusion lines, from pressure testing to impact resistance.',
    image: '/industry-pvc.webp',
    machines: ['Hydrostatic Pressure Test', 'Impact Testing Machine', 'Vicat Softening Point'],
    icon: Factory,
    gradient: 'linear-gradient(135deg, #FA812F 0%, #2B1B0E 100%)',
  },
  {
    name: 'HDPE Pipe Manufacturing',
    description: 'End-to-end testing for high-density polyethylene pipes used in water supply and gas distribution.',
    image: '/industry-hdpe.webp',
    machines: ['Hydrostatic Pressure Test', 'Bursting Pressure Tester', 'Melt Flow Index Tester'],
    icon: Layers,
    gradient: 'linear-gradient(135deg, #F3C623 0%, #2B1B0E 100%)',
  },
  {
    name: 'uPVC & CPVC Manufacturing',
    description: 'Pressure testing and dimensional stability solutions for plumbing and fire sprinkler systems.',
    image: '/industry-pvc.webp',
    machines: ['Bursting Pressure Tester', 'Vicat Softening Point', 'Tensile Testing Machine'],
    icon: Droplets,
    gradient: 'linear-gradient(135deg, #FFB22C 0%, #2A170B 100%)',
  },
  {
    name: 'PPR Pipe Systems',
    description: 'Thermal and pressure testing for hot water PPR pipe systems in residential and commercial use.',
    image: '/industry-pvc.webp',
    machines: ['Hydrostatic Pressure Test', 'Vicat Softening Point', 'Melt Flow Index Tester'],
    icon: Flame,
    gradient: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 100%)',
  },
  {
    name: 'Irrigation Systems',
    description: 'Testing for drip lines, sprinkler pipes, and LDPE tubing used in modern agriculture.',
    image: '/industry-irrigation.webp',
    machines: ['Hydrostatic Pressure Test', 'Impact Testing Machine', 'Pipe Notching Machine'],
    icon: Sprout,
    gradient: 'linear-gradient(135deg, #F3C623 0%, #FA812F 100%)',
  },
  {
    name: 'Testing Laboratories',
    description: 'Calibration-grade equipment for third-party testing, certification, and quality audit labs.',
    image: '/industry-lab.webp',
    machines: ['All 8 Testing Machines', 'NABL-Traceable Calibration'],
    icon: Microscope,
    gradient: 'linear-gradient(135deg, #2B1B0E 0%, #F3C623 100%)',
  },
  {
    name: 'Research Institutions',
    description: 'Custom testing setups for academic research, government projects, and material development.',
    image: '/industry-lab.webp',
    machines: ['Custom Configurations', 'Multi-Standard Compliance'],
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #2A170B 0%, #FFB22C 100%)',
  },
  {
    name: 'Government & Infrastructure',
    description: 'Heavy-duty testing solutions for large-scale infrastructure and public works projects.',
    image: '/industry-hdpe.webp',
    machines: ['Ring Stiffness Tester', 'Tensile Testing Machine', 'Hydrostatic Pressure Test'],
    icon: Shield,
    gradient: 'linear-gradient(135deg, #FFB22C 0%, #FA812F 100%)',
  },
];

interface UseCase {
  industry: string;
  title: string;
  description: string;
  painPoints: string[];
  recommendedMachines: { name: string; image: string; slug: string }[];
  icon: React.ElementType;
}

const useCases: UseCase[] = [
  {
    industry: 'PVC & uPVC Manufacturing',
    title: 'Quality Control in Production Lines',
    description: 'PVC and uPVC pipe manufacturers need to verify pressure resistance, impact strength, and dimensional stability. Our hydrostatic, bursting, and impact testing machines ensure every batch meets IS 4985 and ASTM standards.',
    painPoints: [
      'Pressure testing for potable water supply pipes',
      'Impact resistance for underground drainage pipes',
      'Vicat softening for high-temperature applications',
    ],
    recommendedMachines: [
      { name: 'Hydrostatic Pressure Test', image: '/machine-hydrostatic.webp', slug: 'hydrostatic-pressure' },
      { name: 'Bursting Pressure Tester', image: '/machine-bursting.webp', slug: 'bursting-pressure' },
      { name: 'Impact Testing Machine', image: '/machine-impact.webp', slug: 'impact-testing' },
      { name: 'Vicat Softening Point', image: '/machine-vicat.webp', slug: 'vicat-softening' },
    ],
    icon: ClipboardCheck,
  },
  {
    industry: 'HDPE & PPR Manufacturing',
    title: 'R&D and Material Testing',
    description: 'HDPE and PPR pipes used in gas distribution and hot water plumbing require rigorous pressure, tensile, and thermal testing. Our multi-station hydrostatic testers and melt flow indexers are built for high-volume production environments.',
    painPoints: [
      'Long-term hydrostatic strength (LTHS) testing',
      'Melt flow consistency for extrusion quality',
      'Tensile strength for joint integrity',
    ],
    recommendedMachines: [
      { name: 'Hydrostatic Pressure Test', image: '/machine-hydrostatic.webp', slug: 'hydrostatic-pressure' },
      { name: 'Melt Flow Index Tester', image: '/machine-melt-flow.webp', slug: 'melt-flow-index' },
      { name: 'Tensile Testing Machine', image: '/machine-tensile.webp', slug: 'tensile-testing' },
      { name: 'Vicat Softening Point', image: '/machine-vicat.webp', slug: 'vicat-softening' },
    ],
    icon: Beaker,
  },
  {
    industry: 'Irrigation Industry',
    title: 'Field Testing & Irrigation Projects',
    description: 'Drip irrigation and sprinkler pipe manufacturers need portable, affordable testing equipment that works in field conditions. Our compact testing machines are designed for rural manufacturing units with limited infrastructure.',
    painPoints: [
      'Pressure testing for LDPE drip lines',
      'Impact resistance for transport and installation',
      'Cost-effective testing for small-batch production',
    ],
    recommendedMachines: [
      { name: 'Hydrostatic Pressure Test', image: '/machine-hydrostatic.webp', slug: 'hydrostatic-pressure' },
      { name: 'Impact Testing Machine', image: '/machine-impact.webp', slug: 'impact-testing' },
      { name: 'Pipe Notching Machine', image: '/machine-notching.webp', slug: 'pipe-notching' },
    ],
    icon: HardHat,
  },
  {
    industry: 'Testing Laboratories',
    title: 'Compliance & Certification Testing',
    description: 'Third-party testing labs and government quality control centers need calibration-grade equipment with complete documentation and traceability. Our machines come with NABL-traceable calibration certificates.',
    painPoints: [
      'Multi-standard compliance (ISO, ASTM, IS, EN)',
      'Repeatable, calibration-ready results',
      'Complete documentation for accreditation',
    ],
    recommendedMachines: [
      { name: 'Hydrostatic Pressure Test', image: '/machine-hydrostatic.webp', slug: 'hydrostatic-pressure' },
      { name: 'Bursting Pressure Tester', image: '/machine-bursting.webp', slug: 'bursting-pressure' },
      { name: 'Impact Testing Machine', image: '/machine-impact.webp', slug: 'impact-testing' },
      { name: 'Ring Stiffness Tester', image: '/machine-ring-stiffness.webp', slug: 'ring-stiffness' },
    ],
    icon: FileText,
  },
];

interface Standard {
  code: string;
  description: string;
}

const standards: Standard[] = [
  { code: 'ISO 1167', description: 'Thermoplastics pipes — Hydrostatic resistance' },
  { code: 'ISO 3127', description: 'Thermoplastics pipes — Impact resistance' },
  { code: 'ISO 9969', description: 'Thermoplastics pipes — Ring stiffness' },
  { code: 'ISO 527', description: 'Plastics — Tensile properties' },
  { code: 'ISO 306', description: 'Plastics — Vicat softening temperature' },
  { code: 'ISO 1133', description: 'Plastics — Melt flow index' },
  { code: 'ASTM D1598', description: 'Hydrostatic pressure testing of plastic pipe' },
  { code: 'ASTM D1238', description: 'Melt flow rates of thermoplastics' },
];

/* ─────────────────── COMPONENT ─────────────────── */

export default function Industries() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero animations */
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.ind-hero-breadcrumb', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo('.ind-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
        .fromTo('.ind-hero-subtitle', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');

      /* Industry cards stagger */
      if (gridRef.current) {
        gsap.fromTo(
          '.industry-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      /* Use case blocks */
      if (useCasesRef.current) {
        gsap.utils.toArray<HTMLElement>('.use-case-block').forEach((block) => {
          gsap.fromTo(
            block.querySelector('.use-case-text'),
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                once: true,
              },
            }
          );
          gsap.fromTo(
            block.querySelectorAll('.machine-mini-card'),
            { x: 20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%',
                once: true,
              },
            }
          );
        });
      }

      /* Standards */
      if (standardsRef.current) {
        gsap.fromTo(
          '.standard-card',
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: standardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      /* CTA */
      if (ctaRef.current) {
        gsap.fromTo(
          '.cta-headline',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
          }
        );
        gsap.fromTo(
          '.cta-subtitle',
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
          }
        );
        gsap.fromTo(
          '.cta-buttons',
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ─── SECTION 1: PAGE HERO ─── */}
      <section
        ref={heroRef}
        style={{ backgroundColor: '#2B1B0E' }}
        className="pt-[160px] pb-20"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="ind-hero-breadcrumb">
            <Link
              to="/"
              className="font-body text-[14px] font-medium transition-colors duration-200 hover:text-[#F3C623]"
              style={{ color: 'rgba(254,243,226,0.4)' }}
            >
              Home
            </Link>
            <span className="font-body text-[14px] mx-2" style={{ color: 'rgba(254,243,226,0.3)' }}>
              /
            </span>
            <span className="font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
              Industries
            </span>
          </nav>

          {/* Title */}
          <h1
            className="ind-hero-title font-display text-[34px] sm:text-[42px] lg:text-[56px] font-bold mt-6"
            style={{
              color: '#FEF3E2',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
            }}
          >
            Industries We Serve
          </h1>

          {/* Subtitle */}
          <p
            className="ind-hero-subtitle font-body text-[16px] lg:text-[18px] mt-4 max-w-[680px]"
            style={{
              color: 'rgba(254,243,226,0.6)',
              lineHeight: 1.65,
            }}
          >
            From PVC extrusion plants to irrigation infrastructure projects, our testing machines serve the complete spectrum of plastic pipe manufacturing and quality assurance across India.
          </p>
        </div>
      </section>

      {/* ─── SECTION 2: INDUSTRIES GRID ─── */}
      <section
        ref={gridRef}
        style={{ backgroundColor: '#FEF3E2' }}
        className="py-[80px] lg:py-[120px]"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-12 lg:mb-16">
            <span
              className="font-body text-[12px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: '#F3C623' }}
            >
              INDUSTRY VERTICALS
            </span>
            <h2
              className="font-display text-[28px] sm:text-[34px] lg:text-[42px] font-bold mt-3"
              style={{ color: '#2B1B0E', lineHeight: 1.15, letterSpacing: '-0.01em' }}
            >
              Trusted Across the Pipe Industry
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryCards.map((industry, index) => {
              const IconComp = industry.icon;
              return (
                <div
                  key={index}
                  className="industry-card group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    aspectRatio: '1 / 1.15',
                    boxShadow: '0 4px 24px rgba(43,27,14,0.06)',
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: industry.gradient, opacity: 0.88 }}
                  />

                  {/* Bottom gradient for text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(42,23,11,0.7) 100%)',
                    }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                    <IconComp size={28} style={{ color: '#F3C623' }} />
                    <h3
                      className="font-body text-[18px] lg:text-[20px] font-bold mt-3"
                      style={{ color: '#FEF3E2' }}
                    >
                      {industry.name}
                    </h3>
                    <p
                      className="font-body text-[13px] lg:text-[14px] mt-2 line-clamp-2"
                      style={{ color: 'rgba(254,243,226,0.65)', lineHeight: 1.5 }}
                    >
                      {industry.description}
                    </p>

                    {/* Recommended Machines */}
                    <div className="mt-4">
                      <span
                        className="font-body text-[11px] font-semibold uppercase tracking-[0.06em]"
                        style={{ color: 'rgba(254,243,226,0.4)' }}
                      >
                        Recommended Machines
                      </span>
                      <ul className="mt-2 space-y-1">
                        {industry.machines.map((machine, mi) => (
                          <li
                            key={mi}
                            className="font-body text-[12px] lg:text-[13px] flex items-center gap-1.5"
                            style={{ color: 'rgba(254,243,226,0.7)' }}
                          >
                            <CheckCircle size={12} style={{ color: '#F3C623', flexShrink: 0 }} />
                            {machine}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Explore link */}
                    <div
                      className="mt-4 flex items-center gap-1.5 font-body text-[13px] font-semibold transition-all duration-300 group-hover:gap-2.5"
                      style={{ color: '#F3C623' }}
                    >
                      Explore Solutions
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: USE CASE DEEP DIVE ─── */}
      <section
        ref={useCasesRef}
        style={{ backgroundColor: '#2B1B0E' }}
        className="py-[80px] lg:py-[120px]"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-12 lg:mb-16">
            <span
              className="font-body text-[12px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: '#F3C623' }}
            >
              USE CASES
            </span>
            <h2
              className="font-display text-[28px] sm:text-[34px] lg:text-[42px] font-bold mt-3 whitespace-pre-line"
              style={{ color: '#FEF3E2', lineHeight: 1.15, letterSpacing: '-0.01em' }}
            >
              {'Solutions for Every\nTesting Challenge'}
            </h2>
          </div>

          {/* Use Case Blocks */}
          <div className="space-y-16 lg:space-y-20">
            {useCases.map((useCase, index) => {
              const IconComp = useCase.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="use-case-block"
                  style={{
                    borderBottom: index < useCases.length - 1 ? '1px solid rgba(243,198,35,0.08)' : 'none',
                    paddingBottom: index < useCases.length - 1 ? '64px' : '0',
                  }}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ${
                      isEven ? '' : 'lg:direction-rtl'
                    }`}
                  >
                    {/* Text Column */}
                    <div className={`use-case-text ${isEven ? '' : 'lg:order-2'}`}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(243,198,35,0.1)' }}
                        >
                          <IconComp size={20} style={{ color: '#F3C623' }} />
                        </div>
                        <span
                          className="font-body text-[14px] font-semibold uppercase tracking-[0.06em]"
                          style={{ color: '#F3C623' }}
                        >
                          {useCase.industry}
                        </span>
                      </div>

                      <h3
                        className="font-body text-[24px] lg:text-[28px] font-bold mt-4"
                        style={{ color: '#FEF3E2' }}
                      >
                        {useCase.title}
                      </h3>

                      <p
                        className="font-body text-[15px] lg:text-[16px] mt-4"
                        style={{ color: 'rgba(254,243,226,0.6)', lineHeight: 1.7 }}
                      >
                        {useCase.description}
                      </p>

                      {/* Pain Points */}
                      <div className="mt-6 space-y-3">
                        {useCase.painPoints.map((point, pi) => (
                          <div key={pi} className="flex items-start gap-3">
                            <CheckCircle
                              size={16}
                              style={{ color: '#F3C623', flexShrink: 0, marginTop: 3 }}
                            />
                            <span
                              className="font-body text-[14px] lg:text-[15px]"
                              style={{ color: 'rgba(254,243,226,0.75)' }}
                            >
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Machines Column */}
                    <div className={isEven ? '' : 'lg:order-1'}>
                      <span
                        className="font-body text-[13px] font-semibold uppercase tracking-[0.06em]"
                        style={{ color: 'rgba(254,243,226,0.4)' }}
                      >
                        Recommended Machines
                      </span>
                      <div className="mt-4 space-y-3">
                        {useCase.recommendedMachines.map((machine, mi) => (
                          <Link
                            key={mi}
                            to={`/products/${machine.slug}`}
                            className="machine-mini-card flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:translate-x-1"
                            style={{
                              backgroundColor: 'rgba(254,243,226,0.03)',
                              border: '1px solid rgba(243,198,35,0.08)',
                            }}
                          >
                            <img
                              src={machine.image}
                              alt={machine.name}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              style={{ backgroundColor: 'rgba(254,243,226,0.05)' }}
                              loading="lazy"
                            />
                            <span
                              className="font-body text-[14px] lg:text-[15px] font-medium flex-1"
                              style={{ color: '#FEF3E2' }}
                            >
                              {machine.name}
                            </span>
                            <ArrowRight size={14} style={{ color: '#F3C623', flexShrink: 0 }} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: STANDARDS WE SUPPORT ─── */}
      <section
        ref={standardsRef}
        style={{ backgroundColor: '#2B1B0E' }}
        className="py-16 lg:py-20"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <h2
            className="font-body text-[24px] lg:text-[28px] font-semibold text-center mb-10"
            style={{ color: '#FEF3E2' }}
          >
            Standards We Support
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="standard-card text-center py-4 px-4 rounded-xl transition-all duration-300 hover:scale-[1.03]"
                style={{
                  backgroundColor: 'rgba(254,243,226,0.05)',
                  border: '1px solid rgba(243,198,35,0.1)',
                }}
              >
                <span
                  className="font-mono text-[16px] lg:text-[18px] font-semibold"
                  style={{ color: '#F3C623' }}
                >
                  {standard.code}
                </span>
                <p
                  className="font-body text-[12px] lg:text-[13px] mt-2"
                  style={{ color: 'rgba(254,243,226,0.5)' }}
                >
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: CTA ─── */}
      <section
        ref={ctaRef}
        className="py-20 lg:py-[100px]"
        style={{
          background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)',
        }}
      >
        <div className="max-w-[700px] mx-auto px-6 lg:px-12 text-center">
          <h2
            className="cta-headline font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold"
            style={{ color: '#2A170B', lineHeight: 1.15 }}
          >
            Not sure which machine fits your industry?
          </h2>

          <p
            className="cta-subtitle font-body text-[16px] lg:text-[18px] mt-4"
            style={{ color: 'rgba(42,23,11,0.75)', lineHeight: 1.65 }}
          >
            Tell us about your pipe manufacturing process and we&apos;ll recommend the right testing machines for your quality assurance needs.
          </p>

          <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/contact?subject=industry"
              className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{
                backgroundColor: '#2A170B',
                color: '#F3C623',
              }}
            >
              <Mail size={18} />
              Get Industry-Specific Advice
            </Link>

            <a
              href="https://wa.me/919829050308"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
              }}
            >
              <Phone size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
