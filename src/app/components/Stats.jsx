'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import phoneImage from '../../assets/phone-mockup.png';
import bottomImage2 from '../../assets/bottom-image2.png'; // Add this import
import { PourquoiLe10 } from './PourquoiLe10';

const Stats = () => {
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

  const socialStats = [
    {
      platform: 'Instagram',
      icon: '/icons/instagram.svg',
      count: '12,4 k',
      color: 'bg-[#FFB43D]',
      textColor: 'text-black',
      description: 'Lorem ipsum dolor sit amet consectetur.Consectetur sed etiam arcu egestas a eu amet.'
    },
    {
      platform: 'YouTube',
      icon: '/icons/ytb.png',
      count: '4K',
      color: 'bg-[#3A4A85]',
      textColor: 'text-white',
      description: 'Lorem ipsum dolor sit amet consectetur.Consectetur sed etiam arcu egestas a eu amet.'
    },
    {
      platform: 'TikTok',
      icon: '/icons/tiktok.svg',
      count: '6,6 k',
      color: 'bg-[#FFB43D]',
      textColor: 'text-black',
      description: 'Lorem ipsum dolor sit amet consectetur.Consectetur sed etiam arcu egestas a eu amet.'
    }
  ];

  return (
    <>
      <div 
        ref={sectionRef}
        className="w-full py-12 md:py-16 lg:py-24 px-0 sm:px-4 md:px-6 lg:px-12 xl:px-20 overflow-hidden my-8 md:my-12 lg:my-16 relative">
        <div className="max-w-9xl mx-auto relative z-10 px-4 sm:px-0">
          {/* Stats and Phone Display */}
          <div className="flex flex-col lg:flex-row justify-between items-center md:mb-32 lg:mb-44">
            {/* Stats Cards */}
            <div className={`w-full lg:w-1/2 space-y-4 md:space-y-6 mb-12 md:mb-16 lg:mb-0 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className={`mb-8 md:mb-12 lg:mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: '200ms' }}>
                <h3 className="text-amber-500 font-semibold mb-2 md:mb-3 text-sm md:text-base">Stats</h3>
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                  Le 10 en chiffres
                </h2>
                <p className="text-gray-300 max-w-3xl text-sm md:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. At aliquet turpis et ac praesent.
                  Senectus convallis lacus diam ut. Felis massa mauris proin at. Tempor vestibulum ac dui egestas duis nisl dignissim lorem pharetra.
                  Eleifend ut congue at blandit adipiscing massa. Consectetur sed etiam arcu egestas a eu amet.
                </p>
              </div>
              {socialStats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="min-w-[40px] md:min-w-[48px] mr-0 sm:mr-4 md:mr-5 mb-3 sm:mb-0">
                    <Image
                      src={stat.icon}
                      alt={stat.platform}
                      width={40}
                      height={40}
                      className="md:w-12 md:h-12"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center w-full">
                    <span className={`text-2xl md:text-3xl lg:text-4xl font-bold sm:mx-2 md:mx-4 mb-2 sm:mb-0 ${stat.textColor}`}>
                      {stat.count}
                    </span>
                    <p className={`text-black/90 text-sm md:text-base sm:ml-2 md:ml-4 max-w-lg ${stat.textColor} leading-relaxed`}>
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Mockup */}
            <div className={`w-full lg:w-1/2 flex justify-center lg:justify-end relative transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                style={{ transitionDelay: '300ms' }}>
              <div className={`relative w-[400px] h-[356px] sm:w-[400px] sm:h-[341px] md:w-[600px] md:h-[511px] lg:w-[750px] lg:h-[639px] xl:w-[916px] xl:h-[780px] transition-transform duration-1000 ${isInView ? 'scale-100' : 'scale-95'}`}
                  style={{ transitionDelay: '500ms' }}>
                <Image
                  src={phoneImage}
                  alt="Le10 Mobile App"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Phone Glow Effect */}
              <div className={`absolute bottom-0 -right-10 md:-right-20 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-amber-500/20 blur-[50px] md:blur-[100px] rounded-full -z-10 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: '700ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatPhone {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        
        .relative.w-\\[400px\\].h-\\[356px\\].sm\\:w-\\[400px\\].sm\\:h-\\[341px\\].md\\:w-\\[600px\\].md\\:h-\\[511px\\].lg\\:w-\\[750px\\].lg\\:h-\\[639px\\].xl\\:w-\\[916px\\].xl\\:h-\\[780px\\] {
          animation: ${isInView ? 'floatPhone 6s ease-in-out infinite' : 'none'};
          animation-delay: 1000ms;
        }
        
        @keyframes pulseGlow {
          0% { opacity: 0.2; }
          50% { opacity: 0.3; }
          100% { opacity: 0.2; }
        }
        
        .absolute.bottom-0.-right-10.md\\:-right-20.w-\\[300px\\].md\\:w-\\[600px\\].h-\\[150px\\].md\\:h-\\[300px\\].bg-amber-500\\/20 {
          animation: ${isInView ? 'pulseGlow 4s ease-in-out infinite' : 'none'};
          animation-delay: 1200ms;
        }
      `}</style>
    </>
  );
};

export default Stats;