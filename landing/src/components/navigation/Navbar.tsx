'use client'

import text from '@/src/utils/text.json'
import NavLink from './NavLink'
import { useState } from 'react'

const Navbar: React.FC = () => {
  //TODO: Make the navbar active to keep track of current route. Might need to use Router hook to achieve this.

  //TODO: Modify authentication/authorization checks once login changes are merged
  const [isLoggedIn] = useState(false)
  const authLinks = !isLoggedIn ? (
    <div className='flex justify-end'>
      <NavLink href='/login'>{text.sign_in}</NavLink>
      <NavLink href='/register'>{text.sign_up}</NavLink>
    </div>
  ) : (
    <div className='flex justify-end'>
      {/*TODO: Changed href when a sign out route is implemented */}
      <NavLink href={'/'}>{text.sign_out}</NavLink>
    </div>
  )

  return (
    <nav className='flex px-2 h-20 bg-black text-white items-center justify-between'>
      <div className='flex'>
        <NavLink href={'/'}>
          <h1 className='flex h-fit items-center cursor-pointer select-none pr-10 pl-5 font-bold'>
            {text.timetracker}
          </h1>
        </NavLink>
      </div>
      {authLinks}
    </nav>
  )
}

export default Navbar
