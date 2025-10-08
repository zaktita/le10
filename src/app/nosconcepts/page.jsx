'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from '../components/NavBar'

const page = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [contentCards, setContentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set page as loaded after component mount for entrance animations
  useEffect(() => {
    setIsLoaded(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [conceptsRes, newsRes] = await Promise.all([
        fetch('/api/concepts'),
        fetch('/api/news')
      ]);
      
      const conceptsData = await conceptsRes.json();
      const newsData = await newsRes.json();
      
      if (conceptsData.success) {
        setConcepts(conceptsData.data || []);
      }
      
      if (newsData.success) {
        // Transform news data to match the expected format
        const transformedContent = (newsData.data || []).map(item => {
          // Find the concept for this content
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
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (contentLink) => {
    if (contentLink) {
      window.open(contentLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter cards by selected concept/category
  const filteredCards = selectedConcept
    ? contentCards.filter(card => card.category === selectedConcept)
    : contentCards;

  const handleConceptClick = (concept) => {
    setActiveButton(concept.id);
    setSelectedConcept(concept.title); // Set filter
  };

  // Reset filter button
  const handleResetFilter = () => {
    setActiveButton(null);
    setSelectedConcept(null);
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des concepts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      {/* News header section - made responsive */}
      <div className={`container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 text-center transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl uppercase tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-wide">
          Nos concepts
        </h1>

        <p className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-[#AEAEAE] text-sm sm:text-base md:text-lg">
          LE 10, c'est plus qu'un média sportif : c'est le reflet d'une génération qui vit le sport avec passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
        </p>
      </div>

      {/* Concepts cards section */}
      <div className={`px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-around flex-wrap gap-4 mb-6">
          <button
            onClick={handleResetFilter}
            className={`flex items-center justify-center text-center cursor-pointer min-h-[40px] px-4 py-2 rounded-lg transition-all duration-300
              text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2
              ${activeButton === null
                ? 'text-yellow-300 scale-105'
                : 'text-white'
              }`}
            style={{
              transitionDelay: `100ms`,
              animation: isLoaded ? `fadeInUp 0.6s ease-out 100ms both` : 'none'
            }}
          >
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Tous</span>
          </button>
          {concepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => handleConceptClick(concept)}
              className={`flex items-center justify-around text-center cursor-pointer min-h-[40px] px-4 py-2 rounded-lg transition-all duration-300
                text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2
                ${activeButton === concept.id
                  ? 'text-yellow-300 scale-105'
                  : 'text-white'
                }`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                animation: isLoaded ? `fadeInUp 0.6s ease-out ${200 + index * 100}ms both` : 'none'
              }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{concept.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content cards section */}
      <div className={`px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredCards.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              {loading ? 'Chargement...' : selectedConcept ? `Aucun contenu pour "${selectedConcept}".` : 'Aucun contenu disponible.'}
            </div>
          ) : (
            filteredCards.map((card, index) => (
              <div 
                key={card.id} 
                className="relative w-full aspect-[4/7] bg-black text-white overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.02] cursor-pointer my-2"
                onClick={() => handlePostClick(card.contentLink)}
                style={{
                  animation: isLoaded ? `fadeInUp 0.8s ease-out ${600 + index * 120}ms both` : 'none'
                }}
              >
                {/* Background Image */}
                <img
                  src={card.image.src}
                  alt="Background"
                  className="absolute top-0 left-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 z-10">
                  <div className="flex flex-col items-end space-y-2 sm:space-y-3">
                    <span className={`${card.categoryColor} text-white  px-4 py-2 text-xs font-light transform transition-transform duration-300 hover:translate-x-[-5px]`} style={{
                      clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 15% 0%)'
                    }}>
                      {card.category}
                    </span>
                    <h1 className="text-right text-base sm:text-xl md:text-2xl font-semibold leading-tight transform transition-all duration-300 hover:translate-x-[-5px]">
                      {card.title}
                    </h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default page