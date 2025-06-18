import React from 'react'
import Image from 'next/image'
import The10Logo from '@/assets/the10_gradient.svg'

export const SharePlay = () => {
  return (
    <div className="flex md:-mt-36 mb-30 flex-col md:flex-row items-center justify-between py-16 px-8 max-w-7xl mx-auto gap-8 bg-transparent">
      {/* Logo/Number section */}
      <div className="w-full md:w-1/2 relative ">
        <div className="relative h-[450px] w-full">
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
      <div className="w-full md:w-1/2 text-gray-200">

        <h1 className="text-6xl font-bold text-[#FFB43D] tracking-wider mb-4">
            Create Share <span className="text-white">PLAY</span>
            </h1>
        
        <p className="text-2xl font-light mb-2">
          Celui qui <span className="text-[#FFB43D] font-medium">crée</span>. Celui qui régale.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Celui qui fait la passe <span className="text-[#FFB43D] font-medium">décisive</span>.
        </p>
        
        <p className="text-2xl mb-2">
          <span className="text-[#FFB43D] font-medium">Créateurs</span> dans le jeu comme dans l&apos;info.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Nous sommes la <span className="text-[#FFB43D] font-medium">nouvelle génération</span>  de 
          <br />
        journalistes sportifs.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Génération <span className="text-[#FFB43D] font-medium">2030</span>.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Que des titulaires. Que des <span className="text-[#FFB43D] font-medium">numéros 10</span>.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Une équipe. Un collectif.
        </p>
        
        <p className="text-2xl font-light mb-2">
          Unis par <span className="text-[#FFB43D] font-medium">la passion</span>, liés par l&apos;amitié.
        </p>
        
        <p className="text-2xl font-light">
          Joueurs, audacieux, <span className="text-[#FFB43D] font-medium">imprévisibles</span>.
        </p>
      </div>
    </div>
  )
}
