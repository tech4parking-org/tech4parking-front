'use client'
import { CarScene } from '@/components/3d/scenes/CarScene'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

import { Header } from '@/components/organisms/Header'
import { Container } from '@/components/atoms/Container'

const MENUITEMS = [
  { label: 'Buscar', href: '/search' },
  { label: 'Reservas', href: '/bookings' },
]

export default function Home() {
  return (
    <div>
      <Header menuItems={MENUITEMS} />
      <Container>
        <main className="h-[calc(100vh-4rem)] ">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <CarScene />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <h1 className="font-black text-black text-xl z-10 inline-block px-3 bg-primary mt-2">Precisa</h1>{' '}
            <h1 className="z-10 inline-block text-xl w-full max-w-md px-3 bg-primary">
              estacionar ?
            </h1>
            <Link
              href="/search"
              className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4 bg-primary"
            >
              <IconSearch /> Encontre já a sua vaga!
            </Link>
          </div>
        </main>
      </Container>
    </div>
  )
}
