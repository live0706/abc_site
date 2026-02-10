
import React from 'react';

const PracticalInfo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-black mb-10 text-orange-500 uppercase">Infos <span className="text-white">Pratiques</span></h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-orange-600 w-1.5 h-6 mr-3"></span>
                HORAIRES
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-orange-500 text-sm font-black uppercase mb-1">Année Scolaire</p>
                  <p className="text-gray-300">Mercredi, Samedi, Dimanche</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-orange-500 text-sm font-black uppercase mb-1">Vacances</p>
                  <p className="text-gray-300">7j/7 (Lundi au Dimanche)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-orange-600 w-1.5 h-6 mr-3"></span>
                TARIFS & PAIEMENT
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-gray-400">Frais d'inscription (Unique)</span>
                  <span className="text-2xl font-black text-white">25 000 FCFA</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <span className="text-gray-400">Mensualité</span>
                  <span className="text-2xl font-black text-white">10 000 FCFA</span>
                </div>
              </div>
              <div className="mt-8 bg-orange-600 p-6 rounded-2xl">
                <p className="font-bold text-sm uppercase mb-3">Modes de paiement acceptés</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <span className="font-black italic mr-2">Orange</span>
                    <span className="text-xs uppercase">Money</span>
                  </div>
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <span className="font-black mr-2 text-blue-300 italic">Wave</span>
                  </div>
                </div>
                <p className="mt-4 text-2xl font-black text-center tracking-widest bg-white text-gray-900 py-3 rounded-xl shadow-lg">
                  77 644 51 72
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow bg-white/5 rounded-3xl p-10 border border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6 uppercase">Où nous trouver ?</h3>
              <div className="space-y-4 text-lg text-gray-300">
                <p className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Cité Alioune Sow de Golf, <br />Dakar, Sénégal
                </p>
                <p className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  77 644 51 72
                </p>
              </div>
              <div className="mt-10 h-64 bg-gray-800 rounded-2xl overflow-hidden border border-white/10 relative z-10">
                <iframe 
                  title="Localisation Terrain"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Cit%C3%A9+Alioune+Sow,+Golf+Sud,+Dakar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/40 transition-all duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalInfo;
