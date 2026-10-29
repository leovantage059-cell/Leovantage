import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomeView from './pages/HomeView';
import ServicesView from './pages/ServicesView';
import WorkView from './pages/WorkView';
import CaseStudyView from './pages/CaseStudyView';
import ProcessView from './pages/ProcessView';
import TeamView from './pages/TeamView';
import ReviewsView from './pages/ReviewsView';
import AboutView from './pages/AboutView';
import ContactView from './pages/ContactView';
import { PrivacyView, TermsView } from './pages/LegalView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#/', '');
    return hash || 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update document title
      let title = 'LeoVantage Web Studio | PLAN. BUILD. LAUNCH.';
      if (hash.startsWith('work/')) {
        const slug = hash.replace('work/', '');
        title = `${slug.toUpperCase()} | Case Study | LeoVantage`;
      } else if (hash !== 'home') {
        const formatted = hash.charAt(0).toUpperCase() + hash.slice(1);
        title = `${formatted} | LeoVantage Web Studio`;
      }
      document.title = title;
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route) => {
    window.location.hash = `#/${route}`;
  };

  const renderCurrentPage = () => {
    if (currentRoute === 'home') return <HomeView navigate={navigate} />;
    if (currentRoute === 'services') return <ServicesView navigate={navigate} />;
    if (currentRoute === 'work') return <WorkView navigate={navigate} />;
    if (currentRoute.startsWith('work/')) {
      const slug = currentRoute.replace('work/', '');
      return <CaseStudyView slug={slug} navigate={navigate} />;
    }
    if (currentRoute === 'process') return <ProcessView navigate={navigate} />;
    if (currentRoute === 'team') return <TeamView navigate={navigate} />;
    if (currentRoute === 'reviews') return <ReviewsView navigate={navigate} />;
    if (currentRoute === 'about') return <AboutView navigate={navigate} />;
    if (currentRoute === 'contact') return <ContactView navigate={navigate} />;
    if (currentRoute === 'privacy') return <PrivacyView />;
    if (currentRoute === 'terms') return <TermsView />;
    return <HomeView navigate={navigate} />;
  };

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar currentRoute={currentRoute} navigate={navigate} />
      <main id="appPages">{renderCurrentPage()}</main>
      <Footer navigate={navigate} />
    </>
  );
}
