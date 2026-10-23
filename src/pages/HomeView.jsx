import React from 'react';
import Hero from '../components/Hero';
import TrustedMarquee from '../components/TrustedMarquee';
import IntroStats from '../components/IntroStats';
import ServicesPreview from '../components/ServicesPreview';
import FeaturedProjects from '../components/FeaturedProjects';
import ProcessTimeline from '../components/ProcessTimeline';
import TechStack from '../components/TechStack';
import TeamSection from '../components/TeamSection';
import ReviewsCarousel from '../components/ReviewsCarousel';
import FaqAccordion from '../components/FaqAccordion';
import FinalCta from '../components/FinalCta';

export default function HomeView({ navigate }) {
  return (
    <div className="page-view">
      <Hero navigate={navigate} />
      <TrustedMarquee />
      <FeaturedProjects navigate={navigate} />
      <IntroStats />
      <ServicesPreview navigate={navigate} />
      <ProcessTimeline navigate={navigate} />
      <TechStack />
      <TeamSection navigate={navigate} />
      <ReviewsCarousel navigate={navigate} />
      <FaqAccordion />
      <FinalCta navigate={navigate} />
    </div>
  );
}
