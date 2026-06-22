import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ──────────────────────── constants ──────────────────────── */

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Direct',
    value: '+91 98290 50308',
    href: 'tel:+919829050308',
    actionLabel: 'Call Now',
    color: '#F3C623',
  },
  {
    icon: Phone,
    label: 'Alternate Line',
    value: '+91 8949 444099',
    href: 'tel:+918949444099',
    actionLabel: 'Call Now',
    color: '#FFB22C',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Quick Inquiry',
    href: 'https://wa.me/919829050308',
    actionLabel: 'Chat Now',
    color: '#25D366',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'jhabarmalchoudhary1974@gmail.com',
    href: 'mailto:jhabarmalchoudhary1974@gmail.com',
    actionLabel: 'Send Email',
    color: '#FA812F',
  },
];

const productOptions = [
  'Hydrostatic Pressure Test Apparatus',
  'Bursting Pressure Testing Machine',
  'Impact Testing Machine (Falling Weight)',
  'Ring Stiffness Testing Machine',
  'Tensile Testing Machine',
  'Vicat Softening Point Apparatus',
  'Melt Flow Index Tester',
  'Pipe Notching Machine',
  'General Inquiry',
];

const faqItems = [
  {
    question: 'What is the typical delivery time for testing machines?',
    answer:
      'Standard machines are delivered within 2-4 weeks from order confirmation. For custom configurations or bulk orders, delivery may take 4-6 weeks. We keep popular models in stock for faster dispatch.',
  },
  {
    question: 'Do you provide installation and training?',
    answer:
      'Yes, we provide free installation and operator training at your facility with every machine purchase. Our technicians will ensure your team is fully comfortable operating the equipment before handover.',
  },
  {
    question: 'What warranty and after-sales support do you offer?',
    answer:
      'All our testing machines come with a 12-month comprehensive warranty covering parts and labor. We also offer annual maintenance contracts (AMC), remote technical support, and spare parts availability for all models.',
  },
  {
    question: 'Can you customize machines for specific testing requirements?',
    answer:
      'Absolutely. We regularly customize our machines for non-standard pipe sizes, additional testing parameters, and specific industry standards. Contact us with your requirements for a tailored solution.',
  },
];

/* ──────────────────────── animation helpers ──────────────────────── */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ──────────────────────── FAQ Accordion Item ──────────────────────── */

function FaqItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="border border-[rgba(43,27,14,0.08)] rounded-xl overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[rgba(243,198,35,0.03)]"
      >
        <span
          className="font-body text-[15px] font-semibold leading-snug"
          style={{ color: '#2B1B0E' }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={20} style={{ color: '#F3C623' }} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <div
          ref={contentRef}
          className="px-6 pb-5 font-body text-[14px] leading-relaxed"
          style={{ color: 'rgba(43,27,14,0.65)' }}
        >
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────── Contact Method Card ──────────────────────── */

function ContactMethodCard({ method }: { method: typeof contactMethods[0] }) {
  const Icon = method.icon;
  return (
    <motion.div
      variants={staggerChild}
      className="flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 group"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(43,27,14,0.05)',
        boxShadow: '0 4px 24px rgba(43,27,14,0.04)',
      }}
      whileHover={{
        boxShadow: '0 12px 40px rgba(43,27,14,0.08)',
        borderColor: 'rgba(243,198,35,0.2)',
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: method.color + '18' }}
      >
        <Icon size={28} style={{ color: method.color }} />
      </div>
      <span
        className="font-body text-[12px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: 'rgba(43,27,14,0.4)' }}
      >
        {method.label}
      </span>
      <span
        className="font-body text-[15px] font-semibold mt-1.5 leading-snug"
        style={{ color: '#2B1B0E', wordBreak: 'break-word' }}
      >
        {method.value}
      </span>
      <a
        href={method.href}
        target={method.href.startsWith('http') ? '_blank' : undefined}
        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="font-body text-[14px] font-semibold mt-3 transition-colors duration-200 hover:underline"
        style={{ color: method.color }}
      >
        {method.actionLabel} <ArrowRight size={14} className="inline ml-0.5" />
      </a>
    </motion.div>
  );
}

/* ──────────────────────── Info Block ──────────────────────── */

function InfoBlock({ icon: Icon, title, children }: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(43,27,14,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(243,198,35,0.12)' }}
        >
          <Icon size={20} style={{ color: '#F3C623' }} />
        </div>
        <span className="font-body text-[16px] font-semibold" style={{ color: '#2B1B0E' }}>
          {title}
        </span>
      </div>
      <div className="mt-3 pl-[52px]">{children}</div>
    </div>
  );
}

/* ──────────────────────── Main Component ──────────────────────── */

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    productInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const methodsRef = useRef(null);
  const formSectionRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);
  const faqRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const methodsInView = useInView(methodsRef, { once: true });
  const formInView = useInView(formSectionRef, { once: true });
  const mapInView = useInView(mapRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });
  const faqInView = useInView(faqRef, { once: true });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, productInterest: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        productInterest: '',
        message: '',
      });
    }, 5000);
  };

  /* ─────────── render ─────────── */

  return (
    <div>
      {/* ═══════════════════════ Section 1: Page Hero ═══════════════════════ */}
      <section
        className="relative"
        style={{
          background: 'linear-gradient(180deg, #2B1B0E 0%, #2A170B 100%)',
          paddingTop: '160px',
          paddingBottom: '80px',
        }}
      >
        <div ref={heroRef} className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Link
                to="/"
                className="font-body text-[14px] font-medium transition-colors duration-200 hover:text-[#F3C623]"
                style={{ color: 'rgba(254,243,226,0.4)' }}
              >
                Home
              </Link>
              <span style={{ color: 'rgba(254,243,226,0.2)' }}>/</span>
              <span className="font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
                Contact Us
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-[40px] sm:text-[48px] lg:text-[56px] font-bold"
            style={{ color: '#FEF3E2', lineHeight: 1.1, letterSpacing: '-0.015em' }}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Get in Touch
          </motion.h1>

          <motion.p
            className="font-body text-[16px] lg:text-[18px] mx-auto mt-4 max-w-[560px]"
            style={{ color: 'rgba(254,243,226,0.6)', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Request a quote, ask a technical question, or discuss your custom testing requirements. Our team responds within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════ Section 2: Contact Methods ═══════════════════════ */}
      <section
        style={{
          backgroundColor: '#FEF3E2',
          paddingTop: '48px',
          paddingBottom: '48px',
        }}
      >
        <div ref={methodsRef} className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={methodsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {contactMethods.map((method, i) => (
              <ContactMethodCard key={i} method={method} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ Section 3: Form + Company Info ═══════════════════════ */}
      <section
        style={{
          backgroundColor: '#FEF3E2',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div ref={formSectionRef} className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* ── Left: Form ── */}
            <motion.div
              className="flex-1 lg:max-w-[60%]"
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div
                className="p-6 sm:p-8 rounded-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 24px rgba(43,27,14,0.06)',
                  border: '1px solid rgba(43,27,14,0.05)',
                }}
              >
                <h2
                  className="font-body text-[24px] lg:text-[28px] font-semibold mb-6"
                  style={{ color: '#2B1B0E', letterSpacing: '-0.01em' }}
                >
                  Send Us a Message
                </h2>

                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(243,198,35,0.15)' }}
                    >
                      <CheckCircle2 size={32} style={{ color: '#F3C623' }} />
                    </div>
                    <h3 className="font-body text-[20px] font-semibold" style={{ color: '#2B1B0E' }}>
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="font-body text-[14px] mt-2" style={{ color: 'rgba(43,27,14,0.6)' }}>
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="font-body text-[13px] font-semibold"
                          style={{ color: '#2B1B0E' }}
                        >
                          Full Name <span style={{ color: '#FA812F' }}>*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="font-body text-[15px] h-12 px-4 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white transition-all duration-200"
                          style={{
                            outline: 'none',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F3C623';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="companyName"
                          className="font-body text-[13px] font-semibold"
                          style={{ color: '#2B1B0E' }}
                        >
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          placeholder="Your company name"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="font-body text-[15px] h-12 px-4 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white transition-all duration-200"
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F3C623';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="font-body text-[13px] font-semibold"
                          style={{ color: '#2B1B0E' }}
                        >
                          Phone <span style={{ color: '#FA812F' }}>*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="font-body text-[15px] h-12 px-4 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white transition-all duration-200"
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F3C623';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="font-body text-[13px] font-semibold"
                          style={{ color: '#2B1B0E' }}
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="email@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="font-body text-[15px] h-12 px-4 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white transition-all duration-200"
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F3C623';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Product of Interest */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="productInterest"
                        className="font-body text-[13px] font-semibold"
                        style={{ color: '#2B1B0E' }}
                      >
                        Product of Interest
                      </Label>
                      <Select value={formData.productInterest} onValueChange={handleSelectChange}>
                        <SelectTrigger
                          id="productInterest"
                          className="font-body text-[15px] h-12 px-4 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white w-full transition-all duration-200"
                          style={{ outline: 'none' }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#F3C623';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <SelectValue placeholder="Select a product..." />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions.map((option) => (
                            <SelectItem key={option} value={option} className="font-body text-[14px]">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="font-body text-[13px] font-semibold"
                        style={{ color: '#2B1B0E' }}
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your requirements — pipe types, testing needs, quantity, timeline..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="font-body text-[15px] px-4 py-3 rounded-[10px] border-[rgba(43,27,14,0.1)] bg-white resize-y transition-all duration-200"
                        style={{ minHeight: '120px', outline: 'none' }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#F3C623';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(243,198,35,0.12)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(43,27,14,0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="w-full sm:w-auto font-body text-[16px] font-semibold px-10 py-4 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: '#F3C623',
                        color: '#2A170B',
                        minWidth: '200px',
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 4px 20px rgba(243,198,35,0.25)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFB22C';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3C623';
                      }}
                    >
                      Send Inquiry
                    </motion.button>

                    {/* Privacy notes */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                      <p className="font-body text-[13px]" style={{ color: 'rgba(43,27,14,0.4)' }}>
                        Your information is secure and will never be shared with third parties.
                      </p>
                      <p className="font-body text-[13px]" style={{ color: 'rgba(43,27,14,0.5)' }}>
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Right: Company Info ── */}
            <motion.div
              className="lg:w-[40%] flex flex-col gap-5"
              initial={{ opacity: 0, x: 20 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Address */}
              <InfoBlock icon={MapPin} title="Our Address">
                <p className="font-body text-[15px] leading-relaxed" style={{ color: 'rgba(43,27,14,0.7)' }}>
                  Plot no 3 sarna dungar industrial area jaipur
                </p>
              </InfoBlock>

              {/* Phone Numbers */}
              <InfoBlock icon={Phone} title="Phone Numbers">
                <div className="space-y-1">
                  <a
                    href="tel:+919829050308"
                    className="block font-body text-[16px] font-semibold transition-colors duration-200 hover:text-[#F3C623]"
                    style={{ color: '#2B1B0E' }}
                  >
                    +91 98290 50308
                  </a>
                  <a
                    href="tel:+918949444099"
                    className="block font-body text-[15px] transition-colors duration-200 hover:text-[#F3C623]"
                    style={{ color: 'rgba(43,27,14,0.7)' }}
                  >
                    +91 8949 444099
                  </a>
                </div>
              </InfoBlock>

              {/* Email */}
              <InfoBlock icon={Mail} title="Email Us">
                <a
                  href="mailto:jhabarmalchoudhary1974@gmail.com"
                  className="font-body text-[15px] transition-colors duration-200 hover:text-[#F3C623] break-all"
                  style={{ color: '#2B1B0E' }}
                >
                  jhabarmalchoudhary1974@gmail.com
                </a>
              </InfoBlock>

              {/* Business Hours */}
              <InfoBlock icon={Clock} title="Business Hours">
                <p className="font-body text-[15px] leading-relaxed" style={{ color: 'rgba(43,27,14,0.7)' }}>
                  Monday — Saturday: 9:00 AM – 6:00 PM IST<br />
                  Sunday: Closed
                </p>
              </InfoBlock>

              {/* WhatsApp Quick Contact */}
              <motion.a
                href="https://wa.me/919829050308"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={32} color="white" fill="white" />
                <span className="font-body text-[16px] font-semibold text-white mt-3">
                  Prefer WhatsApp?
                </span>
                <span className="font-body text-[14px] mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Chat with us for quick inquiries
                </span>
                <span
                  className="inline-flex items-center gap-2 mt-3 font-body text-[14px] font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: 'white', color: '#25D366' }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ Section 4: Map ═══════════════════════ */}
      <section
        style={{
          backgroundColor: '#2B1B0E',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div ref={mapRef} className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: '21/9',
              border: '1px solid rgba(243,198,35,0.08)',
              minHeight: '300px',
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Google Maps Embed */}
            <iframe
              title="Sunrise Enterprises Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.0!2d75.78!3d26.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU1JzEyLjAiTiA3NcKwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map Overlay Card */}
            <motion.div
              className="absolute bottom-4 left-4 hidden sm:block"
              style={{
                backgroundColor: 'rgba(42,23,11,0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '20px',
                maxWidth: '300px',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <p className="font-body text-[14px] leading-relaxed" style={{ color: 'rgba(254,243,226,0.8)' }}>
                Plot no 3 sarna dungar industrial area jaipur
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Plot+no+3+sarna+dungar+industrial+area+jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 font-body text-[14px] font-semibold transition-colors duration-200 hover:underline"
                style={{ color: '#F3C623' }}
              >
                Get Directions <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ Section 5: WhatsApp CTA ═══════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div ref={ctaRef} className="max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <MessageCircle size={48} style={{ color: 'rgba(42,23,11,0.8)', margin: '0 auto' }} />
          </motion.div>

          <motion.h2
            className="font-display text-[32px] sm:text-[36px] font-bold mt-5"
            style={{ color: '#2A170B', lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Quick Question?<br />Message Us on WhatsApp
          </motion.h2>

          <motion.p
            className="font-body text-[16px] mt-4"
            style={{ color: 'rgba(42,23,11,0.75)', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Get instant replies for pricing, availability, and technical questions.
          </motion.p>

          <motion.a
            href="https://wa.me/919829050308"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 font-body text-[16px] font-semibold px-9 py-4 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={20} fill="white" /> Chat on WhatsApp
          </motion.a>

          <motion.p
            className="font-mono text-[16px] mt-4"
            style={{ color: 'rgba(42,23,11,0.7)' }}
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            +91 98290 50308
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════ Section 6: FAQ ═══════════════════════ */}
      <section
        style={{
          backgroundColor: '#FEF3E2',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div ref={faqRef} className="max-w-[800px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h2
              className="font-display text-[32px] sm:text-[36px] font-bold"
              style={{ color: '#2B1B0E', lineHeight: 1.15 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="font-body text-[16px] mt-3" style={{ color: 'rgba(43,27,14,0.6)' }}>
              Quick answers to common questions. Still need help? Reach out to us.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {faqItems.map((faq, i) => (
              <motion.div key={i} variants={staggerChild}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
