import { Board } from '@/components/board'
import { MessagesMainCard } from './components/card'

export const Messages = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <MessagesMainCard />
    </div>
  )
}
