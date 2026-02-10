import React from 'react';

const Gallery: React.FC = () => {
  // IMPORTANT: Assurez-vous que ces images existent dans le dossier `public/assets/images/`
  const images = [
    "/assets/images/image1.jpg",
    "/assets/images/image2.jpg",
    "/assets/images/image3.jpg",
    "/assets/images/image4.jpg",
    "/assets/images/image5.jpg"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 uppercase">
          En <span className="text-orange-600">Images</span>
        </h2>
        <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
          Découvrez l'ambiance, l'intensité et la passion qui animent nos entraînements et nos matchs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
        {/* Grande image principale */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer h-64 md:h-full">
          <img 
            src={images[0]} 
            alt="Galerie image 1" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <span className="text-white font-black text-2xl uppercase tracking-wider">Compétition</span>
          </div>
        </div>

        {/* Petites images */}
        <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer h-64 md:h-full">
          <img 
            src={images[1]} 
            alt="Galerie image 2" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer h-64 md:h-full">
          <img 
            src={images[2]} 
            alt="Galerie image 3" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer h-64 md:h-full">
          <img 
            src={images[3]} 
            alt="Galerie image 4" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer h-64 md:h-full">
          <img 
            src={images[4]} 
            alt="Galerie image 5" 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
