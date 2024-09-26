'use server'

import { userSchema } from '@/src/config/zod'

export type State = {
  errors?: []
}

export const createUser = async (prevState: State, formData: FormData) => {
  const validatedFields = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
}
