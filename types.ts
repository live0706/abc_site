
export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  photo: string; // Base64 or URL
  registrationDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  images?: string[];
}
