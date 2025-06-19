'use client';
import React, { useEffect, useState, useRef } from 'react'
import UnionImage from '../../assets/Union.png'
import DiamondOrange from '../../assets/_Path_.svg'
import DiamondWhite from '../../assets/_Path2_.svg'

const Comment_travailler_ensemble = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Create intersection observer to detect when section enters viewport
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

  return (
    <div 
      ref={sectionRef}
      className='min-h-screen bg-black text-white flex flex-col md:flex-row'>

      {/* Left side - Title */}
      <div className='w-full md:w-1/2 relative min-h-[30vh] md:min-h-screen flex items-start justify-center'
        style={{
          backgroundImage: `url(${UnionImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className='relative z-10 p-8 md:p-16 pt-16 md:pt-24 flex items-start'>
          <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
               style={{ transitionDelay: '300ms' }}>
            Comment<br />
            travailler ensemble ?
          </h1>
        </div>
      </div>

      {/* Right side - Services list */}
      <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 space-y-8 md:space-y-12 bg-black'>
        {/* Sponsoring */}
        <div className={`flex items-start transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '400ms' }}>
          <div className='flex flex-col items-center'>
            <img src={DiamondOrange.src} alt="Diamond" className={`w-[40px] md:w-[55px] h-[22px] md:h-[30px] flex-shrink-0 transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                 style={{ transitionDelay: '450ms' }} />
            <div className='w-[1px] h-16 md:h-20 bg-gray-500 mt-2 md:mt-4'></div>
          </div>
          <div className='ml-3 md:ml-4'>
            <h3 className='text-[#FFFFFF] font-bold text-base md:text-lg mb-1 md:mb-2'>SPONSORING DES ÉMISSIONS ET FORMATS EXISTANTS</h3>
            <p className='text-xs md:text-sm text-gray-300'>
              bénéficiez de nos audiences et placez votre marque en billboard d'entrée et / ou de sortie de nos contenus.
            </p>
          </div>
        </div>

        {/* Placement de produit */}
        <div className={`flex items-start transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '500ms' }}>
          <div className='flex flex-col items-center'>
            <img src={DiamondWhite.src} alt="Diamond" className={`w-[40px] md:w-[55px] h-[22px] md:h-[30px] flex-shrink-0 transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                 style={{ transitionDelay: '550ms' }} />
            <div className='w-[1px] h-16 md:h-20 bg-gray-500 mt-2 md:mt-4'></div>
          </div>
          <div className='ml-3 md:ml-4'>
            <h3 className='text-[#FFB43D] font-bold text-base md:text-lg mb-1 md:mb-2'>PLACEMENT DE PRODUIT</h3>
            <p className='text-xs md:text-sm text-gray-300'>
              vous êtes industriel de l'agroalimentaire, équipementier sportif, concessionnaire
              automobile ...
            </p>
            <p className='text-xs md:text-sm text-gray-300 mt-2'>
              étudions ensemble les opportunités de collaboration sur nos formats longs en
              podcast.
            </p>
          </div>
        </div>

        {/* Publi-reportage */}
        <div className={`flex items-start transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '600ms' }}>
          <div className='flex flex-col items-center'>
            <img src={DiamondOrange.src} alt="Diamond" className={`w-[40px] md:w-[55px] h-[22px] md:h-[30px] flex-shrink-0 transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                 style={{ transitionDelay: '650ms' }} />
            <div className='w-[1px] h-16 md:h-20 bg-gray-500 mt-2 md:mt-4'></div>
          </div>
          <div className='ml-3 md:ml-4'>
            <h3 className='text-[#FFFFFF] font-bold text-base md:text-lg mb-1 md:mb-2'>PUBLI-REPORTAGE</h3>
            <p className='text-xs md:text-sm text-gray-300'>
              vous souhaitez mettre en lumière un club, une académie de formation, une initiative
              liée au sport dans votre organisation ... discutons en !
            </p>
          </div>
        </div>

        {/* Production de contenu */}
        <div className={`flex items-start transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '700ms' }}>
          <div className='flex flex-col items-center'>
            <img src={DiamondWhite.src} alt="Diamond" className={`w-[40px] md:w-[55px] h-[22px] md:h-[30px] flex-shrink-0 transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                 style={{ transitionDelay: '750ms' }} />
            <div className='w-[1px] h-16 md:h-20 bg-gray-500 mt-2 md:mt-4'></div>
          </div>
          <div className='ml-3 md:ml-4'>
            <h3 className='text-[#FFB43D] font-bold text-base md:text-lg mb-1 md:mb-2'>PRODUCTION DE CONTENU / BRAND CONTENT</h3>
            <p className='text-xs md:text-sm text-gray-300'>
              le sport véhicule des valeurs universelles d'inclusion, de résilience, d'engagement,
              de solidarité...
            </p>
            <p className='text-xs md:text-sm text-gray-300 mt-2'>
              nous pouvons co-produire des formats adaptés aux valeurs de votre marque dans
              l'univers sportif.
            </p>
          </div>
        </div>

        {/* Événementiel sportif */}
        <div className={`flex items-start transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
             style={{ transitionDelay: '800ms' }}>
          <div className='flex flex-col items-center'>
            <img src={DiamondOrange.src} alt="Diamond" className={`w-[40px] md:w-[55px] h-[22px] md:h-[30px] flex-shrink-0 transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                 style={{ transitionDelay: '850ms' }} />
            <div className='w-[1px] h-16 md:h-20 bg-gray-500 mt-2 md:mt-4'></div>
          </div>
          <div className='ml-3 md:ml-4'>
            <h3 className='text-[#FFFFFF] font-bold text-base md:text-lg mb-1 md:mb-2'>ÉVÉNEMENTIEL SPORTIF</h3>
            <p className='text-xs md:text-sm text-gray-300'>
              vous souhaitez créer un événement/ une activation dans l'univers sportif, consultez
              nous
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        img.w-\\[40px\\].md\\:w-\\[55px\\].h-\\[22px\\].md\\:h-\\[30px\\].flex-shrink-0 {
          animation: ${isInView ? 'pulse 3s infinite' : 'none'};
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}

export default Comment_travailler_ensemble
