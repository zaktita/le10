'use client';
import React, { useEffect, useState, useRef } from 'react'
import BgImage from '../../assets/background-cta.png'

const Startfreetrail = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
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
      className="w-full py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 relative flex flex-col md:flex-row md:items-start md:justify-between"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 opacity-90"></div>
      
      {/* Content */}
      <div className={`w-full md:w-2/3 relative z-10 mb-6 md:mb-0 text-center md:text-left px-4 sm:px-0 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
           style={{ transitionDelay: '200ms' }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Start your free trial today!</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-md mx-auto md:mx-0">
          This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
        </p>
      </div>
      
      <div className={`w-full md:w-auto flex justify-center md:justify-end relative z-10 mt-4 md:mt-0 px-0 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
           style={{ transitionDelay: '400ms' }}>
        <button 
          className="bg-[#FFB43D] hover:bg-[#e09b26] text-black font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl rounded-0 sm:rounded-[4px] transition-colors duration-200 px-4 py-2 sm:py-3 w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[78px] flex items-center justify-center"
        >
          COLLABORER
        </button>
      </div>
    </div>
  )
}

export default Startfreetrail