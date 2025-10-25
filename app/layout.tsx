import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elite Mobile Car Detailing | Professional Car Valeting Surrey',
  description: 'Professional mobile car detailing and valeting services in Surrey, UK. We come to you! Expert exterior & interior detailing, paint correction, ceramic coating.',
  keywords: 'car detailing Surrey, mobile car wash, car valeting, ceramic coating, paint protection, car cleaning Surrey',
  openGraph: {
    title: 'Elite Mobile Car Detailing | Surrey, UK',
    description: 'Professional mobile car detailing services. We come to you!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
