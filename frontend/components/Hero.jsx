'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width, H = canvas.height

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#0a1628')
      bg.addColorStop(0.5, '#0d1f3c')
      bg.addColorStop(1, '#071220')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Stars
      ctx.fillStyle = 'rgba(244,241,234,0.6)'
      for (let i = 0; i < 80; i++) {
        const x = (i * 137.5) % W
        const y = (i * 97.3) % (H * 0.6)
        const r = (i % 3 === 0) ? 1.2 : 0.5
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Waves
      const waves = [
        { amp: 28, freq: 0.008, speed: 0.012, yBase: H * 0.72, color: 'rgba(26,52,96,0.7)', offset: 0 },
        { amp: 20, freq: 0.012, speed: 0.018, yBase: H * 0.78, color: 'rgba(17,34,64,0.85)', offset: 1 },
        { amp: 14, freq: 0.018, speed: 0.025, yBase: H * 0.83, color: 'rgba(10,22,40,0.95)', offset: 2 },
      ]

      waves.forEach(w => {
        ctx.beginPath()
        ctx.moveTo(0, H)
        for (let x = 0; x <= W; x += 3) {
          const y = w.yBase + Math.sin(x * w.freq + t * w.speed * 60 + w.offset) * w.amp
          ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = w.color
        ctx.fill()
      })

      // Gold shimmer line on top wave
      ctx.beginPath()
      for (let x = 0; x <= W; x += 3) {
        const y = waves[0].yBase + Math.sin(x * waves[0].freq + t * waves[0].speed * 60) * waves[0].amp
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(201,168,76,0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      t++
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 1.5rem',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          border: '1px solid var(--border-strong)', borderRadius: '2px',
          padding: '0.4rem 1rem', marginBottom: '2rem',
          animation: 'fadeIn 0.8s ease forwards',
          background: 'rgba(201,168,76,0.07)',
        }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'DM Mono, monospace' }}>
            Exclusive Executive Summit
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          color: 'var(--white)',
          maxWidth: 800,
          marginBottom: '0.5rem',
          animation: 'fadeUp 0.9s 0.15s ease both',
        }}>
          Troubled Waters:
        </h1>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          background: 'linear-gradient(90deg, var(--gold-light), var(--gold), var(--gold-dim), var(--gold))',
          backgroundSize: '200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'fadeUp 0.9s 0.2s ease both, shimmer 4s 1s linear infinite',
          marginBottom: '1.5rem',
        }}>
          Sailing with AI in Supply Chain
        </h1>

        {/* Event meta */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center',
          marginBottom: '3rem',
          animation: 'fadeUp 0.9s 0.35s ease both',
        }}>
          {[
            { icon: '📅', text: '13th November 2024' },
            { icon: '🕘', text: '09:30 AM — 01:00 PM' },
            { icon: '📍', text: 'Marriott Resort, The Palm, Dubai' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--white-dim)', fontSize: '0.9rem',
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.9s 0.5s ease both' }}>
          <a href="#register" style={{
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            color: 'var(--navy)', padding: '0.9rem 2.5rem',
            fontWeight: 500, textDecoration: 'none', borderRadius: '2px',
            fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            boxShadow: '0 8px 32px rgba(201,168,76,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,168,76,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.3)' }}
          >
            Secure Your Seat
          </a>
          <a href="#agenda" style={{
            border: '1px solid var(--border-strong)', color: 'var(--gold)',
            padding: '0.9rem 2.5rem', textDecoration: 'none', borderRadius: '2px',
            fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            View Agenda
          </a>
        </div>

        {/* Hosted by */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '1rem',
          animation: 'fadeIn 1s 0.8s ease both', opacity: 0,
        }}>
          <span style={{ color: 'var(--white-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hosted by</span>
          <span style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontSize: '0.9rem' }}>Accelalpha</span>
          <span style={{ color: 'var(--white-dim)' }}>×</span>
          <span style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontSize: '0.9rem' }}>Oracle</span>
        </div>
      </div>
    </section>
  )
}
