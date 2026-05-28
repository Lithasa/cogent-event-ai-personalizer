'use client'

const speakers = [
  { name: 'Dr. Raman Kumar', role: 'CEO', org: 'Al-Futtaim Logistics', initials: 'RK', color: '#1e6e7a' },
  { name: 'David Moono', role: 'Global Logistics Manager', org: 'Weatherford', initials: 'DM', color: '#8a6f2e' },
  { name: 'Tamer Hamed', role: 'CIO', org: 'Dubai Cable Company', initials: 'TH', color: '#1a3460' },
  { name: 'Richard Buxton', role: 'VP EMEA', org: 'Accelalpha', initials: 'RB', color: '#c9a84c' },
  { name: 'Joe Spear', role: 'Partner', org: 'Accelalpha', initials: 'JS', color: '#2a5080' },
  { name: 'Srivatsav Sarvepalli', role: 'Regional Director, SCM ECEMEA', org: 'Oracle', initials: 'SS', color: '#9e3030' },
  { name: 'Rohan Chitnis', role: 'Sales Director Applications', org: 'Oracle', initials: 'RC', color: '#6a3090' },
  { name: 'Ujjwal Kumar', role: 'Principal Domain Lead, ECEMEA', org: 'Oracle', initials: 'UK', color: '#2a7a4a' },
]

export default function Speakers() {
  return (
    <section id="speakers" className="section" style={{ background: 'var(--navy-mid)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', display: 'block', marginBottom: '1rem',
          }}>Distinguished Speakers</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Industry Leaders &{' '}
            <em style={{ color: 'var(--gold)' }}>Visionaries</em>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {speakers.map((s, i) => (
            <div key={i} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-strong)'
                e.currentTarget.style.transform = 'translateY(-6px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem', fontWeight: 600, color: '#fff',
                border: '2px solid rgba(201,168,76,0.3)',
                position: 'relative',
              }}>
                {s.initials}
                <div style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.2)',
                }} />
              </div>

              <h3 style={{ fontSize: '1rem', color: 'var(--white)', marginBottom: '0.3rem', lineHeight: 1.3 }}>{s.name}</h3>
              <p style={{ color: 'var(--gold)', fontSize: '0.78rem', marginBottom: '0.25rem', fontWeight: 500 }}>{s.role}</p>
              <p style={{ color: 'var(--white-dim)', fontSize: '0.78rem' }}>{s.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
