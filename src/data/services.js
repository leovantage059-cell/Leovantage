export const SERVICES = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Custom Web Development',
    desc: 'We build fast, secure websites and web applications tailored to your business operations and customer needs.',
    deliverables: [
      'Custom frontend built with modern React',
      'Fast loading speeds and smooth page transitions',
      'Content management system (CMS) integration',
      'Secure API connections and clean database setups'
    ],
    timeline: '3–6 Weeks',
    featured: true
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX & Interface Design',
    desc: 'We design clear wireframes, interactive prototypes, and design systems in Figma so your product is easy for customers to navigate.',
    deliverables: [
      'Complete Figma design files and component libraries',
      'Clickable prototypes to test user flows before building',
      'Clear site architecture and mobile layouts',
      'Accessible, easy-to-read typography and contrast'
    ],
    timeline: '2–4 Weeks',
    featured: true
  },
  {
    id: 'mobile-app',
    number: '03',
    title: 'Mobile App Development',
    desc: 'We build cross-platform mobile apps for iOS and Android using React Native, giving you one codebase that is easy to maintain.',
    deliverables: [
      'Single codebase for both iOS and Android',
      'Offline data access and secure local storage',
      'Biometric login and device feature integration',
      'Assistance with App Store and Google Play publication'
    ],
    timeline: '4–8 Weeks',
    featured: true
  },
  {
    id: 'education',
    number: '04',
    title: 'School & Education Platforms',
    desc: 'Comprehensive school management systems, student-parent communication tools, and online fee collection portals.',
    deliverables: [
      'Role-based dashboards for admins, teachers, and parents',
      'Announcements via notifications, SMS, and messaging',
      'Online fee payments with digital receipts',
      'Attendance tracking and academic report generation'
    ],
    timeline: '6–10 Weeks',
    featured: true
  },
  {
    id: 'ecommerce',
    number: '05',
    title: 'E-Commerce & Online Stores',
    desc: 'Clean, easy-to-use online stores with simple checkout flows, secure payment gateways, and automated order tracking.',
    deliverables: [
      'Simple checkout with UPI, cards, and payment gateways',
      'Fast product pages optimized for mobile shoppers',
      'Inventory synchronization and order notifications',
      'Customer analytics and sales reporting'
    ],
    timeline: '3–6 Weeks',
    featured: true
  },
  {
    id: 'seo-perf',
    number: '06',
    title: 'Speed & Search Optimization',
    desc: 'We improve your website\'s technical structure, page speed, and search metadata so your business is easy to find on Google.',
    deliverables: [
      'Technical speed audits and performance tuning',
      'Structured data (Schema.org) and search previews',
      'Mobile responsiveness and layout stability fixes',
      'Caching and image compression setup'
    ],
    timeline: '2–3 Weeks',
    featured: true
  },
  {
    id: 'branding',
    number: '07',
    title: 'Branding & Visual Identity',
    desc: 'Distinctive logos, color palettes, and typography guidelines that give your business a consistent, professional look.',
    deliverables: [
      'Vector logo files for print, web, and social media',
      'Typography and color guidelines for your team',
      'Social media profile templates and assets',
      'Brand usage guide for future marketing materials'
    ],
    timeline: '2–3 Weeks',
    featured: false
  },
  {
    id: 'maintenance',
    number: '08',
    title: 'Website Care & Support',
    desc: 'Ongoing maintenance, server monitoring, security updates, and dependable technical support after launch.',
    deliverables: [
      'Continuous uptime monitoring and issue alerts',
      'Scheduled database backups and software updates',
      'Direct technical support whenever you need help',
      'Regular performance checkups and security reviews'
    ],
    timeline: 'Monthly Care',
    featured: false
  }
];

export const PRICING_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Best for new businesses, consultants, and local services.',
    price: '₹45,000',
    unit: '/ project',
    featured: false,
    badge: null,
    features: [
      'Custom 5-page responsive website',
      'Clean, custom UI design in Figma',
      'Contact and inquiry form with email notifications',
      'Fast loading speeds and mobile optimization',
      'Basic search engine setup and Google Analytics',
      '15 days of post-launch technical support'
    ],
    btnText: 'CHOOSE STARTER',
    btnClass: 'btn-pill-dark'
  },
  {
    id: 'growth',
    name: 'Growth / App',
    subtitle: 'For businesses that need custom web applications or mobile apps.',
    price: '₹1,25,000',
    unit: '/ project',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'Custom web application or mobile app',
      'Complete interface design and interactive prototype',
      'Database setup and user account authentication',
      'Payment gateway integration and admin dashboard',
      'Technical search engine optimization',
      '45 days of post-launch priority support'
    ],
    btnText: 'CHOOSE GROWTH',
    btnClass: 'btn-pill-mint'
  },
  {
    id: 'enterprise',
    name: 'Enterprise ERP',
    subtitle: 'For institutions, school networks, and multi-user platforms.',
    price: '₹2,80,000+',
    unit: '/ project',
    featured: false,
    badge: null,
    features: [
      'Full school ERP or enterprise platform',
      'Web portal with companion mobile applications',
      'Role-based permissions (admin, staff, user)',
      'High-volume automated notifications (SMS and push)',
      'Dedicated cloud infrastructure and database setup',
      '6 months of dedicated technical support and maintenance'
    ],
    btnText: 'DISCUSS ENTERPRISE',
    btnClass: 'btn-pill-dark'
  }
];
