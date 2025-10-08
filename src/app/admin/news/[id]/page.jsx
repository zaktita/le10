'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ImageUpload from '../../../components/ImageUpload'

export default function EditNews({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    conceptId: '',
    tags: '',
    featuredImage: '',
    contentTitle: '',
    contentDescription: '',
    contentLink: '',
    publishedAt: ''
  })
  const [concepts, setConcepts] = useState([])
  const [loading, setLoading] = useState(true)
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
    fetchNews()
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

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${id}`)
      const data = await response.json()

      if (data.success) {
        const article = data.article
        setFormData({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          conceptId: article.conceptId || '',
          tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
          featuredImage: article.featuredImage || '',
          contentTitle: article.contentTitle || '',
          contentDescription: article.contentDescription || '',
          contentLink: article.contentLink || '',
          publishedAt: new Date(article.publishedAt).toISOString().split('T')[0]
        })
      } else {
        alert('Erreur lors du chargement du post')
        router.push('/admin/news')
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      alert('Erreur lors du chargement du post')
      router.push('/admin/news')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Process tags
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const articleData = {
        ...formData,
        tags,
        conceptId: formData.conceptId ? parseInt(formData.conceptId) : null
      }

      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Post modifié avec succès!')
        router.push('/admin/news')
      } else {
        alert('Erreur: ' + data.error)
      }
    } catch (error) {
      console.error('Failed to update article:', error)
      alert('Erreur lors de la modification du post')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Link href="/admin/news" className="text-yellow-400 hover:text-yellow-300">
            ← Posts
          </Link>
          <h1 className="text-xl font-bold">Modifier le Post</h1>
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date de publication *
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image mise en avant
                </label>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  type="content"
                  placeholder="Image mise en avant du contenu"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Résumé/Extrait *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Résumé de l'article qui apparaîtra dans la liste..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contenu complet *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Contenu complet de l'article..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titre du contenu
                </label>
                <input
                  type="text"
                  name="contentTitle"
                  value={formData.contentTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Titre affiché dans la page de contenu détaillé"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description du contenu
                </label>
                <textarea
                  name="contentDescription"
                  value={formData.contentDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Description détaillée pour la page de contenu..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lien du contenu
                </label>
                <input
                  type="url"
                  name="contentLink"
                  value={formData.contentLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="https://le10.ma/lien-vers-article-complet"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="tag1, tag2, tag3..."
                />
                <p className="text-sm text-gray-400 mt-1">
                  Séparez les tags par des virgules (ex: actualité, événement, important)
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/admin/news"
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded text-center hover:bg-gray-600 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {saving ? 'Modification...' : 'Modifier le post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}