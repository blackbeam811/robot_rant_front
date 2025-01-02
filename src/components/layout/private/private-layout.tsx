import { AppSidebar } from '@/components/app-sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export const PrivateLayout = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='bg-gradient-to-t from-[#2d1b0a] via-black  to-black p-[20px] min-h-screen flex flex-col xl:flex-row gap-x-[17px]'>
      <AppSidebar open={open} setOpen={setOpen} />
      <main className={`${open ? 'hidden' : 'block'} w-full`}>
        <Outlet />
      </main>
    </div>
  )
}
