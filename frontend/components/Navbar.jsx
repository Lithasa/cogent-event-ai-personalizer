/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Speakers', href: '#speakers' },  
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`cogNavbar ${scrolled ? 'cogNavbarScrolled' : ''}`}>
        <div className="cogNavShell">
          <a href="#" className="cogBrand" aria-label="Go to top" onClick={closeMenu}>
            <div className="cogBrandLogos">
              <img
                src="/images/logos/accelalpha-logo.png"
                alt="Accelalpha"
                className="cogAccelLogo"
              />

              <span className="cogLogoDivider" aria-hidden="true" />

              <span className="cogOracleCrop">
                <img
                  src="/images/logos/oracle-logo.png"
                  alt="Oracle"
                  className="cogOracleLogo"
                />
              </span>
            </div>
          </a>

          <div className="cogDesktopNav">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="cogNavLink">
                {link.label}
              </a>
            ))}

            <a href="#register" className="cogRegisterButton">
              <span>Register Now</span>
            </a>
          </div>

          <div className="cogMobileActions">
            <a href="#register" className="cogMobileRegister" onClick={closeMenu}>
              <span>Register</span>
            </a>

            <button
              type="button"
              className={`cogMenuButton ${menuOpen ? 'cogMenuButtonOpen' : ''}`}
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`cogMobileOverlay ${menuOpen ? 'cogMobileOverlayOpen' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside className={`cogMobilePanel ${menuOpen ? 'cogMobilePanelOpen' : ''}`}>
        <div className="cogPanelHeader">
          <span>Navigation</span>

          <button type="button" onClick={closeMenu} aria-label="Close menu">
            ×
          </button>
        </div>

        <div className="cogPanelLinks">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${index * 0.06}s` : '0s' }}
            >
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}

          <a
            href="#register"
            className="cogPanelRegister"
            onClick={closeMenu}
            style={{ transitionDelay: menuOpen ? '0.2s' : '0s' }}
          >
            <span>04</span>
            Register Now
          </a>
        </div>
      </aside>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 112px;
        }

        #about,
        #speakers,
        #agenda,
        #register {
          scroll-margin-top: 112px;
        }

        @media (max-width: 768px) {
          html {
            scroll-padding-top: 92px;
          }

          #about,
          #speakers,
          #agenda,
          #register {
            scroll-margin-top: 92px;
          }
        }
      `}</style>

      <style jsx>{`
        .cogNavbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px clamp(14px, 3vw, 38px);
          pointer-events: none;
          transition: padding 0.35s ease;
        }

        .cogNavShell {
          position: relative;
          width: 100%;
          max-width: 1820px;
          height: 78px;
          margin: 0 auto;
          padding: 0 clamp(22px, 3vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          overflow: hidden;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.17),
              rgba(255, 255, 255, 0.055)
            ),
            rgba(12, 25, 45, 0.62);
          backdrop-filter: blur(30px) saturate(165%);
          -webkit-backdrop-filter: blur(30px) saturate(165%);
          box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.3),
            0 8px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.24),
            inset 0 -1px 0 rgba(255, 255, 255, 0.06);
          pointer-events: auto;
          transition:
            height 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .cogNavShell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.16) 0%,
              rgba(255, 255, 255, 0.035) 32%,
              transparent 58%,
              rgba(201, 168, 76, 0.08) 100%
            );
          pointer-events: none;
        }

        .cogNavShell::after {
          content: '';
          position: absolute;
          top: -62px;
          right: 8%;
          width: 300px;
          height: 170px;
          background: radial-gradient(
            circle,
            rgba(240, 214, 138, 0.16),
            rgba(240, 214, 138, 0)
          );
          filter: blur(18px);
          pointer-events: none;
        }

        .cogNavbarScrolled {
          padding-top: 10px;
        }

        .cogNavbarScrolled .cogNavShell {
          height: 70px;
          border-color: rgba(201, 168, 76, 0.3);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.13),
              rgba(201, 168, 76, 0.055)
            ),
            rgba(7, 17, 32, 0.82);
          box-shadow:
            0 26px 76px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
        }

        .cogBrand {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          min-width: 0;
          text-decoration: none;
          flex-shrink: 0;
        }

        .cogBrandLogos {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          height: 48px;
          line-height: 0;
          flex-shrink: 0;
        }

        .cogAccelLogo {
          width: 176px;
          height: auto;
          display: block;
          object-fit: contain;
          flex-shrink: 0;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.24));
        }

        .cogLogoDivider {
          width: 1px;
          height: 34px;
          flex-shrink: 0;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(201, 168, 76, 0.75),
            transparent
          );
        }

        .cogOracleCrop {
          width: 154px;
          height: 27px;
          display: inline-flex;
          align-items: flex-start;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .cogOracleLogo {
          width: 154px;
          height: auto;
          display: block;
          object-fit: contain;
          transform: translateY(-15px);
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.24));
        }

        .cogDesktopNav {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(24px, 3vw, 42px);
          margin-left: auto;
        }

        .cogNavLink {
          position: relative;
          color: rgba(244, 241, 234, 0.82);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .cogNavLink::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -10px;
          height: 1px;
          background: #d7b45b;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
          opacity: 0.9;
        }

        .cogNavLink:hover {
          color: #f0d68a;
          transform: translateY(-1px);
        }

        .cogNavLink:hover::after {
          transform: scaleX(1);
        }

        .cogRegisterButton,
        .cogMobileRegister,
        .cogPanelRegister {
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .cogRegisterButton {
          position: relative;
          min-height: 46px;
          padding: 0 1.65rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
          color: #f7e7aa;
          background:
            linear-gradient(135deg, rgba(11, 24, 45, 0.92), rgba(16, 35, 62, 0.9)),
            rgba(8, 20, 38, 0.9);
          border: 1px solid rgba(215, 180, 91, 0.72);
          border-radius: 1px;
          font-size: 0.78rem;
          white-space: nowrap;
          box-shadow:
            0 16px 34px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 0 rgba(215, 180, 91, 0);
          transition:
            transform 0.28s ease,
            color 0.28s ease,
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }

        .cogRegisterButton::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background: linear-gradient(135deg, #f4d983, #c79735);
          transform: translateX(-101%);
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cogRegisterButton::after {
          content: '';
          position: absolute;
          top: -40%;
          left: -45%;
          width: 42%;
          height: 190%;
          z-index: -1;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transform: rotate(18deg) translateX(-140%);
          transition: transform 0.65s ease;
        }

        .cogRegisterButton span {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.28s ease;
        }

        .cogRegisterButton span::after {
          content: '→';
          font-size: 1rem;
          line-height: 1;
          transform: translateX(-4px);
          opacity: 0.7;
          transition:
            transform 0.28s ease,
            opacity 0.28s ease;
        }

        .cogRegisterButton:hover {
          color: #081629;
          transform: translateY(-2px);
          border-color: rgba(255, 232, 162, 0.95);
          box-shadow:
            0 20px 50px rgba(201, 168, 76, 0.28),
            0 0 0 4px rgba(215, 180, 91, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.34);
        }

        .cogRegisterButton:hover::before {
          transform: translateX(0);
        }

        .cogRegisterButton:hover::after {
          transform: rotate(18deg) translateX(420%);
        }

        .cogRegisterButton:hover span {
          transform: translateX(2px);
        }

        .cogRegisterButton:hover span::after {
          opacity: 1;
          transform: translateX(3px);
        }

        .cogMobileActions {
          position: relative;
          z-index: 1;
          display: none;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .cogMobileRegister {
          position: relative;
          min-height: 38px;
          padding: 0 0.85rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px;
          color: #f7e7aa;
          background: rgba(8, 20, 38, 0.9);
          border: 1px solid rgba(215, 180, 91, 0.72);
          font-size: 0.62rem;
          white-space: nowrap;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
          transition:
            transform 0.25s ease,
            color 0.25s ease,
            background 0.25s ease;
        }

        .cogMobileRegister::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, #f4d983, #c79735);
          transform: translateX(-101%);
          transition: transform 0.38s ease;
        }

        .cogMobileRegister:hover {
          color: #081629;
          transform: translateY(-1px);
        }

        .cogMobileRegister:hover::before {
          transform: translateX(0);
        }

        .cogMenuButton {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            transform 0.25s ease;
        }

        .cogMenuButton:hover {
          border-color: rgba(201, 168, 76, 0.72);
          background: rgba(201, 168, 76, 0.13);
        }

        .cogMenuButton span {
          width: 17px;
          height: 2px;
          border-radius: 999px;
          background: #f0d68a;
          transition:
            transform 0.25s ease,
            opacity 0.2s ease;
        }

        .cogMenuButtonOpen span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .cogMenuButtonOpen span:nth-child(2) {
          opacity: 0;
        }

        .cogMenuButtonOpen span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .cogMobileOverlay {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.46);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.32s ease;
        }

        .cogMobileOverlayOpen {
          opacity: 1;
          pointer-events: auto;
        }

        .cogMobilePanel {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 999;
          width: min(84vw, 380px);
          height: 100vh;
          padding: 104px 24px 28px;
          background:
            radial-gradient(circle at 30% 0%, rgba(201, 168, 76, 0.14), transparent 36%),
            linear-gradient(180deg, rgba(8, 20, 38, 0.98), rgba(5, 13, 25, 0.96));
          border-left: 1px solid rgba(201, 168, 76, 0.2);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          box-shadow: -30px 0 90px rgba(0, 0, 0, 0.42);
          transform: translateX(110%);
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cogMobilePanelOpen {
          transform: translateX(0);
        }

        .cogPanelHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          color: #c9a84c;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .cogPanelHeader button {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(201, 168, 76, 0.28);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-size: 1.6rem;
          line-height: 1;
          cursor: pointer;
        }

        .cogPanelLinks {
          display: grid;
          gap: 14px;
        }

        .cogPanelLinks a {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 62px;
          padding: 0 18px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          text-decoration: none;
          font-family: 'Playfair Display', serif;
          font-size: 1.22rem;
          transform: translateX(22px);
          opacity: 0;
          transition:
            transform 0.35s ease,
            opacity 0.35s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .cogMobilePanelOpen .cogPanelLinks a {
          transform: translateX(0);
          opacity: 1;
        }

        .cogPanelLinks a:hover {
          border-color: rgba(201, 168, 76, 0.38);
          background: rgba(201, 168, 76, 0.09);
        }

        .cogPanelLinks a span {
          color: #c9a84c;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
        }

        .cogPanelRegister {
          color: #081629 !important;
          background: linear-gradient(135deg, #f3d98b, #d4ad4f) !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.92rem !important;
        }

        .cogPanelRegister span {
          color: rgba(8, 22, 41, 0.72) !important;
        }

        @media (max-width: 1100px) {
          .cogDesktopNav {
            gap: 26px;
          }

          .cogAccelLogo {
            width: 152px;
          }

          .cogOracleCrop {
            width: 132px;
            height: 24px;
          }

          .cogOracleLogo {
            width: 132px;
            transform: translateY(-13px);
          }
        }

        @media (max-width: 980px) {
          .cogDesktopNav {
            display: none;
          }

          .cogMobileActions {
            display: flex;
          }

          .cogNavShell {
            height: 72px;
            padding: 0 16px;
          }

          .cogNavbarScrolled .cogNavShell {
            height: 66px;
          }
        }

        @media (max-width: 560px) {
          .cogNavbar {
            padding: 10px;
          }

          .cogNavShell {
            height: 66px;
            gap: 10px;
            padding: 0 10px;
          }

          .cogNavbarScrolled {
            padding-top: 8px;
          }

          .cogNavbarScrolled .cogNavShell {
            height: 62px;
          }

          .cogBrandLogos {
            gap: 9px;
            height: 38px;
          }

          .cogAccelLogo {
            width: 108px;
          }

          .cogLogoDivider {
            height: 24px;
          }

          .cogOracleCrop {
            width: 88px;
            height: 18px;
          }

          .cogOracleLogo {
            width: 88px;
            transform: translateY(-8.8px);
          }

          .cogMobileRegister {
            min-height: 36px;
            padding: 0 0.72rem;
            font-size: 0.58rem;
            letter-spacing: 0.08em;
          }

          .cogMenuButton {
            width: 38px;
            height: 38px;
          }

          .cogMobilePanel {
            width: min(88vw, 360px);
            padding-top: 94px;
          }
        }

        @media (max-width: 420px) {
          .cogBrandLogos {
            gap: 7px;
          }

          .cogAccelLogo {
            width: 94px;
          }

          .cogOracleCrop {
            width: 74px;
            height: 16px;
          }

          .cogOracleLogo {
            width: 74px;
            transform: translateY(-7.4px);
          }

          .cogLogoDivider {
            height: 21px;
          }

          .cogMobileRegister {
            padding-inline: 0.62rem;
            font-size: 0.55rem;
          }

          .cogMenuButton {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 360px) {
          .cogAccelLogo {
            width: 86px;
          }

          .cogOracleCrop {
            width: 68px;
            height: 15px;
          }

          .cogOracleLogo {
            width: 68px;
            transform: translateY(-6.8px);
          }

          .cogMobileRegister {
            padding-inline: 0.52rem;
          }
        }
      `}</style>
    </>
  )
}