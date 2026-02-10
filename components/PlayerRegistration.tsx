
import React, { useState } from 'react';

const PlayerRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: 'Meneur'
  });

  const handleRegistration = () => {
    if (!formData.name || !formData.age) {
      alert("Veuillez remplir le nom et l'âge pour continuer.");
      return;
    }

    const clubNumber = "221776445172"; // Numéro WhatsApp du club
    const message = `Bonjour, je souhaite pré-inscrire mon enfant à l'ABC Academy.\n\n*Informations du joueur :*\n- Nom : ${formData.name}\n- Âge : ${formData.age} ans\n- Position préférée : ${formData.position}\n\nMerci de me confirmer les prochaines étapes.`;

    const whatsappUrl = `https://wa.me/${clubNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">REJOINDRE L'AVENTURE</h2>
            <p className="text-gray-400 text-lg">Remplissez le formulaire et envoyez-nous un message directement sur WhatsApp.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Nom Complet</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                  placeholder="Ex: Amadou Sow"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Âge</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    placeholder="12"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Position</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all appearance-none"
                    value={formData.position}
                    onChange={e => setFormData({...formData, position: e.target.value})}
                  >
                    <option value="Meneur">Meneur</option>
                    <option value="Arrière">Arrière</option>
                    <option value="Ailier">Ailier</option>
                    <option value="Pivot">Pivot</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleRegistration}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/40"
              >
                VALIDER SUR WHATSAPP
              </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3820/3820291.png"
                alt="WhatsApp"
                className="w-64 h-64 object-contain drop-shadow-2xl opacity-90 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;
