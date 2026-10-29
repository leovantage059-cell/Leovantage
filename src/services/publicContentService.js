import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Canonical fallback data from local files
import { PROJECTS as fallbackProjects } from '../data/projects';
import { SERVICES as fallbackServices, PRICING_PACKAGES as fallbackPricing } from '../data/services';
import { FOUNDERS as fallbackFounders, CORE_TEAM as fallbackCoreTeam, VALUES as fallbackValues } from '../data/team';
import { REVIEWS as fallbackReviews } from '../data/reviews';
import { FAQS as fallbackFaqs, PROCESS_STEPS as fallbackProcessSteps } from '../data/faq';

/**
 * Fetch all published projects from Firestore.
 * Fallbacks safely to static data if Firestore is offline, empty, or uninitialized.
 */
export async function getPublishedProjects() {
  try {
    const q = query(
      collection(db, 'projects'),
      where('status', '==', 'Published')
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Sort by order or featured
      projects.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      return projects;
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static projects:', err.message);
  }
  return fallbackProjects;
}

/**
 * Fetch a single published project by its slug/id.
 */
export async function getProjectBySlug(slug) {
  try {
    const docRef = doc(db, 'projects', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().status === 'Published') {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (err) {
    console.warn(`[LeoVantage] Project ${slug} fetch failed, checking static:`, err.message);
  }
  return fallbackProjects.find((p) => p.id === slug) || null;
}

/**
 * Fetch published services and pricing packages.
 */
export async function getPublishedServices() {
  let services = fallbackServices;
  let pricing = fallbackPricing;

  try {
    const sQuery = query(
      collection(db, 'services'),
      where('status', '==', 'Published')
    );
    const sSnap = await getDocs(sQuery);
    if (!sSnap.empty) {
      services = sSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      services.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static services:', err.message);
  }

  try {
    const pQuery = query(
      collection(db, 'pricing_packages'),
      where('status', '==', 'Published')
    );
    const pSnap = await getDocs(pQuery);
    if (!pSnap.empty) {
      pricing = pSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      pricing.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static pricing:', err.message);
  }

  return { services, pricing };
}

/**
 * Fetch published team members (founders & core team).
 */
export async function getPublishedTeam() {
  try {
    const tQuery = query(
      collection(db, 'team_members'),
      where('status', '==', 'Published')
    );
    const tSnap = await getDocs(tQuery);
    if (!tSnap.empty) {
      const allMembers = tSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      allMembers.sort((a, b) => (a.order || 0) - (b.order || 0));

      const founders = allMembers.filter((m) => m.isFounder === true);
      const coreTeam = allMembers.filter((m) => !m.isFounder);

      return {
        founders: founders.length > 0 ? founders : fallbackFounders,
        coreTeam: coreTeam.length > 0 ? coreTeam : fallbackCoreTeam,
        values: fallbackValues
      };
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static team:', err.message);
  }
  return {
    founders: fallbackFounders,
    coreTeam: fallbackCoreTeam,
    values: fallbackValues
  };
}

/**
 * Fetch published reviews.
 */
export async function getPublishedReviews() {
  try {
    const rQuery = query(
      collection(db, 'reviews'),
      where('status', '==', 'Published')
    );
    const rSnap = await getDocs(rQuery);
    if (!rSnap.empty) {
      const reviews = rSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      reviews.sort((a, b) => (a.order || 0) - (b.order || 0));
      return reviews;
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static reviews:', err.message);
  }
  return fallbackReviews;
}

/**
 * Fetch published FAQs and process steps.
 */
export async function getPublishedFaqsAndProcess() {
  let faqs = fallbackFaqs;
  let process = fallbackProcessSteps;

  try {
    const fQuery = query(
      collection(db, 'faqs'),
      where('status', '==', 'Published')
    );
    const fSnap = await getDocs(fQuery);
    if (!fSnap.empty) {
      faqs = fSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static FAQs:', err.message);
  }

  try {
    const pQuery = query(
      collection(db, 'process_steps'),
      where('status', '==', 'Published')
    );
    const pSnap = await getDocs(pQuery);
    if (!pSnap.empty) {
      process = pSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      process.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('[LeoVantage] Falling back to static process steps:', err.message);
  }

  return { faqs, process };
}

/**
 * Fetch hero content customization.
 */
export async function getSiteHero() {
  try {
    const heroSnap = await getDoc(doc(db, 'site_hero', 'main'));
    if (heroSnap.exists() && heroSnap.data().visibility !== false) {
      return heroSnap.data();
    }
  } catch (err) {
    console.warn('[LeoVantage] Using default hero:', err.message);
  }
  return null;
}

/**
 * Submit an inquiry to Firestore with validation and anti-spam measures.
 * Conforms strictly to firestore.rules requirements.
 */
export async function submitContactInquiry(briefData) {
  const { name, email, phone, service, budget, timeline, message } = briefData;

  // Validation
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedService = (service || '').trim();

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    throw new Error('Please provide your name (2 to 100 characters).');
  }

  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error('Please enter a valid work email address.');
  }

  if (!trimmedService) {
    throw new Error('Please select the service required for your project.');
  }

  // Rate Limiting Protection (Client Cooldown)
  const lastSubKey = 'lvws_last_inquiry_at';
  const lastSubTime = localStorage.getItem(lastSubKey);
  const now = Date.now();
  if (lastSubTime && now - parseInt(lastSubTime, 10) < 30000) {
    const waitSec = Math.ceil((30000 - (now - parseInt(lastSubTime, 10))) / 1000);
    throw new Error(`Please wait ${waitSec} seconds before submitting another inquiry.`);
  }

  const payload = {
    name: trimmedName,
    email: trimmedEmail,
    phone: (phone || '').trim(),
    service: trimmedService,
    budget: (budget || '').trim(),
    timeline: (timeline || 'Immediately (Within 3 weeks)').trim(),
    message: (message || '').trim(),
    status: 'New',
    createdAt: serverTimestamp(),
    submittedAt: new Date().toISOString(),
    source: 'Website Contact Page',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
  };

  const docRef = await addDoc(collection(db, 'inquiries'), payload);
  localStorage.setItem(lastSubKey, now.toString());

  return { id: docRef.id, success: true };
}
