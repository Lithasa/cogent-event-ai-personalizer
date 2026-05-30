'use client'

import Image from 'next/image'

const galleryImages = [
  {
    src: '/images/gallery/gallery1.jpg',
    alt: 'Executive event moment',
  },
  {
    src: '/images/gallery/gallery2.jpg',
    alt: 'Supply chain and logistics event session',
  },
  {
    src: '/images/gallery/gallery3.jpg',
    alt: 'Business technology summit discussion',
  },
  {
    src: '/images/gallery/gallery4.jpg',
    alt: 'Industry networking moment',
  },
  {
    src: '/images/gallery/gallery5.jpg',
    alt: 'AI and logistics showcase',
  },
  {
    src: '/images/gallery/gallery6.jpg',
    alt: 'Conference audience and speakers',
  },
  {
    src: '/images/gallery/gallery7.jpg',
    alt: 'Digital transformation event highlight',
  },
  {
    src: '/images/gallery/gallery8.jpg',
    alt: 'Enterprise supply chain event gallery',
  },
]

export default function EventGallery() {
  const loopImages = [...galleryImages, ...galleryImages]

  return (
    <section className="eventGallery" aria-label="Event gallery showcase">
      <div className="galleryDivider galleryDividerTop" />

      <div className="galleryMask">
        <div className="galleryTrack">
          {loopImages.map((image, index) => (
            <div className="galleryFrame" key={`${image.src}-${index}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 360px"
                className="galleryImage"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="galleryDivider galleryDividerBottom" />

      <style jsx>{`
        .eventGallery {
          position: relative;
          overflow: hidden;
          background: var(--navy);
          padding: clamp(0.9rem, 2vw, 1.6rem) 0;
          isolation: isolate;
        }

        .galleryDivider {
          position: absolute;
          left: 50%;
          width: min(82vw, 1280px);
          height: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(201, 168, 76, 0.46),
            rgba(42, 154, 170, 0.18),
            transparent
          );
          pointer-events: none;
          z-index: 3;
        }

        .galleryDividerTop {
          top: 0;
        }

        .galleryDividerBottom {
          bottom: 0;
          opacity: 0.7;
        }

        .eventGallery::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -3;
          background:
            radial-gradient(circle at 14% 45%, rgba(201, 168, 76, 0.08), transparent 28%),
            radial-gradient(circle at 86% 42%, rgba(42, 154, 170, 0.1), transparent 30%);
          pointer-events: none;
        }

        .galleryMask {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 0.25rem 0;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .galleryTrack {
          display: flex;
          width: max-content;
          gap: clamp(1rem, 2vw, 1.45rem);
          animation: galleryScrollLeft 44s linear infinite;
          will-change: transform;
        }

        .galleryTrack:hover {
          animation-play-state: paused;
        }

        .galleryFrame {
          position: relative;
          width: clamp(190px, 20vw, 300px);
          aspect-ratio: 1.38 / 1;
          overflow: hidden;
          border: 1px solid rgba(201, 168, 76, 0.2);
          background: rgba(255, 255, 255, 0.04);
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.38),
            0 0 0 1px rgba(255, 255, 255, 0.035);
          transform: translateZ(0);
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            filter 0.35s ease;
        }

        .galleryFrame::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 58%, rgba(0, 0, 0, 0.32)),
            linear-gradient(90deg, rgba(201, 168, 76, 0.08), transparent 34%, rgba(42, 154, 170, 0.08));
          pointer-events: none;
          opacity: 0.72;
          transition: opacity 0.35s ease;
        }

        .galleryFrame:hover {
          transform: translateY(-8px) scale(1.025);
          border-color: rgba(201, 168, 76, 0.52);
          box-shadow:
            0 30px 82px rgba(0, 0, 0, 0.46),
            0 0 36px rgba(201, 168, 76, 0.12);
          filter: saturate(1.08);
        }

        .galleryFrame:hover::after {
          opacity: 0.4;
        }

        .galleryImage {
          object-fit: cover;
          object-position: center;
          transform: scale(1.02);
          transition: transform 0.55s ease;
        }

        .galleryFrame:hover .galleryImage {
          transform: scale(1.09);
        }

        @keyframes galleryScrollLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - clamp(0.5rem, 1vw, 0.725rem)));
          }
        }

        @media (max-width: 760px) {
          .eventGallery {
            padding: 1.6rem 0;
          }

          .galleryHeader {
            margin-bottom: 1.5rem;
          }

          .galleryMask {
            mask-image: linear-gradient(
              90deg,
              transparent 0%,
              black 4%,
              black 96%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              90deg,
              transparent 0%,
              black 4%,
              black 96%,
              transparent 100%
            );
          }

          .galleryTrack {
            gap: 0.9rem;
            animation-duration: 38s;
          }

          .galleryFrame {
            width: min(64vw, 250px);
          }
        }

        @media (min-width: 1440px) {
          .galleryFrame {
            width: clamp(210px, 18vw, 310px);
          }
        }

        @media (max-width: 1024px) {
          .galleryFrame {
            width: min(32vw, 275px);
          }

          .galleryTrack {
            gap: 1rem;
            animation-duration: 42s;
          }
        }

        @media (max-width: 640px) {
          .eventGallery {
            padding: 1.25rem 0;
          }

          .galleryFrame {
            width: min(60vw, 230px);
          }

          .galleryTrack {
            gap: 0.75rem;
            animation-duration: 34s;
          }
        }

        @media (max-width: 420px) {
          .galleryFrame {
            width: min(58vw, 210px);
          }

          .galleryTrack {
            gap: 0.65rem;
            animation-duration: 32s;
          }
        }

        @media (max-width: 1024px) {
          .galleryFrame {
            aspect-ratio: 1.32 / 1;
          }
        }

        @media (max-width: 640px) {
          .galleryFrame {
            aspect-ratio: 1.25 / 1;
          }
        }

        @media (max-width: 420px) {
          .galleryFrame {
            aspect-ratio: 1.18 / 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .galleryTrack {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
