// Fichier préfixé par « _ » : Vercel ne l'expose pas comme route, il est seulement importé par api/inscription.ts
import { PDFDocument, PDFFont, StandardFonts, rgb } from 'pdf-lib';
import { CLUB_NAME, FEES, REQUIRED_DOCUMENTS, SEASON, TRAININGS, BASKET_LEVELS } from '../clubInfo.js';
import type { Inscription } from '../types.js';

const NAVY = rgb(0.1, 0.13, 0.2);
const ORANGE = rgb(0.92, 0.35, 0.05);
const GRAY = rgb(0.4, 0.43, 0.48);
const LIGHT = rgb(0.96, 0.97, 0.98);
const PEACH = rgb(1, 0.94, 0.89);
const BLACK = rgb(0.1, 0.1, 0.1);
const WHITE = rgb(1, 1, 1);

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 40;
const CONTENT_W = PAGE_W - 2 * MARGIN;
const COL_W = CONTENT_W / 2;

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d} / ${m} / ${y}` : iso;
}

export async function buildInscriptionPdf(data: Inscription, submittedAt: Date): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Fiche d'inscription ${SEASON} – ${data.firstNames} ${data.lastName}`);
  pdf.setAuthor(CLUB_NAME);

  const page = pdf.addPage([PAGE_W, PAGE_H]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Les polices standard ne couvrent que l'alphabet latin (WinAnsi) : on retire les autres caractères (emojis…)
  const charset = new Set(font.getCharacterSet());
  const clean = (s: string) => Array.from(s).filter(c => charset.has(c.codePointAt(0)!)).join('').replace(/\s+/g, ' ').trim();

  const text = (s: string, x: number, y: number, size: number, f: PDFFont = font, color = BLACK) =>
    page.drawText(clean(s), { x, y, size, font: f, color });

  // Tronque la valeur pour qu'elle reste dans sa colonne
  const fit = (s: string, f: PDFFont, size: number, maxW: number) => {
    let out = clean(s);
    if (f.widthOfTextAtSize(out, size) <= maxW) return out;
    while (out.length > 0 && f.widthOfTextAtSize(out + '…', size) > maxW) out = out.slice(0, -1);
    return out + '…';
  };

  const checkbox = (x: number, y: number, checked: boolean) => {
    page.drawRectangle({ x, y: y - 1, width: 9, height: 9, borderColor: GRAY, borderWidth: 0.8 });
    if (checked) {
      page.drawLine({ start: { x: x + 1.8, y: y + 3.5 }, end: { x: x + 3.8, y: y + 1 }, thickness: 1.4, color: ORANGE });
      page.drawLine({ start: { x: x + 3.8, y: y + 1 }, end: { x: x + 7.6, y: y + 7 }, thickness: 1.4, color: ORANGE });
    }
  };

  const labelValue = (label: string, value: string, x: number, y: number, w: number) => {
    text(label, x + 8, y, 8.5, bold, GRAY);
    const lx = x + 8 + bold.widthOfTextAtSize(clean(label), 8.5) + 5;
    page.drawText(fit(value || '—', font, 10, x + w - lx - 8), { x: lx, y, size: 10, font, color: BLACK });
  };

  const sectionTitle = (num: string, title: string, y: number) => {
    text(num, MARGIN, y, 11, bold, ORANGE);
    text(title, MARGIN + 20, y, 11, bold, NAVY);
  };

  // Tableau de lignes « libellé : valeur » sur deux colonnes, fond alterné comme sur la fiche papier
  const rows = (pairs: [string, string, string?, string?][], top: number) => {
    let y = top;
    pairs.forEach(([l1, v1, l2, v2], i) => {
      page.drawRectangle({ x: MARGIN, y: y - 9, width: CONTENT_W, height: 24, color: i % 2 === 0 ? LIGHT : WHITE });
      if (l2 === undefined) {
        labelValue(l1, v1, MARGIN, y, CONTENT_W);
      } else {
        labelValue(l1, v1, MARGIN, y, COL_W);
        labelValue(l2, v2 ?? '', MARGIN + COL_W, y, COL_W);
      }
      y -= 24;
    });
    return y;
  };

  // En-tête
  page.drawRectangle({ x: MARGIN, y: PAGE_H - 125, width: CONTENT_W, height: 95, color: NAVY });
  text('ABC', MARGIN + 14, PAGE_H - 85, 22, bold, ORANGE);
  text('BASKET ACADEMY', MARGIN + 14 + bold.widthOfTextAtSize('ABC', 22) + 8, PAGE_H - 84, 15, bold, WHITE);
  const seasonLabel = `SAISON ${SEASON}`;
  text(seasonLabel, PAGE_W - MARGIN - 14 - bold.widthOfTextAtSize(clean(seasonLabel), 12), PAGE_H - 70, 12, bold, WHITE);
  const sent = `Envoyée en ligne le ${submittedAt.toLocaleDateString('fr-FR', { timeZone: 'Africa/Dakar' })}`;
  text(sent, PAGE_W - MARGIN - 14 - font.widthOfTextAtSize(clean(sent), 8.5), PAGE_H - 92, 8.5, font, rgb(0.8, 0.82, 0.86));

  let y = PAGE_H - 148;
  text("FICHE D'INSCRIPTION", MARGIN, y, 16, bold, NAVY);
  y -= 18;
  text('Dossier n° : ____________', MARGIN, y, 9.5, font, GRAY);
  text(`Date : ${submittedAt.toLocaleDateString('fr-FR', { timeZone: 'Africa/Dakar' })}`, MARGIN + 150, y, 9.5, font, GRAY);
  checkbox(MARGIN + 280, y, data.memberType === 'Nouveau membre');
  text('Nouveau membre', MARGIN + 294, y, 9.5);
  checkbox(MARGIN + 390, y, data.memberType === 'Réinscription');
  text('Réinscription', MARGIN + 404, y, 9.5);

  // 01
  y -= 32;
  sectionTitle('01', 'INFORMATIONS SUR LE BASKETTEUR / LA BASKETTEUSE', y);
  y = rows([
    ['Nom :', data.lastName, 'Prénom(s) :', data.firstNames],
    ['Date de naissance :', formatDate(data.birthDate), 'Lieu de naissance :', data.birthPlace],
    ['École / établissement :', data.school, 'Classe / niveau :', data.schoolClass],
    ['Adresse / quartier :', data.address, 'Niveau basket :', ' '],
  ], y - 24);
  // Cases du niveau basket dans la dernière ligne
  let lx = MARGIN + COL_W + 8 + bold.widthOfTextAtSize('Niveau basket :', 8.5) + 6;
  for (const level of BASKET_LEVELS) {
    page.drawRectangle({ x: lx - 2, y: y + 24 - 3, width: 60, height: 13, color: LIGHT });
    checkbox(lx, y + 24, data.level === level);
    text(level, lx + 12, y + 24, 9);
    lx += 14 + font.widthOfTextAtSize(clean(level), 9) + 10;
  }

  // 02
  y -= 22;
  sectionTitle('02', 'PARENT OU RESPONSABLE LÉGAL', y);
  y = rows([
    ['Nom et prénom :', data.parentName, 'Lien avec l’enfant :', data.parentRelation],
    ['Téléphone / WhatsApp :', data.parentPhone, 'Autre contact d’urgence :', data.emergencyContact],
    ['Adresse du parent / tuteur :', data.parentAddress],
  ], y - 24);

  // 03
  y -= 22;
  sectionTitle('03', 'ENTRAÎNEMENTS HABITUELS', y);
  y -= 22;
  let tx = MARGIN;
  for (const t of TRAININGS) {
    checkbox(tx, y, data.trainings.includes(t.id));
    const label = `${t.day} ${t.hours}`;
    text(label, tx + 14, y, 9.5);
    tx += 14 + font.widthOfTextAtSize(clean(label), 9.5) + 22;
  }

  // 04
  y -= 30;
  sectionTitle('04', 'AUTORISATION ET ENGAGEMENT DU PARENT', y);
  y -= 18;
  checkbox(MARGIN, y, data.authorization);
  text('Je soussigné(e), parent ou responsable légal, autorise mon enfant à participer aux entraînements et aux activités', MARGIN + 14, y, 9);
  y -= 12;
  text(`sportives encadrées organisés par ${CLUB_NAME} durant la saison académique ${SEASON}.`, MARGIN + 14, y, 9);
  y -= 16;
  text('Je m’engage également à m’acquitter des frais suivants :', MARGIN, y, 9, bold);
  y -= 12;
  page.drawRectangle({ x: MARGIN, y: y - 46, width: CONTENT_W, height: 50, color: PEACH });
  text('INSCRIPTION', MARGIN + 12, y - 10, 8, bold, GRAY);
  text(FEES.inscription, MARGIN + 12, y - 26, 15, bold, ORANGE);
  text(`Réinscription : ${FEES.reinscription}`, MARGIN + 12, y - 39, 8.5);
  text('CONTRIBUTION MENSUELLE', MARGIN + COL_W, y - 10, 8, bold, GRAY);
  text(`${FEES.monthly} / mois`, MARGIN + COL_W, y - 26, 15, bold, ORANGE);
  y -= 46;

  // 05 : cases laissées vides, cochées par l'académie à la remise des pièces
  y -= 22;
  sectionTitle('05', 'PIÈCES À FOURNIR POUR LE DOSSIER', y);
  for (const doc of REQUIRED_DOCUMENTS) {
    y -= 15;
    checkbox(MARGIN, y, false);
    text(doc, MARGIN + 14, y, 9.5);
  }

  // 06
  y -= 22;
  sectionTitle('06', 'VALIDATION ET SIGNATURES', y);
  y -= 20;
  text('Fait à :', MARGIN, y, 9.5, bold, GRAY);
  text(data.signedAt, MARGIN + 38, y, 10);
  text('Le :', MARGIN + 260, y, 9.5, bold, GRAY);
  text(submittedAt.toLocaleDateString('fr-FR', { timeZone: 'Africa/Dakar' }), MARGIN + 282, y, 10);

  y -= 12;
  const boxH = 72;
  page.drawRectangle({ x: MARGIN, y: y - boxH, width: CONTENT_W, height: boxH, color: LIGHT });
  text('Signature du parent / tuteur', MARGIN + 12, y - 16, 9, bold, GRAY);
  text('Cachet / visa de l’académie', MARGIN + COL_W + 12, y - 16, 9, bold, GRAY);
  const png = await pdf.embedPng(data.signature);
  const scale = Math.min((COL_W - 40) / png.width, 44 / png.height);
  page.drawImage(png, { x: MARGIN + 12, y: y - boxH + 8, width: png.width * scale, height: png.height * scale });
  page.drawLine({ start: { x: MARGIN + COL_W + 12, y: y - boxH + 12 }, end: { x: PAGE_W - MARGIN - 20, y: y - boxH + 12 }, thickness: 0.6, color: GRAY });

  // Pied de page
  const footer = `${CLUB_NAME}  •  Saison ${SEASON}  •  Un formulaire par enfant`;
  text(footer, (PAGE_W - font.widthOfTextAtSize(clean(footer), 8)) / 2, 20, 8, font, GRAY);

  return pdf.save();
}
