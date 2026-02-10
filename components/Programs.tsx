
import React from 'react';

const Programs: React.FC = () => {
  const programs = [
    {
      title: "École de Basket (U10 - U13)",
      desc: "Apprentissage des fondamentaux, motricité et plaisir du jeu.",
      icon: "🏀"
    },
    {
      title: "Compétition (U15 - U18)",
      desc: "Tactique avancée, préparation physique et matchs officiels.",
      icon: "🏆"
    },
    {
      title: "Stages Vacances",
      desc: "Perfectionnement intensif durant les congés scolaires, 7j/7.",
      icon: "🔥"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 uppercase">Nos <span className="text-orange-600">Programmes</span></h2>
        <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {programs.map((p, i) => (
          <div key={i} className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-orange-100 transition-all border-b-4 border-orange-600 transform hover:-translate-y-2">
            <div className="text-5xl mb-6">{p.icon}</div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">{p.title}</h3>
            <p className="text-gray-600 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-orange-600 rounded-3xl p-10 md:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-lg mb-8 md:mb-0">
            <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase">Événements & Tournois</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Nous organisons régulièrement des camps de basket, des tournois inter-quartiers et des rencontres amicales pour mettre nos jeunes au défi.
            </p>
          </div>
          <img 
            src="https://picsum.photos/id/163/400/300" 
            alt="Event" 
            className="w-full md:w-80 rounded-xl shadow-2xl border-4 border-white/20"
          />
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default Programs;
