import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orchestor - Stop Juggling. Start Publishing.',
  description: 'Turn Asana tasks into ready-to-publish social media posts—automatically. Built with IBM watsonx Orchestrate.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
