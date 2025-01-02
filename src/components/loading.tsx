import React from 'react'
import { Progress } from './ui/progress'

export const Loading = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(60), 500)
    let timer2 = setTimeout(() => setProgress(100), 700)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className='p-[20px] bg-gradient-to-t from-[#2d1b0a] via-black  to-black h-screen w-full flex flex-col justify-between'>
      <div className='flex items-center gap-x-2'>
        <img src='./assets/Logo.svg' alt='' className='w-[50px] h-[50px]' />
        <span className='text-white text-2xl'>ROBOTANT</span>
      </div>
      <div className='w-full flex justify-center items-center flex-col'>
        <h1 className='text-white text-2xl mb-3'>Loading ...</h1>
        <Progress
          value={progress}
          className='bg-white  border-[2px] border-white sm:w-[384px] h-[23px] rounded-none'
        />
      </div>
      <div>
        <h1 className='flex items-center justify-center text-white/90 sm:text-xl font-normal'>
          Powered by SOLENA{' '}
          <img
            src='./Solana-Logo.svg'
            alt=''
            className='mx-[5px] w-[42px] h-[37px]'
          />{' '}
          AI
        </h1>
        <p className='text-[#ff0000] text-end mt-3 sm:mt-0'>Demo Alpha Phase</p>
      </div>
    </div>
  )
}
