import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'loveindc',
  description: 'Created with Love',
  generator: 'cyberzik',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
