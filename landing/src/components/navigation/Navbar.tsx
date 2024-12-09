import text from '@/src/utils/text.json'
import NavLink from './NavLink'

const Navbar: React.FC = () => {
  //TODO: Add conditional when user is logged in/logged out. Should likely do it via state and lifting state up or via context hook
  return (
    <div className='flex px-2 h-20 bg-black text-white items-center justify-between'>
      <div className='flex items-center'>
        <h1 className='flex h-fit items-center cursor-default select-none pr-10 pl-5'>
          {text.timetracker}
        </h1>
        <NavLink href={'/'}>Home</NavLink>
      </div>
      <div className='flex justify-end items-center'>
        <NavLink href='/login'>{text.sign_in}</NavLink>
        <NavLink href='/register'>{text.sign_up}</NavLink>
      </div>
    </div>
  )
}

export default Navbar
