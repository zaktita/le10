"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Footer from '../footer'
import NavBar from '../components/NavBar'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const canSubmit = form.name.trim() && isValidEmail(form.email) && form.message.trim()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setSuccess(null)
    // Simulate submit (no backend in this repo)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    
    <main className="min-h-screen bg-black text-white  px-6 sm:px-8 md:px-12">
      <NavBar />
      <div className="max-w-7xl mx-auto">

                <div className="container mx-auto px-4 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-wide">
            Contact
          </h1>

          <p className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-[#AEAEAE] text-sm sm:text-base md:text-lg leading-relaxed">
            Pour toute demande commerciale, partenariat ou presse, envoyez-nous un message via le formulaire
            ou contactez-nous directement par téléphone / email. Nous répondrons dans les plus brefs délais.
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Form column */}
          <div className="lg:col-span-7 bg-gray-900/40 rounded-xl p-6 sm:p-8 md:p-10">
            <h2 className="text-xl font-semibold mb-4">Envoyer un message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2" htmlFor="name">Nom</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/60 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/60 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="votre@exemple.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/60 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Votre message..."
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className={`inline-flex items-center gap-3 bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition ${(!canSubmit || submitting) ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Envoi…' : 'Envoyer'}
                </button>

                {success === true && (
                  <span className="text-sm text-green-400">Message envoyé — merci !</span>
                )}
              </div>
            </form>
          </div>

          {/* Contact info column */}
          <aside className="lg:col-span-5 bg-transparent rounded-xl p-6 sm:p-8 md:p-10 flex flex-col gap-6">
            <div className="bg-gray-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Coordonnées</h3>
              <p className="text-gray-300 mb-2">Téléphone: <a href="tel:+212600000000" className="text-white hover:underline">+212 6 00 00 00 00</a></p>
              <p className="text-gray-300">Email: <a href="mailto:contact@le10.ma" className="text-white hover:underline">media@the10.ma</a></p>
            </div>

            <div className="bg-gray-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Réseaux sociaux</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="https://www.instagram.com/the10.off/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">YouTube</a></li>
              </ul>
            </div>

            <div className="bg-gray-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Infos légales</h3>
              <ul className="text-gray-300">
                <li><Link href="/mentions" className="hover:text-white">Mentions légales</Link></li>
                <li><Link href="/politique" className="hover:text-white">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
      <Footer/>
    </main>
  )
}
