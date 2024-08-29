import { RegisterForm } from '@/components/templates/RegisterForm'
import { AuthLayout } from '@/components/templates/AuthLayout'

import { Header } from '@/components/organisms/Header'
import { Container } from '@/components/atoms/Container'

const MENUITEMS = [
  { label: 'Buscar', href: '/search' },
  { label: 'Reservas', href: '/bookings' },
]

export default function Page() {
  return (
    <div>
      <Header menuItems={MENUITEMS} />
      <Container>
        <AuthLayout title={'Register'}>
          <RegisterForm />
        </AuthLayout>
      </Container>
    </div>
  )
}
