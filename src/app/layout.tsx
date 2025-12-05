import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mattis&Co | Capital. Clarity. Full Send.',
  description: 'Battle-tested operators deploying capital and strategy with military precision. PE + advisory focused on micro nuclear, AI integration, and founder-first partnerships.',
  keywords: ['private equity', 'micro nuclear', 'AI integration', 'strategic advisory', 'founder-first PE'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
