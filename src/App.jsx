import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'
import authService from './auth/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        if (error?.code !== 401) {
          console.error('Error fetching user data:', error)
        }
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap items-center justify-center bg-gray-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md items-center justify-center">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
