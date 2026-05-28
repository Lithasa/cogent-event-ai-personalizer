'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const sessions = [
  {
    id: 1,
    time: '09:30 – 10:00',
    title: 'Registrations',
    speaker: 'Event Operations Team',
    tag: 'logistics',
    desc: 'Morning arrival, check-in, and badge collection for registered executive delegates and partners.',
  },
  {
    id: 2,
    time: '10:00 – 10:10',
    title: 'Welcome Note',
    speaker: 'Richard Buxton & Rohan Chitnis',
    tag: 'keynote',
    desc: 'An introduction and official welcome to the summit by leadership figures from Accelalpha and Oracle, outlining the key themes of regional supply chain evolution.',
  },
  {
    id: 3,
    time: '10:10 – 10:40',
    title: 'Industry Keynote: Outlook & Challenges on Digital Logistics & Supply Chain',
    speaker: 'Srivatsav Sarvepalli · Oracle',
    tag: 'keynote',
    desc: 'Maps out the current market challenges impacting Gulf regional logistics, focusing on rising costs, macroeconomic changes, and how to build a responsive digital framework.',
  },
  {
    id: 4,
    time: '10:40 – 11:10',
    title: 'A Practical Guide to Successful Implementation',
    speaker: 'Joe Spear · Accelalpha',
    tag: 'strategy',
    desc: 'A down-to-earth breakdown detailing how modern organizations successfully deploy and integrate enterprise logistics and SCM platforms safely without interrupting ongoing operations.',
  },
  {
    id: 5,
    time: '11:10 – 11:30',
    title: 'The Resilient Supply Chain & SCM Innovations',
    speaker: 'Ujjwal Kumar · Oracle',
    tag: 'ai',
    desc: "Unveiling Oracle's Gen AI SCM Platform capabilities, including predictive analytics, embedded AI automation, and deep inventory tracking to help systems anticipate disruption.",
  },
  {
    id: 6,
    time: '11:30 – 11:50',
    title: 'Coffee Break',
    speaker: 'Networking Team',
    tag: 'break',
    desc: 'Short intermission for refreshments, informal discussion, and brief peer-to-peer networking.',
  },
  {
    id: 7,
    time: '11:50 – 12:10',
    title: 'Insights from Digital Evolution',
    speaker: 'Dr. Raman Kumar · Al-Futtaim Logistics',
    tag: 'casestudy',
    desc: 'Real-world practical insights from the logistics sector on how to navigate large-scale corporate automation and digital transformations successfully.',
  },
  {
    id: 8,
    time: '12:10 – 12:40',
    title: 'Strategies in Action: Insights from Industry Leaders',
    speaker: 'David Moono & Tamer Hamed',
    tag: 'panel',
    desc: 'Interactive panel discussion featuring operational executives sharing raw case studies, supply chain resilience tactics, and ways to handle green sustainability targets without losing operational momentum.',
  },
  {
    id: 9,
    time: '12:40 – 13:00',
    title: 'Q&A and Closing Remarks',
    speaker: 'Accelalpha Team',
    tag: 'keynote',
    desc: 'Floor opened for audience questions, wrapped up with final strategic takeaways from the hosting team.',
  },
  {
    id: 10,
    time: '13:00+',
    title: 'Lunch & Networking',
    speaker: 'Event Catering Group',
    tag: 'break',
    desc: 'A dedicated networking lunch for delegates, technology partners, and technical leads to connect over real opportunities.',
  },
]

const tags = [
  { key: 'all', label: 'All Sessions' },
  { key: 'logistics', label: 'Logistics' },
  { key: 'keynote', label: 'Keynotes' },
  { key: 'ai', label: 'AI & Tech' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'panel', label: 'Panel' },
  { key: 'casestudy', label: 'Case Studies' },
  { key: 'break', label: 'Breaks' },
]

const tagColors = {
  keynote: '#c9a84c',
  ai: '#2a9aaa',
  strategy: '#2a7a4a',
  panel: '#6a3090',
  casestudy: '#9e3030',
  break: '#555555',
  logistics: '#8a6f2e',
}

export default function Agenda() {
  const [activeTag, setActiveTag] = useState('all')
  const [hoveredTag, setHoveredTag] = useState(null)
  const [hoveredSession, setHoveredSession] = useState(null)

  const filteredSessions =
    activeTag === 'all'
      ? sessions
      : sessions.filter((session) => session.tag === activeTag)

  return (
    <section
      id="agenda"
      className="section"
      style={{
        background: 'var(--navy)',
        padding: '6rem 0 2.75rem',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -34, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
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
            13th November 2024
          </span>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Full Day <em style={{ color: 'var(--gold)' }}>Agenda</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          {tags.map((tag, index) => {
            const isActive = activeTag === tag.key
            const isHovered = hoveredTag === tag.key

            return (
              <motion.button
                key={tag.key}
                type="button"
                onClick={() => setActiveTag(tag.key)}
                onMouseEnter={() => setHoveredTag(tag.key)}
                onMouseLeave={() => setHoveredTag(null)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  ease: 'easeOut',
                  delay: index * 0.035,
                }}
                style={{
                  background: isActive
                    ? 'var(--gold)'
                    : isHovered
                      ? 'rgba(201, 168, 76, 0.11)'
                      : 'transparent',
                  color: isActive ? 'var(--navy)' : 'var(--white-dim)',
                  border: `1px solid ${
                    isActive || isHovered ? 'var(--gold)' : 'var(--border)'
                  }`,
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  transition:
                    'background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                  fontFamily: 'DM Sans, sans-serif',
                  boxShadow: isActive
                    ? '0 12px 30px rgba(201, 168, 76, 0.22)'
                    : isHovered
                      ? '0 10px 24px rgba(201, 168, 76, 0.12)'
                      : 'none',
                  transform: isHovered && !isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                {tag.label}
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div
          layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSessions.map((session, index) => {
              const isHovered = hoveredSession === session.id
              const tagColor = tagColors[session.tag] || 'var(--white-dim)'

              return (
                <motion.div
                  layout
                  key={session.id}
                  initial={{
                    opacity: 0,
                    y: 28,
                    scale: 0.985,
                    filter: 'blur(6px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    scale: 0.985,
                    filter: 'blur(5px)',
                  }}
                  viewport={{ once: false, amount: 0.18, margin: '-8% 0px -8% 0px' }}
                  transition={{
                    duration: 0.58,
                    ease: [0.16, 1, 0.3, 1],
                    delay: Math.min(index * 0.055, 0.35),
                  }}
                  onMouseEnter={() => setHoveredSession(session.id)}
                  onMouseLeave={() => setHoveredSession(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: '0 2rem',
                    background: isHovered
                      ? `linear-gradient(135deg, rgba(201, 168, 76, 0.12), rgba(17, 34, 64, 0.88))`
                      : index % 2 === 0
                        ? 'var(--card-bg)'
                        : 'rgba(17, 34, 64, 0.4)',
                    border: `1px solid ${
                      isHovered ? 'var(--border-strong)' : 'var(--border)'
                    }`,
                    borderRadius: '12px',
                    padding: '1.55rem 2rem',
                    backdropFilter: 'blur(8px)',
                    transition:
                      'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
                    boxShadow: isHovered
                      ? '0 0 0 1px rgba(201, 168, 76, 0.08), 0 18px 46px rgba(201, 168, 76, 0.12), inset 0 0 42px rgba(201, 168, 76, 0.045)'
                      : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.8rem',
                      color: 'var(--gold)',
                      paddingTop: '0.15rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {session.time}
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1rem',
                          color: 'var(--white)',
                          fontFamily: 'Playfair Display, serif',
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {session.title}
                      </h3>

                      <span
                        style={{
                          background: `${tagColor}33`,
                          color: tagColor,
                          border: `1px solid ${tagColor}44`,
                          padding: '0.18rem 0.65rem',
                          borderRadius: '999px',
                          fontSize: '0.68rem',
                          fontFamily: 'DM Mono, monospace',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {session.tag}
                      </span>
                    </div>

                    <p
                      style={{
                        color: 'var(--gold)',
                        fontSize: '0.82rem',
                        marginBottom: '0.4rem',
                        fontWeight: 500,
                      }}
                    >
                      {session.speaker}
                    </p>

                    <p
                      style={{
                        color: 'var(--white-dim)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                      }}
                    >
                      {session.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}