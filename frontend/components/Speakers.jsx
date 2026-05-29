'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const speakers = [
  {
    name: 'Dr. Raman Kumar',
    role: 'CEO',
    org: 'Al-Futtaim Logistics',
    image: '/speakers/speaker1.png',
  },
  {
    name: 'David Moono',
    role: 'Global Logistics Manager',
    org: 'Weatherford',
    image: '/speakers/speaker2.png',
  },
  {
    name: 'Tamer Hamed',
    role: 'CIO',
    org: 'Dubai Cable Company',
    image: '/speakers/speaker3.png',
  },
  {
    name: 'Richard Buxton',
    role: 'VP EMEA',
    org: 'Accelalpha',
    image: '/speakers/speaker4.png',
  },
  {
    name: 'Joe Spear',
    role: 'Partner',
    org: 'Accelalpha',
    image: '/speakers/speaker5.png',
  },
  {
    name: 'Srivatsav Sarvepalli',
    role: 'Regional Director, SCM ECEMEA',
    org: 'Oracle',
    image: '/speakers/speaker6.png',
  },
  {
    name: 'Rohan Chitnis',
    role: 'Sales Director Applications',
    org: 'Oracle',
    image: '/speakers/speaker7.png',
  },
  {
    name: 'Ujjwal Kumar',
    role: 'Principal Domain Lead, ECEMEA',
    org: 'Oracle',
    image: '/speakers/speaker8.png',
  },
]

export default function Speakers() {
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null)

  return (
    <section
      id="speakers"
      className="section"
      style={{
        background: 'var(--navy)',
        padding: '6rem 0 2.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -34, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span
            style={{
              color: 'var(--gold)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'DM Mono, monospace',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Distinguished Speakers
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Industry Leaders &{' '}
            <em style={{ color: 'var(--gold)' }}>Visionaries</em>
          </h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 92, opacity: 1 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              height: '2px',
              margin: '1.25rem auto 0',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
              boxShadow: '0 0 12px rgba(201,168,76,0.38), 0 0 28px rgba(201,168,76,0.16)',
            }}
          />
        </motion.div>

        {/* Speaker grid — no cards, just content */}
        <style>{`
          @media (max-width: 900px) { .speakers-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .speakers-grid { grid-template-columns: repeat(1, 1fr) !important; } }
        `}</style>
        <div
          className="speakers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem 2rem',
          }}
        >
          {speakers.map((speaker, index) => {
            const isHovered = hoveredSpeaker === index

            return (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, y: 34, scale: 0.97, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.22 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: Math.min(index * 0.06, 0.32),
                }}
                onMouseEnter={() => setHoveredSpeaker(index)}
                onMouseLeave={() => setHoveredSpeaker(null)}
                style={{
                  textAlign: 'center',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease',
                  cursor: 'default',
                }}
              >
                {/* Photo ring */}
                <div
                  style={{
                    position: 'relative',
                    width: '154px',
                    height: '154px',
                    borderRadius: '999px',
                    margin: '0 auto 1.5rem',
                    padding: '6px',
                    background: isHovered
                      ? 'linear-gradient(135deg, #d72828, #c9a84c)'
                      : 'linear-gradient(135deg, rgba(201,168,76,0.36), rgba(255,255,255,0.06))',
                    boxShadow: isHovered
                      ? '0 0 0 7px rgba(215,40,40,0.08), 0 0 34px rgba(215,40,40,0.34), 0 0 46px rgba(201,168,76,0.12)'
                      : '0 14px 34px rgba(0,0,0,0.22)',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      background: '#ffffff',
                    }}
                  >
                    <Image
                      src={speaker.image}
                      alt={`${speaker.name} speaker profile`}
                      fill
                      sizes="154px"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontSize: '1.08rem',
                    color: 'var(--white)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3,
                    fontWeight: 600,
                  }}
                >
                  {speaker.name}
                </h3>

                {/* Role */}
                <p
                  style={{
                    color: isHovered ? '#f04a4a' : 'var(--gold)',
                    fontSize: '0.8rem',
                    marginBottom: '0.28rem',
                    fontWeight: 600,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {speaker.role}
                </p>

                {/* Org */}
                <p style={{ color: 'var(--white-dim)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  {speaker.org}
                </p>

                {/* Animated bottom line */}
                <div
                  style={{
                    width: isHovered ? '72px' : '38px',
                    height: '2px',
                    margin: '1.2rem auto 0',
                    borderRadius: '999px',
                    background: isHovered
                      ? 'linear-gradient(90deg, #d72828, #c9a84c)'
                      : 'rgba(201,168,76,0.35)',
                    boxShadow: isHovered ? '0 0 18px rgba(215,40,40,0.45)' : 'none',
                    transition: 'width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
