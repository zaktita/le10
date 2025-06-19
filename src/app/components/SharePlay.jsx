'use client';
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import The10Logo from '@/assets/the10_gradient.svg'

export const SharePlay = () => {
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

  // Create array of text lines for staggered animation
  const textLines = [
    { text: <>Celui qui <span className="text-[#FFB43D] font-medium">crée</span>. Celui qui régale.</> },
    { text: <>Celui qui fait la passe <span className="text-[#FFB43D] font-medium">décisive</span>.</> },
    { text: <><span className="text-[#FFB43D] font-medium">Créateurs</span> dans le jeu comme dans l&apos;info.</> },
    { text: <>Nous sommes la <span className="text-[#FFB43D] font-medium">nouvelle génération</span> de 
      <span className="md:hidden"> </span>
      <br className="hidden md:block" />
      journalistes sportifs.</> },
    { text: <>Génération <span className="text-[#FFB43D] font-medium">2030</span>.</> },
    { text: <>Que des titulaires. Que des <span className="text-[#FFB43D] font-medium">numéros 10</span>.</> },
    { text: <>Une équipe. Un collectif.</> },
    { text: <>Unis par <span className="text-[#FFB43D] font-medium">la passion</span>, liés par l&apos;amitié.</> },
    { text: <>Joueurs, audacieux, <span className="text-[#FFB43D] font-medium">imprévisibles</span>.</> }
  ];

  return (
    <div 
      ref={sectionRef}
      className="flex flex-col md:flex-row items-center justify-between py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto gap-4 md:gap-8 bg-transparent md:-mt-36 mb-16 md:mb-30"
    >
      {/* Logo/Number section */}
      <div className={`w-full md:w-1/2 relative mt-44 md:mt-0 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <div className="relative h-[250px] md:h-[450px] w-full">
          <Image
            src={The10Logo}
            alt="The 10 Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Text content section */}
      <div className={`w-full md:w-1/2 text-gray-200 text-center md:text-left transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <h1 className={`text-4xl md:text-6xl font-bold text-[#FFB43D] tracking-wider mb-3 md:mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '200ms' }}>
            Create Share <span className="text-white">PLAY</span>
        </h1>
        
        {textLines.map((line, index) => (
          <p 
            key={index} 
            className={`text-l md:text-2xl font-light mb-1 md:mb-2 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            {line.text}
          </p>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatLogo {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .relative.h-\\[250px\\].md\\:h-\\[450px\\].w-full {
          animation: ${isInView ? 'floatLogo 4s ease-in-out infinite' : 'none'};
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  )
}
