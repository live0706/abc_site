
// Données envoyées par le formulaire d'inscription à api/inscription.ts
export interface Inscription {
  memberType: 'Nouveau membre' | 'Réinscription';
  // 01 Basketteur / basketteuse
  lastName: string;
  firstNames: string;
  birthDate: string; // AAAA-MM-JJ
  birthPlace: string;
  school: string;
  schoolClass: string;
  address: string;
  level: string;
  // 02 Parent ou responsable légal
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  emergencyContact: string;
  parentAddress: string;
  // 03 Entraînements
  trainings: string[];
  // 04 et 06 Autorisation et signature
  authorization: boolean;
  signedAt: string; // « Fait à »
  signature: string; // PNG en data URL
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  images?: string[];
}
