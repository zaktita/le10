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
      <div className={`max-w-9xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '200ms' }}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center md:text-left">Pourquoi le 10 ?</h2>
        </div>
        <div className="text-white/80 mt-4 md:mt-0">
          <p className="text-base sm:text-lg text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur. At aliquet turpis et ac praesent.
            Senectus convallis lacus diam ut. Felis massa mauris proin at. Tempor vestibulum ac dui egestas
            duis nisl dignissim lorem pharetra. Eleifend ut congue at blandit adipiscing massa.
            Consectetur sed etiam arcu egestas a eu amet.
          </p>
        </div>
      </div>

      {/* Feature cards section */}
      <div className="flex justify-center w-full">
        <div className="max-w-9xl w-full flex flex-col sm:flex-row flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-48">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg p-16 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-between items-center relative overflow-hidden mx-auto sm:mx-0 transition-all duration-300 hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                backgroundImage: `url(${card.background.src})`,
                transitionDelay: `${10 + index * 10}ms`,
              }}
            >
              <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>

              {/* Content wrapper with equal spacing */}
              <div className="flex flex-col justify-between items-center h-full py-1">
                {/* Icon */}
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-transform duration-300 hover:scale-110">
                  <Image
                    src={card.icon}
                    alt={card.alt}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-black relative z-10 transition-transform duration-300 hover:scale-105">{card.title}</h3>

                {/* Description */}
                <p className="text-center relative z-10 text-gray-800 max-w-xs text-sm sm:text-base transition-opacity duration-300 hover:opacity-90">
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

