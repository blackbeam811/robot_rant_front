import { Board } from '@/components/board'
import { MainSpaceshipYardCard } from './components/card'

export const SpaceshipYard = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <MainSpaceshipYardCard />
    </div>
  )
}
