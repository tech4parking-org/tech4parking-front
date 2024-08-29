'use client'
import { useFormLogin } from '@/components/forms/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        setLoading(true)

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        setLoading(false)

        if (result?.ok) {
          replace('/')
        }
        if (result?.error) {
          alert('Login failed. Try again.')
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          {...register('email')}
          placeholder="email"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          {...register('password')}
          placeholder="******"
        />
      </HtmlLabel>

      {/* Aqui é para existir um botão */}
      <Link className='mt-4 bg-primary-400 text-black p-4 text-center font-semibold' href='/search'>Login</Link>

      <div className="mt-4 text-sm"> 
        Ainda não tem uma conta no VagasAsAService?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Registre-se
        </Link>{' '}
        <a className='underline underline-offset-4'>agora!</a>
      </div>
    </Form>
  )
}
