import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/organisms/Header'
import { MenuItem } from '@/utils/types'
import { Container } from '@/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T4Parking · Vagas as a Service',
  description: 'Encontre, reserve e acompanhe vagas de estacionamento em tempo real.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} bg-gray-25`}>
        {children}
      </body>
    </html>
  )
}
