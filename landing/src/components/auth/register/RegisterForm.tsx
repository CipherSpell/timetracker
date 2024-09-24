'use client'

//TODO: Change strings to pull from a json file
//TODO: Add interactivity styling

import React, { useState } from 'react'
import { Input } from '../../Input'
import Link from 'next/link'

interface FormData {
  email: string
  password: string
}

export const RegistrationForm: React.FC = () => {
  const [formInfo, setFormInfo] = useState<FormData>({
    email: '',
    password: '',
  })

  return (
    <div className='bg-black grid place-items-center h-screen'>
      <div className='rounded-lg bg-stone-900 px-10 py-10 w-96'>
        <h2 className='text-white text-center text-2xl mb-12'>Timetracker</h2>
        <div>
          <label className='text-white mb-2 block text-sm leading-none'>
            Email address
          </label>
          <Input
            id='email'
            name='email'
            placeholder='john.doe@example.com'
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
            onChange={(e) =>
              setFormInfo({
                ...formInfo,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button className='bg-white rounded-md w-full text-sm py-1'>
            Sign Up
          </button>
        </div>
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
