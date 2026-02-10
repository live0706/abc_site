
import React from 'react';

const CoachSpace: React.FC = () => {
  const coachNumber = "221776445172"; // Numéro du club (Sénégal)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-gray-900 uppercase">Espace <span className="text-orange-600">Coach</span></h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto italic">
          Ligne directe pour les sessions vidéo et le suivi technique.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden border border-gray-100 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-2xl font-black text-gray-900">Lancer un appel vidéo</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Cliquez ci-dessous pour démarrer un appel vidéo WhatsApp directement avec le staff technique.
            </p>
          </div>

          <a 
            href={`https://wa.me/${coachNumber}?text=Bonjour%20Coach,%20je%20lance%20un%20appel%20vidéo.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-green-600 transition-all shadow-xl shadow-green-500/30 flex items-center space-x-3 transform hover:scale-105"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>LANCER L'APPEL VIDÉO</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoachSpace;
