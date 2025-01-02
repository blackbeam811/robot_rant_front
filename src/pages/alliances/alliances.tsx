import { Board } from '@/components/board'
import { AlliancesMainCard } from './components/card'

export const Alliances = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <AlliancesMainCard />
    </div>
  )
}
