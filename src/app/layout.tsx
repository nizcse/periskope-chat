import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Periskope Chat',
  description: 'SDE1 Assignment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
