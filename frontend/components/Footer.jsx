export default function Footer() {
  return (
    <footer style={{
      background: '#071220',
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
      textAlign: 'center',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        fontFamily: 'Playfair Display, serif', fontSize: '1.1rem',
        color: 'var(--gold)', marginBottom: '0.75rem',
      }}>
        Troubled Waters: Sailing with AI in Supply Chain
      </div>
      <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
        13th November 2024 · Marriott Resort, The Palm, Dubai
      </p>
      <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', marginBottom: '2rem' }}>
        Hosted by <strong style={{ color: 'var(--white)' }}>Accelalpha</strong> × <strong style={{ color: 'var(--white)' }}>Oracle</strong>
      </p>
      <div style={{
        width: 40, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        margin: '0 auto 1.5rem',
      }} />
      <p style={{ color: 'var(--white-dim)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
        © 2024 Cogent Solutions™ · All rights reserved
      </p>
    </footer>
  )
}
