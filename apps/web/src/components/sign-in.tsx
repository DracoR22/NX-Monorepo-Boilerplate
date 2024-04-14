'use client'
import { useFormSignIn } from '@supply-chain/forms'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormSignIn()

  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => {
          console.log('data', data)
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
          })
        })}
      >
        <label title="Email">
          <input {...register('email')} placeholder="Email" />
        </label>
        <label title="Password">
          <input
            type="password"
            {...register('password')}
            placeholder="******"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          New to application?{' '}
          <Link href="/register" className="font-semibold">
            Register.
          </Link>
        </div>
        <div className="h-[1px] bg-black/20 w-36 my-2" />
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' })
          }}
          className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
        >
          G
        </button>
      </div>
    </>
  )
}
