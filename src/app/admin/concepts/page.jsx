'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ConceptsAdmin() {
  const [concepts, setConcepts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'authenticated') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    fetchConcepts()
  }, [])

  const fetchConcepts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/concepts')
      const data = await response.json()
      
      if (data.success) {
        setConcepts(data.data || [])
      } else {
        alert('Erreur lors du chargement des concepts')
        setConcepts([])
      }
    } catch (error) {
      console.error('Failed to fetch concepts:', error)
      alert('Erreur lors du chargement des concepts')
      setConcepts([])
    } finally {
      setLoading(false)
    }
  }

  const deleteConcept = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce concept ?')) return

    try {
      const response = await fetch(`/api/concepts?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        fetchConcepts() // Refresh list
        alert('Concept supprimé avec succès')
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Failed to delete concept:', error)
      alert('Erreur lors de la suppression')
    }
  }

  if (!isAuthenticated) {
    return <div>Redirection...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-yellow-400 hover:text-yellow-300">
              ← Admin
            </Link>
            <h1 className="text-xl font-bold">Gestion des Concepts</h1>
          </div>
          <Link
            href="/admin/concepts/new"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors font-medium"
          >
            + Nouveau Concept
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-12">
                        <div className="text-gray-400">Chargement des concepts...</div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Concepts ({concepts.length})
              </h2>
            </div>
            
            {!concepts || concepts.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                Aucun concept trouvé. 
                <Link href="/admin/concepts/new" className="text-yellow-600 hover:text-yellow-500 ml-1">
                  Créer le premier concept
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {concepts && concepts.map((concept) => (
                  <div key={concept.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span 
                          className={`${concept.categoryColor} w-4 h-4 rounded-full`}
                          title="Couleur de catégorie"
                        ></span>
                        <h3 className="text-lg font-medium text-gray-900">
                          {concept.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-1">{concept.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Créé le {new Date(concept.createdAt).toLocaleDateString('fr-FR')}
                        {concept.updatedAt !== concept.createdAt && (
                          <span> • Modifié le {new Date(concept.updatedAt).toLocaleDateString('fr-FR')}</span>
                        )}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/concepts/${concept.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => deleteConcept(concept.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Supprimer
                      </button>
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