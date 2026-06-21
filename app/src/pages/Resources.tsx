import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  Shield,
  FileCheck,
  FileText,
  Mail,
  CheckCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/* ─── Animation helpers ─── */
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'none';
}) {
  const { ref, inView } = useReveal();
  const yOffset = direction === 'up' ? 30 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 0.6, delay, ease: easeSmooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section 1: Page Hero ─── */
function PageHero() {
  return (
    <section
      className="relative"
      style={{
        background: 'linear-gradient(180deg, #2B1B0E 0%, #2A170B 100%)',
        paddingTop: '160px',
        paddingBottom: '80px',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-body text-[14px] font-medium"
          style={{ color: 'rgba(254,243,226,0.4)' }}
        >
          Home / Resources
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeSmooth }}
          className="font-display text-[34px] sm:text-[42px] lg:text-[56px] font-bold leading-tight mt-6"
          style={{ color: '#FEF3E2', letterSpacing: '-0.015em' }}
        >
          Technical Resources
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeSmooth }}
          className="font-body text-[16px] lg:text-[18px] leading-relaxed mt-4 max-w-[640px]"
          style={{ color: 'rgba(254,243,226,0.6)' }}
        >
          Technical documentation, compliance guides, and expert answers to help
          you choose, operate, and maintain your testing equipment.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 2: Certifications ─── */
const certifications = [
  {
    icon: Award,
    image: '/cert-iso.webp',
    title: 'ISO 9001:2015 Quality Management',
    description:
      'Our quality management system is certified to ISO 9001:2015, ensuring consistent processes from design to delivery.',
    status: 'Certified',
  },
  {
    icon: Shield,
    image: '/cert-ce.webp',
    title: 'CE Marking Certification',
    description:
      'Select machines carry CE marking for European conformity, meeting EU safety, health, and environmental requirements.',
    status: 'Certified',
  },
  {
    icon: FileCheck,
    image: null,
    title: 'BIS Certified Equipment',
    description:
      'Our testing machines are designed to comply with Bureau of Indian Standards (BIS) requirements for testing procedures and calibration.',
    status: 'Compliant',
  },
];

function CertificationsSection() {
  const { ref, inView } = useReveal();

  return (
    <section style={{ backgroundColor: '#FEF3E2', padding: '100px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <Reveal className="text-center mb-12">
          <p
            className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: '#FA812F' }}
          >
            CERTIFICATIONS
          </p>
          <h2
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold mt-3"
            style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
          >
            Quality You Can Trust
          </h2>
        </Reveal>

        {/* Certification cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSmooth } },
              }}
              className="text-center rounded-[16px] p-8 lg:p-10 transition-all duration-400 hover:-translate-y-1"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(43,27,14,0.05)',
                boxShadow: '0 4px 24px rgba(43,27,14,0.04)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 12px 40px rgba(43,27,14,0.08)';
                el.style.borderColor = 'rgba(243,198,35,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = '0 4px 24px rgba(43,27,14,0.04)';
                el.style.borderColor = 'rgba(43,27,14,0.05)';
              }}
            >
              {/* Icon area */}
              <motion.div
                variants={{
                  hidden: { scale: 0.8 },
                  visible: { scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] } },
                }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: '#FEF3E2' }}
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-10 h-10 object-contain rounded"
                  />
                ) : (
                  <cert.icon size={32} style={{ color: '#F3C623' }} />
                )}
              </motion.div>

              <h3
                className="font-body text-[18px] lg:text-[20px] font-semibold mt-5"
                style={{ color: '#2B1B0E' }}
              >
                {cert.title}
              </h3>

              <p
                className="font-body text-[14px] lg:text-[15px] mt-3 leading-relaxed"
                style={{ color: 'rgba(43,27,14,0.65)' }}
              >
                {cert.description}
              </p>

              {/* Status badge */}
              <span
                className="inline-block mt-5 font-body text-[12px] font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(37,211,102,0.1)',
                  color: '#25D366',
                }}
              >
                {cert.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 3: Technical Guides ─── */
const technicalGuides = [
  {
    title: 'How to Select the Right Testing Machine for Your Application',
    content:
      'Consider the maximum pressure your pipes need to withstand, the number of stations for your production volume, and the temperature range. For PVC pipes up to 160mm diameter, our 3-station SE-HP-160 is the most popular choice. For larger HDPE pipes, consider the 6-station configuration with extended clamps. Contact our team for a personalized recommendation based on your pipe specifications.',
  },
  {
    title: 'Understanding Hydrostatic Pressure Test Standards',
    content:
      'ISO 1167 covers hydrostatic resistance, ISO 3127 addresses impact testing, and ISO 9969 specifies ring stiffness measurement. ASTM standards (D1598, D2444) are commonly used for export-oriented manufacturing. Indian standards (IS 4985, IS 4984) apply for domestic market compliance.',
  },
  {
    title: 'Impact Testing: Methods and Best Practices',
    content:
      'Impact testing determines the resistance of plastic pipes to sudden blows. The falling weight method (ISO 3127) is the industry standard. Key factors include specimen temperature, striker geometry, and support span. Always condition samples at 0°C for at least 1 hour before testing. Our impact testers include digital drop height control and automatic result calculation.',
  },
  {
    title: 'Calibration and Maintenance Guide',
    content:
      'Annual calibration is recommended for all testing machines. We provide NABL-traceable calibration certificates. Our PAN India service team can perform on-site calibration, or you can ship the load cell/pressure sensor to our Jaipur facility. Calibration typically takes 3-5 working days.',
  },
  {
    title: 'Interpreting Test Results and Reports',
    content:
      'Understanding test results is critical for quality control. Hydrostatic test reports include burst pressure, hold pressure, and time-to-failure data. Compare results against standard requirements for your pipe class. Our machines generate automated reports with pass/fail indicators aligned to applicable standards.',
  },
  {
    title: 'Safety Protocols for Testing Equipment',
    content:
      'Always wear appropriate PPE when operating testing equipment. Ensure guards are in place before starting impact tests. Verify all connections are secure before pressurizing hydrostatic systems. Never exceed rated pressure capacity. Emergency stop buttons should be tested weekly. Follow lockout/tagout procedures during maintenance.',
  },
];

function TechnicalGuidesSection() {
  const { ref, inView } = useReveal();

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #2B1B0E 0%, #2A170B 100%)',
        padding: '120px 0',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <Reveal className="mb-12">
          <p
            className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: '#F3C623' }}
          >
            TECHNICAL GUIDES
          </p>
          <h2
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold mt-3 whitespace-pre-line"
            style={{ color: '#FEF3E2', letterSpacing: '-0.01em' }}
          >
            {'Expert Knowledge\nat Your Fingertips'}
          </h2>
        </Reveal>

        {/* Guide accordion */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="flex flex-col gap-3"
        >
          <Accordion type="single" collapsible className="w-full">
            {technicalGuides.map((guide, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
                }}
              >
                <AccordionItem
                  value={`guide-${i}`}
                  className="border-0 mb-3"
                >
                  <AccordionTrigger
                    className="rounded-[12px] px-6 py-5 font-body text-[15px] lg:text-[17px] font-medium no-underline hover:no-underline border"
                    style={{
                      backgroundColor: 'rgba(254,243,226,0.03)',
                      borderColor: 'rgba(243,198,35,0.06)',
                      color: '#FEF3E2',
                    }}
                  >
                    <span className="flex items-center gap-3 text-left">
                      <CheckCircle
                        size={18}
                        style={{ color: '#F3C623' }}
                        className="shrink-0 mt-0.5"
                      />
                      {guide.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="rounded-b-[12px] px-6 pb-5 pt-4 font-body text-[14px] lg:text-[15px] leading-relaxed border-t"
                    style={{
                      backgroundColor: 'rgba(254,243,226,0.02)',
                      borderColor: 'rgba(243,198,35,0.06)',
                      color: 'rgba(254,243,226,0.65)',
                    }}
                  >
                    {guide.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: FAQ ─── */
const faqItems = [
  {
    question: 'What types of pipes can your machines test?',
    answer:
      'Our machines can test PVC, uPVC, HDPE, PPR, CPVC, and other thermoplastic pipes. Each machine is designed for specific pipe diameters (ranging from 16mm to 630mm) and can be configured for different standards including ISO, ASTM, and BIS.',
  },
  {
    question: 'Do you provide installation and training?',
    answer:
      'Yes, every machine includes free installation and operator training at your premises. Our engineers travel PAN India. For remote locations, we also offer video-guided installation with detailed manuals.',
  },
  {
    question: 'What is the warranty period?',
    answer:
      'All machines come with a 12-month warranty covering manufacturing defects. Extended warranty packages up to 3 years are available. We guarantee spare parts availability for 10 years from purchase.',
  },
  {
    question: 'Can machines be customized for specific requirements?',
    answer:
      'Absolutely. We regularly customize pressure ranges, station counts, clamp sizes, and software features. Share your pipe specifications and testing requirements, and our engineering team will propose a tailored solution.',
  },
  {
    question: 'Do you offer AMC (Annual Maintenance Contract)?',
    answer:
      'Yes, we offer comprehensive AMC packages that include scheduled maintenance visits, priority support, spare parts discounts, and annual calibration. Contact us for AMC pricing based on your machine inventory.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Standard machines are delivered within 3-4 weeks from order confirmation. Custom-configured machines may take 5-6 weeks. We maintain ready stock of our most popular models for immediate dispatch.',
  },
  {
    question: 'Do you provide calibration certificates?',
    answer:
      'Yes, every machine is calibrated before dispatch and comes with a calibration certificate. NABL-traceable certificates are available on request. We recommend annual recalibration for optimal accuracy.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers (NEFT/RTGS), demand drafts, and letters of credit for large orders. Typically, 50% advance with order and 50% before dispatch. GST extra as applicable.',
  },
];

function FAQSection() {
  const { ref, inView } = useReveal();

  return (
    <section style={{ backgroundColor: '#FEF3E2', padding: '120px 0' }}>
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <Reveal className="text-center mb-12">
          <p
            className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: '#FA812F' }}
          >
            FAQ
          </p>
          <h2
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold mt-3 whitespace-pre-line"
            style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
          >
            {'Frequently Asked\nQuestions'}
          </h2>
        </Reveal>

        {/* FAQ accordion */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
                }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border-0 mb-3"
                >
                  <AccordionTrigger
                    className="rounded-[12px] px-6 py-5 font-body text-[15px] lg:text-[17px] font-medium no-underline hover:no-underline border"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: 'rgba(243,198,35,0.25)',
                      color: '#2B1B0E',
                    }}
                  >
                    <span className="text-left pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="rounded-b-[12px] px-6 pb-5 pt-4 font-body text-[14px] lg:text-[15px] leading-relaxed border-t"
                    style={{
                      backgroundColor: 'rgba(43,27,14,0.01)',
                      borderColor: 'rgba(243,198,35,0.15)',
                      color: 'rgba(43,27,14,0.7)',
                    }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 5: Download Center ─── */
const downloadItems = [
  {
    title: 'Product Catalog',
    description: 'Complete catalog of all 8 testing machines with specifications',
    size: '4.2 MB',
  },
  {
    title: 'Technical Datasheets',
    description: 'Detailed technical specifications and ordering guide',
    size: '1.8 MB',
  },
  {
    title: 'Company Brochure',
    description: 'About Sunrise Enterprises, capabilities, and credentials',
    size: '1.5 MB',
  },
  {
    title: 'Machine Specifications',
    description: 'Technical details for all machine types',
    size: '1.5 MB',
  },
  {
    title: 'Calibration Guide',
    description: 'Step-by-step calibration guide for all machine types',
    size: '1.2 MB',
  },
  {
    title: 'Price List',
    description: 'Current pricing for all standard machine configurations',
    size: '0.8 MB',
  },
];

function DownloadCard({
  item,
}: {
  item: (typeof downloadItems)[0];
}) {
  const mailtoLink = `mailto:jhabarmalchoudhary1974@gmail.com?subject=Request: ${encodeURIComponent(item.title)}&body=Hello Sunrise Enterprises,%0D%0A%0D%0AI would like to request the following document:%0D%0A%0D%0A- ${encodeURIComponent(item.title)} (${item.size})%0D%0A%0D%0APlease send it to the email address provided.%0D%0A%0D%0AThank you.`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
      }}
      className="rounded-[12px] p-6 transition-all duration-300"
      style={{
        backgroundColor: 'rgba(254,243,226,0.03)',
        border: '1px solid rgba(243,198,35,0.06)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(243,198,35,0.15)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(243,198,35,0.06)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <FileText size={24} style={{ color: '#F3C623' }} />

      <h4
        className="font-body text-[16px] font-medium mt-3"
        style={{ color: '#FEF3E2' }}
      >
        {item.title}
      </h4>

      <p
        className="font-body text-[13px] mt-1"
        style={{ color: 'rgba(254,243,226,0.5)' }}
      >
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span
          className="font-body text-[12px]"
          style={{ color: 'rgba(254,243,226,0.35)' }}
        >
          PDF &middot; {item.size}
        </span>

        <a
          href={mailtoLink}
          className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold transition-all duration-200 hover:opacity-80"
          style={{ color: '#F3C623' }}
        >
          <Mail size={14} />
          Request via Email
        </a>
      </div>
    </motion.div>
  );
}

function DownloadCenterSection() {
  const { ref, inView } = useReveal();

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #2B1B0E 0%, #2A170B 100%)',
        padding: '100px 0',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <Reveal className="mb-12">
          <p
            className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: '#F3C623' }}
          >
            DOWNLOADS
          </p>
          <h2
            className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold mt-3"
            style={{ color: '#FEF3E2', letterSpacing: '-0.01em' }}
          >
            Technical Documents
          </h2>
        </Reveal>

        {/* Download grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {downloadItems.map((item, i) => (
            <DownloadCard key={i} item={item} />
          ))}
        </motion.div>

        {/* Need help note */}
        <Reveal delay={0.4} className="text-center mt-10">
          <p
            className="font-body text-[15px]"
            style={{ color: 'rgba(254,243,226,0.55)' }}
          >
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link
              to="/contact"
              className="font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: '#F3C623' }}
            >
              Contact Us
            </Link>{' '}
            and we&apos;ll send you the specific documents you need.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main Page Component ─── */
export default function Resources() {
  return (
    <div>
      <PageHero />
      <CertificationsSection />
      <TechnicalGuidesSection />
      <FAQSection />
      <DownloadCenterSection />
    </div>
  );
}
