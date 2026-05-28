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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
