import React from 'react'
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
    <div className="w-full   relative flex flex-col justify-center items-center py-[120px] px-[70px] gap-[79px]"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '924px',
      }}>
      {/* Heading and intro section */}
      <div className="max-w-9xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-6xl md:text-7xl font-bold text-white ">Pourquoi le 10 ?</h2>
        </div>
        <div className="text-white/80">
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur. At aliquet turpis et ac praesent.
            Senectus convallis lacus diam ut. Felis massa mauris proin at. Tempor vestibulum ac dui egestas
            duis nisl dignissim lorem pharetra. Eleifend ut congue at blandit adipiscing massa.
            Consectetur sed etiam arcu egestas a eu amet.
          </p>
        </div>
      </div>

      {/* Feature cards section */}
      <div className="flex justify-center w-full">
        <div className="max-w-9xl w-full flex flex-wrap justify-center gap-48">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="w-[400px] h-[500px] rounded-lg p-24 flex flex-col justify-between items-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${card.background.src})`,
              }}
            >
              <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>

              {/* Content wrapper with equal spacing */}
              <div className="flex flex-col justify-between items-center h-full py-1 ">
                {/* Icon */}
                <div className="relative z-10 w-20 h-20">
                  <Image
                    src={card.icon}
                    alt={card.alt}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-center text-black relative z-10">{card.title}</h3>

                {/* Description */}
                <p className="text-center relative z-10 text-gray-800 max-w-xs">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

