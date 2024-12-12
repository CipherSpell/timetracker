import Link from 'next/link'
import { ReactNode } from 'react'
import { UrlObject } from 'url'

interface NavProps {
  href: string | UrlObject
  children: ReactNode
}

const Navlink: React.FC<NavProps> = ({ href, children }) => {
  return (
    <Link className='mx-5 my-2 hover:underline' href={href}>
      {children}
    </Link>
  )
}

export default Navlink
