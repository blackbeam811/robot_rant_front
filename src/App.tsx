import { useEffect } from 'react'
import { PrivateRoutes } from './constants/private-routes'
import { AppRouter } from './router'
import { useNavigate } from 'react-router-dom'
import { Loading } from './components/loading'
import { useDataContext } from './utils/context/DataContext'

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()
  const { loading } = useDataContext();

  const isPrivatePage = (Object.values(PrivateRoutes || {}) as string[]).some((route) =>
    location.pathname.includes(route)
  )

  useEffect(() => {
    // Delay the loading screen by 2 seconds
    // setTimeout(() => {
    //   setLoading(false) // Set loading to false after 2 seconds
    // }, 2000)

    if (isPrivatePage && !window.localStorage.address) {
      navigate('/connect')
    }
  }, [isPrivatePage, navigate]) // Dependencies for effect to run again if needed

  if (loading) {
    return <Loading />
  }

  return <AppRouter />
}

export default App
