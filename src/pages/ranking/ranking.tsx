import { Board } from '@/components/board'
import { RankingMainCard } from './components/card'

export const Ranking = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <RankingMainCard />
    </div>
  )
}
