import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { useScrollReveal } from '../utils/motion';

function ProjectVisualPreview({ project }) {
  return (
    <div
      style={{
        height: '190px',
        background: '#121A2E',
        borderRadius: '14px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative'
      }}
    >
      <div
        style={{
          height: '28px',
          background: 'rgba(11, 16, 32, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          <span className="mock-dot red" style={{ width: '6px', height: '6px' }} />
          <span className="mock-dot yellow" style={{ width: '6px', height: '6px' }} />
          <span className="mock-dot green" style={{ width: '6px', height: '6px' }} />
        </div>
        <span
          style={{
            fontSize: '0.64rem',
            fontFamily: 'var(--font-heading)',
            color: 'rgba(245, 247, 242, 0.55)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          {project.mockTitle}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, #121A2E 0%, #0B1020 100%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--brand-lime)',
              letterSpacing: '0.05em'
            }}
          >
            {project.client.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              color: 'rgba(255, 255, 255, 0.7)',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {project.timeline}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {project.stats.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                padding: '6px 8px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.58rem',
                  color: 'var(--brand-lime)',
                  marginTop: '3px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkView({ navigate }) {
  const [filter, setFilter] = useState('all');
  const { ref: containerRef, isRevealed } = useScrollReveal();

  const filterTabs = [
    { label: 'ALL WORK', val: 'all' },
    { label: 'WEB APPS', val: 'web' },
    { label: 'MOBILE', val: 'mobile' },
    { label: 'EDUCATION', val: 'education' },
    { label: 'BRANDING & E-COMMERCE', val: 'branding' }
  ];

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category.includes(filter));

  return (
    <div className="page-view">
      <div className="page-hero-banner" id="projectHeroBanner">
        <div className="container">
          <div className="sub-title light">PORTFOLIO ARCHIVE</div>
          <h1 className="headline-mega">SELECTED WORK.</h1>
          <p className="hero-subcopy">
            A showcase of digital products, platforms, and applications delivered with precision.
          </p>
        </div>
      </div>

      <div
        className={`container ${isRevealed ? 'is-revealed' : ''}`}
        ref={containerRef}
        style={{ padding: '80px 24px' }}
      >
        {/* Filter Tabs */}
        <div className="filter-tabs-row" role="tablist" aria-label="Project Category Filter">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.val;
            return (
              <button
                key={tab.val}
                type="button"
                role="tab"
                id={`work-tab-${tab.val}`}
                aria-selected={isSelected}
                aria-controls="projectsArchiveGrid"
                className={`filter-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setFilter(tab.val)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with clean filter transition */}
        <div
          id="projectsArchiveGrid"
          key={filter}
          className="projects-archive-grid tech-filter-fade"
          role="tabpanel"
          aria-labelledby={`work-tab-${filter}`}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="service-card"
              style={{ padding: '26px', '--card-idx': idx % 6 }}
              tabIndex={0}
            >
              <ProjectVisualPreview project={project} />
              <div className="project-pill" style={{ width: 'fit-content', marginBottom: '12px' }}>
                {project.categoryLabel}
              </div>
              <h3 className="service-title">{project.title}</h3>
              <p className="service-desc">{project.tagline}</p>
              <div className="service-card-footer">
                <span className="project-year">{project.tech.slice(0, 2).join(' / ')}</span>
                <a
                  href={`#/work/${project.id}`}
                  className="btn-pill-dark"
                  style={{ padding: '8px 16px', fontSize: '0.72rem' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`work/${project.id}`);
                  }}
                  aria-label={`View Case Study for ${project.title}`}
                >
                  CASE STUDY ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
