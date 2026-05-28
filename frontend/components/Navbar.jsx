'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Register', href: '#register' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.2rem 2rem',
      background: scrolled ? 'rgba(10,22,40,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif',
        }}>⚓</div>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>
          AccelAlpha × Oracle
        </span>
      </div>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
        className="nav-links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} style={{
              color: 'var(--white-dim)', textDecoration: 'none', fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--white-dim)'}
            >{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#register" style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
            color: 'var(--navy)', padding: '0.5rem 1.25rem', borderRadius: '2px',
            textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Register Now</a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--gold)', fontSize: '1.5rem', cursor: 'pointer',
        }}
        className="hamburger"
      >{menuOpen ? '✕' : '☰'}</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(10,22,40,0.98)', backdropFilter: 'blur(12px)',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
          borderBottom: '1px solid var(--border)',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'var(--white)', textDecoration: 'none', fontSize: '1.1rem',
                fontFamily: 'Playfair Display, serif',
              }}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
