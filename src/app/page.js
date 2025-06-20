'use client';

import Image from 'next/image';
import Logo from '@/assets/logo.png';
import HeroBg from '@/assets/hero-bg.png';
import PodcastThumbnail from '@/assets/podcast-thumbnail.png';
import Footer from './footer';
import { Anton, Lato } from 'next/font/google';
import { useState } from 'react';
import PodcastsSection from './components/PodcastsSection';
import NavBar from './components/NavBar';
import testimage from '../assets/test.jpg'
import testimage2 from '../assets/test2.jpg'
import testimage3 from '../assets/test3.jpg'
import testimage4 from '../assets/test4.jpg'
import actualités from '../assets/actualités.jpg'
import actualités2 from '../assets/actualités2.jpg'
import actualités3 from '../assets/actualités3.jpg'
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contentCards = [
    {
      id: 1,
      image: testimage,
      title: "أخرهم شرقي وأبرزهم بنزيما.. ما أشهر صفقات منجم ليون؟",
      category: "LOREM",
      categoryColor: "bg-[#FFB43D]"
    },
    {
      id: 2,
      image: testimage2,
      title: "أخرهم شرقي وأبرزهم بنزيما.. ما أشهر صفقات منجم ليون؟",
      category: "SPORTS",
      categoryColor: "bg-green-500"
    },
    {
      id: 3,
      image: testimage3,
      title: "أخرهم شرقي وأبرزهم بنزيما.. ما أشهر صفقات منجم ليون؟",
      category: "NEWS",
      categoryColor: "bg-blue-500"
    },
    {
      id: 4,
      image: testimage4,
      title: "أخرهم شرقي وأبرزهم بنزيما.. ما أشهر صفقات منجم ليون؟",
      category: "LOREM",
      categoryColor: "bg-orange-500"
    },
  ];

  const actualitesCards = [
    {
      id: 1,
      image: actualités3,
      title: "Un Moment Historique à Ne Pas Manquer",
      description: "Les Marocains vivent une période exceptionnelle autour du sport. Entre la CAN Féminine (juillet 2025), la CAN Masculine (décembre 2025) et la Coupe du Monde 2030, l’enthousiasme est à son comble. Le 10 capte cette énergie nationale pour connecter les marques à une audience jeune, fière et engagée.",
      category: "SPORTS",
      categoryColor: "bg-blue-500"
    },
    {
      id: 2,
      image: actualités2,
      title: "Plus Qu’un Média, Une Communauté",
      description: "THE 10 rassemble une nouvelle génération de passionnés de sport à travers des contenus qui mêlent entertainment, infotainment et culture populaire. Vidéos virales, podcasts, formats courts : notre écosystème média crée du lien, de l’émotion, et une fidélité organique.",
      category: "SPORTS",
      categoryColor: "bg-blue-500"
    },
    {
      id: 3,
      image: actualités,
      title: "Un Média Responsable, Inclusif et Qui Fait du Bruit",
      description: "Nous portons une vision inclusive et moderne du sport : femmes, hommes, toutes origines et toutes disciplines confondues. Engagé sur les valeurs et audacieux dans le ton, THE 10 est un média pop, ancré dans le réel, et prêt à faire rayonner les marques qui partagent ces convictions.",
      category: "SPORTS",
      categoryColor: "bg-blue-500"
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative  min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${HeroBg.src})` }}>
        {/* Navigation */}
        <NavBar />

        {/* Hero Content */}
        <div className="relative flex items-center justify-center min-h-[calc(100vh-96px)] mt-[-70px]">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl flex flex-col justify-center items-center sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                <div className="inline-block mb-2">
                  INFORMER AVEC <span className="text-yellow-500">PASSION</span>
                </div>
                <div className="inline-block">
                  TOUTE UNE <span className="text-purple-500">GÉNÉRATION</span>
                </div>
              </h1>
              <p className="text-white/50 text-sm sm:text-md lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 mt-12">
                LE 10, c'est plus qu'un média sportif : c'est le reflet d'une génération qui vit le sport avec
                passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une
                communauté engagée, portée par des événements historiques, des formats innovants, et
                des valeurs fortes : inclusion, proximité, et impact culturel.
              </p>
              <div className="flex justify-center">
                <button className="bg-yellow-500 text-black font-black text-xl py-4 px-12 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200 ">
                  COLLABORER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Podcasts Section */}
      <PodcastsSection />

      {/* Concepts Section */}
      <section className="relative bg-black py-20 mt-24">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-4 lg:mb-0">CONCEPTS</h2>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <button className="bg-yellow-500 text-black font-bold text-xl py-4 px-12 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200 font-lato">
                VOIR PLUS
              </button>
            </div>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {contentCards.map((card) => (
              <div key={card.id} className="relative w-full aspect-[9/16] bg-black text-white overflow-hidden rounded-lg">
                {/* Background Image */}
                <img
                  src={card.image.src}
                  alt="Background"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10 z-10">
                  <div className="flex flex-col items-end space-y-2 sm:space-y-3">
                    <span className={`${card.categoryColor} text-white px-3 sm:px-4 pl-1 py-1 text-xs font-light`} style={{
                      clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)'
                    }}>
                      {card.category}
                    </span>
                    <h1 className="text-right text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                      {card.title}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-black py-20 ">
        <div className="container mx-auto px-6">
        

          {/* Header avec titre, bouton et ligne sur la même ligne */}
          <div className="flex items-center gap-8 mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex-shrink-0">
              Actualités
            </h1>
            <div className="flex-1 border-t border-dotted border-gray-600"></div>
            <button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors duration-300 px-6 py-2 rounded-full flex-shrink-0"
            >
              Tout Voir
            </button>
          </div>


          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {actualitesCards.map((card) => (
              <div key={card.id} className="relative w-full aspect-[5/7] bg-black text-white overflow-hidden rounded-xl">
                {/* Background Image */}
                <img
                  src={card.image.src}
                  alt="Background"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10 z-10">
                  <div className="flex flex-col items-end space-y-2 sm:space-y-3">
                    <h1 className="text-white px-2 sm:px-4 py-1 text-xl sm:text-2xl lg:text-[32px] font-light mr-0 sm:mr-4 lg:mr-10">
                      {card.title}
                    </h1>
                    <p className="text-left text-sm sm:text-base lg:text-[18px] font-extralight leading-tight">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black py-20 mt-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-black to-yellow-800 rounded-lg p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left max-w-2xl mb-10 md:mb-0">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Start your free trial today!
              </h2>
              <p className="text-base md:text-lg font-lato">
                This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
              </p>
            </div>
            <button className="bg-yellow-500 text-black font-black text-xl py-4 px-12 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200 font-lato">
              COLLABORER
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}