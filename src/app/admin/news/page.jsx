'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import withAdminAuth from '../../components/withAdminAuth'

function NewsAdmin() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      
      if (data.success) {
        setNews(data.data || [])
      } else {
        console.error('Failed to fetch news:', data.error)
        setNews([])
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      return
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setNews(news.filter(item => item.id !== id))
        alert('Post supprimé avec succès!')
      } else {
        alert('Erreur lors de la suppression: ' + data.error)
      }
    } catch (error) {
      console.error('Failed to delete news:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-yellow-400 hover:text-yellow-300">
              ← Tableau de bord
            </Link>
            <h1 className="text-xl font-bold">Gestion des Posts</h1>
          </div>
          <Link
            href="/admin/news/new"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors font-medium"
          >
            + Nouveau Post
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-400">Chargement des posts...</div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">
                Posts ({news ? news.length : 0})
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Chaque post appartient à un concept (catégorie)
              </p>
            </div>

            {!news || news.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400">
                Aucun post trouvé.
                <br />
                <Link href="/admin/news/new" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">
                  Créer le premier post
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {news && news.map((article) => (
                  <div key={article.id} className="px-6 py-4 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-white">
                            {article.title}
                          </h3>
                          {article.conceptId && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500 border-opacity-30">
                              Concept ID: {article.conceptId}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Publié le {formatDate(article.publishedAt)}</span>
                          {article.tags && article.tags.length > 0 && (
                            <span>• Tags: {article.tags.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <Link
                          href={`/admin/news/${article.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-400 hover:text-red-300 font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default withAdminAuth(NewsAdmin)