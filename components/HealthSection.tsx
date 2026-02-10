
import React from 'react';

const HealthSection: React.FC = () => {
  const tips = [
    {
      title: "Prévention Cardiaque",
      desc: "Des examens réguliers et l'écoute de son corps sont essentiels pour prévenir les accidents cardiaques en plein effort.",
      icon: "❤️"
    },
    {
      title: "Hydratation Optimale",
      desc: "Boire avant, pendant et après l'effort pour maintenir les performances et éviter les crampes musculaires.",
      icon: "💧"
    },
    {
      title: "Repos & Récupération",
      desc: "Le sommeil est la phase où le muscle se construit et le corps se régénère. Indispensable pour l'excellence.",
      icon: "💤"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-10">
        <div className="max-w-2xl">
          <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-4 inline-block">SÉCURITÉ & SANTÉ</span>
          <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight">MIEUX PRÉVENIR POUR <br /><span className="text-orange-600">MIEUX PERFORMER</span></h2>
          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            À l'ABC Academy, la santé de nos joueurs est notre priorité absolue. Nous sensibilisons nos jeunes et leurs parents aux risques cardiaques et aux bonnes pratiques d'hygiène de vie sportive.
          </p>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-orange-200">
           <img src="https://picsum.photos/id/225/500/300" alt="Health" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-6">{tip.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-2xl border-l-8 border-orange-600">
        <h4 className="font-bold text-gray-900 mb-2 italic">Avertissement Médical</h4>
        <p className="text-sm text-gray-500">
          Tout joueur doit obligatoirement présenter un certificat de non-contre-indication à la pratique du basketball lors de son inscription. Un suivi médical annuel est fortement recommandé.
        </p>
      </div>
    </div>
  );
};

export default HealthSection;
