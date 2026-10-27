import { BASKET_LEVELS, SEASON, TRAININGS } from '../clubInfo.js';
import type { Inscription } from '../types.js';
import { buildInscriptionPdf, formatDate } from './_inscriptionPdf.js';

const MAX_FIELD_LENGTH = 200;
const MAX_SIGNATURE_LENGTH = 300_000;

const REQUIRED_FIELDS = [
  'lastName', 'firstNames', 'birthDate', 'address', 'parentName', 'parentRelation', 'parentPhone', 'signedAt',
] as const;
const OPTIONAL_FIELDS = ['birthPlace', 'school', 'schoolClass', 'emergencyContact', 'parentAddress'] as const;

const FIELD_LABELS: Record<(typeof REQUIRED_FIELDS)[number] | (typeof OPTIONAL_FIELDS)[number], string> = {
  lastName: 'Nom',
  firstNames: 'Prénom(s)',
  birthDate: 'Date de naissance',
  birthPlace: 'Lieu de naissance',
  school: 'École / établissement',
  schoolClass: 'Classe / niveau',
  address: 'Adresse / quartier',
  parentName: 'Nom du parent',
  parentRelation: 'Lien avec l’enfant',
  parentPhone: 'Téléphone / WhatsApp',
  emergencyContact: 'Autre contact d’urgence',
  parentAddress: 'Adresse du parent / tuteur',
  signedAt: 'Fait à',
};

function validate(body: any): Inscription | string {
  if (!body || typeof body !== 'object') return 'Requête invalide';

  for (const key of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
    const value = body[key] ?? '';
    if (typeof value !== 'string' || value.length > MAX_FIELD_LENGTH) return `Champ invalide : ${FIELD_LABELS[key]}`;
  }
  for (const key of REQUIRED_FIELDS) {
    if (!body[key].trim()) return `Champ obligatoire manquant : ${FIELD_LABELS[key]}`;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.birthDate)) return 'Date de naissance invalide';
  if (body.memberType !== 'Nouveau membre' && body.memberType !== 'Réinscription') return 'Type d’inscription invalide';
  if (!BASKET_LEVELS.includes(body.level)) return 'Niveau basket invalide';
  if (
    !Array.isArray(body.trainings) ||
    body.trainings.length === 0 ||
    !body.trainings.every((t: unknown) => TRAININGS.some(tr => tr.id === t))
  ) return 'Choisissez au moins un entraînement';
  if (body.authorization !== true) return 'L’autorisation parentale est obligatoire';
  if (
    typeof body.signature !== 'string' ||
    !body.signature.startsWith('data:image/png;base64,') ||
    body.signature.length > MAX_SIGNATURE_LENGTH
  ) return 'Signature invalide';

  return body as Inscription;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Nom de fichier en ASCII pour éviter les soucis d'affichage dans les clients mail
const asciiSlug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INSCRIPTION_EMAIL_TO;
  const from = process.env.INSCRIPTION_EMAIL_FROM || 'ABC Basket Academy <onboarding@resend.dev>';
  if (!apiKey || !to) {
    return Response.json({ error: 'Envoi des inscriptions non configuré' }, { status: 500 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }

  // Champ piège invisible : seuls les robots le remplissent
  if (body?.website) return Response.json({ ok: true });

  const result = validate(body);
  if (typeof result === 'string') return Response.json({ error: result }, { status: 400 });
  const data = result;

  const submittedAt = new Date();
  let pdf: Uint8Array;
  try {
    pdf = await buildInscriptionPdf(data, submittedAt);
  } catch (error) {
    console.error('Erreur génération PDF :', error);
    return Response.json({ error: 'Impossible de générer le PDF' }, { status: 500 });
  }
  const pdfBase64 = Buffer.from(pdf).toString('base64');
  const filename = `Inscription_${asciiSlug(data.lastName)}_${asciiSlug(data.firstNames)}.pdf`;

  const trainings = TRAININGS.filter(t => data.trainings.includes(t.id)).map(t => `${t.day} ${t.hours}`).join(', ');
  const summary: [string, string][] = [
    ['Type', data.memberType],
    ['Joueur', `${data.firstNames} ${data.lastName}`],
    ['Date de naissance', formatDate(data.birthDate)],
    ['Niveau', data.level],
    ['Entraînements', trainings],
    ['Parent', `${data.parentName} (${data.parentRelation})`],
    ['Téléphone', data.parentPhone],
  ];
  const html = `
    <p>Nouvelle fiche d'inscription reçue depuis le site (saison ${SEASON}). Le PDF complet est en pièce jointe.</p>
    <table cellpadding="4">${summary
      .map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join('')}</table>
    <p>Pièces à récupérer auprès de la famille : CNI/passeport, extrait de naissance, 2 photos d'identité.</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map(s => s.trim()),
      subject: `Inscription ${SEASON} – ${data.firstNames} ${data.lastName}`,
      html,
      attachments: [{ filename, content: pdfBase64 }],
    }),
  });
  if (!res.ok) {
    console.error('Erreur Resend :', res.status, await res.text());
    return Response.json({ error: 'L’envoi de l’email a échoué' }, { status: 502 });
  }

  // Le PDF est renvoyé pour que le parent puisse en garder une copie
  return Response.json({ ok: true, filename, pdf: pdfBase64 });
}
