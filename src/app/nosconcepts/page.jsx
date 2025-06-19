'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import testimage from '../../assets/test.jpg'
import testimage2 from '../../assets/test2.jpg'

import testimage3 from '../../assets/test3.jpg'

import testimage4 from '../../assets/test4.jpg'


const page = () => {
  const [activeButton, setActiveButton] = useState(null);

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
      {/* News header section */}
      <div className="container mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-8xl font-bold mb-8 tracking-wide">Nos concepts</h1>

        <p className="max-w-4xl mx-auto text-[#AEAEAE] text-lg">
          LE 10, c'est plus qu'un média sportif : c'est le reflet d'une génération qui vit le sport avec passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
        </p>
      </div>

      {/* Concepts cards section */}
      <div className="px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => handleConceptClick(concept)}
              className={`flex items-center justify-center text-center cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300 min-h-[120px] p-6 rounded-lg  focus:ring-opacity-50 ${activeButton === concept.id
                ? 'text-yellow-300  border-transparent '
                : 'text-white border-transparent'
                }`}
            >
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-2">{concept.title}</h1>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content cards section */}
      <div className="p-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {contentCards.map((card) => (
            <div key={card.id} className="relative w-[400px] h-[700px] bg-black text-white overflow-hidden rounded-lg">
              {/* Background Image */}
              <img
                src={card.image.src}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <div className="flex flex-col items-end space-y-3">
                  <span className={`${card.categoryColor} text-white px-4 pl-1  py-1 text-xs font-light `} style={{
                    clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)'
                  }}>
                    {card.category}
                  </span>
                  <h1 className="text-right text-2xl  font-semibold leading-tight">
                    {card.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default page