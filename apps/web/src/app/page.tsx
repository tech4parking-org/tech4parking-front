'use client'
import { CarScene } from '@/components/3d/scenes/CarScene'

import { Header } from '@/components/organisms/Header'
import { Container } from '@/components/atoms/Container'
import { HomeHero } from '@/components/templates/HomeHero'

const MENUITEMS = [
  { label: 'Buscar', href: '/search' },
  { label: 'Vagas', href: '/list-spots' },
  { label: 'Ao vivo', href: '/parking' },
]

export default function Home() {
  return (
    <div>
      <Header menuItems={MENUITEMS} />
      <Container>
        <main className="h-[calc(100vh-4rem)]">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <CarScene />
          </div>
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 right-0"
            style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)' }}
          />
          <HomeHero />
        </main>
      </Container>
    </div>
  )
}
