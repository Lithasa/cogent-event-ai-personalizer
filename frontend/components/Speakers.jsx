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
    accent: '#1e6e7a',
  },
  {
    name: 'David Moono',
    role: 'Global Logistics Manager',
    org: 'Weatherford',
    image: '/speakers/speaker2.png',
    accent: '#d72828',
  },
  {
    name: 'Tamer Hamed',
    role: 'CIO',
    org: 'Dubai Cable Company',
    image: '/speakers/speaker3.png',
    accent: '#1a3460',
  },
  {
    name: 'Richard Buxton',
    role: 'VP EMEA',
    org: 'Accelalpha',
    image: '/speakers/speaker4.png',
    accent: '#c9a84c',
  },
  {
    name: 'Joe Spear',
    role: 'Partner',
    org: 'Accelalpha',
    image: '/speakers/speaker5.png',
    accent: '#2a5080',
  },
  {
    name: 'Srivatsav Sarvepalli',
    role: 'Regional Director, SCM ECEMEA',
    org: 'Oracle',
    image: '/speakers/speaker6.png',
    accent: '#9e3030',
  },
  {
    name: 'Rohan Chitnis',
    role: 'Sales Director Applications',
    org: 'Oracle',
    image: '/speakers/speaker7.png',
    accent: '#6a3090',
  },
  {
    name: 'Ujjwal Kumar',
    role: 'Principal Domain Lead, ECEMEA',
    org: 'Oracle',
    image: '/speakers/speaker8.png',
    accent: '#2a7a4a',
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
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
            gap: '1.65rem',
          }}
        >
          {speakers.map((speaker, index) => {
            const isHovered = hoveredSpeaker === index

            return (
              <motion.div
                key={speaker.name}
                initial={{
                  opacity: 0,
                  y: 34,
                  scale: 0.97,
                  filter: 'blur(6px)',
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                viewport={{ once: false, amount: 0.22 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: Math.min(index * 0.06, 0.32),
                }}
                onMouseEnter={() => setHoveredSpeaker(index)}
                onMouseLeave={() => setHoveredSpeaker(null)}
                style={{
                  position: 'relative',
                  minHeight: '325px',
                  overflow: 'hidden',
                  background: isHovered
                    ? 'linear-gradient(145deg, rgba(215, 40, 40, 0.16), rgba(17, 34, 64, 0.86))'
                    : 'var(--card-bg)',
                  border: `1px solid ${
                    isHovered ? 'rgba(215, 40, 40, 0.78)' : 'var(--border)'
                  }`,
                  borderRadius: '18px',
                  padding: '2.2rem 1.4rem 1.8rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isHovered
                    ? '0 24px 58px rgba(215, 40, 40, 0.16), 0 0 0 1px rgba(201, 168, 76, 0.12), inset 0 0 44px rgba(201, 168, 76, 0.045)'
                    : '0 12px 34px rgba(0, 0, 0, 0.08)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition:
                    'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '999px',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    color: isHovered ? '#d8b955' : 'rgba(255,255,255,0.34)',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '154px',
                    height: '154px',
                    borderRadius: '999px',
                    margin: '0 auto 1.65rem',
                    padding: '8px',
                    background: isHovered
                      ? 'linear-gradient(135deg, #d72828, #c9a84c)'
                      : 'linear-gradient(135deg, rgba(201,168,76,0.36), rgba(255,255,255,0.06))',
                    boxShadow: isHovered
                      ? '0 0 0 7px rgba(215, 40, 40, 0.08), 0 0 34px rgba(215, 40, 40, 0.34), 0 0 46px rgba(201, 168, 76, 0.12)'
                      : '0 14px 34px rgba(0, 0, 0, 0.16)',
                    transition:
                      'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
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
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                </div>

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

                <p
                  style={{
                    color: 'var(--white-dim)',
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                  }}
                >
                  {speaker.org}
                </p>

                <div
                  style={{
                    width: isHovered ? '72px' : '38px',
                    height: '2px',
                    margin: '1.4rem auto 0',
                    borderRadius: '999px',
                    background: isHovered
                      ? 'linear-gradient(90deg, #d72828, #c9a84c)'
                      : 'rgba(201, 168, 76, 0.35)',
                    boxShadow: isHovered
                      ? '0 0 18px rgba(215, 40, 40, 0.45)'
                      : 'none',
                    transition:
                      'width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
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