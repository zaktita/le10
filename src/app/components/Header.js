'use client';

import React from 'react';

function Header() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] text-center px-4 md:px-8 lg:px-16 py-8 md:py-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white font-anton text-3xl xs:text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-8xl leading-tight">
          INFORMER AVEC <span className="text-orange-500">PASSION</span>
          <br className="md:block hidden" />
          <span className="md:hidden"> </span>
          TOUTE UNE <span className="text-orange-500">GÉNÉRATION</span>
        </h1>
        <p className="font-lato text-white text-xs sm:text-sm md:text-base max-w-3xl mx-auto mt-4 md:mt-8 leading-relaxed px-2">
          LE 10, c'est plus qu'un média sportif : c'est le reflet d'une génération qui vit le sport avec passion, fierté et
          créativité. En collaborant avec nous, vous connectez votre marque à une communauté engagée, portée par des
          événements historiques, des formats innovants, et des valeurs fortes : inclusion, proximité, et impact culturel.
        </p>
      </div>
    </section>
  );
}

export default Header;