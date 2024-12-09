import Link from 'next/link'
import { ReactNode } from 'react'

type NavProps = {
  href: string
  children?: ReactNode
}

const Navlink = ({ href, children }: NavProps) => {
  return (
    <Link className='mx-5 my-2 hover:underline' href={href}>
      {children}
    </Link>
  )
}

export default Navlink
