import { z } from 'zod'

// minimum of 1 lower case, 1 uppercase, 1 digit and 1 special symbol
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])/

export const emailValidation = z.string().email('Invalid Email')

export const passwordValidation = z
  .string()
  .min(8, { message: 'Password needs to be at least 8 characters' })
  .regex(PASSWORD_REGEX, {
    message:
      'Should contain at least one uppercase, lowercase, digit and special character',
  })

export const userSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
})
