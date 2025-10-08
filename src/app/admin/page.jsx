'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { login, logout, isAuthenticated } from '../utils/auth'

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ concepts: 0, news: 0 })

  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuth(true)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    try {
      const [conceptsRes, newsRes] = await Promise.all([
        fetch('/api/concepts'),
        fetch('/api/news')
      ])
      
      const conceptsData = await conceptsRes.json()
      const newsData = await newsRes.json()
      
      setStats({
        concepts: conceptsData.success ? conceptsData.data.length : 0,
        news: newsData.success ? newsData.data.length : 0
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const success = login(password)
      if (success) {
        setIsAuth(true)
        setPassword('')
        await fetchStats()
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    setIsAuth(false)
    setPassword('')
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Admin LE 10</h1>
            <p className="text-gray-400 text-sm">Accès sécurisé au panneau d'administration</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Entrez le mot de passe"
                required
                disabled={loading}
              />
            </div>
            
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-xs">
              🔒 Accès protégé par authentification
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">Admin LE 10</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors text-white"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Concepts (Catégories)</h3>
            <p className="text-3xl font-bold text-yellow-400">{stats.concepts}</p>
            <p className="text-sm text-gray-400 mt-1">Catégories de contenu</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Posts</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.news}</p>
            <p className="text-sm text-gray-400 mt-1">Articles et posts</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/concepts">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg hover:border-yellow-500 transition-all cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">Gérer les Concepts</h3>
              <p className="text-gray-400">Créer et gérer les catégories de contenu. Chaque post appartient à un concept.</p>
              <div className="mt-4">
                <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium">
                  Gérer →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/admin/news">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg hover:border-blue-500 transition-all cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">Gérer les Posts</h3>
              <p className="text-gray-400">Créer des posts et articles. Chaque post doit être assigné à un concept.</p>
              <div className="mt-4">
                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                  Gérer →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Actions rapides</h3>
          <div className="space-y-2">
            <Link href="/admin/concepts/new" className="inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors mr-4 font-medium">
              + Nouveau Concept
            </Link>
            <Link href="/admin/news/new" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-medium">
              + Nouveau Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}