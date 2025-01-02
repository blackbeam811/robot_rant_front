import { Board } from '@/components/board'
import { MainFarmingCard } from './components/card'

export const Farming = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <MainFarmingCard />
    </div>
  )
}
