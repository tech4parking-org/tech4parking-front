import { LoginForm } from '@/components/templates/LoginForm'
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
        <AuthLayout title={'Login'}>
          <LoginForm />
        </AuthLayout>
      </Container>
    </div>
  )
}