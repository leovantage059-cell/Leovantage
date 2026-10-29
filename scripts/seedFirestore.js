/**
 * LeoVantage Web Studio — Idempotent Firestore Migration & Canonical Data Seeder
 *
 * Usage:
 *   node scripts/seedFirestore.js --dry-run
 *   node scripts/seedFirestore.js --admin-email=developer@leovantage.com
 *   node scripts/seedFirestore.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Parse .env safely without printing values
const envPath = path.join(rootDir, '.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      envVars[key] = val;
    }
  }
}

const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
  measurementId: envVars.VITE_FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('[Error] Missing Firebase configuration in .env. Please configure VITE_FIREBASE_* keys.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Parse CLI flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const adminEmailArg = args.find((a) => a.startsWith('--admin-email='));
const adminEmail = adminEmailArg ? adminEmailArg.split('=')[1].trim().toLowerCase() : null;

console.log(`[LeoVantage Migration] Initialized for project: ${firebaseConfig.projectId}`);
console.log(`[Mode]: ${isDryRun ? 'DRY-RUN (Simulating writes without touching database)' : 'LIVE SEED'}`);

// Import canonical data from local source files
async function loadCanonicalData() {
  const { PROJECTS } = await import('../src/data/projects.js');
  const { SERVICES, PRICING_PACKAGES } = await import('../src/data/services.js');
  const { FOUNDERS, CORE_TEAM, VALUES } = await import('../src/data/team.js');
  const { REVIEWS } = await import('../src/data/reviews.js');
  const { FAQS, PROCESS_STEPS } = await import('../src/data/faq.js');

  return {
    projects: PROJECTS,
    services: SERVICES,
    pricingPackages: PRICING_PACKAGES,
    founders: FOUNDERS,
    coreTeam: CORE_TEAM,
    values: VALUES,
    reviews: REVIEWS,
    faqs: FAQS,
    processSteps: PROCESS_STEPS
  };
}

async function runSeed() {
  const data = await loadCanonicalData();
  const summary = {
    projects: 0,
    services: 0,
    pricing: 0,
    team: 0,
    reviews: 0,
    faqs: 0,
    process: 0,
    hero: 0,
    settings: 0,
    adminAllowlist: 0,
    skipped: 0
  };

  // Helper for idempotent write
  async function seedDoc(collectionName, docId, docData) {
    const docRef = doc(db, collectionName, String(docId));
    
    // Check if doc exists in non-dry-run mode
    if (!isDryRun) {
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          console.log(`  ↪ [Skipped Existing] ${collectionName}/${docId}`);
          summary.skipped++;
          return;
        }
        await setDoc(docRef, {
          ...docData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log(`  ✓ [Created] ${collectionName}/${docId}`);
      } catch (err) {
        console.warn(`  ! [Write Notice] ${collectionName}/${docId}: ${err.message}`);
      }
    } else {
      console.log(`  [Dry-Run Would Create] ${collectionName}/${docId} -> "${docData.title || docData.name || docData.question || docId}"`);
    }
  }

  // 1. Projects
  console.log('\n--- 1. Seeding Canonical Case Studies & Projects ---');
  for (let i = 0; i < data.projects.length; i++) {
    const p = data.projects[i];
    await seedDoc('projects', p.id, {
      ...p,
      status: 'Published',
      visibility: true,
      order: i + 1
    });
    summary.projects++;
  }

  // 2. Services
  console.log('\n--- 2. Seeding Studio Services ---');
  for (let i = 0; i < data.services.length; i++) {
    const s = data.services[i];
    await seedDoc('services', s.id, {
      ...s,
      status: 'Published',
      visibility: true,
      order: i + 1
    });
    summary.services++;
  }

  // 3. Pricing Packages
  console.log('\n--- 3. Seeding Pricing Packages ---');
  for (let i = 0; i < data.pricingPackages.length; i++) {
    const pkg = data.pricingPackages[i];
    await seedDoc('pricing_packages', pkg.id, {
      ...pkg,
      status: 'Published',
      order: i + 1
    });
    summary.pricing++;
  }

  // 4. Team Members (Founders + Core Team)
  console.log('\n--- 4. Seeding Founders & Core Team Profiles ---');
  let memberOrder = 1;
  for (const f of data.founders) {
    await seedDoc('team_members', f.id, {
      ...f,
      isFounder: true,
      status: 'Published',
      visibility: true,
      order: memberOrder++
    });
    summary.team++;
  }
  for (const c of data.coreTeam) {
    await seedDoc('team_members', c.id, {
      ...c,
      isFounder: false,
      status: 'Published',
      visibility: true,
      order: memberOrder++
    });
    summary.team++;
  }

  // 5. Reviews
  console.log('\n--- 5. Seeding Client Reviews ---');
  for (let i = 0; i < data.reviews.length; i++) {
    const r = data.reviews[i];
    await seedDoc('reviews', `rev-${r.id}`, {
      ...r,
      status: 'Published',
      order: i + 1
    });
    summary.reviews++;
  }

  // 6. FAQs & Process Steps
  console.log('\n--- 6. Seeding FAQs & Process Steps ---');
  for (let i = 0; i < data.faqs.length; i++) {
    const f = data.faqs[i];
    await seedDoc('faqs', `faq-${f.id}`, {
      ...f,
      status: 'Published',
      order: i + 1
    });
    summary.faqs++;
  }
  for (let i = 0; i < data.processSteps.length; i++) {
    const step = data.processSteps[i];
    await seedDoc('process_steps', `step-${i + 1}`, {
      ...step,
      status: 'Published',
      order: i + 1
    });
    summary.process++;
  }

  // 7. Site Hero Singleton
  console.log('\n--- 7. Initializing Default Hero Document ---');
  await seedDoc('site_hero', 'main', {
    badge: 'Available for New Projects',
    headlinePart1: 'PLAN. BUILD.',
    headlinePart2: 'LAUNCH.',
    subcopy: 'We design and build websites and apps that are easy to use and built around your business goals.',
    primaryCtaText: 'EXPLORE SERVICES',
    primaryCtaLink: 'services',
    secondaryCtaText: 'VIEW OUR WORK',
    secondaryCtaLink: 'work',
    visibility: true
  });
  summary.hero++;

  // 8. Site Settings Singleton
  console.log('\n--- 8. Initializing Studio Settings ---');
  await seedDoc('site_settings', 'general', {
    agencyName: 'LeoVantage Web Studio',
    tagline: 'PLAN. BUILD. LAUNCH.',
    supportEmail: 'hello@leovantage.com',
    phone: '+91 98765 43210',
    address: 'Bengaluru, Karnataka, India'
  });
  summary.settings++;

  // 9. Admin Allowlist
  const defaultAdmins = ['gulesh788@gmail.com', 'leovantage059@gmail.com'];
  if (adminEmail && !defaultAdmins.includes(adminEmail)) {
    defaultAdmins.push(adminEmail);
  }

  console.log('\n--- 9. Bootstrapping Admin Emails in Allowlist ---');
  for (const email of defaultAdmins) {
    console.log(`  -> Seeding admin_allowlist: ${email}`);
    await seedDoc('admin_allowlist', email.toLowerCase(), {
      role: 'Super Admin',
      note: 'Authorized studio administrator'
    });
    summary.adminAllowlist++;
  }

  console.log('\n======================================================');
  console.log('              SEED & MIGRATION SUMMARY                 ');
  console.log('======================================================');
  console.log(`- Canonical Projects:       ${summary.projects}`);
  console.log(`- Studio Services:          ${summary.services}`);
  console.log(`- Pricing Packages:         ${summary.pricing}`);
  console.log(`- Team Profiles:            ${summary.team}`);
  console.log(`- Client Reviews:           ${summary.reviews}`);
  console.log(`- FAQs & Process:           ${summary.faqs + summary.process}`);
  console.log(`- Site Hero & Settings:     ${summary.hero + summary.settings}`);
  if (adminEmail) {
    console.log(`- Admin Allowlist Seeded:   ${adminEmail}`);
  }
  console.log(`- Existing Docs Skipped:    ${summary.skipped}`);
  console.log(`Status: ${isDryRun ? 'DRY-RUN COMPLETE (No data modified)' : 'SEEDED SUCCESSFULLY'}`);
  console.log('======================================================\n');
}

runSeed().catch((err) => {
  console.error('[Migration Script Failed]:', err);
  process.exit(1);
});
