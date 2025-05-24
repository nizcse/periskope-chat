import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/src/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Periskope Chat',
  description: 'SDE1 Assignment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
