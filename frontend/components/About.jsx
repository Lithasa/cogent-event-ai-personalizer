'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const reasons = [
  {
    title: "Oracle's Gen AI SCM Platform Unveiled",
    desc: "Explore how Oracle's AI-powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into supply chains like yours.",
    image: '/images/others/warehouse.jpg',
  },
  {
    title: 'Customer Success Stories That Deliver Results',
    desc: 'Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience through smarter inventory management and automation.',
    image: '/images/others/customer.jpg',
  },
  {
    title: 'Practical Solutions for Green & Resilient Operations',
    desc: 'Navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices — keeping operations agile and competitive in the Gulf market.',
    image: '/images/others/solutions.jpg',
  },
]

const stats = [
  { type: 'count', target: 8, suffix: '+', label: 'Industry Speakers' },
  { type: 'static', value: '3.5h', label: 'Packed Sessions' },
  { type: 'count', target: 100, suffix: '+', label: 'Executive Delegates' },
  { type: 'static', value: '1', label: 'Exclusive Venue' },
]

function AnimatedStatValue({ stat }) {
  const valueRef = useRef(null)
  const [isVisible, setIsVisible] = useState(stat.type !== 'count')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (stat.type !== 'count' || !valueRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(valueRef.current)

    return () => observer.disconnect()
  }, [stat.type])

  useEffect(() => {
    if (stat.type !== 'count' || !isVisible) return

    let frameId
    const duration = stat.target === 100 ? 1900 : 1400
    const startedAt = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(stat.target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [isVisible, stat.type, stat.target])

  if (stat.type === 'static') {
    return <span ref={valueRef}>{stat.value}</span>
  }

  return (
    <span ref={valueRef}>
      {count}
      {stat.suffix}
    </span>
  )
}


export default function About() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-about-reveal="true"]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('aboutRevealVisible', entry.isIntersecting)
        })
      },
      {
        threshold: 0.28,
        rootMargin: '-6% 0px -6% 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="section"
      style={{
        background: 'var(--navy)',
        paddingTop: '3rem',
        paddingBottom: 0,
      }}
    >
      <div className="container">
        {/* Section label */}
        <div className="aboutIntro aboutRevealFromTop" data-about-reveal="true">
          <span>Why Attend</span>

          <h2>
            Navigate the Complexities of Gulf{' '}
            <em>Supply Chain & Logistics</em>
          </h2>

          <div className="goldUnderline" />

          <div className="aboutDescription">
            <p>
              The Gulf&apos;s supply chains are under pressure from rising costs,
              geopolitical instability, and shifting sustainability mandates,
              forcing CFOs, COOs, and supply chain leaders to reduce costs, build
              resilience, and integrate sustainable practices without compromising
              performance, with AI-powered SCM and WMS solutions being key to
              future-proofing logistics and driving efficiency.
            </p>

            <p>
              This exclusive event, hosted by Accelalpha &amp; Oracle, offers
              practical insights and real-world strategies to streamline
              operations, reduce risks, and meet sustainability goals while
              staying ahead of market volatility.
            </p>
          </div>
        </div>

        <div className="reasonsHeading aboutRevealFromTop" data-about-reveal="true">
          <h3>Top 3 Reasons to Attend:</h3>
          <div className="reasonsUnderline" />
        </div>

        {/* Feature image rows */}
        <div className="featureStack">
          {reasons.map((reason, index) => {
            const isReverse = index % 2 === 1

            return (
              <article
                key={reason.title}
                className={`featureRow ${isReverse ? 'reverseRow' : ''}`}
              >
                <div className="featureText">
                  <span className="featureNumber">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3>{reason.title}</h3>

                  <div className="featureLine" />
                </div>

                <div className="imageFrame">
                  <div className="imageBackplate" />

                  <div className="imageInner">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      className="featureImage"
                    />

                    <div className="imageOverlay">
                      <p>{reason.desc}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Floating stats bridge */}
        <div className="statsBridge" aria-label="Event highlights">
          <div className="statsPanel">
            {stats.map((stat) => (
              <div key={stat.label} className="statItem">
                <div className="statValue">
                  <AnimatedStatValue stat={stat} />
                </div>

                <div className="statLabel">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .aboutIntro {
          text-align: center;
          margin-bottom: 4.6rem;
        }

        .aboutIntro > span {
          display: inline-block;
          color: var(--gold);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          margin-bottom: 1rem;
        }

        .aboutIntro h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--white);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.12;
        }

        .aboutIntro h2 em {
          color: var(--gold);
          font-style: italic;
        }

        .goldUnderline {
          width: 92px;
          height: 2px;
          margin: 1.25rem auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          box-shadow:
            0 0 12px rgba(201, 168, 76, 0.38),
            0 0 28px rgba(201, 168, 76, 0.16);
        }

        .aboutDescription {
          color: var(--white-dim);
          max-width: 1100px;
          margin: 2rem auto 0;
          text-align: center;
          line-height: 1.8;
          font-size: clamp(1rem, 1.25vw, 1.2rem);
        }

        .aboutDescription p {
          margin: 0;
        }

        .aboutDescription p + p {
          margin-top: 1.5rem;
        }

        .reasonsHeading {
          margin: 4.4rem auto 3.2rem;
          text-align: center;
        }

        .reasonsHeading h3 {
          margin: 0;
          color: var(--white);
          font-size: clamp(2rem, 4.2vw, 3.6rem);
          line-height: 1.08;
          letter-spacing: -0.04em;
        }

        .reasonsUnderline {
          width: 72px;
          height: 2px;
          margin: 1.15rem auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          box-shadow:
            0 0 12px rgba(201, 168, 76, 0.34),
            0 0 26px rgba(201, 168, 76, 0.14);
        }

        .aboutRevealFromTop {
          opacity: 0;
          transform: translateY(-34px);
          filter: blur(8px);
          transition:
            opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }

        .aboutRevealFromTop.aboutRevealVisible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .featureStack {
          display: grid;
          gap: clamp(4.5rem, 8vw, 7rem);
        }

        .featureRow {
          display: grid;
          grid-template-columns: minmax(260px, 0.82fr) minmax(360px, 1fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .featureRow.reverseRow {
          grid-template-columns: minmax(360px, 1fr) minmax(260px, 0.82fr);
        }

        .featureRow.reverseRow .featureText {
          order: 2;
        }

        .featureRow.reverseRow .imageFrame {
          order: 1;
        }

        .featureText {
          position: relative;
          z-index: 2;
        }

        .featureNumber {
          display: inline-flex;
          margin-bottom: 1.15rem;
          color: var(--gold);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          opacity: 0.86;
        }

        .featureText h3 {
          max-width: 520px;
          margin: 0;
          color: var(--white);
          font-size: clamp(1.85rem, 3vw, 3rem);
          line-height: 1.12;
          letter-spacing: -0.04em;
        }

        .featureLine {
          width: 58px;
          height: 2px;
          margin-top: 1.5rem;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--gold), transparent);
          box-shadow: 0 0 18px rgba(201, 168, 76, 0.26);
        }

        .imageFrame {
          position: relative;
          min-height: 335px;
        }

        .imageBackplate {
          position: absolute;
          right: -7%;
          bottom: -10%;
          width: 78%;
          height: 78%;
          border: 1px solid rgba(201, 168, 76, 0.12);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
            rgba(255, 255, 255, 0.025);
          box-shadow: 0 34px 88px rgba(0, 0, 0, 0.24);
        }

        .reverseRow .imageBackplate {
          right: auto;
          left: -7%;
        }

        .imageInner {
          position: relative;
          z-index: 2;
          width: min(100%, 560px);
          aspect-ratio: 1.45 / 1;
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.18);
          background: rgba(255, 255, 255, 0.04);
          box-shadow:
            0 28px 76px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.04);
          transition:
            transform 0.45s ease,
            border-color 0.45s ease,
            box-shadow 0.45s ease;
        }

        .featureRow:not(.reverseRow) .imageInner {
          margin-left: auto;
        }

        .featureRow.reverseRow .imageInner {
          margin-right: auto;
        }

        .imageInner:hover {
          transform: translateY(-8px) scale(1.015);
          border-color: rgba(201, 168, 76, 0.55);
          box-shadow:
            0 36px 96px rgba(0, 0, 0, 0.42),
            0 0 34px rgba(201, 168, 76, 0.12);
        }

        .featureImage {
          object-fit: cover;
          object-position: center;
          transform: scale(1.02);
          transition:
            transform 0.7s ease,
            filter 0.45s ease;
        }

        .imageInner:hover .featureImage {
          transform: scale(1.08);
          filter: brightness(0.52) saturate(1.1);
        }

        .imageOverlay {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: clamp(1.2rem, 3vw, 2.3rem);
          background:
            linear-gradient(135deg, rgba(7, 20, 35, 0.72), rgba(7, 20, 35, 0.9)),
            radial-gradient(circle at 20% 10%, rgba(201, 168, 76, 0.16), transparent 38%);
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.38s ease,
            transform 0.38s ease;
        }

        .imageInner:hover .imageOverlay {
          opacity: 1;
          transform: translateY(0);
        }

        .imageOverlay p {
          max-width: 440px;
          margin: 0;
          color: rgba(244, 241, 234, 0.9);
          text-align: center;
          font-size: clamp(0.98rem, 1.25vw, 1.14rem);
          line-height: 1.75;
        }

        .statsBridge {
          position: relative;
          z-index: 30;
          width: min(980px, 84vw);
          margin: clamp(4.2rem, 6vw, 5.6rem) auto 0;
          padding-right: 0;
          transform: translateY(50%);
        }

        .statsPanel {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.48);
          border-radius: 20px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035)),
            linear-gradient(90deg, rgba(201, 168, 76, 0.08), rgba(42, 154, 170, 0.1)),
            rgba(9, 22, 42, 0.92);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow:
            0 38px 96px rgba(0, 0, 0, 0.42),
            0 0 0 1px rgba(255, 255, 255, 0.06),
            0 0 42px rgba(201, 168, 76, 0.18),
            0 0 72px rgba(42, 154, 170, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .statsPanel::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.22), transparent),
            radial-gradient(circle at 12% 18%, rgba(201, 168, 76, 0.1), transparent 28%),
            radial-gradient(circle at 92% 18%, rgba(42, 154, 170, 0.2), transparent 34%);
        }

        .statsPanel::after {
          content: '';
          position: absolute;
          left: 7%;
          right: 7%;
          top: 0;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255, 239, 184, 0.62), transparent);
        }

        .statItem {
          position: relative;
          z-index: 1;
          min-height: 132px;
          display: grid;
          place-items: center;
          align-content: center;
          padding: 1.55rem 1rem;
          text-align: center;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06), transparent 46%),
            rgba(255, 255, 255, 0.025);
        }

        .statItem:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 18%;
          right: 0;
          width: 1px;
          height: 64%;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(201, 168, 76, 0.42),
            rgba(255, 255, 255, 0.12),
            transparent
          );
        }

        .statValue {
          margin-bottom: 0.42rem;
          color: #f3d26f;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.55rem, 4vw, 3.7rem);
          line-height: 1;
          text-shadow:
            0 0 14px rgba(201, 168, 76, 0.42),
            0 0 34px rgba(201, 168, 76, 0.2),
            0 0 58px rgba(42, 154, 170, 0.12);
        }

        .statLabel {
          color: rgba(244, 241, 234, 0.9);
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.045em;
        }

        @media (max-width: 980px) {
          .statsBridge {
            width: min(100%, 760px);
            margin: 3.8rem auto 0;
            padding-right: 0;
            transform: translateY(50%);
          }

          .statsPanel {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .statItem:nth-child(2)::after {
            display: none;
          }

          .featureRow,
          .featureRow.reverseRow {
            grid-template-columns: 1fr;
            gap: 1.6rem;
          }

          .featureRow.reverseRow .featureText,
          .featureRow.reverseRow .imageFrame {
            order: initial;
          }

          .featureText {
            text-align: center;
          }

          .featureText h3 {
            margin-inline: auto;
          }

          .featureLine {
            margin-inline: auto;
          }

          .imageInner,
          .featureRow:not(.reverseRow) .imageInner,
          .featureRow.reverseRow .imageInner {
            margin-inline: auto;
          }

          .imageBackplate,
          .reverseRow .imageBackplate {
            left: 8%;
            right: 8%;
            bottom: -8%;
            width: auto;
          }
        }

        @media (max-width: 640px) {
          .statsBridge {
            width: 100%;
            margin: 3.2rem auto 0;
            transform: translateY(50%);
          }

          .statsPanel {
            border-radius: 14px;
          }

          .statItem {
            min-height: 108px;
            padding: 1.25rem 0.8rem;
          }

          .statValue {
            font-size: 2.2rem;
          }

          .statLabel {
            font-size: 0.76rem;
          }

          .aboutIntro {
            margin-bottom: 3.4rem;
          }

          .aboutIntro h2 {
            font-size: clamp(1.9rem, 9vw, 2.7rem);
          }

          .aboutDescription {
            font-size: 0.96rem;
            line-height: 1.75;
          }

          .reasonsHeading {
            margin: 3.2rem auto 2.4rem;
          }

          .reasonsHeading h3 {
            font-size: clamp(1.9rem, 9vw, 2.8rem);
          }

          .featureStack {
            gap: 4rem;
          }

          .imageFrame {
            min-height: auto;
          }

          .imageInner {
            width: 100%;
            aspect-ratio: 1.18 / 1;
          }

          .imageOverlay {
            opacity: 1;
            transform: none;
            position: relative;
            inset: auto;
            min-height: auto;
            padding: 1.2rem;
            background: rgba(8, 20, 38, 0.92);
          }

          .imageInner {
            display: grid;
          }

          .imageInner :global(img) {
            position: relative !important;
            height: auto !important;
            min-height: 220px !important;
          }

          .imageInner:hover {
            transform: none;
          }

          .imageInner:hover .featureImage {
            transform: scale(1.02);
            filter: none;
          }

          .imageOverlay p {
            font-size: 0.92rem;
            line-height: 1.65;
          }
        }

        /* Mobile readability + compact stats fixes */
        @media (max-width: 640px) {
          .imageInner {
            aspect-ratio: auto;
            overflow: hidden;
            display: block;
            border-radius: 2px;
          }

          .imageInner :global(img) {
            position: relative !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
            min-height: 185px !important;
            max-height: 210px !important;
            object-fit: cover !important;
          }

          .imageOverlay {
            position: relative;
            inset: auto;
            display: block;
            opacity: 1;
            transform: none;
            padding: 0.95rem 1rem 1rem;
            background:
              linear-gradient(180deg, rgba(8, 20, 38, 0.96), rgba(5, 14, 28, 0.98));
            border-top: 1px solid rgba(201, 168, 76, 0.18);
          }

          .imageOverlay p {
            max-width: none;
            font-size: 0.78rem;
            line-height: 1.55;
            color: rgba(244, 241, 234, 0.92);
          }

          .statsBridge {
            width: min(92vw, 320px);
            margin: 3.1rem auto 0;
            transform: translateY(42%);
          }

          .statsPanel {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            border-radius: 12px;
          }

          .statItem {
            min-height: 74px;
            padding: 0.72rem 0.5rem;
          }

          .statValue {
            margin-bottom: 0.22rem;
            font-size: 1.55rem;
          }

          .statLabel {
            font-size: 0.56rem;
            line-height: 1.15;
            letter-spacing: 0.01em;
          }

          .statItem:not(:last-child)::after {
            height: 58%;
            top: 21%;
          }

          .statItem:nth-child(2)::after {
            display: none;
          }
        }

        @media (max-width: 390px) {
          .imageInner :global(img) {
            min-height: 170px !important;
            max-height: 195px !important;
          }

          .imageOverlay {
            padding: 0.85rem 0.9rem;
          }

          .imageOverlay p {
            font-size: 0.74rem;
            line-height: 1.5;
          }

          .statsBridge {
            width: min(90vw, 300px);
          }

          .statItem {
            min-height: 70px;
            padding: 0.65rem 0.45rem;
          }

          .statValue {
            font-size: 1.45rem;
          }

          .statLabel {
            font-size: 0.53rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aboutRevealFromTop {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }

      `}</style>
    </section>
  )
}
