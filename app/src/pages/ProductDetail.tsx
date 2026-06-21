import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  ArrowRight, CheckCircle, Award,
  Gauge, Layers, Timer, Download, MessageCircle,
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

/* ─────────────────── TYPES ─────────────────── */

interface MachineSpec {
  parameter: string;
  value: string;
}

interface MachineFeature {
  title: string;
  description: string;
}

interface MachineData {
  id: number;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  image: string;
  description: string;
  quickSpecs: { label: string; value: string }[];
  specs: MachineSpec[];
  features: MachineFeature[];
  standards: { code: string; name: string }[];
  relatedSlugs: string[];
}

/* ─────────────────── ALL MACHINE DATA ─────────────────── */

const machinesData: MachineData[] = [
  {
    id: 1,
    name: 'Hydrostatic Pressure Test Apparatus',
    slug: 'hydrostatic-pressure-test',
    category: 'Pressure Testing',
    tagline: 'Tests long-term pressure resistance of thermoplastic pipes under controlled conditions',
    image: '/machine-hydrostatic.webp',
    description: 'The Hydrostatic Pressure Test Apparatus is designed to evaluate the long-term pressure resistance of thermoplastic pipes. It subjects pipe samples to sustained internal pressure at controlled temperatures, allowing manufacturers to determine the pipes\' ability to withstand operational stress over extended periods. The multi-station configuration enables simultaneous testing of multiple samples, significantly improving laboratory throughput. Our microprocessor-controlled system ensures precise pressure regulation with automatic correction and real-time monitoring.',
    quickSpecs: [
      { label: 'Max Pressure', value: '160 bar' },
      { label: 'Test Stations', value: '1-10' },
      { label: 'Temp Range', value: 'Ambient - 95°C' },
      { label: 'Standard', value: 'ISO 1167' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-HP-160' },
      { parameter: 'Pressure Range', value: '0 - 160 bar' },
      { parameter: 'Number of Stations', value: '1, 3, 6, or 10' },
      { parameter: 'Pressure Accuracy', value: '+/- 1% of full scale' },
      { parameter: 'Temperature Range', value: 'Ambient to 95°C' },
      { parameter: 'Temperature Accuracy', value: '+/- 0.5°C' },
      { parameter: 'Timer Resolution', value: '1 second' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '1200 x 800 x 1500' },
      { parameter: 'Weight', value: 'Approx. 180 kg' },
      { parameter: 'Display', value: 'Digital LCD with microprocessor' },
      { parameter: 'Data Output', value: 'USB for data logging' },
    ],
    features: [
      { title: 'Microprocessor-Based Control', description: 'Precise pressure regulation with digital accuracy and programmable test cycles' },
      { title: 'Multi-Station Configuration', description: 'Test multiple samples simultaneously — choose 1, 3, 6, or 10 stations' },
      { title: 'Automatic Pressure Holding', description: 'Maintains exact test pressure with real-time correction and alarm alerts' },
      { title: 'Digital Timer & Data Logging', description: 'USB output for test reports, digital display for time, pressure, and temperature' },
      { title: 'Robust Safety Enclosure', description: 'Pressure-proof safety chamber with emergency release and visual alarm indicators' },
      { title: 'Easy Sample Loading', description: 'Ergonomic clamping system compatible with pipe sizes from 16mm to 630mm diameter' },
    ],
    standards: [
      { code: 'ISO 1167', name: 'Thermoplastic pipes resistance to internal pressure' },
      { code: 'ASTM D1598', name: 'Time-to-failure of plastic pipe under constant internal pressure' },
      { code: 'IS 4985', name: 'Unplasticized PVC pipes for potable water supplies' },
    ],
    relatedSlugs: ['bursting-pressure-test', 'tensile-testing', 'impact-testing'],
  },
  {
    id: 2,
    name: 'Bursting Pressure Testing Machine',
    slug: 'bursting-pressure-test',
    category: 'Pressure Testing',
    tagline: 'Determines the maximum burst pressure capacity of plastic pipes with digital precision',
    image: '/machine-bursting.webp',
    description: 'The Bursting Pressure Testing Machine determines the maximum internal pressure a plastic pipe can withstand before rupture. This critical quality test ensures pipes meet safety standards for high-pressure applications including water distribution, industrial piping, and gas transmission. Our digitally controlled system provides automatic pressure ramping, precise burst detection, and comprehensive data logging for full traceability.',
    quickSpecs: [
      { label: 'Max Pressure', value: '250 bar' },
      { label: 'Test Mode', value: 'Auto/Manual' },
      { label: 'Resolution', value: '0.1 bar' },
      { label: 'Standard', value: 'ISO 1167' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-BP-250' },
      { parameter: 'Pressure Range', value: '0 - 250 bar' },
      { parameter: 'Pressure Ramp Rate', value: 'Adjustable up to 10 bar/min' },
      { parameter: 'Pressure Resolution', value: '0.1 bar' },
      { parameter: 'Accuracy', value: '+/- 0.5% of reading' },
      { parameter: 'Sample Diameter Range', value: '16mm to 630mm' },
      { parameter: 'Test Medium', value: 'Water / Glycol mixture' },
      { parameter: 'Control System', value: 'Microprocessor with touchscreen' },
      { parameter: 'Safety Features', value: 'Burst detection, auto shutoff' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '1100 x 750 x 1400' },
      { parameter: 'Weight', value: 'Approx. 150 kg' },
    ],
    features: [
      { title: 'Automatic Pressure Ramping', description: 'Programmable pressure increase rate ensures consistent, repeatable test conditions' },
      { title: 'Digital Touchscreen Interface', description: 'Intuitive 7-inch color display for test setup, monitoring, and result viewing' },
      { title: 'Burst Detection Sensor', description: 'High-speed pressure drop detection captures exact burst pressure automatically' },
      { title: 'Comprehensive Data Logging', description: 'Store up to 1000 test records with USB export and optional PC software' },
      { title: 'Safety Enclosure', description: 'Reinforced protective chamber with interlocked door prevents operator injury' },
      { title: 'Multi-Pipe Compatibility', description: 'Quick-change adapters support PVC, HDPE, PPR, and CPVC pipe sizes 16-630mm' },
    ],
    standards: [
      { code: 'ISO 1167', name: 'Thermoplastic pipes resistance to internal pressure' },
      { code: 'ASTM D1599', name: 'Short-term hydraulic pressure resistance of plastic pipe' },
      { code: 'IS 4985', name: 'Unplasticized PVC pipes for potable water supplies' },
    ],
    relatedSlugs: ['hydrostatic-pressure-test', 'ring-stiffness-test', 'tensile-testing'],
  },
  {
    id: 3,
    name: 'Impact Testing Machine (Falling Weight)',
    slug: 'impact-testing',
    category: 'Impact & Strength',
    tagline: 'Evaluates impact resistance of plastic pipes using standardized falling weight method',
    image: '/machine-impact.webp',
    description: 'The Impact Testing Machine uses the falling weight method to assess the impact resistance of plastic pipes and fittings. This test is essential for determining how well pipes withstand sudden external forces during transportation, installation, and service life. The machine features adjustable drop heights, interchangeable impactors, and a digital counter for precise, repeatable testing compliant with EN and ISO standards.',
    quickSpecs: [
      { label: 'Weight Range', value: '0.5-2 kg' },
      { label: 'Drop Height', value: 'Up to 2m' },
      { label: 'Counter', value: 'Digital' },
      { label: 'Standard', value: 'EN 744' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-IM-2000' },
      { parameter: 'Falling Weight Range', value: '0.5 kg to 2.0 kg' },
      { parameter: 'Drop Height Range', value: '0.1m to 2.0m (adjustable)' },
      { parameter: 'Impact Surface', value: 'Hardened steel anvil' },
      { parameter: 'Specimen Support', value: 'V-block adjustable for pipe diameter' },
      { parameter: 'Display', value: 'Digital LCD counter and height readout' },
      { parameter: 'Release Mechanism', value: 'Electromagnetic quick-release' },
      { parameter: 'Pipe Diameter Range', value: '32mm to 400mm' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '800 x 600 x 2200' },
      { parameter: 'Weight', value: 'Approx. 95 kg' },
      { parameter: 'Safety Features', value: 'Protective cage, interlock switch' },
    ],
    features: [
      { title: 'Electromagnetic Quick-Release', description: 'Ensures consistent, repeatable drop with no manual interference' },
      { title: 'Interchangeable Impactors', description: 'Multiple striker geometries for different pipe types and standards' },
      { title: 'Adjustable Specimen Support', description: 'V-blocks accommodate pipe diameters from 32mm to 400mm' },
      { title: 'Digital Height Counter', description: 'Precise electronic measurement of drop height with 1mm resolution' },
      { title: 'Safety Cage System', description: 'Full protective enclosure with safety interlock prevents operator access during test' },
      { title: 'Pass/Fail Analysis', description: 'Automatic calculation and display of test results against standard criteria' },
    ],
    standards: [
      { code: 'EN 744', name: 'Thermoplastics pipes — falling weight test' },
      { code: 'ISO 3127', name: 'Thermoplastics pipes — determination of resistance to external blows' },
      { code: 'ASTM D2444', name: 'Impact resistance of thermoplastic pipe and fittings' },
    ],
    relatedSlugs: ['ring-stiffness-test', 'pipe-notching', 'tensile-testing'],
  },
  {
    id: 4,
    name: 'Ring Stiffness Testing Machine',
    slug: 'ring-stiffness-test',
    category: 'Impact & Strength',
    tagline: 'Measures structural rigidity and deformation resistance of plastic pipes under radial load',
    image: '/machine-ring-stiffness.webp',
    description: 'The Ring Stiffness Testing Machine measures the resistance of thermoplastic pipes to diametral deformation. This test is critical for buried pipe applications where external soil loads can cause deflection. The machine applies a controlled compressive force perpendicular to the pipe axis and measures deflection to calculate ring stiffness — a key parameter for pipeline structural design.',
    quickSpecs: [
      { label: 'Max Load', value: '50 kN' },
      { label: 'Resolution', value: '0.01 mm' },
      { label: 'Deformation', value: 'Auto Meas.' },
      { label: 'Standard', value: 'ISO 9969' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-RS-50' },
      { parameter: 'Maximum Load', value: '50 kN' },
      { parameter: 'Load Resolution', value: '0.01 N' },
      { parameter: 'Deformation Range', value: '0 - 100 mm' },
      { parameter: 'Deformation Resolution', value: '0.01 mm' },
      { parameter: 'Test Speed Range', value: '0.5 - 50 mm/min' },
      { parameter: 'Pipe Diameter Range', value: '100mm to 1200mm' },
      { parameter: 'Load Cell Type', value: 'Strain gauge, calibrated' },
      { parameter: 'Software', value: 'PC-based data acquisition' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '1400 x 900 x 1800' },
      { parameter: 'Weight', value: 'Approx. 320 kg' },
    ],
    features: [
      { title: 'Precision Load Cell', description: 'Calibrated strain gauge load cell provides +/- 0.5% accuracy across full range' },
      { title: 'Automatic Deformation Measurement', description: 'High-resolution displacement sensors track pipe deflection in real-time' },
      { title: 'PC Software Suite', description: 'Complete ring stiffness calculation with graph plotting and report generation' },
      { title: 'Wide Pipe Range', description: 'Accommodates pipe diameters from 100mm to 1200mm with adjustable fixtures' },
      { title: 'Variable Test Speed', description: 'Programmable crosshead speed from 0.5 to 50 mm/min for different materials' },
      { title: 'Self-Diagnostic System', description: 'Built-in calibration check and fault detection ensures reliable operation' },
    ],
    standards: [
      { code: 'ISO 9969', name: 'Thermoplastics pipes — determination of ring stiffness' },
      { code: 'EN 1228', name: 'Plastics piping systems — test method for ring stiffness' },
      { code: 'ASTM D2412', name: 'External loading properties of plastic pipe' },
    ],
    relatedSlugs: ['impact-testing', 'tensile-testing', 'hydrostatic-pressure-test'],
  },
  {
    id: 5,
    name: 'Tensile Testing Machine',
    slug: 'tensile-testing',
    category: 'Impact & Strength',
    tagline: 'Accurately measures tensile strength, elongation, and modulus of pipe materials',
    image: '/machine-tensile.webp',
    description: 'The Tensile Testing Machine provides comprehensive mechanical characterization of plastic pipe materials including tensile strength, elongation at break, and Young\'s modulus. These properties are fundamental to material specification and quality control. The servo-motor driven system ensures smooth, precise load application with automatic graph generation and data export capabilities.',
    quickSpecs: [
      { label: 'Capacity', value: '50 kN' },
      { label: 'Drive', value: 'Servo Motor' },
      { label: 'Graph', value: 'Auto Plot' },
      { label: 'Standard', value: 'ISO 527' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-TT-50' },
      { parameter: 'Maximum Capacity', value: '50 kN' },
      { parameter: 'Load Accuracy', value: '+/- 0.5% of reading' },
      { parameter: 'Crosshead Speed', value: '0.001 - 1000 mm/min' },
      { parameter: 'Stroke Length', value: '1000 mm' },
      { parameter: 'Extensometer Range', value: '0 - 50 mm' },
      { parameter: 'Extensometer Resolution', value: '0.001 mm' },
      { parameter: 'Grip Types', value: 'Wedge, pneumatic, pipe grip' },
      { parameter: 'Software', value: 'Universal testing software with reporting' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '2200 x 800 x 900' },
      { parameter: 'Weight', value: 'Approx. 450 kg' },
    ],
    features: [
      { title: 'Servo Motor Drive', description: 'Brushless AC servo motor provides smooth, precise speed control with no maintenance' },
      { title: 'Multi-Mode Testing', description: 'Supports tensile, compression, flexural, and peel testing modes' },
      { title: 'Auto Graph Generation', description: 'Real-time stress-strain curve plotting with zoom, annotations, and export' },
      { title: 'High-Resolution Extensometer', description: 'Direct strain measurement with 0.001mm resolution for modulus calculation' },
      { title: 'Multiple Grip Options', description: 'Wedge, pneumatic, and custom pipe grips for various specimen types' },
      { title: 'Report Generation', description: 'One-click PDF/Excel reports with graphs, statistics, and test parameters' },
    ],
    standards: [
      { code: 'ISO 527', name: 'Plastics — determination of tensile properties' },
      { code: 'ASTM D638', name: 'Tensile properties of plastics' },
      { code: 'IS 13360', name: 'Methods of test for plastics — tensile strength' },
    ],
    relatedSlugs: ['ring-stiffness-test', 'impact-testing', 'melt-flow-index'],
  },
  {
    id: 6,
    name: 'Vicat Softening Point Apparatus',
    slug: 'vicat-softening-point',
    category: 'Thermal & Material',
    tagline: 'Determines the temperature at which plastic pipes soften under standardized load conditions',
    image: '/machine-vicat.webp',
    description: 'The Vicat Softening Point Apparatus determines the temperature at which a plastic specimen softens under a specified load and heating rate. This critical thermal property helps manufacturers ensure their pipes can withstand service temperatures without deformation. Our digital-controlled unit provides precise temperature ramping, automatic needle penetration detection, and reliable repeatability for PVC, CPVC, and other thermoplastic materials.',
    quickSpecs: [
      { label: 'Max Temp', value: '300°C' },
      { label: 'Method', value: 'Bath Type' },
      { label: 'Display', value: 'Digital' },
      { label: 'Standard', value: 'ISO 306' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-VS-300' },
      { parameter: 'Temperature Range', value: 'Ambient to 300°C' },
      { parameter: 'Heating Rate', value: '50°C/hr or 120°C/hr (selectable)' },
      { parameter: 'Temperature Accuracy', value: '+/- 0.5°C' },
      { parameter: 'Test Load', value: '10 N or 50 N (as per method A/B)' },
      { parameter: 'Penetration Measurement', value: '1 mm needle travel detection' },
      { parameter: 'Number of Stations', value: '2 or 6 (simultaneous testing)' },
      { parameter: 'Bath Medium', value: 'Silicone oil or water' },
      { parameter: 'Display', value: 'Digital LED with temperature readout' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '600 x 450 x 900' },
      { parameter: 'Weight', value: 'Approx. 35 kg' },
    ],
    features: [
      { title: 'Dual Heating Rates', description: 'Selectable 50°C/hr or 120°C/hr heating rate compliant with Method A and B' },
      { title: 'Automatic Detection', description: 'Precise sensor detects 1mm needle penetration automatically with audible alarm' },
      { title: 'Multi-Station Design', description: 'Test 2 or 6 samples simultaneously for higher laboratory throughput' },
      { title: 'Uniform Heat Distribution', description: 'Stirring system ensures consistent bath temperature throughout test' },
      { title: 'Digital Temperature Display', description: 'Clear LED display shows real-time temperature with 0.1°C resolution' },
      { title: 'Wide Material Compatibility', description: 'Suitable for PVC, CPVC, ABS, PP, PE and other thermoplastic materials' },
    ],
    standards: [
      { code: 'ISO 306', name: 'Plastics — determination of Vicat softening temperature' },
      { code: 'ASTM D1525', name: 'Vicat softening temperature of plastics' },
      { code: 'IS 2540', name: 'Methods of test for rigid PVC pipes — Vicat softening' },
    ],
    relatedSlugs: ['melt-flow-index', 'hydrostatic-pressure-test', 'tensile-testing'],
  },
  {
    id: 7,
    name: 'Melt Flow Index Tester',
    slug: 'melt-flow-index',
    category: 'Thermal & Material',
    tagline: 'Measures the flow rate of molten plastic to ensure material consistency and quality',
    image: '/machine-melt-flow.webp',
    description: 'The Melt Flow Index (MFI) Tester measures the rate of extrusion of molten thermoplastic material through a standardized die under specific temperature and load conditions. MFI is a key quality control parameter that indicates material viscosity grade and batch consistency. Our compact, benchtop design features automatic sample cutting, precise temperature control, and digital display for quick, reliable testing in any laboratory.',
    quickSpecs: [
      { label: 'Max Temp', value: '400°C' },
      { label: 'Auto Cut', value: 'Yes' },
      { label: 'Die', value: 'Included' },
      { label: 'Standard', value: 'ISO 1133' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-MF-400' },
      { parameter: 'Temperature Range', value: 'Ambient to 400°C' },
      { parameter: 'Temperature Accuracy', value: '+/- 0.2°C' },
      { parameter: 'Temperature Resolution', value: '0.1°C' },
      { parameter: 'Test Loads', value: '0.325 - 21.6 kg (interchangeable)' },
      { parameter: 'Barrel Diameter', value: '9.55 mm (standard)' },
      { parameter: 'Die Dimensions', value: '2.095 mm x 8.000 mm (standard)' },
      { parameter: 'Auto Cut Interval', value: '1 to 999 seconds (programmable)' },
      { parameter: 'Display', value: 'Digital LCD' },
      { parameter: 'Power Supply', value: '230V AC, 50Hz' },
      { parameter: 'Dimensions (mm)', value: '450 x 350 x 650' },
      { parameter: 'Weight', value: 'Approx. 28 kg' },
    ],
    features: [
      { title: 'Precision Temperature Control', description: 'PID temperature controller maintains +/- 0.2°C stability for repeatable results' },
      { title: 'Automatic Sample Cutting', description: 'Motorized scraper cuts samples at precise intervals eliminating human error' },
      { title: 'Interchangeable Weights', description: 'Quick-change weight set covers full range from 0.325 kg to 21.6 kg' },
      { title: 'Compact Benchtop Design', description: 'Space-saving footprint fits any laboratory workspace' },
      { title: 'Quick-Release Die', description: 'Tool-free die removal for easy cleaning and inspection between tests' },
      { title: 'Direct MFI Display', description: 'Results calculated and displayed in g/10min with automatic conversion' },
    ],
    standards: [
      { code: 'ISO 1133', name: 'Plastics — determination of melt mass-flow rate' },
      { code: 'ASTM D1238', name: 'Melt flow rates of thermoplastics by extrusion plastometer' },
      { code: 'IS 2267', name: 'Methods of test for plastics — melt flow index' },
    ],
    relatedSlugs: ['vicat-softening-point', 'tensile-testing', 'bursting-pressure-test'],
  },
  {
    id: 8,
    name: 'Pipe Notching Machine',
    slug: 'pipe-notching',
    category: 'Sample Prep',
    tagline: 'Precisely prepares pipe samples with notches for Charpy and Izod impact testing',
    image: '/machine-notching.webp',
    description: 'The Pipe Notching Machine creates precise V-notches and U-notches in plastic pipe samples for subsequent impact testing. Accurate notch geometry is critical for reliable Charpy and Izod test results. Our machine features adjustable cutting angle, depth control, and smooth cutting action that produces consistent notches without stress cracking or material deformation.',
    quickSpecs: [
      { label: 'Notch Type', value: 'V / U' },
      { label: 'Angle', value: 'Adjustable' },
      { label: 'Drive', value: 'Manual/Elec.' },
      { label: 'Standard', value: 'ISO 3127' },
    ],
    specs: [
      { parameter: 'Model', value: 'SE-PN-100' },
      { parameter: 'Notch Types', value: 'V-notch, U-notch (interchangeable cutters)' },
      { parameter: 'V-Notch Angle', value: '45° (standard, adjustable)' },
      { parameter: 'Notch Depth Range', value: '0.5 - 10 mm (adjustable)' },
      { parameter: 'Pipe Diameter Range', value: '16mm to 200mm' },
      { parameter: 'Depth Accuracy', value: '+/- 0.05 mm' },
      { parameter: 'Drive Type', value: 'Manual or electric (optional)' },
      { parameter: 'Cutter Material', value: 'Hardened tool steel, replaceable' },
      { parameter: 'Sample Clamping', value: 'Quick-clamp vise with pipe inserts' },
      { parameter: 'Power Supply (electric)', value: '230V AC, 50Hz (optional motor)' },
      { parameter: 'Dimensions (mm)', value: '500 x 350 x 400' },
      { parameter: 'Weight', value: 'Approx. 22 kg' },
    ],
    features: [
      { title: 'Precise Depth Control', description: 'Micrometer-style adjustment ensures notch depth accuracy within +/- 0.05mm' },
      { title: 'Interchangeable Cutters', description: 'Quick-swap V and U notch cutters for different test requirements' },
      { title: 'Adjustable Notch Angle', description: 'Standard 45° V-notch with customizable angle settings for special applications' },
      { title: 'Smooth Cutting Action', description: 'Precision guide system produces clean cuts without stress cracking' },
      { title: 'Quick-Clamp System', description: 'Rapid sample loading with pipe diameter inserts for secure, centered holding' },
      { title: 'Benchtop & Portable', description: 'Compact 22kg design suitable for benchtop use or transport to job sites' },
    ],
    standards: [
      { code: 'ISO 3127', name: 'Notch preparation for impact testing of plastics' },
      { code: 'EN 744', name: 'Sample preparation for falling weight impact test' },
      { code: 'ASTM D6110', name: 'Determination of Charpy impact resistance of plastics' },
    ],
    relatedSlugs: ['impact-testing', 'tensile-testing', 'ring-stiffness-test'],
  },
];

/* ─────────────────── HELPERS ─────────────────── */

function getMachineBySlug(slug: string): MachineData | undefined {
  return machinesData.find((m) => m.slug === slug);
}

function getRelatedMachines(relatedSlugs: string[]): MachineData[] {
  return relatedSlugs
    .map((slug) => machinesData.find((m) => m.slug === slug))
    .filter(Boolean) as MachineData[];
}

const highlightIcons = [Gauge, Layers, Timer];

/* ─────────────────── PAGE COMPONENT ─────────────────── */

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const machine = slug ? getMachineBySlug(slug) : undefined;

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
      document.querySelectorAll('.reveal-section').forEach((el) => observer!.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, [slug]);

  if (!machine) {
    return <ProductNotFound />;
  }

  const relatedMachines = getRelatedMachines(machine.relatedSlugs);

  return (
    <div>
      <style>{`
        .reveal-section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal-section.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      <ProductHero machine={machine} />
      <QuickSpecsBar quickSpecs={machine.quickSpecs} />
      <DetailedSpecs specs={machine.specs} />
      <FeaturesBenefits features={machine.features} image={machine.image} name={machine.name} />
      <StandardsCompliance standards={machine.standards} />
      <InquiryCTA machineName={machine.name} />
      <RelatedProducts related={relatedMachines} />

      <WhatsAppButton />
    </div>
  );
}

/* ─── NOT FOUND ─── */

function ProductNotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundColor: '#2B1B0E',
        minHeight: '100dvh',
        paddingTop: '160px',
        paddingBottom: '80px',
      }}
    >
      <h1
        className="font-display text-[34px] sm:text-[46px] font-bold"
        style={{ color: '#FEF3E2' }}
      >
        Machine Not Found
      </h1>
      <p className="font-body text-[16px] mt-4" style={{ color: 'rgba(254,243,226,0.6)' }}>
        The testing machine you are looking for does not exist in our catalog.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 mt-8 font-body text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
        style={{ backgroundColor: '#F3C623', color: '#2A170B' }}
      >
        View All Products <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/* ─── SECTION 1: PRODUCT HERO ─── */

function ProductHero({ machine }: { machine: MachineData }) {
  return (
    <section style={{ backgroundColor: '#2B1B0E', paddingTop: '160px', paddingBottom: '80px' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Breadcrumb */}
            <nav className="font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.4)' }}>
              <Link to="/" className="transition-colors duration-200 hover:text-[#F3C623]">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="transition-colors duration-200 hover:text-[#F3C623]">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span style={{ color: 'rgba(254,243,226,0.6)' }}>{machine.name}</span>
            </nav>

            {/* Category Badge */}
            <div
              className="inline-block mt-5 font-body text-[12px] font-medium"
              style={{
                backgroundColor: 'rgba(243,198,35,0.12)',
                border: '1px solid rgba(243,198,35,0.2)',
                color: '#F3C623',
                padding: '4px 14px',
                borderRadius: '9999px',
              }}
            >
              {machine.category}
            </div>

            {/* Product Title */}
            <h1
              className="font-display text-[32px] sm:text-[42px] lg:text-[52px] font-bold leading-[1.1] mt-4"
              style={{ color: '#FEF3E2' }}
            >
              {machine.name}
            </h1>

            {/* Tagline */}
            <p
              className="font-body text-[16px] lg:text-[18px] leading-relaxed mt-4 max-w-[480px]"
              style={{ color: 'rgba(254,243,226,0.6)' }}
            >
              {machine.tagline}
            </p>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-4 mt-8">
              {machine.quickSpecs.slice(0, 3).map((spec, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <div
                    key={spec.label}
                    className="flex items-center gap-3"
                    style={{
                      backgroundColor: 'rgba(254,243,226,0.05)',
                      border: '1px solid rgba(243,198,35,0.1)',
                      borderRadius: '10px',
                      padding: '12px 20px',
                    }}
                  >
                    <Icon size={16} style={{ color: '#F3C623', flexShrink: 0 }} />
                    <span className="font-body text-[14px]" style={{ color: 'rgba(254,243,226,0.8)' }}>
                      {spec.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: '#F3C623', color: '#2A170B' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFB22C';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(243,198,35,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F3C623';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                Request Quote <ArrowRight size={16} />
              </a>
              <button
                className="inline-flex items-center gap-2 font-body text-[14px] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
                style={{ border: '2px solid #F3C623', color: '#F3C623' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F3C623';
                  (e.currentTarget as HTMLElement).style.color = '#2A170B';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#F3C623';
                }}
              >
                <Download size={16} /> Download Brochure
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(243,198,35,0.06) 0%, transparent 70%)',
              }}
            />
            <img
              src={machine.image}
              alt={machine.name}
              className="relative z-10 w-full max-h-[420px] object-contain rounded-2xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: QUICK SPECS BAR ─── */

function QuickSpecsBar({ quickSpecs }: { quickSpecs: { label: string; value: string }[] }) {
  return (
    <section style={{ backgroundColor: '#FEF3E2', padding: '48px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {quickSpecs.map((spec) => (
            <div key={spec.label}>
              <p
                className="font-body text-[13px] font-semibold uppercase"
                style={{ color: 'rgba(43,27,14,0.45)', letterSpacing: '0.06em' }}
              >
                {spec.label}
              </p>
              <p className="font-mono text-[24px] lg:text-[28px] font-normal mt-2" style={{ color: '#2B1B0E' }}>
                {spec.value}
              </p>
              <div
                className="mt-3"
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: 'rgba(243,198,35,0.3)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 3: DETAILED SPECIFICATIONS ─── */

function DetailedSpecs({ specs }: { specs: MachineSpec[] }) {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#FEF3E2', padding: '80px 0' }}>
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <h2
          className="font-body text-[28px] sm:text-[32px] font-semibold text-center mb-12"
          style={{ color: '#2B1B0E' }}
        >
          Technical Specifications
        </h2>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(43,27,14,0.06)',
          }}
        >
          {specs.map((spec, i) => (
            <div
              key={spec.parameter}
              className="flex items-center"
              style={{
                padding: '16px 20px',
                borderBottom: i < specs.length - 1 ? '1px solid rgba(43,27,14,0.06)' : 'none',
                backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(43,27,14,0.02)',
              }}
            >
              <div className="w-[40%]">
                <span
                  className="font-body text-[14px] font-medium"
                  style={{ color: 'rgba(43,27,14,0.7)' }}
                >
                  {spec.parameter}
                </span>
              </div>
              <div className="w-[60%]">
                <span
                  className="font-body text-[14px] font-semibold"
                  style={{ color: '#2B1B0E' }}
                >
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4: FEATURES & BENEFITS ─── */

function FeaturesBenefits({
  features,
  image,
  name,
}: {
  features: MachineFeature[];
  image: string;
  name: string;
}) {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#2B1B0E', padding: '100px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <h2
          className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold mb-12"
          style={{ color: '#FEF3E2' }}
        >
          Features & Benefits
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Feature List */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(243,198,35,0.1)' }}
                >
                  <CheckCircle size={20} style={{ color: '#F3C623' }} />
                </div>
                <div>
                  <h3
                    className="font-body text-[16px] font-semibold"
                    style={{ color: '#FEF3E2' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-body text-[14px] mt-1 leading-relaxed"
                    style={{ color: 'rgba(254,243,226,0.55)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute top-0 left-0"
              style={{
                width: '60px',
                height: '3px',
                backgroundColor: '#F3C623',
                borderRadius: '2px',
              }}
            />
            <img
              src={image}
              alt={name}
              className="w-full rounded-2xl object-contain max-h-[400px]"
              style={{ border: '1px solid rgba(243,198,35,0.08)' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: STANDARDS COMPLIANCE ─── */

function StandardsCompliance({
  standards,
}: {
  standards: { code: string; name: string }[];
}) {
  return (
    <section className="reveal-section" style={{ backgroundColor: '#FEF3E2', padding: '64px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
        <h2
          className="font-body text-[22px] sm:text-[24px] font-semibold mb-8"
          style={{ color: '#2B1B0E' }}
        >
          Standards Compliance
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {standards.map((std) => (
            <div
              key={std.code}
              className="text-center"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px 28px',
                border: '1px solid rgba(43,27,14,0.06)',
              }}
            >
              <Award size={16} style={{ color: '#F3C623', margin: '0 auto 8px' }} />
              <p className="font-mono text-[16px] sm:text-[18px] font-semibold" style={{ color: '#2B1B0E' }}>
                {std.code}
              </p>
              <p
                className="font-body text-[12px] sm:text-[13px] mt-1 max-w-[200px]"
                style={{ color: 'rgba(43,27,14,0.55)' }}
              >
                {std.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: INQUIRY CTA ─── */

function InquiryCTA({ machineName }: { machineName: string }) {
  return (
    <section
      id="inquiry"
      className="reveal-section"
      style={{
        background: 'linear-gradient(135deg, #FA812F 0%, #FFB22C 50%, #F3C623 100%)',
        padding: '100px 0',
      }}
    >
      <div className="max-w-[600px] mx-auto px-6">
        <h2
          className="font-display text-[28px] sm:text-[36px] font-bold text-center"
          style={{ color: '#2A170B' }}
        >
          Inquire About This Machine
        </h2>
        <p
          className="font-body text-[14px] sm:text-[16px] text-center mt-3"
          style={{ color: 'rgba(42,23,11,0.75)' }}
        >
          Fill in your details and our team will get back to you within 24 hours with
          pricing and delivery information.
        </p>

        {/* Inquiry Form */}
        <div
          className="mt-10 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(43,27,14,0.1)',
          }}
        >
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="w-full font-body text-[15px] outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#2B1B0E',
                }}
              />
            </div>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Company *
              </label>
              <input
                type="text"
                placeholder="Company name"
                required
                className="w-full font-body text-[15px] outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#2B1B0E',
                }}
              />
            </div>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Phone *
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
                className="w-full font-body text-[15px] outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#2B1B0E',
                }}
              />
            </div>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email@company.com"
                className="w-full font-body text-[15px] outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#2B1B0E',
                }}
              />
            </div>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Product
              </label>
              <input
                type="text"
                value={machineName}
                readOnly
                className="w-full font-body text-[15px] outline-none"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: 'rgba(43,27,14,0.6)',
                }}
              />
            </div>
            <div>
              <label
                className="block font-body text-[13px] font-medium mb-1.5"
                style={{ color: 'rgba(43,27,14,0.6)' }}
              >
                Message
              </label>
              <textarea
                placeholder="Tell us about your requirements (pipe type, testing needs, quantity...)"
                rows={4}
                className="w-full font-body text-[15px] outline-none resize-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: '#FEF3E2',
                  border: '1px solid rgba(43,27,14,0.1)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#2B1B0E',
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full font-body text-[16px] font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01]"
              style={{ backgroundColor: '#2A170B', color: '#F3C623' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2B1B0E';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2A170B';
              }}
            >
              Send Inquiry
            </button>
          </form>

          {/* WhatsApp Alternative */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="font-body text-[13px]" style={{ color: 'rgba(43,27,14,0.5)' }}>
              Or message us on
            </span>
            <a
              href="https://wa.me/919829050308"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-body text-[13px] font-semibold transition-colors duration-200 hover:underline"
              style={{ color: '#25D366' }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: RELATED PRODUCTS ─── */

function RelatedProducts({ related }: { related: MachineData[] }) {
  return (
    <section style={{ backgroundColor: '#2B1B0E', padding: '80px 0' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <h2
          className="font-body text-[22px] sm:text-[24px] font-semibold mb-8"
          style={{ color: '#FEF3E2' }}
        >
          Related Machines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((machine) => (
            <Link
              key={machine.slug}
              to={`/products/${machine.slug}`}
              className="group block rounded-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'rgba(254,243,226,0.03)',
                border: '1px solid rgba(243,198,35,0.06)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(243,198,35,0.15)';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(243,198,35,0.06)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-body text-[16px] font-semibold"
                  style={{ color: '#FEF3E2' }}
                >
                  {machine.name}
                </h3>
                <span
                  className="inline-flex items-center gap-1 mt-2 font-body text-[13px] font-medium transition-colors duration-200"
                  style={{ color: '#F3C623' }}
                >
                  View Details <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to All */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-body text-[14px] font-semibold transition-colors duration-200 hover:text-[#F3C623]"
            style={{ color: 'rgba(254,243,226,0.6)' }}
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
