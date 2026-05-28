'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import styles from './Agenda.module.css'

const sessions = [
  {
    id: 1,
    time: '09.30 AM - 10.00 AM',
    title: 'Registrations',
    speaker: 'Event Operations Team',
    tag: 'logistics',
  },
  {
    id: 2,
    time: '10.00 AM - 10.10 AM',
    title: 'Welcome Note',
    speaker:
      'Richard Buxton, VP EMEA, Accelalpha · Rohan Chitnis, Sales Director Applications, Oracle',
    tag: 'keynote',
  },
  {
    id: 3,
    time: '10.10 AM - 10.40 AM',
    title:
      'Industry Keynote: Outlook & Challenges on Digital Logistics & Supply Chain',
    speaker:
      'Srivatsav Sarvepalli, Regional Director, Supply Chain Solutions, ECEMEA, Oracle',
    tag: 'keynote',
  },
  {
    id: 4,
    time: '10.40 AM - 11.10 AM',
    title: 'A Practical Guide to Successful Implementation',
    speaker: 'Joe Spear, Partner, Accelalpha',
    tag: 'strategy',
  },
  {
    id: 5,
    time: '11.10 AM - 11.30 AM',
    title: 'The Resilient Supply Chain & SCM Innovations',
    speaker: 'Ujjwal Kumar, Principal Domain Lead, ECEMEA, Oracle',
    tag: 'ai',
  },
  {
    id: 6,
    time: '11.30 AM - 11.50 AM',
    title: 'Coffee Break',
    speaker: 'Networking Team',
    tag: 'break',
  },
  {
    id: 7,
    time: '11.50 AM - 12.10 PM',
    title: 'Insights from Digital Evolution',
    speaker: 'Dr. Raman Kumar, CEO, Al-Futtaim Logistics',
    tag: 'casestudy',
  },
  {
    id: 8,
    time: '12.10 PM - 12.40 PM',
    title: 'Strategies in Action: Insights from Industry Leaders',
    speaker:
      'David Moono, Global Logistics Manager, Weatherford · Tamer Hamed, CIO, Dubai Cable Company',
    tag: 'panel',
  },
  {
    id: 9,
    time: '12.40 PM - 01.00 PM',
    title: 'Q&A and Closing Remarks',
    speaker: 'Accelalpha Team',
    tag: 'keynote',
  },
  {
    id: 10,
    time: '01.00 PM onwards',
    title: 'Lunch & Networking',
    speaker: 'Event Catering Group',
    tag: 'break',
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

export default function Agenda() {
  const [activeTag, setActiveTag] = useState('all')

  const filteredSessions =
    activeTag === 'all'
      ? sessions
      : sessions.filter((session) => session.tag === activeTag)

  return (
    <section id="agenda" className={styles.agendaSection}>
      <div className={styles.agendaContainer}>
        <motion.div
          className={styles.agendaHeader}
          initial={{ opacity: 0, y: -34, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>13th November 2024</span>

          <h2>
            Full Day <em>Agenda</em>
          </h2>

          <motion.div
            className={styles.goldUnderline}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 92, opacity: 1 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
          />
        </motion.div>

        <motion.div
          className={styles.filterBar}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15,
          }}
        >
          {tags.map((tag, index) => (
            <motion.button
              key={tag.key}
              type="button"
              onClick={() => setActiveTag(tag.key)}
              className={`${styles.filterButton} ${
                activeTag === tag.key ? styles.activeFilter : ''
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.45,
                ease: 'easeOut',
                delay: index * 0.035,
              }}
            >
              {tag.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className={styles.timelineWrap} layout>
          <motion.div
            className={styles.timelineLine}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className={styles.timelineWatermark}>AGENDA</div>

          <AnimatePresence mode="popLayout">
            {filteredSessions.map((session, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  layout
                  key={session.id}
                  className={`${styles.timelineItem} ${
                    isLeft ? styles.leftItem : styles.rightItem
                  }`}
                  initial={{ opacity: 0, y: 36, filter: 'blur(7px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  viewport={{
                    once: false,
                    amount: 0.3,
                    margin: '-8% 0px -8% 0px',
                  }}
                  transition={{
                    duration: 0.68,
                    ease: [0.16, 1, 0.3, 1],
                    delay: Math.min(index * 0.045, 0.28),
                  }}
                >
                  <motion.article
                    className={styles.timelineContent}
                    initial={{
                      x: isLeft ? -34 : 34,
                      opacity: 0,
                    }}
                    whileInView={{
                      x: 0,
                      opacity: 1,
                    }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{
                      duration: 0.68,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <p className={styles.sessionTime}>
                      <Clock size={16} strokeWidth={2.2} />
                      {session.time}
                    </p>

                    <h3>{session.title}</h3>

                    <p className={styles.sessionSpeaker}>
                      <span>By</span> {session.speaker}
                    </p>
                  </motion.article>

                  <motion.div
                    className={styles.timelineDot}
                    initial={{
                      opacity: 0,
                      scale: 0.72,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: [0.72, 1.22, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(201,168,76,0), 0 0 0 rgba(201,168,76,0)',
                        '0 0 0 12px rgba(201,168,76,0.15), 0 0 42px rgba(201,168,76,0.75)',
                        '0 0 0 7px rgba(201,168,76,0.08), 0 0 28px rgba(201,168,76,0.48)',
                      ],
                    }}
                    viewport={{ once: false, amount: 0.58 }}
                    transition={{
                      duration: 0.82,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {session.id}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}