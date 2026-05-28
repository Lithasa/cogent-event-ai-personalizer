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
  Ship,
  User,
} from 'lucide-react'
import styles from './RegisterForm.module.css'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

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
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false)

  const selectedSession =
    sessionFilters.find((item) => item.id === form.sessionFilter) ||
    sessionFilters[0]

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
      return
    }

    setStatus('loading')
    setResult(null)

    try {
      const response = await fetch(`${BACKEND_URL}/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          professional_focus: `${selectedSession.label}. ${selectedSession.keywords}. ${form.focus}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Backend request failed')
      }

      const data = await response.json()
      setResult(data)
      setStatus('success')
    } catch (error) {
      console.error(error)
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
    setIsSessionMenuOpen(false)
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
            ) : status === 'success' && result ? (
              <div className={styles.invitationBox}>
                <div className={styles.successMark}>
                  <CheckCircle2 size={30} />
                </div>

                <p className={styles.smallLabel}>Invitation Draft Ready</p>

                <h3>
                  Registered, <span>{form.name.split(' ')[0] || 'there'}</span>
                </h3>

                <div className={styles.matchedSession}>
                  <p>Matched Session</p>

                  <h4>
                    {result.matched_session?.title || 'Best matched session'}
                  </h4>

                  <span>
                    {result.matched_session?.time || 'Session time'} ·{' '}
                    {result.matched_session?.speaker || 'Speaker'}
                  </span>
                </div>

                <div className={styles.emailDraft}>
                  {result.email_draft ||
                    result.email_body ||
                    result.invitation_email ||
                    'The invitation email draft will appear here.'}
                </div>

                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={resetForm}
                >
                  Submit Another
                  <ArrowRight size={18} />
                </button>
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
                      placeholder="e.g. Sarah Al-Mansoori"
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
                      placeholder="e.g. sarah@company.com"
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
                    Submit
                    <ArrowRight size={18} />
                  </button>

                  {status === 'error' && (
                    <p className={styles.errorMessage}>
                      Backend is not running yet. Once FastAPI is connected, the
                      invitation draft will appear here.
                    </p>
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
                src="/images/accelalpha-logo.png"
                alt="Accelalpha logo"
                width={540}
                height={170}
                className={styles.accelalphaLogo}
              />
            </div>

            <div className={styles.oracleRow}>
              <div className={styles.oracleLogoWrap}>
                <Image
                  src="/images/oracle-logo.png"
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