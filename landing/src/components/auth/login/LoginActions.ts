'use server'

import { userSchema } from '@/src/config/zod'

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

  // TODO: make request to backend
}
