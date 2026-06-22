import type { Variants } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Target,
  Heart,
  Lightbulb,
  Shield,
  MapPin,
  Wrench,
  FlaskConical,
  Users,
  Truck,
  Phone,
  Quote,
  ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const easeOut = [0.4, 0, 0.2, 1] as [number, number, number, number];

function fadeInUp(delay = 0, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: easeOut },
    },
  };
}

function fadeIn(delay = 0, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration, delay, ease: easeOut },
    },
  };
}

function scaleIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay, ease: easeOut },
    },
  };
}

function AnimatedDiv({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants: Variants;
}) {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1: Page Hero                                               */
/* ------------------------------------------------------------------ */

function PageHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        paddingTop: '160px',
        paddingBottom: '100px',
        backgroundColor: '#2B1B0E',
      }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src="/pipes-water-hero.webp"
          alt=""
          className="w-full h-full object-cover opacity-[0.12]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #2B1B0E 0%, rgba(43,27,14,0.95) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        <AnimatedDiv variants={fadeIn(0.2)}>
          <p
            className="font-body text-[14px] font-medium"
            style={{ color: 'rgba(254,243,226,0.4)' }}
          >
            Home / About Us
          </p>
        </AnimatedDiv>

        <AnimatedDiv variants={fadeInUp(0.4, 0.7)}>
          <h1
            className="font-display text-[40px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.1] mt-6"
            style={{ color: '#FEF3E2', letterSpacing: '-0.015em' }}
          >
            About Sunrise Enterprises
          </h1>
        </AnimatedDiv>

        <AnimatedDiv variants={fadeInUp(0.8, 0.5)}>
          <p
            className="font-display text-[20px] sm:text-[24px] italic mt-4"
            style={{ color: '#F3C623' }}
          >
            Testing Innovation. Ensuring Quality.
          </p>
        </AnimatedDiv>

        <AnimatedDiv variants={fadeIn(1.0, 0.6)}>
          <p
            className="font-body text-[16px] sm:text-[18px] leading-[1.65] mt-6 mx-auto max-w-[680px]"
            style={{ color: 'rgba(254,243,226,0.7)' }}
          >
            Based in Jaipur, Rajasthan, Sunrise Enterprises has been at the forefront of
            plastic pipe testing machine manufacturing for over 25 years. We design, build,
            and support precision testing equipment that helps pipe manufacturers across
            India and beyond maintain the highest quality standards.
          </p>
        </AnimatedDiv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2: Our Story                                               */
/* ------------------------------------------------------------------ */

function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{ backgroundColor: '#FEF3E2', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left: Text */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={fadeIn(0, 0.3)}
            className="font-body text-[12px] font-semibold tracking-[0.08em]"
            style={{ color: '#FA812F' }}
          >
            OUR STORY
          </motion.p>

          <motion.h2
            variants={fadeInUp(0.1, 0.6)}
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.15] mt-3"
            style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
          >
            From a Small Workshop
            <br />
            to Industry Leaders
          </motion.h2>

          <motion.p
            variants={fadeInUp(0.2, 0.5)}
            className="font-body text-[16px] sm:text-[18px] leading-[1.7] mt-7"
            style={{ color: 'rgba(43,27,14,0.75)' }}
          >
            Sunrise Enterprises was founded in Jaipur with a simple mission: to provide
            Indian pipe manufacturers with reliable, affordable, and precision-engineered
            testing equipment that meets international standards.
          </motion.p>

          <motion.p
            variants={fadeInUp(0.35, 0.5)}
            className="font-body text-[16px] sm:text-[18px] leading-[1.7] mt-5"
            style={{ color: 'rgba(43,27,14,0.75)' }}
          >
            What started as a small workshop serving local PVC manufacturers has grown into
            a trusted name across India. Today, our machines are used by HDPE, PPR, CPVC,
            and uPVC manufacturers from Gujarat to West Bengal, from Punjab to Tamil Nadu.
          </motion.p>

          <motion.p
            variants={fadeInUp(0.5, 0.5)}
            className="font-body text-[16px] sm:text-[18px] leading-[1.7] mt-5"
            style={{ color: 'rgba(43,27,14,0.75)' }}
          >
            Our success is built on understanding the unique challenges of Indian
            manufacturing — voltage fluctuations, extreme temperatures, diverse pipe
            specifications, and the need for prompt local support. Every machine we build
            is designed for these realities.
          </motion.p>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn(0.2)}
          className="relative"
        >
          {/* Decorative gold accent bar */}
          <div
            className="absolute -top-2 -left-2 z-10 hidden lg:block"
            style={{
              width: '4px',
              height: '48px',
              backgroundColor: '#F3C623',
              borderRadius: '2px',
            }}
          />
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(43,27,14,0.08)' }}
          >
            <img
              src="/about-facility.webp"
              alt="Sunrise Enterprises manufacturing facility in Jaipur"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3: Mission & Values                                        */
/* ------------------------------------------------------------------ */

const valuesData = [
  {
    icon: Target,
    title: 'Precision First',
    description:
      'Every machine is calibrated to deliver accurate, repeatable results. We don\'t compromise on testing accuracy because your product quality depends on it.',
  },
  {
    icon: Heart,
    title: 'Customer Partnership',
    description:
      'We view every sale as the beginning of a long-term partnership. Your success with our equipment is our success as a manufacturer.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description:
      'We constantly refine our designs based on customer feedback and evolving industry standards. Our R&D never stops.',
  },
  {
    icon: Shield,
    title: 'Made for India',
    description:
      'Built to withstand Indian manufacturing conditions — voltage fluctuations, heat, dust, and continuous operation. No unnecessary imported complexity.',
  },
];

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{ backgroundColor: '#2B1B0E', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeIn(0, 0.3)}
            className="font-body text-[12px] font-semibold tracking-[0.08em]"
            style={{ color: '#F3C623' }}
          >
            OUR VALUES
          </motion.p>
          <motion.h2
            variants={fadeInUp(0.1, 0.6)}
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.15] mt-3"
            style={{ color: '#FEF3E2', letterSpacing: '-0.01em' }}
          >
            What We Stand For
          </motion.h2>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {valuesData.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={fadeInUp(0, 0.6)}
                className="group p-8 sm:p-10 rounded-2xl transition-all duration-400 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(254,243,226,0.03)',
                  border: '1px solid rgba(243,198,35,0.06)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                whileHover={{
                  borderColor: 'rgba(243,198,35,0.2)',
                  boxShadow: '0 4px 24px rgba(243,198,35,0.08)',
                }}
              >
                <Icon size={52} style={{ color: '#F3C623' }} strokeWidth={1.5} />
                <h3
                  className="font-body text-[20px] sm:text-[22px] font-semibold mt-5"
                  style={{ color: '#FEF3E2' }}
                >
                  {value.title}
                </h3>
                <p
                  className="font-body text-[15px] sm:text-[16px] leading-[1.6] mt-3"
                  style={{ color: 'rgba(254,243,226,0.55)' }}
                >
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4: Journey Timeline                                        */
/* ------------------------------------------------------------------ */

const milestones = [
  {
    year: '1998',
    title: 'Founded in Jaipur',
    description:
      'Sunrise Enterprises established as a small precision engineering workshop in sarna dungar industrial area.',
  },
  {
    year: '2003',
    title: 'First Testing Machine',
    description:
      'Launched our first hydrostatic pressure testing apparatus, custom-built for local PVC pipe manufacturers.',
  },
  {
    year: '2008',
    title: 'Expanded Product Line',
    description:
      'Added bursting pressure, impact testing, and Vicat softening machines to our growing catalog.',
  },
  {
    year: '2014',
    title: 'PAN India Presence',
    description:
      'Established dealer and service network across all major Indian states, from Gujarat to Tamil Nadu.',
  },
  {
    year: '2019',
    title: '500th Machine Delivered',
    description:
      'Crossed the milestone of 500 machines delivered, serving clients in 15+ Indian states.',
  },
  {
    year: '2024',
    title: 'Full Product Portfolio',
    description:
      'Eight comprehensive testing machine types, serving PVC, HDPE, PPR, CPVC manufacturers and testing labs nationwide.',
  },
];

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{ backgroundColor: '#FEF3E2', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div ref={ref} className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeIn(0, 0.3)}
            className="font-body text-[12px] font-semibold tracking-[0.08em]"
            style={{ color: '#FA812F' }}
          >
            OUR JOURNEY
          </motion.p>
          <motion.h2
            variants={fadeInUp(0.1, 0.6)}
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.15] mt-3"
            style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
          >
            Milestones That Define Us
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-[2px] origin-top hidden lg:block"
            style={{ backgroundColor: 'rgba(243,198,35,0.2)', transform: 'translateX(-50%)' }}
          />

          {/* Mobile line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
            className="absolute left-[7px] top-0 bottom-0 w-[2px] origin-top lg:hidden"
            style={{ backgroundColor: 'rgba(243,198,35,0.2)' }}
          />

          {/* Milestones */}
          <div className="space-y-12 lg:space-y-0">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={m.year}
                  milestone={m}
                  index={i}
                  isLeft={isLeft}
                  isInView={isInView}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  milestone,
  index,
  isLeft,
  isInView,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isLeft: boolean;
  isInView: boolean;
}) {
  return (
    <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:min-h-[140px]">
      {/* Desktop: alternating layout */}
      {/* Dot on the line - desktop */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.15,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        }}
        className="absolute left-1/2 top-4 hidden lg:block"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: '#F3C623',
            border: '3px solid #FEF3E2',
          }}
        />
      </motion.div>

      {/* Mobile: dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.15,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        }}
        className="absolute left-0 top-1 lg:hidden"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: '#F3C623',
            border: '3px solid #FEF3E2',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -20 : 20 }}
        transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: easeOut }}
        className={`lg:col-span-1 pl-8 lg:pl-0 ${
          isLeft ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
        }`}
      >
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 12px rgba(43,27,14,0.04)',
          }}
        >
          <span
            className="font-mono text-[18px] sm:text-[20px] font-semibold"
            style={{ color: '#F3C623' }}
          >
            {milestone.year}
          </span>
          <h3
            className="font-body text-[16px] sm:text-[18px] font-semibold mt-1"
            style={{ color: '#2B1B0E' }}
          >
            {milestone.title}
          </h3>
          <p
            className="font-body text-[14px] sm:text-[15px] mt-2 leading-[1.6]"
            style={{ color: 'rgba(43,27,14,0.65)' }}
          >
            {milestone.description}
          </p>
        </div>
      </motion.div>

      {/* Empty column for alternating layout */}
      <div className="hidden lg:block" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5: Our Facility                                            */
/* ------------------------------------------------------------------ */

const facilityHighlights = [
  {
    icon: MapPin,
    text: '10,000+ sq ft manufacturing facility in sarna dungar industrial area, jaipur',
  },
  {
    icon: Wrench,
    text: 'In-house CNC machining, fabrication, and assembly units',
  },
  {
    icon: FlaskConical,
    text: 'Dedicated calibration and testing lab for quality assurance',
  },
  {
    icon: Users,
    text: 'Team of 30+ skilled engineers, technicians, and support staff',
  },
  {
    icon: Truck,
    text: 'In-house packing and logistics for safe PAN India delivery',
  },
];

function FacilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{ backgroundColor: '#FEF3E2', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-12"
        >
          <motion.p
            variants={fadeIn(0, 0.3)}
            className="font-body text-[12px] font-semibold tracking-[0.08em]"
            style={{ color: '#FA812F' }}
          >
            OUR FACILITY
          </motion.p>
          <motion.h2
            variants={fadeInUp(0.1, 0.6)}
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.15] mt-3"
            style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
          >
            Built for Precision
            <br />
            Manufacturing
          </motion.h2>
        </motion.div>

        {/* Two-column */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left: Image */}
          <motion.div variants={scaleIn(0.1)}>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ boxShadow: '0 8px 32px rgba(43,27,14,0.08)' }}
            >
              <img
                src="/about-facility.webp"
                alt="Sunrise Enterprises manufacturing facility"
                className="w-full aspect-square object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(43,27,14,0.1) 100%)',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Highlights */}
          <div>
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
              className="space-y-5"
            >
              {facilityHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    variants={{
                      hidden: { opacity: 0, x: 15 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: easeOut },
                      },
                    }}
                    className="flex items-start gap-4"
                  >
                    <Icon
                      size={20}
                      style={{ color: '#F3C623', flexShrink: 0, marginTop: '3px' }}
                    />
                    <span
                      className="font-body text-[15px] sm:text-[16px] font-medium"
                      style={{ color: 'rgba(43,27,14,0.8)' }}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Location Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.8, ease: easeOut },
                },
              }}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-8 rounded-xl p-6"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(43,27,14,0.06)',
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <MapPin size={16} style={{ color: '#F3C623', flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <p className="font-body text-[14px] sm:text-[15px]" style={{ color: 'rgba(43,27,14,0.75)' }}>
                    Plot no 3 sarna dungar industrial area
                  </p>
                  <p className="font-body text-[14px] sm:text-[15px]" style={{ color: 'rgba(43,27,14,0.75)' }}>
                    jaipur
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#F3C623', flexShrink: 0 }} />
                <p className="font-body text-[13px] sm:text-[14px]" style={{ color: '#2B1B0E' }}>
                  +91 98290 50308 / +91 8949 444099
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6: Leadership                                              */
/* ------------------------------------------------------------------ */

function LeadershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{ backgroundColor: '#2B1B0E', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div ref={ref} className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h2
            variants={fadeIn(0, 0.6)}
            className="font-display text-[30px] sm:text-[36px] font-bold leading-[1.15]"
            style={{ color: '#FEF3E2', letterSpacing: '-0.01em' }}
          >
            Leadership
          </motion.h2>

          {/* Founder avatar placeholder */}
          <motion.div
            variants={scaleIn(0.1)}
            className="mx-auto mt-10 w-[120px] h-[120px] rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(243,198,35,0.08)',
              border: '2px solid rgba(243,198,35,0.15)',
            }}
          >
            <span
              className="font-display text-[40px] font-bold"
              style={{ color: 'rgba(243,198,35,0.4)' }}
            >
              JC
            </span>
          </motion.div>

          <motion.h3
            variants={fadeInUp(0.2, 0.4)}
            className="font-body text-[20px] sm:text-[22px] font-semibold mt-5"
            style={{ color: '#FEF3E2' }}
          >
            Jhabarmal Choudhary
          </motion.h3>

          <motion.p
            variants={fadeInUp(0.3, 0.4)}
            className="font-body text-[14px] sm:text-[15px] font-medium mt-1"
            style={{ color: '#F3C623' }}
          >
            Founder & Managing Director
          </motion.p>

          {/* Quote */}
          <motion.div
            variants={fadeIn(0.4, 0.6)}
            className="relative mt-6 mx-auto max-w-[560px]"
          >
            <Quote
              size={48}
              className="mx-auto mb-3"
              style={{ color: 'rgba(243,198,35,0.15)' }}
            />
            <p
              className="font-display text-[16px] sm:text-[18px] italic leading-[1.7]"
              style={{ color: 'rgba(254,243,226,0.7)' }}
            >
              For over 25 years, we have believed that Indian manufacturers deserve
              world-class testing equipment built for Indian conditions. That belief drives
              everything we do at Sunrise.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 7: CTA                                                     */
/* ------------------------------------------------------------------ */

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div className="max-w-[600px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h2
            variants={fadeInUp(0, 0.6)}
            className="font-display text-[32px] sm:text-[38px] lg:text-[42px] font-bold leading-[1.15]"
            style={{ color: '#2A170B', letterSpacing: '-0.01em' }}
          >
            Let&apos;s Build Something
            <br />
            Together
          </motion.h2>

          <motion.p
            variants={fadeIn(0.3, 0.5)}
            className="font-body text-[16px] sm:text-[18px] leading-[1.65] mt-4"
            style={{ color: 'rgba(42,23,11,0.75)' }}
          >
            Whether you need a standard testing machine or a custom-built solution, our
            team is ready to help.
          </motion.p>

          <motion.div
            variants={fadeInUp(0.5, 0.5)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: '#2A170B',
                color: '#F3C623',
              }}
            >
              Contact Us
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: 'transparent',
                color: '#2A170B',
                border: '2px solid #2A170B',
              }}
            >
              View Our Machines
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Page                                                    */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <div>
      <PageHero />
      <OurStory />
      <ValuesSection />
      <Timeline />
      <FacilitySection />
      <LeadershipSection />
      <CTASection />
    </div>
  );
}
