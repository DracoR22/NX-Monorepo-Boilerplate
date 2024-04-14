'use client'

import { useFormRegister } from '@supply-chain/forms'
import {
  fetchGraphqlStatic,
  RegisterWithCredentialsDocument,
} from '@supply-chain/network'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (formData) => {
          console.log('data', formData)
          const { data, error } = await fetchGraphqlStatic({
            document: RegisterWithCredentialsDocument,
            variables: {
              registerWithCredentialsInput: formData,
            },
          })
          if (error) {
            alert(error)
          }

          if (data) {
            alert(`User ${data.registerWithCredentials.user.uid} created. 🎉`)
            signIn('credentials', {
              email: formData.email,
              password: formData.password,
              callbackUrl: '/',
            })
          }
        })}
      >
        <label title="Email">
          <input
            className="block px-2 py-1 border rounded"
            placeholder="Enter the email"
            {...register('email')}
          />
        </label>
        <label title="Password">
          <input
            placeholder="******"
            className="block px-2 py-1 border rounded"
            type="password"
            {...register('password')}
          />
        </label>
        <label title="Name">
          <input
            placeholder="Enter the name"
            className="block px-2 py-1 border rounded"
            {...register('name')}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          Already have an account?{' '}
          <Link href="/signIn" className="font-semibold">
            Signin?
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
