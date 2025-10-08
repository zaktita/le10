'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, logout, getRemainingSessionTime, extendSession } from '../utils/auth'

export default function withAdminAuth(WrappedComponent) {
  return function AdminProtectedComponent(props) {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [sessionTime, setSessionTime] = useState(0)
    const router = useRouter()

    useEffect(() => {
      // Check authentication on mount
      checkAuth()
      
      // Set up session monitoring
      const sessionInterval = setInterval(() => {
        if (isAuthenticated()) {
          const remainingTime = getRemainingSessionTime()
          setSessionTime(remainingTime)
          
          // Warn user when session is about to expire (5 minutes left)
          if (remainingTime <= 5 && remainingTime > 0) {
            const shouldExtend = window.confirm(
              `Votre session expire dans ${remainingTime} minutes. Voulez-vous la prolonger ?`
            )
            if (shouldExtend) {
              extendSession()
              setSessionTime(getRemainingSessionTime())
            }
          }
          
          // Auto logout when session expires
          if (remainingTime <= 0) {
            handleLogout()
          }
        } else {
          handleLogout()
        }
      }, 60000) // Check every minute
      
      // Extend session on user activity
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
      let lastActivity = Date.now()
      
      const handleActivity = () => {
        const now = Date.now()
        // Only extend session if 5 minutes have passed since last extension
        if (now - lastActivity > 5 * 60 * 1000) {
          if (isAuthenticated()) {
            extendSession()
            setSessionTime(getRemainingSessionTime())
          }
          lastActivity = now
        }
      }
      
      activityEvents.forEach(event => {
        document.addEventListener(event, handleActivity, true)
      })
      
      return () => {
        clearInterval(sessionInterval)
        activityEvents.forEach(event => {
          document.removeEventListener(event, handleActivity, true)
        })
      }
    }, [])

    const checkAuth = () => {
      const authenticated = isAuthenticated()
      setIsAuth(authenticated)
      setIsLoading(false)
      
      if (!authenticated) {
        router.push('/admin')
      } else {
        setSessionTime(getRemainingSessionTime())
      }
    }

    const handleLogout = () => {
      logout()
      setIsAuth(false)
      router.push('/admin')
    }

    if (isLoading) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Vérification de l'authentification...</p>
          </div>
        </div>
      )
    }

    if (!isAuth) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Accès non autorisé</h1>
            <p className="text-gray-400 mb-4">Vous devez vous connecter pour accéder à cette page.</p>
            <button
              onClick={() => router.push('/admin')}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
            >
              Aller à la page de connexion
            </button>
          </div>
        </div>
      )
    }

    // Render the wrapped component with session info
    return (
      <div className="relative">
        {/* Session indicator */}
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm border border-gray-600">
          <span className="text-gray-300">Session: </span>
          <span className={sessionTime <= 10 ? 'text-red-400' : 'text-green-400'}>
            {sessionTime}min
          </span>
          <button
            onClick={handleLogout}
            className="ml-2 text-red-400 hover:text-red-300 text-xs"
            title="Déconnexion"
          >
            ✕
          </button>
        </div>
        
        <WrappedComponent {...props} />
      </div>
    )
  }
}