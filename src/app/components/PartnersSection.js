'use client';

import React from 'react';
import Image from 'next/image';

function PartnersSection() {
  // Placeholder for partner images
  const partnerImages = [
    { src: '/assets/concept-image-1.png', alt: 'Partner 1' },
    { src: '/assets/concept-image-2.png', alt: 'Partner 2' },
    { src: '/assets/concept-image-3.png', alt: 'Partner 3' },
    { src: '/assets/concept-image-4.png', alt: 'Partner 4' },
    // Add more partner images as needed
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-white font-anton text-4xl md:text-5xl lg:text-6xl">
          NOS PARTENAIRES
        </h2>
        <button className="bg-orange-500 text-white font-lato py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300">
          VOIR PLUS
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {partnerImages.map((image, index) => (
          <div key={index} className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={image.src}
              alt={image.alt}
              width={400} 
              height={500}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnersSection; 