import { Board } from '@/components/board'
import { ChambersMainCard } from './components/card'

export const Chambers = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <ChambersMainCard />
    </div>
  )
}
