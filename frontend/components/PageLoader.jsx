'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [fadeOut, setFadeOut] = useState(false)
  const [gone,    setGone]    = useState(false)

  useEffect(() => {
    const html = document.documentElement

    const triggerFade = () => {
      setFadeOut(true)
      
      setTimeout(() => setGone(true), 400)
    }

    
    if (html.classList.contains('app-ready')) {
      triggerFade()
      return
    }

   
    const observer = new MutationObserver(() => {
      if (html.classList.contains('app-ready')) {
        observer.disconnect()
        triggerFade()
      }
    })

    observer.observe(html, {
      attributes:      true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         2147483647,   // same as boot-screen; later in DOM = on top
        background:     '#071423',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '1.75rem',
        opacity:        fadeOut ? 0 : 1,
        transition:     'opacity 0.35s ease',   // matches boot-screen transition exactly
        pointerEvents:  'none',
      }}
    >
      {/* ── Anchor with pulsing ring ── */}
      <div style={{ position: 'relative', width: 72, height: 72 }}>

        {/* Expanding ring */}
        <div style={{
          position:     'absolute',
          inset:        -10,
          borderRadius: '50%',
          border:       '1px solid rgba(201,168,76,0.4)',
          animation:    'plRing 1.8s ease-out infinite',
        }} />

        {/* Static inner ring */}
        <div style={{
          position:     'absolute',
          inset:        -4,
          borderRadius: '50%',
          border:       '1px solid rgba(201,168,76,0.18)',
        }} />

        {/* Circle + anchor */}
        <div style={{
          width:          72,
          height:         72,
          borderRadius:   '50%',
          background:     'radial-gradient(circle, rgba(201,168,76,0.14) 0%, rgba(7,20,35,0.95) 100%)',
          border:         '1.5px solid rgba(201,168,76,0.6)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       32,
          animation:      'plFloat 2.2s ease-in-out infinite',
        }}>
          ⚓
        </div>
      </div>

      {/* ── Three bouncing dots ── */}
      <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width:        6,
            height:       6,
            borderRadius: '50%',
            background:   'rgba(201,168,76,0.75)',
            display:      'block',
            animation:    `plDot 1.2s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}
      </div>

      {/* ── Gold shimmer bar at bottom ── */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     2,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.65), transparent)',
        animation:  'plBar 1.6s ease-in-out infinite',
      }} />

      <style>{`
        @keyframes plFloat {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        @keyframes plRing {
          0%   { transform: scale(1);    opacity: 0.7; }
          100% { transform: scale(1.6);  opacity: 0;   }
        }
        @keyframes plDot {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.3; }
          40%            { transform: scale(1.25); opacity: 1;   }
        }
        @keyframes plBar {
          0%   { transform: scaleX(0.15); transform-origin: left;  opacity: 0.3; }
          50%  { transform: scaleX(1);    transform-origin: left;  opacity: 1;   }
          100% { transform: scaleX(0.15); transform-origin: right; opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
