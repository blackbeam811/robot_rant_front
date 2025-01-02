import { Route, Routes } from 'react-router-dom'
import { PrivateLayout } from './components/layout/private'
import {
  Alliances,
  Chambers,
  Connect,
  Contracts,
  Farming,
  FleetCommand,
  Home,
  Messages,
  Ranking,
  ResearchLaboratory,
  Settings,
  SpaceshipYard,
  Statistics,
} from './pages'

export const AppRouter = () => {
  return (
    <Routes>
      {/* AUTH PAGES */}
      <Route path='/connect' element={<Connect />} />

      {/* PRIVATE PAGES */}
      <Route path='/' element={<PrivateLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/chambers' element={<Chambers />} />
        <Route path='/research-laboratory' element={<ResearchLaboratory />} />
        <Route path='/spaceship-yard' element={<SpaceshipYard />} />
        <Route path='/fleet-command' element={<FleetCommand />} />
        <Route path='/farming' element={<Farming />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/contacts' element={<Contracts />} />
        <Route path='/alliances' element={<Alliances />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}
