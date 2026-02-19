import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'NossaHistória — Retrospectiva do Seu Relacionamento',
  description:
    'Crie uma retrospectiva digital com narrativa guiada e revele a surpresa no aniversário de namoro.',
}

export const viewport: Viewport = {
  themeColor: '#0F0F0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
