'use client'
import { AppHeader } from '@/components/organisms/AppHeader'
import { ParkingLot3D } from '@/components/3d/parking/ParkingLot3D'

const MENUITEMS = [
  { label: 'Cadastrar Vagas', href: '/register-spot' },
  { label: 'Vagas', href: '/list-spots' },
  { label: 'Buscar', href: '/search' },
]

export default function Page() {
  return (
    <div>
      <AppHeader menuItems={MENUITEMS} />
      <ParkingLot3D />
    </div>
  )
}
