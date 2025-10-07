'use client';
import React from 'react'
import NavBar from '../components/NavBar'
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import bgImage1 from '../../assets/img1.png';
import bgImage2 from '../../assets/img2.jpg';
import bgImage3 from '../../assets/img3.png';
import bottomImage from '../../assets/bottom-image.png'; // Import the bottom image

import Footer from '../footer';
const page = () => {
  const collaborationCards = [
    {
      title: "Un Moment Historique",
      subtitle: "à Ne Pas Manquer",
      description: "Les Marocains vivent une période exceptionnelle autour du sport. Entre la CAN Féminine (juillet 2025), la CAN Masculine (décembre 2025) et la Coupe du Monde 2030.",
      description2: "L'enthousiasme est à son comble. LE 10 capte cette énergie nationale pour connecter les marques à une audience jeune, fière et engagée.",
      bgImage: bgImage1,
      bgColor: "bg-gradient-to-br from-red-600 to-red-800"
    },
    {
      title: "Plus Qu'un Média,",
      subtitle: "Une Communauté",
      description: "THE 10 rassemble une nouvelle génération de passionnés de sport à travers des contenus qui mêlent entertainment, infotainment et culture populaire.",
      description2: "Vidéos virales, podcasts, formats courts : notre écosystème média crée du lien, de l'émotion, et une fidélité organique.",
      bgImage: bgImage2,
      bgColor: "bg-gradient-to-br from-blue-600 to-teal-600"
    },
    {
      title: "Un Média Responsable,",
      subtitle: "Inclusif et Qui Fait du Bruit",
      description: "Nous portons une vision inclusive et moderne du sport : femmes, hommes, toutes origines et toutes disciplines confondues.",
      description2: "Engagé sur les valeurs et audacieux dans le ton, THE 10 est un miroir de la nouvelle pop, ancré dans le réel, et prêt à faire rayonner les marques qui partagent ces convictions.",
      bgImage: bgImage3,
      bgColor: "bg-gradient-to-br from-teal-600 to-cyan-700"
    },
    {
      title: "Un Moment Historique",
      subtitle: "à Ne Pas Manquer",
      description: "Les Marocains vivent une période exceptionnelle autour du sport. Entre la CAN Féminine (juillet 2025), la CAN Masculine (décembre 2025) et la Coupe du Monde 2030.",
      description2: "L'enthousiasme est à son comble. LE 10 capte cette énergie nationale pour connecter les marques à une audience jeune, fière et engagée.",
      bgImage: bgImage1,
      bgColor: "bg-gradient-to-br from-red-600 to-red-800"
    },
    {
      title: "Plus Qu'un Média,",
      subtitle: "Une Communauté",
      description: "THE 10 rassemble une nouvelle génération de passionnés de sport à travers des contenus qui mêlent entertainment, infotainment et culture populaire.",
      description2: "Vidéos virales, podcasts, formats courts : notre écosystème média crée du lien, de l'émotion, et une fidélité organique.",
      bgImage: bgImage2,
      bgColor: "bg-gradient-to-br from-blue-600 to-teal-600"
    },
    {
      title: "Un Média Responsable,",
      subtitle: "Inclusif et Qui Fait du Bruit",
      description: "Nous portons une vision inclusive et moderne du sport : femmes, hommes, toutes origines et toutes disciplines confondues.",
      description2: "Engagé sur les valeurs et audacieux dans le ton, THE 10 est un miroir de la nouvelle pop, ancré dans le réel, et prêt à faire rayonner les marques qui partagent ces convictions.",
      bgImage: bgImage3,
      bgColor: "bg-gradient-to-br from-teal-600 to-cyan-700"
    }
  ];
  return (
    <>
      <div className="bg-black text-white">
        <NavBar />

        {/* News header section - made responsive */}
        <div className="container mx-auto px-4 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-6 sm:pb-8 md:pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-wide">
            ACTUALITÉS
          </h1>

          <p className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-[#AEAEAE] text-sm sm:text-base md:text-lg leading-relaxed">
            LE 10, c&lsquo;est plus qu&apos;un média sportif : c&apos;est le reflet d&apos;une génération qui vit le sport avec passion, fierté et
            créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des
            événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
          </p>
        </div>
        <div className="w-full bg-black py-6 md:py-8 lg:py-16 px-4 md:px-6 lg:px-12 xl:px-20">
          <div className="max-w-9xl mx-auto px-3 md:px-6 lg:px-8 xl:px-12">


            {/* Cards Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:gap-y-36 "
              initial="hidden"
              exit="exit"
            >
              {collaborationCards.map((card, index) => (
                <div
                  key={index}
                  custom={index}
                  className={`${card.bgColor} rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden relative min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] group hover:transform hover:scale-[1.02] transition-all duration-300`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={card.bgImage}
                      alt={`Background for ${card.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Background Image Overlay */}
                  <div className="absolute inset-0 bg-black/50 z-10"></div>

                  {/* Content */}
                  <div className="relative z-20 p-4 sm:p-5 md:p-6 lg:p-8 h-full flex flex-col justify-end text-white">
                    <div className="mb-3 md:mb-4 lg:mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold tracking-wide mb-1 md:mb-2 leading-tight">
                        {card.title}
                      </h3>
                      <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                        {card.subtitle}
                      </h3>
                      <p className="text-white/90 mb-2 md:mb-3 lg:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                        {card.description}
                      </p>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                        {card.description2}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      {/* <div className="w-full    mt-[-1425px] ">
          <Image
            src={bottomImage}
            alt="Line"
            width={1920}
            height={112}
            className="w-full block mx-auto"
          />
        </div> */}
      <div className="w-full  bg-black py-12 md:py-16 lg:py-24">
        <Footer />
      </div>
    </>
  )
}

export default page