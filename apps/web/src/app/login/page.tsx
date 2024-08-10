import { LoginForm } from '@vagasaservice/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@vagasaservice/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}