export const SERVICES = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Custom Web Development',
    desc: 'Tailor-made web applications built with semantic HTML5, modern CSS3, and high-performance React without template bloat.',
    deliverables: [
      'Bespoke Architecture (No bloated templates)',
      'Sub-second page speeds & 95+ Core Web Vitals',
      'Headless CMS & REST/GraphQL API integration',
      'Custom animations and fluid page transitions'
    ],
    timeline: '3–6 Weeks',
    featured: true
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX & Design Systems',
    desc: 'Design systems, Figma wireframing, high-fidelity prototypes, and fluid micro-interactions tailored for high conversion.',
    deliverables: [
      'Complete Figma design system & token libraries',
      'Interactive clickable prototype & user flows',
      'Information architecture & wireframing',
      'WCAG AA accessibility validation'
    ],
    timeline: '2–4 Weeks',
    featured: true
  },
  {
    id: 'mobile-app',
    number: '03',
    title: 'Mobile App Development',
    desc: 'High-performance cross-platform iOS & Android mobile applications built using React Native and Expo.',
    deliverables: [
      'Unified iOS & Android TypeScript codebase',
      'Offline sync & local encrypted SQLite database',
      'Biometric authentication & native camera bridge',
      'App Store & Google Play Store publication'
    ],
    timeline: '4–8 Weeks',
    featured: true
  },
  {
    id: 'education',
    number: '04',
    title: 'Education & School Platforms',
    desc: 'Full-scale ERPs, parent-student communication apps, fee collection gateways, and exam result portals.',
    deliverables: [
      'Role-based admin, teacher & parent dashboards',
      'Instant push notifications, SMS & WhatsApp alerts',
      'Secure online fee collection & instant receipts',
      'Automated attendance & academic report cards'
    ],
    timeline: '6–10 Weeks',
    featured: true
  },
  {
    id: 'ecommerce',
    number: '05',
    title: 'E-Commerce & D2C Stores',
    desc: 'High-conversion checkout flows, custom cart animations, automated inventory management, and CRM pipelines.',
    deliverables: [
      'Custom checkout & one-click UPI/Stripe payments',
      'Sub-2s product page loads & zero layout shift',
      'Automated inventory sync & order management',
      'Abandoned cart recovery & analytics dashboard'
    ],
    timeline: '3–6 Weeks',
    featured: true
  },
  {
    id: 'seo-perf',
    number: '06',
    title: 'SEO & Speed Optimization',
    desc: 'Core Web Vitals remediation, structured JSON-LD schemas, technical crawler audits, and top-tier Google rankings.',
    deliverables: [
      '100/100 Lighthouse Performance score targets',
      'Schema.org rich snippets & OpenGraph setup',
      'Zero Cumulative Layout Shifts (CLS)',
      'Global CDN edge-caching & image compression'
    ],
    timeline: '2–3 Weeks',
    featured: true
  },
  {
    id: 'branding',
    number: '07',
    title: 'Branding & Visual Identity',
    desc: 'Distinctive logos, typography pairings, color palettes, and brand guideline documentation that make you unforgettable.',
    deliverables: [
      'Complete vector logo suite (SVG, PDF, PNG)',
      'Typography pairing & color palette token guide',
      'Social media graphics & stationery assets',
      'Comprehensive brand identity manual'
    ],
    timeline: '2–3 Weeks',
    featured: false
  },
  {
    id: 'maintenance',
    number: '08',
    title: 'Maintenance & SLA Support',
    desc: 'Ongoing server health monitoring, security patches, dependency upgrades, backups, and guaranteed SLA turnaround times.',
    deliverables: [
      '24/7 uptime & error crash tracking alerts',
      'Weekly automated cloud database backups',
      'Dedicated priority engineering support ticket',
      'Monthly performance & security audit reports'
    ],
    timeline: 'Monthly SLA',
    featured: false
  }
];

export const PRICING_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Perfect for modern startups & local service businesses.',
    price: '₹45,000',
    unit: '/ project',
    featured: false,
    badge: null,
    features: [
      'Custom 5-page Responsive Website',
      'Modern Clean UI Design (Figma)',
      'Contact Form with Email Alerts',
      '90+ Lighthouse Performance Score',
      'Basic SEO & Google Analytics',
      '15 Days Complimentary Support'
    ],
    btnText: 'SELECT STARTER',
    btnClass: 'btn-pill-dark'
  },
  {
    id: 'growth',
    name: 'Growth / App',
    subtitle: 'For scaling brands needing bespoke web or mobile apps.',
    price: '₹1,25,000',
    unit: '/ project',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'Custom Web App or React Native App',
      'Complete Design System & Prototyping',
      'Database & Auth (Supabase/Firebase)',
      'Payment Gateway & Admin Dashboard',
      'Advanced SEO & Schema Markup',
      '45 Days Priority SLA Support'
    ],
    btnText: 'SELECT GROWTH',
    btnClass: 'btn-pill-mint'
  },
  {
    id: 'enterprise',
    name: 'Enterprise ERP',
    subtitle: 'For institutions, universities, and multi-tenant platforms.',
    price: '₹2,80,000+',
    unit: '/ project',
    featured: false,
    badge: null,
    features: [
      'Full-Scale Institution / ERP Solution',
      'Web Console + Dual Mobile Apps',
      'Role-Based Access (Admin/Teacher/Student)',
      'High-Volume Notifications (SMS/Push)',
      'Dedicated Cloud Infrastructure',
      '6 Months Dedicated Engineering SLA'
    ],
    btnText: 'CONSULT ENTERPRISE',
    btnClass: 'btn-pill-dark'
  }
];
