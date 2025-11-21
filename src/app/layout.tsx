import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'

export const metadata: Metadata = {
  title: 'Orchestor',
  description: 'Turn Asana tasks into ready-to-publish social media posts—automatically. Built with IBM watsonx Orchestrate.',
  icons: {
    icon: '/orchestor.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReactQueryProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
