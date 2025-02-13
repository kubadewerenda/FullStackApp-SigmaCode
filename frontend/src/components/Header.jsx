import React from "react";

const Header = () => {
  return (
    <header className="header-bg">
      <div className="absolute top-1/2 left-0 h-5 w-[45%] bg-gray-300 opacity-50 transform -translate-y-1/2 shadow-xl blur-left"></div>

      <div className="absolute top-1/2 right-0 h-5 w-[45%] bg-gray-300 opacity-50 transform -translate-y-1/2 shadow-xl blur-right"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center relative z-10">
        <div className="flex justify-center md:justify-start pb-1">
          <h1 className="relative font-serif mb-1">
            <span className="header-tekst-l">OGŁOSZENIA </span> 
            <span className="header-tekst-r">Polska</span>
          </h1>
        </div>

        <div className="hidden md:flex justify-center mt-4 md:mt-0">
          <img src="/assets/polska_flaga.png" alt="Flaga" className="h-32" />
        </div>

        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <img src="/assets/polska_herb.png" alt="Herb Polski" className="h-24 w-auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;
