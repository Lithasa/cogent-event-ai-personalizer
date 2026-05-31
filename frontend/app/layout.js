import './globals.css'
import PageLoader from '../components/PageLoader'   // ← ADD: import

export const metadata = {
  title: 'Troubled Waters: Sailing with AI in Supply Chain',
  description:
    'An exclusive executive summit by Accelalpha & Oracle exploring AI-powered supply chain transformation in the Gulf region.',
  openGraph: {
    title: 'Troubled Waters: Sailing with AI in Supply Chain',
    description:
      'Join industry leaders at the Marriott Resort, The Palm on 13th November 2024.',
    type: 'website',
  },
}

const bootScreenStyles = `
  #boot-screen {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    background: #071423;
    opacity: 1;
    visibility: visible;
    pointer-events: none;
    transition:
      opacity 0.35s ease,
      visibility 0.35s ease;
  }

  html.app-ready #boot-screen {
    opacity: 0;
    visibility: hidden;
  }

  html,
  body {
    background: #071423;
  }
`

const scrollResetScript = `
(function () {
  try {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  } catch (error) {}

  function resetToTop() {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

  resetToTop();

  window.addEventListener('pageshow', function () {
    resetToTop();
    setTimeout(resetToTop, 0);
  });

  window.addEventListener('load', function () {
    resetToTop();
    setTimeout(resetToTop, 0);
  });
})();
`

const bootScreenScript = `
(function () {
  function revealApp() {
    setTimeout(function () {
      document.documentElement.classList.add('app-ready');
    }, 450);
  }

  if (document.readyState === 'complete') {
    revealApp();
  } else {
    window.addEventListener('load', revealApp, { once: true });
  }
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: bootScreenStyles }} />
      </head>

      <body>
        <div id="boot-screen" aria-hidden="true" />

        <PageLoader />   {/* ← ADD: renders on top of boot-screen (same z-index, later in DOM) */}

        <script dangerouslySetInnerHTML={{ __html: scrollResetScript }} />
        <script dangerouslySetInnerHTML={{ __html: bootScreenScript }} />

        {children}
      </body>
    </html>
  )
}
