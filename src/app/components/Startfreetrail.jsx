import React from 'react'
import BgImage from '../../assets/background-cta.png' // Assurez-vous que l'image existe à ce chemin

const Startfreetrail = () => {
  return (
    <div 
      className="w-full py-8 md:py-16 px-4 md:px-16 relative flex flex-col md:flex-row md:items-center md:justify-between"
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
      <div className="w-full md:w-2/3 relative z-10 mb-6 md:mb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Start your free trial today!</h2>
        <p className="text-sm sm:text-base text-gray-300">
          This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
        </p>
      </div>
      
      <div className="w-full md:w-auto flex justify-center md:justify-end relative z-10">
        <button 
          className="bg-[#FFB43D] hover:bg-[#e09b26] text-black font-light text-2xl md:text-4xl rounded-[4.11px]" 
          style={{ 
            width: '200px',
            height: '60px',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            '@media (min-width: 768px)': {
              width: '247.25px',
              height: '78.13px',
            }
          }}
        >
          COLLABORER
        </button>
      </div>
    </div>
  )
}

export default Startfreetrail