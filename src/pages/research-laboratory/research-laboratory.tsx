import { Board } from '@/components/board'
import { ResearchMainCard } from './components/card'

export const ResearchLaboratory = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <ResearchMainCard />
    </div>
  )
}
