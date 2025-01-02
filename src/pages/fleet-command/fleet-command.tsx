import { Board } from '@/components/board'
import { MainFleetCommandCard } from './components/card'

export const FleetCommand = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <MainFleetCommandCard />
    </div>
  )
}
