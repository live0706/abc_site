import React from 'react';

const SocialNetworks: React.FC = () => {
  const socials = [
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@abcbasketacademy?is_from_webapp=1&sender_device=pc", // Remplacez par votre lien TikTok
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.46-.54 3.06-1.5 4.14-1.11 1.24-2.7 1.96-4.35 1.96-2.36 0-4.27-1.37-5.11-3.53-1.08-2.78.19-6.07 2.96-7.19.61-.25 1.27-.37 1.93-.37.05 0 .11.01.16.01v4.32c-.77-.13-1.53.17-2.01.79-.52.66-.58 1.57-.16 2.29.41.71 1.28 1.05 2.07.84.94-.25 1.57-1.13 1.57-2.19V4.5c-1.07.03-2.16-.13-3.13-.62-.5-.26-1.03-.59-1.48-1.01V.02c1.43.42 2.65 1.19 3.63 2.26.16.18.3.37.43.57.02-1.01.01-1.93.01-2.83z" />
        </svg>
      ),
      color: "hover:text-black",
      bg: "hover:bg-gray-100"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/academie_basket_club?igsh=MTd3Njc3c3B2Z21odA==", // Remplacez par votre lien Instagram
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.14 3.375c.636-.247 1.363-.416 2.427-.465C7.673 2.013 8.044 2 12.047 2h.268m-.124 1.95c-2.66 0-2.977.01-4.023.058-.788.036-1.213.166-1.498.276-.375.145-.64.319-.92.598-.28.28-.453.546-.598.92-.11.285-.24.71-.276 1.498-.047 1.046-.059 1.363-.059 4.023 0 2.66.01 2.977.059 4.023.036.788.166 1.213.276 1.498.145.375.319.64.598.92.28.28.546.453.92.598.285.11.71.24 1.498.276 1.046.047 1.363.059 4.023.059 2.66 0 2.977-.01 4.023-.059.788-.036 1.213-.166 1.498-.276.375-.145.64-.319.92-.598.28-.28.453-.546.598-.92.11-.285.24-.71.276-1.498.047-1.046.059-1.363.059-4.023 0-2.66-.01-2.977-.059-4.023-.036-.788-.166-1.213-.276-1.498-.145-.375-.319-.64-.598-.92-.28-.28-.546-.453-.92-.598-.285-.11-.71-.24-1.498-.276-1.046-.047-1.363-.059-4.023-.059z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12.309 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.95a3.185 3.185 0 100 6.37 3.185 3.185 0 000-6.37z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M17.309 5.665a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: "hover:text-pink-600",
      bg: "hover:bg-pink-50"
    },
    {
      name: "Facebook",
      url: "https://m.facebook.com/story.php?story_fbid=pfbid08HNiwJzh6AgvHf2KEtssuQZ1CnrSMiw7wVxoqYKZXKPNCd5RvsNfT9wARaogSjTMl&id=100000306794967&mibextid=Nif5oz", // Remplacez par votre lien Facebook
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      color: "hover:text-blue-600",
      bg: "hover:bg-blue-50"
    }
  ];

  return (
    <div className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 uppercase">
            Suivez l'ABC sur les <span className="text-orange-600">Réseaux</span>
          </h2>
          <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
            Restez connectés pour ne rien manquer de nos actualités, matchs et événements. Rejoignez la communauté !
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {socials.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group ${social.bg} transform hover:-translate-y-2`}
            >
              <div className={`text-gray-400 transition-colors duration-300 ${social.color} transform group-hover:scale-110 mb-6`}>
                {social.icon}
              </div>
              <span className="font-black text-gray-900 text-2xl uppercase tracking-tight">{social.name}</span>
              <span className="text-sm text-gray-500 mt-2 font-medium">Rejoindre</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialNetworks;
