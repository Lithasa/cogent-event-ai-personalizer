'use client'

import Image from 'next/image'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { useRef } from 'react'

const stars = Array.from({ length: 40 }, (_, index) => ({
  left: `${(index * 29) % 100}%`,
  top: `${10 + ((index * 41) % 72)}%`,
  size: `${1 + (index % 3) * 0.55}px`,
  duration: `${2.8 + (index % 5) * 0.45}s`,
  delay: `${index * -0.14}s`,
}))

export default function Hero() {
  const heroRef = useRef(null)

  const handleMouseMove = (event) => {
    const section = heroRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    section.style.setProperty('--shipX', `${x * 12}px`)
    section.style.setProperty('--shipY', `${y * 7}px`)
    section.style.setProperty('--shipRotateX', `${y * -4}deg`)
    section.style.setProperty('--shipRotateY', `${x * 6 - 6}deg`)
    section.style.setProperty('--glowX', `${x * 28}px`)
    section.style.setProperty('--glowY', `${y * 20}px`)
  }

  const resetMouse = () => {
    const section = heroRef.current
    if (!section) return

    section.style.setProperty('--shipX', '0px')
    section.style.setProperty('--shipY', '0px')
    section.style.setProperty('--shipRotateX', '0deg')
    section.style.setProperty('--shipRotateY', '-6deg')
    section.style.setProperty('--glowX', '0px')
    section.style.setProperty('--glowY', '0px')
  }

  return (
    <section
      ref={heroRef}
      className="heroSection"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      <div className="heroBackdrop" />
      <div className="heroStars" aria-hidden="true">
        {stars.map((star, index) => (
          <span
            key={index}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="heroShell">
        <div className="heroContent">
          <div className="heroBadge">
            <span className="badgeDot" />
            Exclusive Summit
          </div>

          <h1 className="heroTitle">
            <span className="titleMain">Troubled Waters:</span>
            <span className="titleSub">Sailing with AI in Supply Chain</span>
          </h1>

          <div className="heroMeta" aria-label="Event details">
            <div>
              <CalendarDays className="metaIcon" aria-hidden="true" />
              <span>13th November 2024</span>
            </div>

            <div>
              <Clock3 className="metaIcon" aria-hidden="true" />
              <span>09:30 AM — 01:00 PM</span>
            </div>

            <div>
              <MapPin className="metaIcon" aria-hidden="true" />
              <span>Marriott Resort, The Palm, Dubai</span>
            </div>
          </div>

          <div className="heroActions">
            <a href="#register" className="heroPrimary">
              <span>Secure Your Seat</span>
              <b>→</b>
            </a>

            <a href="#agenda" className="heroSecondary">
              View Agenda
            </a>
          </div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="shipPerspective">
            <div className="shipEntrance">
              <div className="shipStage">
                <div className="shipAura" />

                <Image
                  src="/images/others/shipmove.png"
                  alt=""
                  width={920}
                  height={610}
                  priority
                  className="shipImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .heroSection {
          --shipX: 0px;
          --shipY: 0px;
          --shipRotateX: 0deg;
          --shipRotateY: -6deg;
          --glowX: 0px;
          --glowY: 0px;
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          padding: 136px clamp(42px, 5.6vw, 96px) 72px;
          background: linear-gradient(180deg, #071423 0%, #081729 48%, #06121f 100%);
          isolation: isolate;
        }

        .heroBackdrop {
          position: absolute;
          inset: 0;
          z-index: -6;
          background: transparent;
        }

        .heroLight {
          display: none;
        }

        .heroLightOne {
          width: 430px;
          height: 430px;
          right: 8%;
          top: 17%;
          background: rgba(42, 154, 170, 0.15);
          animation: glowFloat 9s ease-in-out infinite;
        }

        .heroLightTwo {
          width: 300px;
          height: 300px;
          right: 28%;
          bottom: 12%;
          background: rgba(201, 168, 76, 0.08);
          animation: glowFloat 10s 1.4s ease-in-out infinite;
        }

        .heroStars {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
        }

        .heroStars span {
          position: absolute;
          border-radius: 50%;
          background: rgba(244, 241, 234, 0.75);
          box-shadow: 0 0 12px rgba(244, 241, 234, 0.56);
          animation-name: starPulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .heroShell {
          position: relative;
          z-index: 2;
          width: min(1460px, 100%);
          min-height: calc(100svh - 208px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
          align-items: center;
          gap: clamp(30px, 4vw, 78px);
        }

        .heroContent {
          max-width: 980px;
          text-align: left;
          animation: heroContentIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .heroBadge {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
          padding: 11px 16px;
          border: 1px solid rgba(201, 168, 76, 0.42);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025)),
            rgba(8, 20, 38, 0.54);
          color: #f0d68a;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-family: 'DM Mono', monospace;
          font-size: 0.76rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 18px 50px rgba(0, 0, 0, 0.18);
        }

        .badgeDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #2aefaa;
          box-shadow: 0 0 0 0 rgba(42, 239, 170, 0.55);
          animation: pulseDot 1.8s ease-out infinite;
        }

        .heroTitle {
          margin: 0;
          color: #f4f1ea;
          line-height: 0.94;
          letter-spacing: -0.055em;
        }

        .titleMain,
        .titleSub {
          display: block;
          white-space: nowrap;
        }

        .titleMain {
          color: #f4f1ea;
          font-size: clamp(3.45rem, 5.25vw, 5.75rem);
          margin-bottom: 18px;
        }

        .titleSub {
          width: fit-content;
          max-width: 100%;
          font-size: clamp(2.25rem, 3.25vw, 3.55rem);
          line-height: 1.02;
          background: linear-gradient(
            90deg,
            #fff1be 0%,
            #f0d68a 24%,
            #c9a84c 52%,
            #fff6ce 78%,
            #c9a84c 100%
          );
          background-size: 220%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShine 5.5s linear infinite;
        }

        .heroMeta {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 24px;
          margin-top: 34px;
          max-width: 980px;
          color: rgba(244, 241, 234, 0.82);
        }

        .heroMeta div {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.96rem;
          line-height: 1;
          white-space: nowrap;
        }

        .heroMeta :global(.metaIcon) {
          width: 18px;
          height: 18px;
          color: #d7b45b;
          stroke-width: 2.1;
          filter: drop-shadow(0 0 8px rgba(215, 180, 91, 0.36));
          flex-shrink: 0;
        }

        .heroActions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 32px;
        }

        .heroPrimary,
        .heroSecondary {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .heroPrimary {
          position: relative;
          overflow: hidden;
          gap: 12px;
          padding: 0 1.35rem;
          color: #081629;
          border: 1px solid rgba(255, 233, 169, 0.4);
          background: linear-gradient(135deg, #f6dda0, #c9a84c);
          box-shadow:
            0 16px 40px rgba(201, 168, 76, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
        }

        .heroPrimary::before {
          content: '';
          position: absolute;
          top: -70%;
          left: -40%;
          width: 34%;
          height: 240%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
          transform: rotate(20deg) translateX(-130%);
          transition: transform 0.7s ease;
        }

        .heroPrimary span,
        .heroPrimary b {
          position: relative;
          z-index: 1;
        }

        .heroPrimary b {
          font-size: 0.96rem;
          transition: transform 0.25s ease;
        }

        .heroPrimary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 22px 56px rgba(201, 168, 76, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .heroPrimary:hover::before {
          transform: rotate(20deg) translateX(430%);
        }

        .heroPrimary:hover b {
          transform: translateX(5px);
        }

        .heroSecondary {
          padding: 0 1.26rem;
          color: #f0d68a;
          border: 1px solid rgba(201, 168, 76, 0.44);
          background: rgba(255, 255, 255, 0.035);
        }

        .heroSecondary:hover {
          color: #fff4c7;
          border-color: rgba(240, 214, 138, 0.72);
          background: rgba(201, 168, 76, 0.08);
          transform: translateY(-3px);
        }

        .heroVisual {
          min-width: 0;
          perspective: 1400px;
          transform-style: preserve-3d;
          pointer-events: none;
          overflow: visible;
        }

        .shipPerspective {
          position: relative;
          min-height: 540px;
          display: grid;
          place-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
          overflow: visible;
        }

        .shipEntrance {
          position: relative;
          z-index: 2;
          width: min(100%, 650px);
          aspect-ratio: 1.35 / 1;
          transform-style: preserve-3d;
          opacity: 0;
          transform-origin: 70% 36%;
          animation:
            shipApproach 9s cubic-bezier(0.16, 0.88, 0.22, 1) forwards,
            shipGentleFloat 7.4s ease-in-out 9s infinite;
        }

        .shipStage {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform:
            translate3d(var(--shipX), var(--shipY), 0)
            rotateX(var(--shipRotateX))
            rotateY(var(--shipRotateY));
          transition: transform 0.24s ease-out;
        }

        .shipAura {
          display: none;
        }

        .shipImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: translateZ(95px) scale(1);
          filter:
            drop-shadow(0 28px 28px rgba(0, 0, 0, 0.32))
            drop-shadow(0 0 18px rgba(45, 177, 236, 0.16));
          animation: shipLightPulse 6.8s 9s ease-in-out infinite;
        }

        @keyframes heroContentIn {
          from {
            opacity: 0;
            transform: translateX(-28px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shipApproach {
          from {
            opacity: 0;
            transform: translate3d(360px, -210px, -560px) rotateX(14deg) rotateY(-34deg) scale(0.22);
            filter: blur(12px);
          }
          to {
            opacity: 1;
            transform: translate3d(-180px, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes shipGentleFloat {
          0%, 100% {
            transform: translate3d(-180px, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
          }
          50% {
            transform: translate3d(-180px, -12px, 0) rotateX(0deg) rotateY(-6deg) scale(1);
          }
        }

        @keyframes shipLightPulse {
          0%, 100% {
            filter:
              drop-shadow(0 28px 28px rgba(0, 0, 0, 0.32))
              drop-shadow(0 0 18px rgba(45, 177, 236, 0.16));
          }
          50% {
            filter:
              drop-shadow(0 32px 32px rgba(0, 0, 0, 0.36))
              drop-shadow(0 0 28px rgba(45, 177, 236, 0.24));
          }
        }

        @keyframes glowFloat {
          0%, 100% {
            opacity: 0.55;
            scale: 1;
          }
          50% {
            opacity: 0.8;
            scale: 1.06;
          }
        }

        @keyframes pulseDot {
          0% {
            box-shadow: 0 0 0 0 rgba(42, 239, 170, 0.55);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(42, 239, 170, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(42, 239, 170, 0);
          }
        }

        @keyframes starPulse {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.25);
          }
        }

        @keyframes titleShine {
          0% {
            background-position: -160% center;
          }
          100% {
            background-position: 160% center;
          }
        }

        @media (max-width: 1400px) {
          .titleMain {
            font-size: clamp(3.2rem, 4.7vw, 5.25rem);
          }

          .titleSub {
            font-size: clamp(2.05rem, 2.95vw, 3.25rem);
          }

          .heroContent {
            max-width: 920px;
          }
        }

        @media (max-width: 1320px) {
          .titleMain {
            font-size: clamp(3rem, 4.35vw, 4.8rem);
          }

          .titleSub {
            font-size: clamp(1.95rem, 2.65vw, 2.95rem);
          }

          .heroMeta {
            gap: 18px;
          }

          .heroMeta div {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 1180px) {
          .heroSection {
            padding-top: 130px;
          }

          .heroShell {
            grid-template-columns: minmax(0, 1fr) minmax(330px, 0.88fr);
            gap: 30px;
          }

          .heroMeta {
            flex-wrap: wrap;
            gap: 14px 18px;
          }

          .shipEntrance {
            width: min(100%, 560px);
          }
        }

        @media (max-width: 1100px) {
          .heroSection {
            min-height: auto;
            padding: 128px clamp(24px, 5vw, 60px) 64px;
          }

          .heroShell {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 36px;
          }

          .heroContent {
            max-width: 860px;
          }

          .titleMain,
          .titleSub {
            white-space: normal;
          }

          .heroVisual {
            width: min(88vw, 640px);
            margin: 0 auto;
          }

          .shipPerspective {
            min-height: clamp(340px, 46vw, 460px);
          }

          .shipEntrance {
            width: min(100%, 590px);
            margin-inline: auto;
          }

          @keyframes shipApproach {
            from {
              opacity: 0;
              transform: translate3d(250px, -145px, -410px) rotateX(12deg) rotateY(-28deg) scale(0.24);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
              filter: blur(0);
            }
          }

          @keyframes shipGentleFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
            }
            50% {
              transform: translate3d(0, -10px, 0) rotateX(0deg) rotateY(-6deg) scale(1);
            }
          }
        }

        @media (max-width: 900px) {
          .heroSection {
            padding-top: 124px;
          }

          .titleMain,
          .titleSub {
            white-space: normal;
          }

          .heroMeta {
            flex-wrap: wrap;
          }

          .heroActions {
            gap: 12px;
          }
        }

        @media (max-width: 760px) {
          .heroSection {
            min-height: 100svh;
            padding: 132px 24px 330px;
          }

          .heroShell {
            display: block;
            min-height: auto;
          }

          .heroContent {
            position: relative;
            z-index: 3;
            max-width: 100%;
          }

          .heroBadge {
            margin-bottom: 18px;
            padding: 9px 12px;
            font-size: 0.64rem;
            letter-spacing: 0.14em;
          }

          .titleMain {
            font-size: clamp(2.35rem, 10vw, 3.45rem);
            margin-bottom: 12px;
            line-height: 0.98;
          }

          .titleSub {
            font-size: clamp(1.72rem, 7.5vw, 2.55rem);
            line-height: 1.04;
          }

          .heroMeta {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 24px;
          }

          .heroMeta div {
            width: 100%;
            font-size: 0.86rem;
            line-height: 1.35;
            white-space: normal;
          }

          .heroMeta :global(.metaIcon) {
            width: 17px;
            height: 17px;
          }

          .heroActions {
            display: grid;
            grid-template-columns: 1fr;
            align-items: stretch;
            margin-top: 26px;
            gap: 12px;
          }

          .heroPrimary,
          .heroSecondary {
            width: 100%;
            min-height: 46px;
            font-size: 0.68rem;
          }

          .heroVisual {
            position: absolute;
            z-index: 1;
            right: -20%;
            bottom: -72px;
            width: min(112vw, 520px);
            opacity: 0.72;
            margin: 0;
          }

          .shipPerspective {
            min-height: 300px;
            display: block;
          }

          .shipEntrance {
            width: 100%;
            animation:
              shipApproachMobile 6.2s cubic-bezier(0.16, 0.88, 0.22, 1) forwards,
              shipGentleFloatMobile 7.2s ease-in-out 6.2s infinite;
          }

          .shipImage {
            animation-delay: 6.2s;
          }
        }

        @media (max-width: 640px) {
          .heroSection {
            padding: 128px 20px 315px;
          }

          .heroVisual {
            right: -22%;
            bottom: -76px;
            width: min(118vw, 500px);
            opacity: 0.74;
          }

          .shipPerspective {
            min-height: 285px;
          }
        }

        @media (max-width: 520px) {
          .heroSection {
            padding: 120px 18px 300px;
          }

          .heroBadge {
            font-size: 0.58rem;
            letter-spacing: 0.12em;
            padding: 8px 10px;
          }

          .heroTitle {
            letter-spacing: -0.04em;
          }

          .titleMain {
            font-size: clamp(2.08rem, 11vw, 2.95rem);
          }

          .titleSub {
            font-size: clamp(1.55rem, 8.4vw, 2.18rem);
          }

          .heroVisual {
            right: -24%;
            bottom: -82px;
            width: min(124vw, 470px);
            opacity: 0.76;
          }

          .shipPerspective {
            min-height: 260px;
          }
        }

        @media (max-width: 430px) {
          .heroSection {
            padding-top: 118px;
            padding-bottom: 280px;
          }

          .titleMain {
            font-size: clamp(1.95rem, 11.6vw, 2.65rem);
          }

          .titleSub {
            font-size: clamp(1.42rem, 8.8vw, 1.95rem);
          }

          .heroMeta div {
            font-size: 0.82rem;
          }

          .heroVisual {
            right: -26%;
            bottom: -86px;
            width: 128vw;
            opacity: 0.78;
          }

          .shipPerspective {
            min-height: 240px;
          }
        }

        @media (max-width: 375px) {
          .heroSection {
            padding-inline: 15px;
            padding-bottom: 260px;
          }

          .titleMain {
            font-size: clamp(1.82rem, 11.2vw, 2.35rem);
          }

          .titleSub {
            font-size: clamp(1.3rem, 8.2vw, 1.78rem);
          }

          .heroPrimary,
          .heroSecondary {
            min-height: 44px;
            font-size: 0.62rem;
            letter-spacing: 0.1em;
          }

          .heroVisual {
            right: -30%;
            width: 136vw;
            bottom: -90px;
          }

          .shipPerspective {
            min-height: 220px;
          }
        }

        @media (max-height: 720px) and (min-width: 761px) {
          .heroSection {
            padding-top: 116px;
            padding-bottom: 48px;
          }

          .heroShell {
            min-height: auto;
          }

          .titleMain {
            font-size: clamp(2.8rem, 4.3vw, 4.45rem);
          }

          .titleSub {
            font-size: clamp(1.85rem, 2.6vw, 2.85rem);
          }

          .heroMeta {
            margin-top: 24px;
          }

          .heroActions {
            margin-top: 24px;
          }

          .shipPerspective {
            min-height: 430px;
          }
        }

        @keyframes shipApproachMobile {
          from {
            opacity: 0;
            transform: translate3d(170px, -96px, -250px) rotateX(10deg) rotateY(-24deg) scale(0.34);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes shipGentleFloatMobile {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(-6deg) scale(1);
          }
          50% {
            transform: translate3d(0, -8px, 0) rotateX(0deg) rotateY(-6deg) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroSection,
          .heroSection * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
