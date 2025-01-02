import { Board } from '@/components/board'
import { SettingsMainCard } from './components/card'
import { TermsModal } from './components/termsModal'

export const Settings = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Board />
      <SettingsMainCard />
      <TermsModal />
    </div>
  )
}
