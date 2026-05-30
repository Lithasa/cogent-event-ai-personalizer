'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Mail,
  Printer,
  Ship,
  User,
} from 'lucide-react'
import styles from './RegisterForm.module.css'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:8000'

const sessionFilters = [
  {
    id: 'digital-logistics',
    label: 'Digital Logistics',
    hint: 'Cost pressure, market volatility, logistics visibility',
    keywords:
      'digital logistics, supply chain cost pressure, market volatility, transportation visibility, logistics operations',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    hint: 'Deployment, integration, implementation risk',
    keywords:
      'implementation strategy, digital transformation deployment, system integration, implementation risk management',
  },
  {
    id: 'gen-ai-scm',
    label: 'Gen AI SCM',
    hint: 'AI, predictive analytics, smart supply chain',
    keywords:
      'Oracle Gen AI SCM, predictive analytics, AI automation, smart supply chain, inventory intelligence',
  },
  {
    id: 'digital-evolution',
    label: 'Digital Evolution',
    hint: 'Automation, scalability, transformation results',
    keywords:
      'digital evolution, warehouse automation, transformation results, scalable supply chain systems',
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    hint: 'Green operations and resilient supply chains',
    keywords:
      'green operations, sustainable sourcing, supply chain resilience, sustainable logistics',
  },
  {
    id: 'networking',
    label: 'Networking',
    hint: 'Business networking and partner connections',
    keywords:
      'networking, business development, industry connections, technology partners, supply chain leaders',
  },
]

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    focus: '',
    sessionFilter: 'digital-logistics',
  })

  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false)

  const selectedSession =
    sessionFilters.find((item) => item.id === form.sessionFilter) ||
    sessionFilters[0]

  const matchedSession = result?.matched_session
  const visitorFocusSummary = `Selected area: ${selectedSession.label}. Related keywords: ${selectedSession.keywords}. Visitor challenge: ${form.focus}`

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.focus.trim()) {
      setErrorMessage('Please fill in your name, email, and professional focus.')
      return
    }

    setStatus('loading')
    setResult(null)
    setErrorMessage('')

    try {
      const response = await fetch(`${BACKEND_URL}/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          professionalFocus: visitorFocusSummary,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          errorData?.detail ||
            `Backend request failed with status ${response.status}`
        )
      }

      const data = await response.json()
      setResult(data)
      setStatus('success')
    } catch (error) {
      console.error(error)
      setErrorMessage(
        error.message ||
          'Backend is not reachable. Please check that FastAPI is running on port 8000.'
      )
      setStatus('error')
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      focus: '',
      sessionFilter: 'digital-logistics',
    })

    setResult(null)
    setStatus('idle')
    setErrorMessage('')
    setIsSessionMenuOpen(false)
  }

  const handlePrintInvitation = () => {
    window.print()
  }

  return (
    <section id="register" className={styles.registerSection}>
      <div className={styles.bgGlowLeft} />
      <div className={styles.bgGlowRight} />

      <div className={styles.container}>
        <motion.div
          className={styles.sectionIntro}
          initial={{ opacity: 0, y: -34, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.sectionKicker}>Registration</p>

          <h2 className={styles.sectionTitle}>
            Let’s get your <em>seat secured</em>
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

        <div className={styles.mainGrid}>
          <motion.div
            className={styles.formPanel}
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.08,
            }}
          >
            {status === 'loading' ? (
              <div className={styles.loadingBox}>
                <div className={styles.seaLoader}>
                  <Ship className={styles.shipIcon} size={42} />
                  <div className={`${styles.wave} ${styles.waveOne}`} />
                  <div className={`${styles.wave} ${styles.waveTwo}`} />
                </div>

                <h3>Preparing your invitation...</h3>

                <p>
                  Matching your professional focus with the most relevant
                  session and generating your invitation draft.
                </p>
              </div>
            ) : status === 'success' && result && matchedSession ? (
              <div className={styles.invitationBox}>
                <p className={styles.smallLabel}>Invitation Ready</p>

                <div className={styles.successHeader}>
                  <div className={styles.registeredBadge}>
                    <CheckCircle2 size={18} />
                    <span>Registered</span>
                  </div>

                  <h3 className={styles.registeredName}>{form.name}</h3>
                </div>

                <div className={styles.matchedSession}>
                  <p>Matched Session</p>

                  <h4>{matchedSession.title}</h4>

                  <div className={styles.matchedMeta}>
                    <span>{matchedSession.time}</span>
                    <span>{matchedSession.speaker}</span>
                  </div>
                </div>

                <div className={styles.emailDraft}>
                  <p>
                    Hi <strong>{form.name}</strong>,
                  </p>

                  <p>
                    Thank you for your interest in{' '}
                    <strong>Troubled Waters: Sailing with AI in Supply Chain</strong>.
                  </p>

                  <p className={styles.invitationFocus}>
                    Based on your focus around “{visitorFocusSummary}”
                  </p>

                  <p>
                    The session we would personally highlight for you is{' '}
                    <strong className={styles.highlight}>“{matchedSession.title}”</strong>{' '}
                    scheduled for <strong>{matchedSession.time}</strong>. This
                    session will be led by <strong>{matchedSession.speaker}</strong>{' '}
                    and is especially relevant because it covers{' '}
                    <strong>{matchedSession.focus_keywords?.join(', ')}</strong>.
                  </p>

                  <p>
                    The agenda describes this session as:{' '}
                    <strong>{matchedSession.description}</strong>
                  </p>

                  <p>
                    We would be pleased to welcome you to the event and help you
                    connect your current priorities with the most relevant supply
                    chain, logistics, automation, and AI discussions from the
                    programme.
                  </p>

                  <p>
                    Best regards,
                    <br />
                    <strong>Cogent Solutions Event Team</strong>
                  </p>
                </div>

                <div className={styles.actionRow}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={handlePrintInvitation}
                  >
                    <Printer size={17} />
                    Print Invitation
                  </button>

                  <button
                    type="button"
                    className={styles.submitButton}
                    onClick={resetForm}
                  >
                    Register Another
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={styles.formHeading}>Register Now</h3>

                <form onSubmit={handleSubmit} className={styles.formCard}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="name">
                      <User size={15} />
                      Full Name <span>*</span>
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Lithasa Jayamaha"
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email">
                      <Mail size={15} />
                      Email Address <span>*</span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. lithasajay@company.com"
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="sessionPreference">
                      <BriefcaseBusiness size={15} />
                      Preferred Session Area <span>*</span>
                    </label>

                    <div className={styles.sessionDropdown}>
                      <button
                        id="sessionPreference"
                        type="button"
                        className={`${styles.sessionDropdownButton} ${
                          isSessionMenuOpen
                            ? styles.sessionDropdownButtonOpen
                            : ''
                        }`}
                        onClick={() =>
                          setIsSessionMenuOpen((current) => !current)
                        }
                        aria-expanded={isSessionMenuOpen}
                      >
                        <span className={styles.sessionDropdownText}>
                          <strong>{selectedSession.label}</strong>
                          <small>{selectedSession.hint}</small>
                        </span>

                        <ChevronDown
                          size={20}
                          className={`${styles.sessionDropdownIcon} ${
                            isSessionMenuOpen
                              ? styles.sessionDropdownIconOpen
                              : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isSessionMenuOpen && (
                          <motion.div
                            className={styles.sessionDropdownMenu}
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          >
                            {sessionFilters.map((item) => {
                              const isActive = form.sessionFilter === item.id

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  className={`${
                                    styles.sessionDropdownOption
                                  } ${
                                    isActive
                                      ? styles.sessionDropdownOptionActive
                                      : ''
                                  }`}
                                  onClick={() => {
                                    setForm((current) => ({
                                      ...current,
                                      sessionFilter: item.id,
                                    }))
                                    setIsSessionMenuOpen(false)
                                  }}
                                >
                                  <strong>{item.label}</strong>
                                  <small>{item.hint}</small>
                                </button>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="focus">
                      <BriefcaseBusiness size={15} />
                      Professional Focus / Career Challenge <span>*</span>
                    </label>

                    <textarea
                      id="focus"
                      name="focus"
                      value={form.focus}
                      onChange={handleChange}
                      placeholder="e.g. I want to use AI to improve warehouse visibility and reduce logistics delays."
                      required
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === 'loading'}
                  >
                    Register
                    <ArrowRight size={18} />
                  </button>

                  {status === 'error' && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                  )}
                </form>
              </>
            )}
          </motion.div>

          <div className={styles.verticalDivider} />

          <motion.div
            className={styles.logoPanel}
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12,
            }}
          >
            <p className={styles.logoKicker}>Supply Chain & Logistics</p>

            <div className={styles.accelalphaWrap}>
              <Image
                src="/images/logos/accelalpha-logo.png"
                alt="Accelalpha logo"
                width={540}
                height={170}
                className={styles.accelalphaLogo}
              />
            </div>

            <div className={styles.oracleRow}>
              <div className={styles.oracleLogoWrap}>
                <Image
                  src="/images/logos/oracle-logo.png"
                  alt="Oracle logo"
                  width={155}
                  height={50}
                  className={styles.oracleLogo}
                />
              </div>

              <span />

              <p>Partner</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
