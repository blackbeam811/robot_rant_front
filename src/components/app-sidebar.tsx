import { headQuarterUrls, mainMenuUrls } from '@/constants/sidebar-links'
import { SidebarItem } from './sidebar-item'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Menu = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (e: boolean) => void
}) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className='w-[35px] h-[26px] z-[999] cursor-pointer flex xl:hidden flex-col justify-between'
    >
      <div
        className={`w-full h-[3px] rounded bg-[white] transition-transform duration-300 ${
          open ? 'transform rotate-[46deg] translate-y-[13px]' : ''
        }`}
      />
      <div
        className={`w-full h-[3px] rounded bg-[white] transition-opacity duration-300 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <div
        className={`w-full h-[3px] rounded bg-[white] transition-transform duration-300 ${
          open ? 'transform -rotate-[46deg] -translate-y-[10px]' : ''
        }`}
      />
    </div>
  )
}

export function AppSidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (e: boolean) => void
}) {
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div className={`w-full xl:w-[268px]`}>
      <div>
        <div className='flex justify-between items-center w-full'>
          <Link className='flex items-center gap-x-2' to={'/'}>
            <img src='./assets/Logo.svg' alt='' className='w-[50px] h-[50px]' />
            <span className='text-white text-2xl'>ROBOTANT</span>
          </Link>
          <Menu open={open} setOpen={setOpen} />
        </div>
        <div
          className={`mt-[19px] ${
            open ? 'flex' : 'hidden'
          } flex xl:flex flex-col justify-center items-center gap-y-[19px] z-10`}
        >
          <SidebarItem
            title='News'
            urls={[
              {
                to: '/',
                label: 'No Message',
              },
            ]}
          />
          <SidebarItem title='Mainmenu' urls={mainMenuUrls} />
          <SidebarItem title='Headquarters' urls={headQuarterUrls} />
        </div>
      </div>
    </div>
  )
}
