'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ImageUpload from '../../../components/ImageUpload'

export default function NewNews() {
  const [formData, setFormData] = useState({
    title: '',
    conceptId: '',
    featuredImage: '',
    contentLink: ''
  })
  const [concepts, setConcepts] = useState([])
  const [saving, setSaving] = useState(false)
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
      const response = await fetch('/api/concepts')
      const data = await response.json()
      
      if (data.success) {
        setConcepts(data.data || [])
      } else {
        setConcepts([])
      }
    } catch (error) {
      console.error('Failed to fetch concepts:', error)
      setConcepts([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const articleData = {
        ...formData,
        excerpt: formData.title, // Use title as excerpt
        content: formData.title, // Use title as content
        tags: [], // Empty tags array
        contentTitle: formData.title, // Use title as contentTitle
        contentDescription: formData.title, // Use title as contentDescription
        publishedAt: new Date().toISOString().split('T')[0], // Today's date
        conceptId: formData.conceptId ? parseInt(formData.conceptId) : null
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Post créé avec succès!')
        router.push('/admin/news')
      } else {
        alert('Erreur: ' + data.error)
      }
    } catch (error) {
      console.error('Failed to create article:', error)
      alert('Erreur lors de la création du post')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isAuthenticated) {
    return <div>Redirection...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Link href="/admin/news" className="text-yellow-400 hover:text-yellow-300">
            ← Posts
          </Link>
          <h1 className="text-xl font-bold">Nouveau Post</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titre du post *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Titre du post..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Concept (Catégorie) *
                </label>
                <select
                  name="conceptId"
                  value={formData.conceptId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  required
                >
                  <option value="">Sélectionnez un concept pour ce post</option>
                  {concepts && concepts.length > 0 ? concepts.map((concept) => (
                    <option key={concept.id} value={concept.id}>
                      {concept.title} - {concept.description}
                    </option>
                  )) : (
                    <option disabled>Aucun concept disponible</option>
                  )}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Chaque post doit appartenir à un concept (catégorie)
                </p>
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                  type="content"
                  label="Image mise en avant *"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lien du contenu *
                </label>
                <input
                  type="url"
                  name="contentLink"
                  value={formData.contentLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="https://le10.ma/lien-vers-contenu-complet"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Lien qui s'ouvrira quand les utilisateurs cliquent sur le post
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/admin/news"
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded text-center hover:bg-gray-600 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition-colors disabled:opacity-50 font-medium"
              >
                {saving ? 'Création...' : 'Créer le post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}