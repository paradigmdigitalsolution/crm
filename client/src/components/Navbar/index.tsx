
import React from 'react'
import {LogOutIcon, Menu, Moon, Search, Settings, Sun} from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'



const Navbar = () => {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black dark:px-4 dark:py-3'>
      {/* search bar */}
      <div className='flex items-center gap-8'>
        {!isSidebarCollapsed ? null : (
          <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
            <Menu className='h-8 w-8 cursor-pointer dark:text-white'/>
          </button>
        )}
      <div className='relative flex h-min w-[200px]'>
        <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
        <input
          type='text'
          placeholder='Search...'
          className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500  focus:border-transparent focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#1d1f21] dark:text-white dark:focus:border-[#0275ff] dark:focus:ring-[#0275ff]'
        />
      </div>
      </div>

      {/* icons */}
      <div className='flex items-center'>
        <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
          isDarkMode 
            ? 'h-min w-min rounded p-2 dark:hover:bg-gray-700 ' 
            : 'h-min w-min rounded p-2 hover:bg-gray-100'}
            >
          {isDarkMode ? (
            <Sun className='h-6 w-6 cursor-pointer dark:text-white'/>
          ) : (
            <Moon className='h-6 w-6 cursor-pointer dark:text-white'/>
          )}


        </button>
        <Link href="/settings"
        className='h-min w-min rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-900'>
          <Settings className='h-6 w-6 cursor-pointer dark:text-white'/>        
        </Link>
        <div className='ml-2 mr-5 hidden md:inline-block'>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-200 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
          >
            <LogOutIcon className='h-5 w-5' />
            <span className='hidden sm:inline-block'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar