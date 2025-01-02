import { Board } from '@/components/board'
import { ContactsMainCard } from './components/card'

export const Contracts = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <ContactsMainCard />
    </div>
  )
}
