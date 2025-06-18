import React from 'react';
import Image from 'next/image';
import bgImage1 from '../../assets/img1.png';
import bgImage2 from '../../assets/img2.jpg'; // Add more images
import bgImage3 from '../../assets/img3.png'; // Add more images

const PourquoiCollaborer = () => {
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
        }
    ];

    return (
        <div className="w-full -mt-50  bg-black py-8 md:py-16 px-4 md:px-6 lg:px-12 xl:px-20">
            <div className="max-w-9xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
                {/* Header Section */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 my-16 md:my-24 lg:my-36">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                            Pourquoi le collaborer ?
                        </h2>
                    </div>
                    <div className="text-white/80">
                        <p className="text-base md:text-lg leading-relaxed">
                           LE 10, c’est plus qu’un média sportif : c’est le reflet d’une génération qui vit le sport avec passion, fierté et créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {collaborationCards.map((card, index) => (
                        <div
                            key={index}
                            className={`${card.bgColor} rounded-xl md:rounded-2xl overflow-hidden relative min-h-[700px] md:min-h-[700px] group hover:transform hover:scale-105 transition-all duration-300`}
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
                            <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-end text-white">
                                <div className="mb-4 md:mb-6">
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-wide mb-2 leading-tight">
                                        {card.title}
                                    </h3>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
                                        {card.subtitle}
                                    </h3>
                                    <p className="text-white/90 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                                        {card.description}
                                    </p>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        {card.description2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PourquoiCollaborer;