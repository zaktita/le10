'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import testimage from '../../assets/test.jpg'
import testimage2 from '../../assets/test2.jpg'
import testimage3 from '../../assets/test3.jpg'
import testimage4 from '../../assets/test4.jpg'


const page = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set page as loaded after component mount for entrance animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const concepts = [
    {
      id: 1,
      title: "Nos Concepts",

    },
    {
      id: 2,
      title: "Nos Concepts",
    },
    {
      id: 3,
      title: "Nos Concepts",
    },
    {
      id: 4,
      title: "Nos Concepts",

    },
    {
      id: 5,
      title: "Nos Concepts",

    }
  ];

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
    }
  ];

  const handleConceptClick = (concept) => {
    setActiveButton(concept.id);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      {/* News header section - made responsive */}
      <div className={`container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 text-center transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-wide">
          Nos concepts
        </h1>

        <p className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-[#AEAEAE] text-sm sm:text-base md:text-lg">
          LE 10, c'est plus qu'un média sportif : c'est le reflet d'une génération qui vit le sport avec passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
        </p>
      </div>

      {/* Concepts cards section */}
      <div className={`px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {concepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => handleConceptClick(concept)}
              className={`flex items-center justify-center text-center cursor-pointer hover:opacity-90 hover:scale-105 
                transition-all duration-300 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-3 sm:p-4 md:p-6 rounded-lg
                focus:ring-opacity-50 transform ${activeButton === concept.id
                ? 'text-yellow-300 border-transparent scale-105'
                : 'text-white border-transparent'
                }`}
              style={{
                transitionDelay: `${100 + index * 100}ms`,
                animation: isLoaded ? `fadeInUp 0.6s ease-out ${100 + index * 100}ms both` : 'none'
              }}
            >
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{concept.title}</h1>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content cards section */}
      <div className={`px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {contentCards.map((card, index) => (
            <div 
              key={card.id} 
              className="relative w-full aspect-[4/7] bg-black text-white overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.02]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 z-10">
                <div className="flex flex-col items-end space-y-2 sm:space-y-3">
                  <span className={`${card.categoryColor} text-white px-2 sm:px-3 md:px-4 pl-1 py-1 text-xs font-light transform transition-transform duration-300 hover:translate-x-[-5px]`} style={{
                    clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)'
                  }}>
                    {card.category}
                  </span>
                  <h1 className="text-right text-base sm:text-xl md:text-2xl font-semibold leading-tight transform transition-all duration-300 hover:translate-x-[-5px]">
                    {card.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
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