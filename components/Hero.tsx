
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" 
          alt="ABC Academy Team" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl">
          <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-6 animate-fade-in uppercase">
            CITÉ ALIOUNE SOW DE GOLF, SÉNÉGAL
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase tracking-tighter">
            Plus qu'un <span className="text-orange-500">Club</span>,<br />Une <span className="text-orange-500">Famille</span>.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light leading-relaxed">
            Énergie, discipline et esprit d’équipe. Rejoignez l'élite du basketball sénégalais à l'ABC Academy.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#registration" className="bg-orange-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-orange-700 transition-all text-center shadow-2xl hover:scale-105 transform active:scale-95">
              REJOIGNEZ-NOUS
            </a>
            <a href="#programs" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all text-center active:scale-95">
              NOS PROGRAMMES
            </a>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end border-t border-white/20 pt-10">
          <div className="flex space-x-12">
            <div>
              <p className="text-4xl font-black text-orange-500">7</p>
              <p className="text-xs uppercase tracking-widest text-white/70">Coachs Experts</p>
            </div>
            <div>
              <p className="text-4xl font-black text-orange-500">100+</p>
              <p className="text-xs uppercase tracking-widest text-white/70">Jeunes Talents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
