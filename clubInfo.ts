// Informations du club partagées par le site, le chatbot (api/chat.ts) et le PDF d'inscription (api/inscription.ts)

export const CLUB_NAME = 'ABC Basket Academy';
export const SEASON = '2026–2027';

export const FEES = {
  inscription: '15 000 FCFA',
  reinscription: '0 FCFA',
  monthly: '10 000 FCFA',
};

export const TRAININGS = [
  { id: 'mercredi', day: 'Mercredi', hours: '15 h 30 – 18 h 30' },
  { id: 'samedi', day: 'Samedi', hours: '15 h 30 – 18 h 30' },
  { id: 'dimanche', day: 'Dimanche', hours: '8 h 30 – 10 h 30' },
] as const;

export const BASKET_LEVELS = ['Débutant', 'Initié', 'Confirmé'] as const;

export const REQUIRED_DOCUMENTS = [
  'Copie de la CIN/CNI ou du passeport (pour les étrangers)',
  'Extrait de naissance avec copie littérale',
  'Deux (2) photos d’identité',
];
