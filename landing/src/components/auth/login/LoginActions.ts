'use server'

import { userSchema } from '@/src/config/zod'
import { redirect } from 'next/navigation'

//TODO: modify "any" type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = async (prevState: any, formData: FormData) => {
  const validatedFields = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try {
    const backendHost = process.env.BACKEND_HOST || 'http://backend:8080'
    await fetch(`${backendHost}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    })
  } catch (error) {
    console.error(error)
  }
  redirect('/')
}
