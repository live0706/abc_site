
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          {/* Decorative L Element */}
          <div className="absolute -top-6 -left-6 w-32 h-32 border-l-8 border-t-8 border-orange-600 z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-8 border-b-8 border-orange-600 z-10"></div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://picsum.photos/id/73/800/600" 
              alt="ABC Training" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-orange-600 font-black tracking-widest text-sm uppercase">L'Histoire de l'ABC</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">NOTRE <span className="text-orange-600 underline decoration-4 underline-offset-8">PHILOSOPHIE</span></h2>
          </div>
          
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Fondée avec une vision claire par un passionné du ballon orange, l'ABC Academy est née de la volonté d'offrir aux jeunes de la Cité Alioune Sow et ses environs un cadre d'excellence.
            </p>
            <p>
              Notre fondateur a toujours cru que le sport est le meilleur vecteur de réussite sociale et personnelle. Ici, nous ne formons pas seulement des joueurs, nous bâtissons des citoyens responsables, disciplinés et ambitieux.
            </p>
            <p className="font-semibold text-gray-900 italic">
              "Le basketball n'est qu'un prétexte pour apprendre la vie, l'effort et la résilience."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl font-bold">1</span>
              </div>
              <span className="font-bold text-gray-800">Discipline</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl font-bold">2</span>
              </div>
              <span className="font-bold text-gray-800">Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
