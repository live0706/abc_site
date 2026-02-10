
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
             <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-black text-sm">ABC</span>
              </div>
              <span className="font-black text-xl tracking-tighter uppercase">Academy Basket Club</span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Le centre de formation de référence à la Cité Alioune Sow de Golf. Nous bâtissons les champions de demain par le sport, l'éducation et la santé.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#home" className="hover:text-orange-500 transition-colors">Accueil</a></li>
              <li><a href="#club" className="hover:text-orange-500 transition-colors">Le Club</a></li>
              <li><a href="#programs" className="hover:text-orange-500 transition-colors">Programmes</a></li>
              <li><a href="#coach" className="hover:text-orange-500 transition-colors">Espace Coach</a></li>
              <li><a href="#health" className="hover:text-orange-500 transition-colors">Santé & Prévention</a></li>
              <li><a href="#info" className="hover:text-orange-500 transition-colors">Infos Pratiques</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-orange-500 uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                Cité Alioune Sow de Golf, Dakar
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="text-white font-bold">77 644 51 72</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ABC Academy Basket Club. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Mentions Légales</span>
            <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
