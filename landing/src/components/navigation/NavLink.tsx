import Link from 'next/link'
import { ReactNode } from 'react'
import { UrlObject } from 'url'

interface NavProps {
  href: string | UrlObject
  children: ReactNode
}

const Navlink = ({ href, children }: NavProps) => {
  return (
    <Link className='mx-5 my-2 hover:underline' href={href}>
      {children}
    </Link>
  )
}

export default Navlink
