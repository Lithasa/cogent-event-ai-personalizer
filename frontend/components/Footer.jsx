'use client'

import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6'

const awards = [
  {
    src: '/images/awards/award1.png',
    alt: 'Great Place To Work GCC 2024',
  },
  {
    src: '/images/awards/award2.png',
    alt: 'Great Place To Work GCC 2023',
  },
  {
    src: '/images/awards/award3.png',
    alt: 'Great Place To Work UAE 2023',
  },
  {
    src: '/images/awards/award4.png',
    alt: 'Great Place To Work Certified UAE',
  },
]

const offices = [
  {
    title: 'Middle East & Africa HQ',
    lines: [
      'Office No: 209, The Metropolis Tower',
      'Business Bay, Dubai, United Arab Emirates',
    ],
  },
  {
    title: 'Asia Pacific HQ',
    lines: ['2nd floor Green Lanka Tower, Colombo', 'Sri Lanka'],
  },
  {
    title: 'Saudi Arabia HQ',
    lines: ['Riyadh , Saudi Arabia'],
  },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cogent-solutions-event-management',
    icon: FaLinkedinIn,
    hoverClass: 'linkedin-hover',
  },
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/cseventsuae/?_rdc=1&_rdr#',
    icon: FaFacebookF,
    hoverClass: 'facebook-hover',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cogent_solutions/',
    icon: FaInstagram,
    hoverClass: 'instagram-hover',
  },
  {
    label: 'X',
    href: 'https://x.com/cseventsdxb',
    icon: FaXTwitter,
    hoverClass: 'x-hover',
  },
]

export default function Footer() {
  return (
    <footer className="cogent-footer">
      <div className="footer-red-glow" />
      <div className="footer-blue-glow" />

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-about">
            <h2 className="footer-title">
              Cogent Solutions<span className="tm-mark">™</span>
            </h2>

            <p className="footer-text">
              Through our conferences we transform your business challenges into
              opportunities. Our clients and customers are leading government
              entities and the fortune 500 companies.
            </p>

            <h3 className="footer-subtitle">Awards</h3>

            <div className="awards-row">
              {awards.map((award, index) => (
                <div
                  className={`award-card ${index === 3 ? 'fourth-award-card' : ''}`}
                  key={award.src}
                >
                  <Image
                    src={award.src}
                    alt={award.alt}
                    fill
                    sizes={index === 3 ? '(max-width: 720px) 58px, 72px' : '(max-width: 720px) 84px, 116px'}
                    className={`award-image ${index === 3 ? 'fourth-award-image' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="footer-office">
            <h2 className="footer-title">Our office</h2>

            <div className="office-list">
              {offices.map((office) => (
                <div className="office-item" key={office.title}>
                  <MapPin className="office-icon" size={23} strokeWidth={2.3} />

                  <div>
                    <p className="office-title">{office.title}</p>
                    {office.lines.map((line) => (
                      <p className="office-line" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="contact-item">
                <Phone className="office-icon" size={23} strokeWidth={2.3} />
                <a href="tel:+97145761039" className="contact-link">
                  +971 4 576 1039 / +971 50 643 5244
                </a>
              </div>

              <div className="contact-item">
                <Mail className="office-icon" size={23} strokeWidth={2.3} />
                <a
                  href="mailto:partnerships@cogentsolutions.ae"
                  className="contact-link"
                >
                  partnerships@cogentsolutions.ae
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © 2026 Cogent Solutions Event Management LLC. All Right Reserved
          </p>

          <div className="social-row">
            {socialLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`social-button ${item.hoverClass}`}
                >
                  <Icon size={19} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cogent-footer {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000000;
          color: #ffffff;
          padding: 42px 48px 20px;
          z-index: 5;
        }

        .footer-red-glow {
          position: absolute;
          right: -180px;
          bottom: -200px;
          width: 380px;
          height: 380px;
          border-radius: 999px;
          background: rgba(227, 52, 47, 0.1);
          filter: blur(140px);
          pointer-events: none;
        }

        .footer-blue-glow {
          position: absolute;
          left: -180px;
          top: -180px;
          width: 340px;
          height: 340px;
          border-radius: 999px;
          background: rgba(34, 211, 238, 0.055);
          filter: blur(135px);
          pointer-events: none;
        }

        .footer-container {
          position: relative;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 0.9fr 1.08fr;
          gap: 82px;
          align-items: start;
        }

        .footer-title {
          margin: 0;
          color: #ffffff;
          font-size: 31px;
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.045em;
        }

        .tm-mark {
          display: inline-block;
          margin-left: 2px;
          font-size: 0.46em;
          line-height: 1;
          vertical-align: super;
          letter-spacing: -0.02em;
        }

        .footer-text {
          margin: 22px 0 0;
          max-width: 505px;
          color: #ffffff;
          font-size: 20px;
          line-height: 1.48;
          font-weight: 500;
          letter-spacing: -0.038em;
        }

        .footer-subtitle {
          margin: 30px 0 0;
          color: #ffffff;
          font-size: 31px;
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.045em;
        }

        .awards-row {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .award-card {
          position: relative;
          flex: 0 0 auto;
          width: 116px;
          height: 126px;
          background: #000000;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            filter 0.3s ease;
        }

        .fourth-award-card {
          width: 72px;
          height: 126px;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }

        .award-card:hover {
          transform: translateY(-8px);
          filter: brightness(1.05);
          box-shadow:
            0 16px 38px rgba(255, 255, 255, 0.16),
            0 0 0 1px rgba(255, 255, 255, 0.18);
        }

        .award-image {
          object-fit: contain;
          object-position: center;
        }

        .fourth-award-image {
          object-fit: cover;
          object-position: center top;
          transform: scale(1.04);
        }

        .office-list {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .office-item,
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }

        .office-icon {
          flex: 0 0 auto;
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.7);
        }

        .office-title,
        .office-line {
          margin: 0;
          color: rgba(255, 255, 255, 0.56);
          font-size: 20px;
          line-height: 1.42;
          font-weight: 500;
          letter-spacing: -0.038em;
        }

        .contact-link {
          color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
          font-size: 20px;
          line-height: 1.42;
          font-weight: 500;
          letter-spacing: -0.038em;
          transition: color 0.25s ease;
        }

        .contact-link:hover {
          color: #ffffff;
        }

        .footer-bottom {
          margin-top: 34px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.13);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .copyright {
          margin: 0;
          color: rgba(255, 255, 255, 0.46);
          font-size: 18px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: -0.038em;
        }

        .social-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .social-button {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.075);
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition:
            transform 0.28s ease,
            background 0.28s ease,
            color 0.28s ease,
            box-shadow 0.28s ease;
        }

        .social-button:hover {
          transform: translateY(-7px) scale(1.08);
          color: #ffffff;
        }

        .linkedin-hover:hover {
          background: #0a66c2;
          box-shadow: 0 16px 34px rgba(10, 102, 194, 0.42);
        }

        .facebook-hover:hover {
          background: #1877f2;
          box-shadow: 0 16px 34px rgba(24, 119, 242, 0.42);
        }

        .instagram-hover:hover {
          background:
            radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%);
          box-shadow: 0 16px 34px rgba(214, 36, 159, 0.42);
        }

        .x-hover:hover {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 16px 34px rgba(255, 255, 255, 0.24);
        }

        @media (max-width: 1100px) {
          .cogent-footer {
            padding: 56px 34px 24px;
          }

          .footer-container {
            max-width: 100%;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 54px;
          }

          .footer-text,
          .office-title,
          .office-line,
          .contact-link {
            font-size: 18px;
          }
        }

        @media (max-width: 720px) {
          .cogent-footer {
            padding: 46px 20px 22px;
          }

          .footer-title,
          .footer-subtitle {
            font-size: 27px;
          }

          .tm-mark {
            font-size: 0.44em;
          }

          .footer-text,
          .office-title,
          .office-line,
          .contact-link {
            font-size: 16px;
          }

          .awards-row {
            gap: 10px;
            align-items: flex-end;
          }

          .award-card {
            width: 84px;
            height: 92px;
          }

          .fourth-award-card {
            width: 58px;
            height: 86px;
          }

          .footer-bottom {
            margin-top: 42px;
            flex-direction: column;
            align-items: flex-start;
          }

          .social-row {
            gap: 10px;
            flex-wrap: wrap;
          }

          .social-button {
            width: 46px;
            height: 46px;
          }

          .copyright {
            font-size: 15px;
          }
        }

        @media (max-width: 390px) {
          .awards-row {
            gap: 8px;
          }

          .award-card {
            width: 76px;
            height: 84px;
          }

          .fourth-award-card {
            width: 52px;
            height: 84px;
          }
        }

      `}</style>
    </footer>
  )
}