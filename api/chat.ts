import { GoogleGenAI } from '@google/genai';
import { FEES, SEASON, TRAININGS } from '../clubInfo.js';

const SYSTEM_INSTRUCTION = `Tu es l'assistant virtuel de l'ABC Academy Basket Club au Sénégal. Tu réponds de manière motivante et professionnelle. Tu donnes des détails sur les tarifs de la saison ${SEASON} (inscription ${FEES.inscription}, réinscription ${FEES.reinscription}, mensualité ${FEES.monthly}), les horaires (${TRAININGS.map(t => `${t.day} ${t.hours}`).join(', ')} ; vacances 7j/7), la localisation (Cité Alioune Sow) et l'inscription (formulaire en ligne sur le site, puis pièces à apporter : CNI ou passeport, extrait de naissance, 2 photos d'identité). Sois chaleureux.`;

// Limites pour éviter les abus de la clé API
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

interface IncomingMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Clé API non configurée' }, { status: 500 });
  }

  let messages: IncomingMessage[];
  try {
    const body = await request.json();
    messages = body.messages;
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    !messages.every(m => (m.role === 'user' || m.role === 'model') && typeof m.text === 'string')
  ) {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }

  // Gemini exige que l'historique commence par un message utilisateur
  const history = messages.slice(-MAX_MESSAGES);
  while (history.length > 0 && history[0].role !== 'user') history.shift();
  if (history.length === 0) {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(m => ({
        role: m.role,
        parts: [{ text: m.text.slice(0, MAX_MESSAGE_LENGTH) }],
      })),
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return Response.json({ text: response.text ?? '' });
  } catch (error) {
    console.error('Erreur Gemini :', error);
    return Response.json({ error: 'Erreur du service IA' }, { status: 502 });
  }
}
