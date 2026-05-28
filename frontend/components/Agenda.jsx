'use client'
import { useState } from 'react'

const sessions = [
  { id: 1, time: '09:30 – 10:00', title: 'Registrations', speaker: 'Event Operations Team', tag: 'logistics', desc: 'Morning arrival, check-in, and badge collection for registered executive delegates and partners.' },
  { id: 2, time: '10:00 – 10:10', title: 'Welcome Note', speaker: 'Richard Buxton & Rohan Chitnis', tag: 'keynote', desc: 'An introduction and official welcome to the summit by leadership figures from Accelalpha and Oracle.' },
  { id: 3, time: '10:10 – 10:40', title: 'Industry Keynote: Outlook & Challenges on Digital Logistics', speaker: 'Srivatsav Sarvepalli · Oracle', tag: 'keynote', desc: 'Maps out the current market challenges impacting Gulf regional logistics, focusing on rising costs, macroeconomic changes, and building a responsive digital framework.' },
  { id: 4, time: '10:40 – 11:10', title: 'A Practical Guide to Successful Implementation', speaker: 'Joe Spear · Accelalpha', tag: 'strategy', desc: 'A breakdown of how modern organizations deploy and integrate enterprise logistics and SCM platforms safely without interrupting ongoing operations.' },
  { id: 5, time: '11:10 – 11:30', title: 'The Resilient Supply Chain & SCM Innovations', speaker: 'Ujjwal Kumar · Oracle', tag: 'ai', desc: "Unveiling Oracle's Gen AI SCM Platform. Predictive analytics, embedded AI automation, and deep inventory tracking to anticipate disruption." },
  { id: 6, time: '11:30 – 11:50', title: 'Coffee Break', speaker: 'Networking Team', tag: 'break', desc: 'Short intermission for refreshments, informal discussion, and peer-to-peer networking.' },
  { id: 7, time: '11:50 – 12:10', title: 'Insights from Digital Evolution', speaker: 'Dr. Raman Kumar · Al-Futtaim Logistics', tag: 'casestudy', desc: 'Real-world practical insights on how to navigate large-scale corporate automation and digital transformations successfully.' },
  { id: 8, time: '12:10 – 12:40', title: 'Strategies in Action: Insights from Industry Leaders', speaker: 'David Moono & Tamer Hamed', tag: 'panel', desc: 'Interactive panel featuring executives sharing case studies, supply chain resilience tactics, and green sustainability strategies.' },
  { id: 9, time: '12:40 – 13:00', title: 'Q&A and Closing Remarks', speaker: 'Accelalpha Team', tag: 'keynote', desc: 'Floor opened for audience questions, wrapped up with final strategic takeaways from the hosting team.' },
  { id: 10, time: '13:00+', title: 'Lunch & Networking', speaker: 'Event Catering Group', tag: 'break', desc: 'A dedicated networking lunch for delegates, technology partners, and technical leads to connect over real opportunities.' },
]

const tags = [
  { key: 'all', label: 'All Sessions' },
  { key: 'keynote', label: 'Keynotes' },
  { key: 'ai', label: 'AI & Tech' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'panel', label: 'Panel' },
  { key: 'casestudy', label: 'Case Studies' },
  { key: 'break', label: 'Breaks' },
]

const tagColors = {
  keynote: '#c9a84c', ai: '#2a9aaa', strategy: '#2a7a4a',
  panel: '#6a3090', casestudy: '#9e3030', break: '#555', logistics: '#8a6f2e',
}

export default function Agenda() {
  const [activeTag, setActiveTag] = useState('all')
  const filtered = activeTag === 'all' ? sessions : sessions.filter(s => s.tag === activeTag)

  return (
    <section id="agenda" className="section" style={{ background: 'var(--navy)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', display: 'block', marginBottom: '1rem',
          }}>13th November 2024</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Full Day <em style={{ color: 'var(--gold)' }}>Agenda</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          justifyContent: 'center', marginBottom: '3rem',
        }}>
          {tags.map(t => (
            <button key={t.key} onClick={() => setActiveTag(t.key)} style={{
              background: activeTag === t.key ? 'var(--gold)' : 'transparent',
              color: activeTag === t.key ? 'var(--navy)' : 'var(--white-dim)',
              border: `1px solid ${activeTag === t.key ? 'var(--gold)' : 'var(--border)'}`,
              padding: '0.45rem 1rem', borderRadius: '2px', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em',
              transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Session list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {filtered.map((s, i) => (
            <div key={s.id} style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: '0 2rem',
              background: i % 2 === 0 ? 'var(--card-bg)' : 'rgba(17,34,64,0.4)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '1.5rem 2rem',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s',
              marginBottom: '0.5rem',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Time */}
              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.8rem',
                color: 'var(--gold)', paddingTop: '0.15rem', whiteSpace: 'nowrap',
              }}>{s.time}</div>

              {/* Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--white)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{s.title}</h3>
                  <span style={{
                    background: tagColors[s.tag] + '33',
                    color: tagColors[s.tag] || 'var(--white-dim)',
                    border: `1px solid ${tagColors[s.tag] || 'var(--border)'}44`,
                    padding: '0.15rem 0.6rem', borderRadius: '2px',
                    fontSize: '0.68rem', fontFamily: 'DM Mono, monospace',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {s.tag}
                  </span>
                </div>
                <p style={{ color: 'var(--gold)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: 500 }}>{s.speaker}</p>
                <p style={{ color: 'var(--white-dim)', fontSize: '0.85rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
