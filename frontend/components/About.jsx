'use client'

const reasons = [
  {
    icon: '🤖',
    title: "Oracle's Gen AI SCM Platform Unveiled",
    desc: "Explore how Oracle's AI-powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into Supply Chains like yours.",
  },
  {
    icon: '📊',
    title: 'Customer Success Stories That Deliver Results',
    desc: 'Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience through smarter inventory management.',
  },
  {
    icon: '🌿',
    title: 'Practical Solutions for Green & Resilient Operations',
    desc: 'Navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices — keeping operations agile and competitive in the Gulf market.',
  },
]

export default function About() {
  return (
    <section id="about" className="section" style={{
      background: 'linear-gradient(180deg, var(--navy) 0%, var(--navy-mid) 100%)',
    }}>
      <div className="container">
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            display: 'inline-block',
            color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontFamily: 'DM Mono, monospace',
            marginBottom: '1rem',
          }}>Why Attend</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', maxWidth: 640, margin: '0 auto' }}>
            Navigate the Complexities of Gulf{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Supply Chain & Logistics</em>
          </h2>
          <p style={{
            color: 'var(--white-dim)', maxWidth: 680, margin: '1.5rem auto 0',
            lineHeight: 1.8, fontSize: '0.95rem',
          }}>
            The Gulf&apos;s supply chains face mounting pressure from rising costs, geopolitical instability,
and shifting sustainability mandates. This summit delivers practical insights and real&#8209;world
strategies to future&#8209;proof your operations.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2.5rem 2rem',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.3s, transform 0.3s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-strong)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{r.icon}</div>
              <div style={{
                width: 32, height: 2,
                background: 'linear-gradient(90deg, var(--gold), transparent)',
                marginBottom: '1.25rem',
              }} />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--white)', marginBottom: '0.75rem', lineHeight: 1.4 }}>{r.title}</h3>
              <p style={{ color: 'var(--white-dim)', lineHeight: 1.8, fontSize: '0.9rem' }}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: '4rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden',
        }}>
          {[
            { value: '8+', label: 'Industry Speakers' },
            { value: '3.5h', label: 'Packed Sessions' },
            { value: '100+', label: 'Executive Delegates' },
            { value: '1', label: 'Exclusive Venue' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--card-bg)', padding: '2rem',
              textAlign: 'center', backdropFilter: 'blur(8px)',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: '2.5rem',
                color: 'var(--gold)', marginBottom: '0.25rem',
              }}>{s.value}</div>
              <div style={{ color: 'var(--white-dim)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
