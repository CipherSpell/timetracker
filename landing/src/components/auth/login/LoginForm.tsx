'use client'

//TODO: Change strings to pull from a json file
//TODO: Add interactivity styling

import React, { useState } from 'react'
import { Input } from '../../Input'
import Link from 'next/link'
import { State } from '../register/RegisterActions'
import { useFormState } from 'react-dom'
import { getUser } from './LoginActions'

interface FormData {
  email: string
  password: string
}

const initialState: State = {
  errors: {
    email: [''],
    password: [''],
  },
}

export const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(getUser, initialState)
  const [formInfo, setFormInfo] = useState<FormData>({
    email: '',
    password: '',
  })

  return (
    <div className='bg-black grid place-items-center h-screen'>
      <div className='rounded-lg bg-stone-900 px-10 py-10 w-96'>
        <h2 className='text-white text-center text-2xl mb-12'>Timetracker</h2>
        <form action={formAction}>
          <div>
            <label className='text-white mb-2 block text-sm leading-none'>
              Email address
            </label>
            <Input
              id='email'
              name='email'
              placeholder='john.doe@example.com'
              type='email'
              required
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
              required
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
              Sign In
            </button>
            <div
              className='text-red-500'
              id='error'
              aria-label='polite'
              aria-atomic='true'
            >
              {state?.errors.password?.map((error: string) => {
                return <p key={'wee'}>{error}</p>
              })}
            </div>
            <hr className='border-subtle my-8' />
          </div>
        </form>
        <Link href='/register'>
          <button className='bg-white rounded-md w-full text-sm py-1'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}
