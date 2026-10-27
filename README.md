# ABC Academy Basket Club

Site officiel de l'ABC Academy Basket Club (Cité Alioune Sow, Dakar). React + Vite, hébergé sur Vercel.

## Structure

- `components/` : sections du site
- `clubInfo.ts` : tarifs, horaires et saison, partagés par le site, le chatbot et le PDF d'inscription
- `api/chat.ts` : fonction serverless Vercel qui appelle Gemini pour le chatbot (la clé API reste côté serveur)
- `api/inscription.ts` : reçoit la fiche d'inscription, génère le PDF (`api/_inscriptionPdf.ts`) et l'envoie par email via Resend
- `public/assets/images/` : photos de la galerie

## Développement local

**Prérequis :** Node.js et la CLI Vercel (`npm i -g vercel`)

1. Installer les dépendances : `npm install`
2. Récupérer les variables d'environnement du projet Vercel : `vercel env pull .env.local`
3. Lancer le site avec les fonctions API : `vercel dev`

`npm run dev` lance uniquement le front : le site fonctionne, mais le chatbot répondra par une erreur car `/api/chat` n'est pas servi.

## Déploiement

Dans Vercel → Settings → Environment Variables (sans préfixe `VITE_`, pour qu'elles ne soient jamais incluses dans le code envoyé au navigateur) :

| Variable | Rôle |
|---|---|
| `GEMINI_API_KEY` | Clé Google AI Studio pour le chatbot |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour l'envoi des fiches d'inscription |
| `INSCRIPTION_EMAIL_TO` | Adresse qui reçoit les fiches (plusieurs adresses séparées par des virgules) |
| `INSCRIPTION_EMAIL_FROM` | Facultatif. Expéditeur, ex. `ABC Basket Academy <inscriptions@votre-domaine.sn>` |

Sans `INSCRIPTION_EMAIL_FROM`, l'expéditeur de test `onboarding@resend.dev` est utilisé : Resend n'autorise alors l'envoi **qu'à l'adresse du compte Resend**. Pour envoyer à une autre adresse, vérifiez un domaine dans Resend → Domains.
