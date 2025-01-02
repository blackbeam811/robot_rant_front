import { Board } from '@/components/board'
import { StatisticsMainCard } from './components/card'

export const Statistics = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <StatisticsMainCard />
    </div>
  )
}
