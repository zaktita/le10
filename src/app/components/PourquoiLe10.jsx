'use client';
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import backgroundImage from '../../assets/pourquoile10.jpg'
import card1 from '../../assets/card_1_background.png'
// Import additional card backgrounds
import card2 from '../../assets/card_2_background.png'

// Import icon images
import innovationIcon from '../../assets/hugeicons_ai-innovation-01.svg'
import engagementIcon from '../../assets/Engagement_élevé.svg'
import visibilityIcon from '../../assets/streamline_screen-broadcast.svg'


export const PourquoiLe10 = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Create intersection observer to detect when section enters and leaves viewport
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card data for mapping
  const cardsData = [
    {
      icon: innovationIcon,
      title: "Capacité à innover",
      description: "Et à proposer des formats qui feront bénéficier vos marques d'un brand content unique.",
      alt: "Innovation Icon",
      background: card1
    },
    {
      icon: engagementIcon,
      title: "Engagement élevé",
      description: "Contenus viraux adaptés aux réseaux sociaux, communauté très engagée",
      alt: "Engagement Icon",
      background: card2
    },
    {
      icon: visibilityIcon,
      title: "Visibilité renforcée",
      description: "Audience en croissance, media générationnel",
      alt: "Visibility Icon",
      background: card1
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full relative flex flex-col justify-center items-center py-10 sm:py-16 md:py-20 lg:py-[120px] px-4 sm:px-6 md:px-10 lg:px-[70px] gap-8 sm:gap-12 md:gap-16 lg:gap-[79px]"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'auto',
      }}>
      {/* Heading and intro section */}
      <div className={`max-w-9xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4  md:gap-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '200ms' }}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-left">Pourquoi le 10 ?</h2>
        </div>
        <div className="text-white/80 mt-4 md:mt-0">
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            LE 10 se distingue comme le média sportif de référence au Maroc, 
            combinant expertise journalistique et innovation digitale. 
            Notre approche unique mêle contenu premium, engagement communautaire 
            et formats innovants pour créer une expérience immersive autour du sport.
          </p>
        </div>
      </div>

      {/* Feature cards section */}
     <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl w-full flex flex-col lg:flex-row flex-wrap justify-center sm:justify-between items-center gap-8">
    {cardsData.map((card, index) => (
      <div
        key={index}
        className={`
          w-full sm:flex-1 max-w-sm
          aspect-[4/5] sm:aspect-[3/4] 
          rounded-2xl 
          p-6 sm:p-8 md:p-10 
          flex flex-col items-center 
          relative overflow-hidden 
          transition-all duration-500 
          hover:scale-105 
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{
          backgroundImage: `url(${card.background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transitionDelay: `${index * 80}ms`,
        }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent"></div>

        {/* Content */}
        <div className="flex flex-col justify-center items-center h-full z-10 space-y-4">
          {/* Icon */}
          <div className="w-20 h-20 md:w-20 md:h-20 transition-transform duration-300 hover:scale-110">
            <Image
              src={card.icon}
              alt={card.alt}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-center text-gray-900 mb-2 transition-transform duration-300 hover:scale-105">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-center text-gray-700 max-w-xs text-base sm:text-base lg:text-lg leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

