'use client'

//TODO: Change strings to pull from a json file
//TODO: Add interactivity styling

import React, { useState } from 'react'
import { Input } from '../../Input'
import Link from 'next/link'
import { createUser, State } from './RegisterActions'
import { useFormState } from 'react-dom'

interface FormData {
  email: string
  password: string
}

const initialState: State = {
  errors: {
    email: [],
    password: [],
  },
}

export const RegistrationForm: React.FC = () => {
  const [state, formAction] = useFormState(createUser, initialState)
  const [formInfo, setFormInfo] = useState<FormData>({
    email: '',
    password: '',
  })
  const errors = state?.errors

  const emailErrors = errors?.email?.length != 0 && (
    <span className='mt-2 text-sm text-red-500'>
      {errors?.email?.map((error: string, id: number) => {
        return <p key={id}>{error}</p>
      })}
    </span>
  )

  const passwordErrors = errors?.password?.length != 0 && (
    <div
      className='text-red-500'
      id='error'
      aria-label='polite'
      aria-atomic='true'
    >
      {errors?.password?.map((error: string, id: number) => {
        return <p key={id}>{error}</p>
      })}
    </div>
  )

  return (
    <div className='bg-black grid place-items-center h-screen'>
      <div className='rounded-lg bg-stone-900 px-10 py-10 w-96'>
        <h2 className='text-white text-center text-2xl mb-12'>Timetracker</h2>
        <form action={formAction}>
          <div>
            <label className='text-white mb-2 block text-sm leading-none'>
              Email address
            </label>
            {emailErrors}
            <Input
              id='email'
              name='email'
              placeholder='john.doe@example.com'
              type='email'
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className='text-white mb-2 block text-sm leading-none'>
              Password
            </label>
            <Input
              id='password'
              name='password'
              placeholder='************'
              type='password'
              required={true}
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div>
            <button
              className='bg-white rounded-md w-full text-sm py-1'
              type='submit'
            >
              Sign Up
            </button>
          </div>
        </form>
        {passwordErrors}
        <hr className='border-subtle my-8' />
        <Link href='/login'>
          <button className='bg-white rounded-md w-full text-sm py-1'>
            Already have an account? Login
          </button>
        </Link>
      </div>
    </div>
  )
}
