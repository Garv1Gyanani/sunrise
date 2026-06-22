# Sunrise Enterprises — Website Feature Overview

> A complete overview of everything your new website does, written from the client's perspective.

---

## 1. Pages & Navigation

| Page | Route | Purpose |
|---|---|---|
| **Home** | `/` | Main landing page — hero, products, stats, industries, testimonials, certifications, CTA |
| **Products** | `/products` | Full product catalog with filtering and sorting |
| **Product Detail** | `/products/:slug` | Individual machine page with specs, features, standards, inquiry form |
| **About Us** | `/about` | Company story, values, timeline, facility showcase, leadership |
| **Industries** | `/industries` | Industry verticals served — PVC, HDPE, uPVC, PPR, labs |
| **Resources** | `/resources` | Certifications, technical guides, FAQ, document downloads |
| **Contact** | `/contact` | Contact methods, inquiry form, Google Maps, FAQ |

**Navigation bar** (sticky): Logo + 6 page links + "Get Quote" CTA button. Collapses to hamburger menu on mobile.

**Footer** (4 columns): Logo + social links / Quick Links / All 8 products / Contact details + WhatsApp button.

---

## 2. Home Page Sections

### Hero Section
- Full-screen background image of pipes-water setup with dark overlay
- Animated gradient mesh overlay that slowly shifts
- Headline: "Precision Testing for Every Pipe"
- Two CTAs: "Explore Our Machines" → Products page, "Get a Quote" → Contact page
- Scroll-down indicator
- GSAP entrance animations (image fades in, content slides up)

### Stats Bar (dark)
Animated counters that tick up on scroll:
- 25+ Years of Excellence
- 8 Testing Machine Types
- 500+ Machines Delivered
- PAN India Service Network

### Product Showcase
- Section header "8 Precision Testing Machines"
- 8 product cards in a 4-column grid
- Each card: product image (lazy-loaded), name, spec, "Learn More" link
- Cards hover up with shadow on mouse hover
- "View All Products" button → Products page

### Why Choose Us (6 features)
- 25+ Years Experience
- Customized Solutions
- Precision Engineering
- PAN India Support
- Competitive Pricing
- Reliable After-Sales
- Trust badge strip: ISO 9001, CE Certified, Made in India, 100+ Clients

### Industries Preview
- 4 industry cards with background images:
  - PVC & uPVC Manufacturing
  - HDPE & PPR Manufacturing
  - Irrigation Systems
  - Testing Laboratories
- Cards have color-coded accent bars
- "Explore All Industries" link → Industries page

### Testimonial Carousel
- 4 client testimonials in auto-rotating carousel (6-second interval)
- Pauses on mouse hover
- Manual navigation: prev/next buttons + dot indicators
- Client name, title, and location displayed

### Trust & Certifications
- 4 certification badges: ISO 9001:2015, CE Certified, BIS Compliant, Made in India
- Quality promise statement about calibration and training

### Final CTA (gradient orange section)
- "Ready to Ensure Your Pipe Quality?"
- "Request a Quote" + "Call Us Now" buttons
- Phone number displayed prominently

### WhatsApp Floating Button
- Green circular button fixed at bottom-right on all pages
- Pulsing ring animation
- Links directly to WhatsApp chat

---

## 3. Products Page

### Page Header
- Breadcrumb: Home / Products
- Title: "Our Testing Machines"
- Subtitle: "Eight precision-engineered testing machines..."
- Badge: "8 Machines"

### Filter & Sort Bar (sticky below navbar)
- **Category filters**: All / Pressure Testing / Impact & Strength / Thermal & Material / Sample Prep
- **Sort options**: Featured / Name A-Z / Category
- Filter pills animate with dark fill on active state

### Product Grid (3-column)
8 machine cards, each showing:
- Product image (lazy-loaded, zooms on hover)
- Category badge overlay
- Product name, standards (ISO/ASTM codes)
- Spec tags (e.g. "Up to 160 bar", "Multi-station")
- Description
- "Learn More" link + "Inquire Now" button
- Cards animate in with staggered entrance on page load
- Exit animation when filtering

### 8 Machines Listed
| Product | Category | Standards |
|---|---|---|
| Hydrostatic Pressure Test Apparatus | Pressure Testing | ISO 1167, ASTM D1598 |
| Bursting Pressure Testing Machine | Pressure Testing | ISO 1167, ASTM D1599 |
| Impact Testing Machine (Falling Weight) | Impact & Strength | EN 744, ISO 3127 |
| Ring Stiffness Testing Machine | Impact & Strength | ISO 9969, EN 1228 |
| Tensile Testing Machine | Impact & Strength | ISO 527, ASTM D638 |
| Vicat Softening Point Apparatus | Thermal & Material | ISO 306, ASTM D1525 |
| Melt Flow Index Tester | Thermal & Material | ISO 1133, ASTM D1238 |
| Pipe Notching Machine | Sample Prep | ISO 3127, EN 744 |

### CTA Banner (gradient)
- "Need a Custom Testing Solution?"
- "Discuss Your Requirements" → Contact page with `?subject=custom` parameter

---

## 4. Product Detail Page

Each machine has its own dedicated page at `/products/:slug`.

### Hero Section
- Machine image (left on mobile, right on desktop)
- Category badge, machine name, tagline
- Quick spec highlights (3 chips)
- "Request Quote" + "Download Brochure" buttons

### Quick Specs Bar
4 specs displayed prominently (e.g. Max Pressure, Test Stations, etc.)

### Technical Specifications
Full specification table with 12 parameters per machine (model, range, accuracy, dimensions, etc.)

### Features & Benefits
6 features with checkmark icons + machine image

### Standards Compliance
ISO, ASTM, and BIS standards the machine complies with

### Inquiry CTA
- Multi-field form: Full Name, Company, Phone, Email, Product (pre-filled), Message
- "Send Inquiry" button
- WhatsApp alternative link

### Related Products
3 related machine cards with images, names, links

### 404 Handling
If someone visits an invalid product slug, a "Machine Not Found" page is shown with a link back to Products.

---

## 5. About Us Page

### About Hero (dark)
- Parallax background image (pipes-water)
- Breadcrumb, title, tagline "Testing Innovation. Ensuring Quality."
- Company description paragraph

### Our Story (two-column)
- Company founding story: started as small workshop in Jaipur, grew to PAN India presence
- Facility image on right

### Mission & Values (4 cards)
- Precision First — calibrated machines for repeatable results
- Customer Partnership — long-term relationship focus
- Continuous Innovation — evolving designs and standards
- Made for India — built for Indian conditions (voltage, heat, dust)

### Journey Timeline
6 milestones from 1998 to 2024:
- 1998: Founded in Jaipur
- 2003: First Testing Machine
- 2008: Expanded Product Line
- 2014: PAN India Presence
- 2019: 500th Machine Delivered
- 2024: Full Product Portfolio
- Alternating left/right timeline with animated dots and reveal

### Our Facility
- 10,000+ sq ft manufacturing facility
- In-house CNC machining, fabrication, assembly
- Dedicated calibration and testing lab
- Team of 30+ skilled engineers and technicians
- In-house packing and logistics
- Location card with full address and phone numbers

### Leadership
- Founder: Jhabarmal Choudhary
- Founder's quote about Indian manufacturing
- Initials avatar placeholder

### Final CTA
- "Let's Build Something Together"
- "Contact Us" + "View Our Machines" buttons

---

## 6. Industries Page

### Industries Hero (dark)
- Breadcrumb, title, description

### 8 Industry Cards (2 rows × 4)
Detailed cards for:
- PVC Pipe Manufacturing
- HDPE Pipe Manufacturing
- uPVC & CPVC Manufacturing
- PPR Pipe Systems
- Irrigation Pipe Systems
- Municipal Sewer & Drainage
- Testing Laboratories
- Quality Control & R&D

Each card shows: industry name, description, relevant machine links (3 per industry), color-coded gradient, background image, animated on scroll.

### Industry Standards Section
4 standard categories with code and description

### CTA Section
- "Not sure which machine fits your industry?"
- "Get Industry-Specific Advice" → Contact page with `?subject=industry`
- "WhatsApp Us" button

---

## 7. Resources Page

### Page Hero (dark)
- Title, subtitle about technical documentation

### Certifications Section (3 cards)
- ISO 9001:2015 Quality Management — certified (with image)
- CE Marking — certified (with image)
- BIS Certified Equipment — compliant

### Technical Guides (accordion)
6 guides covering:
- How to Select the Right Testing Machine
- Understanding Hydrostatic Pressure Test Standards
- Impact Testing Methods & Best Practices
- Calibration & Maintenance Guide
- Interpreting Test Results & Reports
- Safety Protocols for Testing Equipment

### FAQ Section (accordion)
8 common questions:
- What pipe types can your machines test?
- Do you provide installation & training?
- What is the warranty period?
- Can machines be customized?
- Do you offer AMC?
- How long does delivery take?
- Do you provide calibration certificates?
- What payment methods do you accept?

### Download Center (6 items)
- Product Catalog (PDF, 4.2 MB)
- Technical Datasheets (PDF, 1.8 MB)
- Company Brochure (PDF, 1.5 MB)
- Machine Specifications (PDF, 1.5 MB)
- Calibration Guide (PDF, 1.2 MB)
- Price List (PDF, 0.8 MB)
- Each item has "Request via Email" button → pre-filled email to company

---

## 8. Contact Page

### Page Hero (dark)
- Title, subtitle about response time (24 hours)

### Contact Methods (4 cards)
| Method | Details |
|---|---|
| Call Direct | +91 98290 50308 |
| Alternate Line | +91 8949 444099 |
| WhatsApp | Chat quick inquiry |
| Email | jhabarmalchoudhary1974@gmail.com |

### Inquiry Form (left) + Company Info (right)
**Form fields**: Full Name*, Company Name, Phone*, Email, Product of Interest (dropdown with all 8 products + General Inquiry), Message
- Success state shows checkmark confirmation
- Form does not yet send email — frontend-only

**Company Info**:
- Address: Plot no 3 sarna dungar industrial area jaipur
- Phone numbers (2 lines)
- Email
- Business Hours: Mon–Sat 9:00 AM – 6:00 PM IST
- WhatsApp quick contact card

### Google Maps Section
- Embedded map showing Jaipur location
- Map overlay card with address and "Get Directions" link
- Grayscale styling

### WhatsApp CTA (gradient)
- "Quick Question? Message Us on WhatsApp"
- WhatsApp button + phone number

### FAQ Section (accordion)
4 FAQs about delivery time, installation, warranty, and customization

---

## 9. Technical Features

### Design & Performance
- **Responsive**: Full mobile/tablet/desktop support (tailwind breakpoints)
- **Images optimized**: All images converted to WebP format — machine images went from 300–976 KB to **16–70 KB** each (95% smaller)
- **Total page weight**: ~1.5 MB (was ~6.6 MB)
- **Animations**: GSAP (hero, scroll reveals) + Framer Motion (page transitions, scroll-triggered animations)
- **Client testimonials**: Auto-rotating carousel

### SEO & Social
- Clean semantic HTML with proper headings
- Social sharing meta tag ready (og-image.webp)

### Performance Optimizations Applied
- Lazy loading on product images (`loading="lazy"`)
- WebP image format (modern, smaller)
- Scroll-triggered reveals (images/content only load when viewed)
- IntersectionObserver-based section reveals
- GSAP postponed until after hero render

### Hosting & Deployment
- **Hosted on Vercel** (free tier)
- Auto-deploys from GitHub on every push
- SPA rewrites configured (supports direct URL navigation)
- Root directory: `app/`

---

## 10. Contact Information on Site

| Detail | Value |
|---|---|
| Company | Sunrise Enterprises |
| Address | Plot no 3 sarna dungar industrial area jaipur |
| Plant Address | Plot no 3 sarna dungar industrial area jaipur |
| Phone | +91 98290 50308 |
| Alt Phone | +91 8949 444099 |
| Email | jhabarmalchoudhary1974@gmail.com (primary), info@sunriseenterprises.in |
| WhatsApp | wa.me/919829050308 |
| Hours | Mon–Sat 9:00 AM – 6:00 PM IST |
