import React, { useState, useEffect } from 'react';
import { PROJECTS as defaultProjects } from '../data/projects';
import { getPublishedProjects } from '../services/publicContentService';
import { useScrollReveal } from '../utils/motion';

export default function FeaturedProjects({ navigate }) {
  const [allProjects, setAllProjects] = useState(defaultProjects);

  useEffect(() => {
    let isMounted = true;
    getPublishedProjects().then((projs) => {
      if (isMounted && projs && projs.length > 0) {
        setAllProjects(projs);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const featured = allProjects.filter((p) => p.featured);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  return (
    <section className={`section-work ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="sub-title">SELECTED WORK</div>
            <h2 className="headline-section">RECENT PROJECTS.</h2>
          </div>
          <a
            href="#/work"
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate('work');
            }}
          >
            <span>VIEW ALL PROJECTS ({allProjects.length})</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        <div className="work-cards-stack">
          {featured.map((project) => (
            <div key={project.id} className="project-card-large">
              <div className="project-info-side">
                <div>
                  <div className="project-meta-pills">
                    <span className="project-pill">{project.categoryLabel.split('•')[0].trim()}</span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <div className="project-tech-badges">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <a
                    href={`#/work/${project.id}`}
                    className="btn-pill-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`work/${project.id}`);
                    }}
                  >
                    <span>VIEW CASE STUDY</span>
                    <span className="btn-arrow">↗</span>
                  </a>
                </div>
              </div>

              <div className="project-visual-side">
                <div className="project-device-frame">
                  <div className="device-ui-header">
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span className="mock-dot red" />
                      <span className="mock-dot yellow" />
                      <span className="mock-dot green" />
                    </div>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'rgba(245, 247, 242, 0.6)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {project.mockTitle}
                    </span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        background: 'rgba(199, 243, 107, 0.15)',
                        color: 'var(--brand-lime)',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontWeight: 700
                      }}
                    >
                      LIVE V2.4
                    </span>
                  </div>

                  <div className="device-ui-canvas">
                    {/* Project-specific top visual preview */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-light-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Client
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF' }}>
                          {project.client}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-light-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}
                        >
                          Timeline
                        </div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--brand-lime)' }}>
                          {project.timeline}
                        </div>
                      </div>
                    </div>

                    {/* Stats Metric Blocks */}
                    <div className="canvas-row">
                      {project.stats.map((s, idx) => (
                        <div key={idx} className="canvas-widget">
                          <div style={{ fontSize: '0.68rem', color: 'var(--brand-lime)', fontWeight: 700, marginBottom: '4px' }}>
                            {s.label.toUpperCase()}
                          </div>
                          <div style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 900 }}>
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Lower simulation bar tailored to each project */}
                    <div
                      style={{
                        marginTop: 'auto',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', color: 'rgba(245, 247, 242, 0.7)' }}>
                        Tech Stack: {project.tech.slice(0, 3).join(' • ')}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--brand-lime)', fontWeight: 700 }}>
                        Production Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
