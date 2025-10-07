'use client';

import Image from 'next/image';
import Logo from '@/assets/logo.png';
import HeroBg from '@/assets/hero-bg.png';
import PodcastThumbnail from '@/assets/podcast-thumbnail.png';
import Footer from './footer';
import { Anton, Lato } from 'next/font/google';
import { useState, useEffect } from 'react';
import PodcastsSection from './components/PodcastsSection';
import NavBar from './components/NavBar';
import actualités from '../assets/actualités.jpg'
import actualités2 from '../assets/actualités2.jpg'
import actualités3 from '../assets/actualités3.jpg'
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contentCards, setContentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentCards();
  }, []);

  const handlePostClick = (contentLink) => {
    if (contentLink) {
      window.open(contentLink, '_blank', 'noopener,noreferrer');
    }
  };

  const fetchContentCards = async () => {
    try {
      const [conceptsRes, newsRes] = await Promise.all([
        fetch('/api/concepts'),
        fetch('/api/news')
      ]);
      
      const conceptsData = await conceptsRes.json();
      const newsData = await newsRes.json();
      
      if (conceptsData.success && newsData.success) {
        // Transform news data to match the expected format and limit to first 4 items
        const transformedContent = (newsData.data || []).slice(0, 4).map(item => {
          const concept = (conceptsData.data || []).find(c => c.id === item.conceptId);
          return {
            id: item.id,
            image: { src: item.featuredImage || '/assets/test.jpg' },
            title: item.title,
            category: concept ? concept.title : 'Non catégorisé',
            categoryColor: concept ? concept.categoryColor : 'bg-gray-500',
            contentLink: item.contentLink
          };
        });
        setContentCards(transformedContent);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

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
<div className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${HeroBg.src})` }}>
        {/* Navigation */}
        <NavBar />

        {/* Hero Content - Improved Responsiveness */}
        <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] mt-[-40px] sm:mt-[-70px]">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl flex flex-col justify-center items-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight">
                <div className="inline-block mb-1 sm:mb-2">
                  INFORMER AVEC <span className="text-yellow-500">PASSION</span>
                </div>
                <div className="inline-block">
                  TOUTE UNE <span className="text-purple-500">GÉNÉRATION</span>
                </div>
              </h1>
              <p className="text-white/50 text-xs sm:text-sm md:text-base lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                LE 10, c&apos;est plus qu&apos;un média sportif : c&apos;est le reflet d&apos;une génération qui vit le sport avec
                passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une
                communauté engagée, portée par des événements historiques, des formats innovants, et
                des valeurs fortes : inclusion, proximité, et impact culturel.
              </p>
              <div className="flex justify-center">
                <Link href="/about" passHref>
                <button className="bg-yellow-500 cursor-pointer text-black font-bold text-base sm:text-lg md:text-xl py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200">
                  COLLABORER
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Podcasts Section */}
      <PodcastsSection />

      {/* Concepts Section */}
<section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-6">
          {/* Section Header */}
           <div className="flex items-center justify-between gap-4 mb-12 sm:mb-16 md:mb-20">
  {/* Left side with title and line */}
  <div className="flex items-center gap-4 flex-1">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white flex-shrink-0">
      Concepts
    </h1>
    <div className="hidden sm:block flex-1 border-t border-dotted border-gray-600"></div>
  </div>
  
  {/* Button */}
  <Link href="/nosconcepts" passHref>
    <button
      variant="outline"
      className="bg-transparent cursor-pointer border border-white text-white hover:bg-white hover:text-black 
        transition-colors duration-300 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full flex-shrink-0 
        text-xs sm:text-sm md:text-base whitespace-nowrap"
    >
      Tout Voir
    </button>
  </Link>
</div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative w-full aspect-[9/16] bg-gray-800 animate-pulse rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10">
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-6 bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              contentCards.map((card) => (
                <div 
                  key={card.id} 
                  className="relative w-full aspect-[9/16] bg-black text-white overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => handlePostClick(card.contentLink)}
                >
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
                        clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 15% 0%)'
                      }}>
                        {card.category}
                    </span>
                    <h1 className="text-right text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                      {card.title}
                    </h1>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Partners Section */}
<section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-6">
        

          {/* Header avec titre, bouton et ligne sur la même ligne */}
         <div className="flex items-center justify-between gap-4 mb-12 sm:mb-16 md:mb-20">
  {/* Left side with title and line */}
  <div className="flex items-center gap-4 flex-1">
    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white flex-shrink-0">
      Actualités
    </h3>
    <div className="hidden sm:block flex-1 border-t border-dotted border-gray-600"></div>
  </div>
  
  {/* Button */}
  <Link href="/actualites" passHref>
    <button
      variant="outline"
      className="bg-transparent cursor-pointer border border-white text-white hover:bg-white hover:text-black 
        transition-colors duration-300 px-3 sm:px-4 md:px-6 py-2 sm:py-2 rounded-full flex-shrink-0 
        text-xs sm:text-sm md:text-base whitespace-nowrap"
    >
      Tout Voir
    </button>
  </Link>
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
                    <h1 className="text-white  py-1 text-xl sm:text-2xl lg:text-[32px] font-light mr-0 sm:mr-4 lg:mr-10">
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

      
      <Footer />
    </>
  )
}