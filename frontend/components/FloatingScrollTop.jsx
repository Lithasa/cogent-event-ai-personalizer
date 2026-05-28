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
        <ChevronsUp size={48} strokeWidth={3.6} />
      </button>

      <style jsx>{`
        .floating-scroll-top {
          position: fixed;
          right: 36px;
          bottom: 38px;
          z-index: 9999;

          width: 58px;
          height: 58px;

          border: none;
          outline: none;
          cursor: pointer;
          background: transparent;

          color:var(--gold);

          display: flex;
          align-items: center;
          justify-content: center;

          opacity: 0;
          visibility: hidden;
          transform: translateY(22px) scale(0.9);

          filter:
            drop-shadow(0 0 8px rgba(249, 226, 23, 0.75))
            drop-shadow(0 0 18px rgba(247, 202, 0, 0.45))
            drop-shadow(0 0 34px rgba(240, 236, 12, 0.25));

          transition:
            opacity 0.32s ease,
            visibility 0.32s ease,
            transform 0.32s ease,
            color 0.32s ease,
            filter 0.32s ease;
        }

        .floating-scroll-top.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .floating-scroll-top:hover {
          color: #ff4545;
          transform: translateY(-6px) scale(1.08);
          filter:
            drop-shadow(0 0 10px rgba(255, 69, 69, 0.95))
            drop-shadow(0 0 24px rgba(255, 69, 69, 0.65))
            drop-shadow(0 0 44px rgba(255, 69, 69, 0.35));
        }

        .floating-scroll-top:active {
          transform: translateY(-2px) scale(0.98);
        }

        @media (max-width: 768px) {
          .floating-scroll-top {
            right: 22px;
            bottom: 24px;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  )
}