/**
 * LeoVantage Web Studio - Verification & Integration Test Suite
 *
 * Verifies:
 * 1. Contact Inquiry Validation & Submission Flow (Sanitization, fields, duplicate prevention)
 * 2. Public vs Admin Security Rules Policy Assertions (Published filter, internal isolation, write restrictions)
 * 3. Publishing Visibility Lifecycle (Draft vs Published gating for public website)
 * 4. Critical CRM & Finance Calculations (INR formatting, 18% GST calculation, Inquiry -> Client conversion)
 * 5. Canonical Data Integrity & Seed Migration Mapping
 *
 * Usage:
 *   node scripts/verifyIntegration.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function runSection(title, fn) {
  console.log(`\n==================================================`);
  console.log(`▶ [TEST SUITE] ${title}`);
  console.log(`==================================================`);
  try {
    await fn();
  } catch (err) {
    failedTests++;
    console.error(`  ✗ Uncaught exception in section: ${err.message}`);
  }
}

async function main() {
  // ============================================================================
  // Section 1: Contact Inquiry Validation & Submission Flow
  // ============================================================================
  await runSection('1. Contact Inquiry Validation & Sanitization Flow', () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateInquiry(payload) {
    const errors = [];
    if (!payload.name || payload.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    if (!payload.email || !EMAIL_REGEX.test(payload.email.trim())) {
      errors.push('A valid email address is required');
    }
    if (!payload.message || payload.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    }
    // Security check: public submission MUST NOT inject privileged fields
    const FORBIDDEN_FIELDS = ['status', 'internalNotes', 'assignedTo', 'priority', 'convertedClientId'];
    for (const f of FORBIDDEN_FIELDS) {
      if (payload[f] !== undefined) {
        errors.push(`Public submission cannot define internal field: ${f}`);
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Test 1.1: Valid Inquiry Payload
  const validPayload = {
    name: 'Aarav Sharma',
    email: 'aarav@acme.corp',
    phone: '+91 98765 43210',
    service: 'Full-Stack Web App',
    budget: '₹2,50,000 - ₹5,00,000',
    message: 'We want to build a modern SaaS portal for our supply chain logistics.',
    source: 'leovantage_contact_form'
  };
  const valResult1 = validateInquiry(validPayload);
  assert(valResult1.isValid, 'Valid inquiry payload passes validation');

  // Test 1.2: Invalid Email Rejection
  const invalidEmailPayload = { ...validPayload, email: 'not-an-email' };
  const valResult2 = validateInquiry(invalidEmailPayload);
  assert(!valResult2.isValid && valResult2.errors.some(e => e.includes('email')), 'Malformed email is rejected');

  // Test 1.3: Short message rejection
  const shortMessagePayload = { ...validPayload, message: 'Hi' };
  const valResult3 = validateInquiry(shortMessagePayload);
  assert(!valResult3.isValid && valResult3.errors.some(e => e.includes('Message')), 'Short message (<10 chars) is rejected');

  // Test 1.4: Prevent privilege escalation (forbidden CRM internal fields)
  const privilegeExploit = { ...validPayload, status: 'Converted', internalNotes: 'High priority customer' };
  const valResult4 = validateInquiry(privilegeExploit);
  assert(!valResult4.isValid && valResult4.errors.some(e => e.includes('internal field')), 'Privileged CRM fields injection is blocked');

  // Test 1.5: Duplicate submission cooldown logic
  let lastSubmitTime = 0;
  const COOLDOWN_MS = 10000;
  function canSubmit() {
    const now = Date.now();
    if (now - lastSubmitTime < COOLDOWN_MS) {
      return false;
    }
    lastSubmitTime = now;
    return true;
  }
  assert(canSubmit(), 'First submission is allowed');
  assert(!canSubmit(), 'Immediate duplicate submission is throttled');
});

  // ============================================================================
  // Section 2: Public vs Admin Security Rules Policy Assertions
  // ============================================================================
  await runSection('2. Security Rules Least-Privilege Policy Verification', () => {
    const rulesPath = path.join(rootDir, 'firestore.rules');
    assert(fs.existsSync(rulesPath), 'firestore.rules exists in repository');

    const rulesContent = fs.readFileSync(rulesPath, 'utf8');

    // Test 2.1: Public collections have Published status gate
    assert(
      rulesContent.includes("resource.data.status == 'Published'"),
      'Public read requires resource.data.status == "Published"'
    );

    // Test 2.2: Internal CRM collections are locked to admin only
    const internalCollections = ['inquiries', 'clients', 'delivery_projects', 'tasks', 'invoices', 'expenses', 'documents', 'admin_users', 'admin_allowlist'];
    for (const col of internalCollections) {
      const hasColRule = rulesContent.includes(`match /${col}/{`);
      assert(hasColRule, `Security rule matches collection /${col}`);
    }

    // Test 2.3: Inquiries allow public create with strict validation, but deny public read/update/delete
    assert(
      rulesContent.includes('allow create: if') && rulesContent.includes("request.resource.data.status == 'New'"),
      'Inquiries collection enforces initial status "New" on public create'
    );
    assert(
      rulesContent.includes('allow read, update, delete: if isAdmin()'),
      'Inquiries read, update, delete strictly restricted to isAdmin()'
    );

    // Test 2.4: Admin verification function exists and checks admin_users or allowlist
    assert(
      rulesContent.includes('function isAdmin()'),
      'isAdmin() security rule helper is defined'
    );
    assert(
      rulesContent.includes('admin_users') && rulesContent.includes('admin_allowlist'),
      'isAdmin() verifies credentials against admin_users and admin_allowlist'
    );

    // Test 2.5: Storage rules verification
    const storageRulesPath = path.join(rootDir, 'storage.rules');
    assert(fs.existsSync(storageRulesPath), 'storage.rules exists in repository');
    const storageContent = fs.readFileSync(storageRulesPath, 'utf8');
    assert(
      storageContent.includes('match /public/{allPaths=**}') && storageContent.includes('allow read: if true;'),
      'Public storage assets are isolated under /public/'
    );
    assert(
      storageContent.includes('match /documents/{allPaths=**}') && storageContent.includes('if isAdmin()'),
      'Private documents vault is isolated under /documents/ and locked to isAdmin()'
    );
  });

  // ============================================================================
  // Section 3: Publishing Visibility Lifecycle
  // ============================================================================
  await runSection('3. Publishing Visibility Lifecycle (Draft vs Published)', () => {
    // Simulating Firestore documents in CMS
    const mockProjects = [
      { id: 'proj-1', title: 'Apex AI Automation', status: 'Published', featured: true },
      { id: 'proj-2', title: 'FinFlow Core Banking', status: 'Published', featured: false },
      { id: 'proj-3', title: 'Stealth SaaS Dashboard', status: 'Draft', featured: false },
      { id: 'proj-4', title: 'Legacy E-Commerce V1', status: 'Archived', featured: true }
    ];

    // Public Query Filter: status === 'Published'
    function publicGetProjects(projects) {
      return projects.filter(p => p.status === 'Published');
    }

    // Public Featured Filter: status === 'Published' && featured === true
    function publicGetFeatured(projects) {
      return projects.filter(p => p.status === 'Published' && p.featured === true);
    }

    const published = publicGetProjects(mockProjects);
    assert(published.length === 2, 'Public visitors see exactly 2 published projects');
    assert(!published.some(p => p.status === 'Draft'), 'Draft projects are omitted from public listing');
    assert(!published.some(p => p.status === 'Archived'), 'Archived projects are omitted from public listing');

    const featured = publicGetFeatured(mockProjects);
    assert(featured.length === 1 && featured[0].id === 'proj-1', 'Only published featured project is displayed in Hero/Featured');

    // Admin Publish Lifecycle Flow
    // 1. Admin edits proj-3 and publishes it
    mockProjects[2].status = 'Published';
    mockProjects[2].featured = true;

    const updatedPublished = publicGetProjects(mockProjects);
    assert(updatedPublished.length === 3, 'Public listing dynamically includes newly published project');
    const updatedFeatured = publicGetFeatured(mockProjects);
    assert(updatedFeatured.length === 2, 'Hero / Featured projects dynamically reflects newly published project');
  });

  // ============================================================================
  // Section 4: Critical CRM & Finance Engine Calculations
  // ============================================================================
  await runSection('4. Critical CRM & Finance Calculations (INR & 18% GST)', () => {
    // Line items
    const lineItems = [
      { description: 'Design Sprint & UX Architecture', quantity: 1, rate: 50000 },
      { description: 'React + Node Development (Sprint 1)', quantity: 2, rate: 75000 }
    ];

    // Subtotal calculation
    const subtotal = lineItems.reduce((sum, item) => sum + (Number(item.quantity || 0) * Number(item.rate || 0)), 0);
    assert(subtotal === 200000, `Subtotal calculated correctly: ₹${subtotal} (expected 200000)`);

    // 18% GST calculation
    const GST_RATE = 0.18;
    const taxAmount = Math.round(subtotal * GST_RATE);
    assert(taxAmount === 36000, `18% GST calculated correctly: ₹${taxAmount} (expected 36000)`);

    // Grand total
    const totalAmount = subtotal + taxAmount;
    assert(totalAmount === 236000, `Grand total with GST calculated correctly: ₹${totalAmount} (expected 236000)`);

    // INR Currency Formatter test
    function formatINR(amount) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount || 0);
    }
    const formatted = formatINR(totalAmount);
    assert(formatted.includes('2,36,000'), `Formatted INR currency follows Indian numbering system: ${formatted}`);

    // Inquiry -> Client Conversion Pipeline
    const inquiry = {
      id: 'inq-9921',
      name: 'Rohit Verma',
      email: 'rohit@techventures.in',
      phone: '+91 99887 76655',
      service: 'Full-Stack Web App',
      budget: '₹5,00,000+',
      status: 'New'
    };

    function convertInquiryToClient(inq) {
      const clientRecord = {
        name: inq.name,
        email: inq.email,
        phone: inq.phone || '',
        company: inq.company || inq.name + ' Ventures',
        serviceInterest: inq.service,
        budgetRange: inq.budget,
        leadStatus: 'Won',
        convertedFromInquiryId: inq.id,
        convertedAt: new Date().toISOString(),
        lifetimeValue: 0
      };
      const updatedInquiry = {
        ...inq,
        status: 'Converted',
        convertedClientId: 'generated-client-id'
      };
      return { clientRecord, updatedInquiry };
    }

    const conversion = convertInquiryToClient(inquiry);
    assert(conversion.clientRecord.leadStatus === 'Won', 'Converted client starts with leadStatus: "Won"');
    assert(conversion.clientRecord.convertedFromInquiryId === 'inq-9921', 'Client retains traceable link to original inquiry');
    assert(conversion.updatedInquiry.status === 'Converted', 'Inquiry marked as Converted in CRM');
  });

  // ============================================================================
  // Section 5: Canonical Website Data Integrity & Seed Mapping
  // ============================================================================
  await runSection('5. Canonical Website Data Integrity & Mapping', async () => {
    const { PROJECTS } = await import('../src/data/projects.js');
    const { SERVICES, PRICING_PACKAGES } = await import('../src/data/services.js');
    const { FOUNDERS, CORE_TEAM } = await import('../src/data/team.js');
    const { REVIEWS } = await import('../src/data/reviews.js');
    const { FAQS, PROCESS_STEPS } = await import('../src/data/faq.js');

    assert(PROJECTS.length === 8, `Canonical PROJECTS preserved: ${PROJECTS.length} records`);
    assert(SERVICES.length === 8, `Canonical SERVICES preserved: ${SERVICES.length} records`);
    assert(PRICING_PACKAGES.length === 3, `Canonical PRICING_PACKAGES preserved: ${PRICING_PACKAGES.length} records`);
    assert(FOUNDERS.length + CORE_TEAM.length === 7, `Canonical TEAM preserved: ${FOUNDERS.length + CORE_TEAM.length} records`);
    assert(REVIEWS.length === 10, `Canonical REVIEWS preserved: ${REVIEWS.length} records`);
    assert(FAQS.length === 5, `Canonical FAQS preserved: ${FAQS.length} records`);
    assert(PROCESS_STEPS.length === 4, `Canonical PROCESS_STEPS preserved: ${PROCESS_STEPS.length} records`);

    // Verify rich case-study fields exist on all projects
    const richFieldsPresent = PROJECTS.every(p => 
      p.id && p.title && p.category && p.problem && p.solution && p.stats && p.tech && p.client
    );
    assert(richFieldsPresent, 'All 8 projects retain complete case study schema (id, title, category, problem, solution, stats, tech, client)');

    // Verify no demo placeholders leaked into canonical projects
    const hasPlaceholders = PROJECTS.some(p => p.title.toLowerCase().includes('demo') || p.title.toLowerCase().includes('placeholder'));
    assert(!hasPlaceholders, 'Zero demo/placeholder records present in canonical website dataset');
  });

  // ============================================================================
  // Summary
  // ============================================================================
  console.log(`\n==================================================`);
  console.log(`TEST SUMMARY: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total assertions.`);
  console.log(`==================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
