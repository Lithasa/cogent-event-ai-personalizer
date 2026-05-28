'use client'
import { useState } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

const inputStyle = {
  width: '100%', background: 'rgba(10,22,40,0.8)',
  border: '1px solid var(--border)', borderRadius: '2px',
  padding: '0.85rem 1rem', color: 'var(--white)',
  fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif',
  outline: 'none', transition: 'border-color 0.2s',
}

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', focus: '' })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.focus) return

    setStatus('loading')
    try {
      const res = await fetch(`${BACKEND_URL}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          professional_focus: form.focus,
        }),
      })

      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setResult(data)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const getFocusBorder = field => focusedField === field ? 'var(--gold)' : 'var(--border)'

  if (status === 'success' && result) {
    return (
      <section id="register" className="section" style={{ background: 'var(--navy-mid)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--border-strong)',
            borderRadius: '4px', padding: '3rem', backdropFilter: 'blur(12px)',
            animation: 'fadeUp 0.6s ease both',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚓</div>

              {/* FIX 1 — template literal handles apostrophe + variable together */}
              <h2 style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                {`You're on the list, ${form.name.split(' ')[0]}!`}
              </h2>

              {/* FIX 2 — template literal handles apostrophe in static text */}
              <p style={{ color: 'var(--white-dim)', fontSize: '0.9rem' }}>
                {`We've matched you to the perfect session and drafted your invitation.`}
              </p>
            </div>

            {/* Matched session */}
            <div style={{
              background: 'rgba(201,168,76,0.07)', border: '1px solid var(--border-strong)',
              borderRadius: '4px', padding: '1.5rem', marginBottom: '2rem',
            }}>
              <p style={{
                color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', marginBottom: '0.75rem',
              }}>
                Best Matched Session
              </p>
              <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                {result.matched_session.title}
              </h3>
              <p style={{ color: 'var(--white-dim)', fontSize: '0.85rem' }}>
                🕐 {result.matched_session.time} · {result.matched_session.speaker}
              </p>
            </div>

            {/* Email draft */}
            <div>
              <p style={{
                color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', marginBottom: '1rem',
              }}>
                Your Personalised Invitation Email
              </p>
              <div style={{
                background: 'rgba(10,22,40,0.8)', border: '1px solid var(--border)',
                borderRadius: '4px', padding: '1.5rem',
                color: 'var(--white-dim)', fontSize: '0.88rem', lineHeight: 1.9,
                whiteSpace: 'pre-wrap', fontFamily: 'DM Sans, sans-serif',
                maxHeight: 400, overflowY: 'auto',
              }}>
                {result.email_draft}
              </div>
            </div>

            <button
              onClick={() => {
                setStatus('idle')
                setResult(null)
                setForm({ name: '', email: '', focus: '' })
              }}
              style={{
                marginTop: '2rem', background: 'transparent',
                border: '1px solid var(--border)', color: 'var(--white-dim)',
                padding: '0.7rem 1.5rem', borderRadius: '2px', cursor: 'pointer',
                fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              ← Submit another
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="section" style={{ background: 'var(--navy-mid)' }}>
      <div className="container" style={{ maxWidth: 760 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', fontFamily: 'DM Mono, monospace',
            display: 'block', marginBottom: '1rem',
          }}>
            Secure Your Seat
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Register & Get Your{' '}
            <em style={{ color: 'var(--gold)' }}>Personalised Invite</em>
          </h2>
          <p style={{ color: 'var(--white-dim)', marginTop: '1rem', lineHeight: 1.8, fontSize: '0.9rem' }}>
            Tell us about your professional focus and our AI will match you to the most
            relevant session, then draft a personalised invitation email just for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: '4px', padding: '3rem', backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>

            {/* Name */}
            <div>
              <label style={{
                display: 'block', color: 'var(--white-dim)', fontSize: '0.8rem',
                letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase',
              }}>
                Full Name <span style={{ color: 'var(--gold)' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Al-Mansoori"
                required
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, borderColor: getFocusBorder('name') }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block', color: 'var(--white-dim)', fontSize: '0.8rem',
                letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase',
              }}>
                Corporate Email <span style={{ color: 'var(--gold)' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. sarah@company.com"
                required
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, borderColor: getFocusBorder('email') }}
              />
            </div>

            {/* Professional Focus */}
            <div>
              <label style={{
                display: 'block', color: 'var(--white-dim)', fontSize: '0.8rem',
                letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase',
              }}>
                Professional Focus / Career Challenges <span style={{ color: 'var(--gold)' }}>*</span>
              </label>
              <textarea
                name="focus"
                value={form.focus}
                onChange={handleChange}
                required
                rows={4}
                placeholder="e.g. I'm a COO struggling with last-mile delivery costs and trying to integrate AI into our warehouse operations..."
                onFocus={() => setFocusedField('focus')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle, resize: 'vertical', minHeight: 120,
                  borderColor: getFocusBorder('focus'),
                }}
              />
              <p style={{ color: 'var(--white-dim)', fontSize: '0.78rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                {`💡 The more specific you are, the better we can match you to the right session.`}
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading'
                  ? 'rgba(201,168,76,0.4)'
                  : 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                color: 'var(--navy)', padding: '1rem 2rem',
                border: 'none', borderRadius: '2px',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              }}
            >
              {status === 'loading' ? (
                <>
                  <span style={{
                    width: 16, height: 16, border: '2px solid var(--navy)',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    display: 'inline-block', animation: 'spin 0.8s linear infinite',
                  }} />
                  Matching your profile...
                </>
              ) : 'Match Me & Send Invitation'}
            </button>

            {status === 'error' && (
              <p style={{ color: '#e05c5c', textAlign: 'center', fontSize: '0.88rem' }}>
                Something went wrong. Please make sure the backend is running and try again.
              </p>
            )}
          </div>

          <p style={{
            color: 'var(--white-dim)', fontSize: '0.75rem', textAlign: 'center',
            marginTop: '1.5rem', lineHeight: 1.7,
          }}>
            By registering you agree to Cogent Solutions&trade; sharing your contact
            details with sponsors in accordance with GDPR guidelines.
          </p>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}