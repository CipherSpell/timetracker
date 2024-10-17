import { Input } from './Input'

const Footer: React.FC = () => {
  return (
    <footer className='w-full h-auto container p-2'>
      <a
        href='#'
        className='hover:underline hover:text-gray-500 leading-4 cursor-pointer mt-6'
      >
        Back to top
      </a>
      <div className='grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-8'>
        <div>
          <h2 className='font-bold text-2xl'>Timetracker</h2>
          <p className='text-sm mt-4'>Copyright &#169; 2024 Timetracker</p>
          <p className='text-sm mt-4 mb-6'>All rights reserved</p>
          <button className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 opacity-50 w-8 h-8 flex-shrink-0 cursor-pointer hover:bg-gray-300 rounded-full flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='100'
              height='100'
              viewBox='0 0 32 32'
            >
              <path
                fillRule='evenodd'
                d='M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z'
              ></path>
            </svg>
          </button>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-bold'>Support</h2>
          <a
            className='hover:underline hover:text-gray-500 leading-4 cursor-pointer mt-6'
            href='/terms-of-service'
          >
            Terms of Services
          </a>
          <a
            className='hover:underline hover:text-gray-500 leading-4 cursor-pointer mt-6'
            href='/privacy'
          >
            Privacy Policy
          </a>
        </div>
        <div>
          <h2 className='font-bold'>Community</h2>
        </div>
        <div className='lg:block hidden'>
          <h2 className='font-bold mb-2'>Contact Us</h2>
          <label htmlFor='email' hidden>
            email
          </label>
          <Input id='email' name='email' placeholder='Enter email' />
          <label htmlFor='message' hidden>
            Message
          </label>
          <textarea
            id='message'
            rows={3}
            className='w-full rounded-md text-sm px-3 py-2 mb-4'
            name='message'
            placeholder='message'
          ></textarea>
          <button className='bg-blue-300 rounded-md w-full text-sm py-1'>
            Submit
          </button>
        </div>
      </div>
      <div className='lg:hidden'>
        <h2 className='font-bold mt-10 text-xl mb-2'>Contact Us</h2>
        <label htmlFor='email' hidden>
          email
        </label>
        <Input id='email' name='email' placeholder='Enter email' />
        <label htmlFor='message' hidden>
          Message
        </label>
        <textarea
          id='message'
          rows={3}
          className='w-full rounded-md text-sm px-3 py-2 mb-4'
          name='message'
          placeholder='message'
        ></textarea>
        <button className='bg-blue-300 rounded-md w-full text-sm py-1'>
          Submit
        </button>
      </div>
    </footer>
  )
}

export default Footer
