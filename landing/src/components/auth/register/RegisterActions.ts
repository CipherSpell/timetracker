'use server'

import { userSchema } from '@/src/config/zod'
import { redirect } from 'next/navigation'

export type State = {
  errors: {
    email?: string[]
    password?: string[]
  }
}

//TODO: modify "any" type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (prevState: any, formData: FormData) => {
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
    await fetch('http://backend:8080/users/addUser', {
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
  redirect('/login')
}
