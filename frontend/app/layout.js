import './globals.css'

export const metadata = {
  title: 'Troubled Waters: Sailing with AI in Supply Chain',
  description: 'An exclusive executive summit by Accelalpha & Oracle exploring AI-powered supply chain transformation in the Gulf region.',
  openGraph: {
    title: 'Troubled Waters: Sailing with AI in Supply Chain',
    description: 'Join industry leaders at the Marriott Resort, The Palm on 13th November 2024.',
    type: 'website',
  },
}

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: scrollResetScript }} />
        {children}
      </body>
    </html>
  )
}
