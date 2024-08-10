import { RegisterForm } from '@vagasaservice/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@vagasaservice/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
