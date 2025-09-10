
import React from 'react'


const Startfreetrail = () => {


  return (
        <div className="mx-auto px-6">
          <div className="bg-gradient-to-r from-black to-yellow-800 rounded-lg p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left max-w-2xl mb-10 md:mb-0">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Rejoignez l’aventure LE 10 !
              </h2>
              <p className="text-base md:text-lg font-lato">
                Vous êtes une marque, une organisation ou un créateur ? Collaborez avec LE 10 pour toucher une génération passionnée, créative et engagée autour du sport et de la culture pop. Ensemble, créons des contenus impactants et des expériences uniques qui font vibrer la communauté.
              </p>
            </div>
            <button className="bg-yellow-500 text-black font-black text-xl py-4 px-12 rounded hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200 font-lato">
              COLLABORER
            </button>
          </div>
        </div>
  )
}

export default Startfreetrail