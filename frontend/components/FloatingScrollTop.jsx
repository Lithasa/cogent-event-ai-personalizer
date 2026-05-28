'use client'

import { useEffect, useState } from 'react'
import { ChevronsUp } from 'lucide-react'

export default function FloatingScrollTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`floating-scroll-top ${isVisible ? 'show' : ''}`}
      >
        <ChevronsUp size={34} strokeWidth={3.4} />
      </button>

      <style jsx>{`
        .floating-scroll-top {
          position: fixed;
          right: 32px;
          bottom: 34px;
          z-index: 9999;
          width: 70px;
          height: 70px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 22px;
          outline: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.9);
          background:
            linear-gradient(
              135deg,
              rgba(227, 52, 47, 0.72),
              rgba(120, 20, 20, 0.48)
            ),
            rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          box-shadow:
            0 14px 36px rgba(227, 52, 47, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transform: translateY(24px) scale(0.92);
          transition:
            opacity 0.32s ease,
            visibility 0.32s ease,
            transform 0.32s ease,
            background 0.32s ease,
            box-shadow 0.32s ease;
        }

        .floating-scroll-top.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .floating-scroll-top::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          pointer-events: none;
        }

        .floating-scroll-top:hover {
          transform: translateY(-7px) scale(1.03);
          color: #ffffff;
          background:
            linear-gradient(
              135deg,
              rgba(227, 52, 47, 0.86),
              rgba(145, 28, 28, 0.62)
            ),
            rgba(255, 255, 255, 0.1);
          box-shadow:
            0 20px 46px rgba(227, 52, 47, 0.38),
            0 0 28px rgba(255, 68, 56, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.22);
        }

        @media (max-width: 768px) {
          .floating-scroll-top {
            width: 58px;
            height: 58px;
            right: 20px;
            bottom: 22px;
            border-radius: 18px;
          }
        }
      `}</style>
    </>
  )
}