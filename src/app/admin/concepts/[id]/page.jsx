'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ImageUpload from '../../../components/ImageUpload'

export default function EditConcept({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryColor: 'bg-blue-500',
    featuredImage: '',
    contentTitle: '',
    contentDescription: '',
    contentLink: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { id } = params

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Bleu', color: '#3B82F6' },
    { value: 'bg-green-500', label: 'Vert', color: '#10B981' },
    { value: 'bg-yellow-500', label: 'Jaune', color: '#F59E0B' },
    { value: 'bg-red-500', label: 'Rouge', color: '#EF4444' },
    { value: 'bg-purple-500', label: 'Violet', color: '#8B5CF6' },
    { value: 'bg-orange-500', label: 'Orange', color: '#F97316' },
    { value: 'bg-pink-500', label: 'Rose', color: '#EC4899' },
    { value: 'bg-indigo-500', label: 'Indigo', color: '#6366F1' },
    { value: 'bg-[#FFB43D]', label: 'Doré', color: '#FFB43D' }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'authenticated') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    fetchConcept()
  }, [])

  const fetchConcept = async () => {
    try {
      const response = await fetch(`/api/concepts/${id}`)
      const data = await response.json()

      if (data.success) {
        setFormData({
          title: data.concept.title,
          description: data.concept.description,
          categoryColor: data.concept.categoryColor,
          featuredImage: data.concept.featuredImage || '',
          contentTitle: data.concept.contentTitle || '',
          contentDescription: data.concept.contentDescription || '',
          contentLink: data.concept.contentLink || ''
        })
      } else {
        alert('Erreur lors du chargement du concept')
        router.push('/admin/concepts')
      }
    } catch (error) {
      console.error('Failed to fetch concept:', error)
      alert('Erreur lors du chargement du concept')
      router.push('/admin/concepts')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/concepts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Concept modifié avec succès!')
        router.push('/admin/concepts')
      } else {
        alert('Erreur: ' + data.error)
      }
    } catch (error) {
      console.error('Failed to update concept:', error)
      alert('Erreur lors de la modification du concept')
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
          <Link href="/admin/concepts" className="text-yellow-400 hover:text-yellow-300">
            ← Concepts
          </Link>
          <h1 className="text-xl font-bold">Modifier le Concept</h1>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre du concept *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                placeholder="Ex: Ach ban lik ?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                placeholder="Description du concept..."
                required
              />
            </div>

            <div>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                type="concept"
                label="Image mise en avant"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre du contenu
              </label>
              <input
                type="text"
                name="contentTitle"
                value={formData.contentTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                placeholder="Titre affiché dans le contenu détaillé"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description du contenu
              </label>
              <textarea
                name="contentDescription"
                value={formData.contentDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                placeholder="Description détaillée du concept pour les pages de contenu..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lien du contenu
              </label>
              <input
                type="url"
                name="contentLink"
                value={formData.contentLink}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                placeholder="https://example.com/lien-vers-le-concept"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur de catégorie
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-2 p-2 border rounded cursor-pointer ${
                      formData.categoryColor === option.value 
                        ? 'border-yellow-500 bg-yellow-500 bg-opacity-20' 
                        : 'border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="categoryColor"
                      value={option.value}
                      checked={formData.categoryColor === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/admin/concepts"
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded text-center hover:bg-gray-600 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {saving ? 'Modification...' : 'Modifier le concept'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}