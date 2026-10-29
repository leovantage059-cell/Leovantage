import React, { useState } from 'react';
import { TECH_ITEMS } from '../data/faq';
import { useScrollReveal } from '../utils/motion';

export default function TechStack() {
  const [filter, setFilter] = useState('all');
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const tabs = [
    { label: 'ALL TECH', val: 'all' },
    { label: 'FRONTEND', val: 'frontend' },
    { label: 'MOBILE', val: 'mobile' },
    { label: 'BACKEND', val: 'backend' },
    { label: 'DESIGN', val: 'design' }
  ];

  const filteredItems = filter === 'all' ? TECH_ITEMS : TECH_ITEMS.filter((t) => t.cat === filter);

  return (
    <section className={`section-tech ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="sub-title">TOOLS &amp; TECHNOLOGIES</div>
          <h2 className="headline-section">OUR TECH STACK.</h2>
        </div>

        <div className="tech-tabs-nav" role="tablist" aria-label="Technology Stack Filter">
          {tabs.map((tab) => {
            const isSelected = filter === tab.val;
            return (
              <button
                key={tab.val}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="techChipsGrid"
                id={`tech-tab-${tab.val}`}
                className={`tech-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setFilter(tab.val)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id="techChipsGrid"
          key={filter}
          className="tech-chips-grid tech-filter-fade"
          role="tabpanel"
          aria-labelledby={`tech-tab-${filter}`}
        >
          {filteredItems.map((item) => (
            <div key={item.name} className="tech-chip" tabIndex={0}>
              <span className="tech-badge-dot" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
