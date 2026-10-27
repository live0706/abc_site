
import React, { useRef, useState } from 'react';
import { BASKET_LEVELS, FEES, REQUIRED_DOCUMENTS, SEASON, TRAININGS } from '../clubInfo';
import { Inscription } from '../types';

type FormFields = Omit<Inscription, 'signature'>;

const EMPTY_FORM: FormFields = {
  memberType: 'Nouveau membre',
  lastName: '',
  firstNames: '',
  birthDate: '',
  birthPlace: '',
  school: '',
  schoolClass: '',
  address: '',
  level: 'Débutant',
  parentName: '',
  parentRelation: '',
  parentPhone: '',
  emergencyContact: '',
  parentAddress: '',
  trainings: [],
  authorization: false,
  signedAt: 'Dakar',
};

const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-orange-600 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-widest text-orange-500 mb-2";

const SectionTitle: React.FC<{ num: string; title: string }> = ({ num, title }) => (
  <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-baseline gap-3">
    <span className="text-orange-500">{num}</span>{title}
  </h3>
);

// Zone de signature au doigt ou à la souris, exportée en PNG
const SignaturePad: React.FC<{ canvasRef: React.RefObject<HTMLCanvasElement | null>; onChange: (signed: boolean) => void }> = ({ canvasRef, onChange }) => {
  const drawing = useRef(false);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = e.currentTarget.getContext('2d')!;
    const { x, y } = point(e);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#111827';
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext('2d')!;
    const { x, y } = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    onChange(true);
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    onChange(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
        className="w-full h-40 bg-white rounded-xl cursor-crosshair touch-none"
        aria-label="Zone de signature"
      />
      <button type="button" onClick={clear} className="mt-2 text-sm text-gray-400 hover:text-white underline">
        Effacer la signature
      </button>
    </div>
  );
};

const PlayerRegistration: React.FC = () => {
  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [signed, setSigned] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const [copy, setCopy] = useState<{ url: string; filename: string } | null>(null);
  const signatureRef = useRef<HTMLCanvasElement>(null);

  const set = <K extends keyof FormFields>(key: K, value: FormFields[K]) => setForm(f => ({ ...f, [key]: value }));

  const text = (key: keyof FormFields, label: string, required = false, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={`insc-${key}`} className={labelClass}>{label}{required && ' *'}</label>
      <input
        id={`insc-${key}`}
        type={type}
        required={required}
        maxLength={200}
        placeholder={placeholder}
        className={inputClass}
        value={form[key] as string}
        onChange={e => set(key, e.target.value)}
      />
    </div>
  );

  const toggleTraining = (id: string) =>
    set('trainings', form.trainings.includes(id) ? form.trainings.filter(t => t !== id) : [...form.trainings, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.trainings.length === 0) return setError('Choisissez au moins un jour d’entraînement.');
    if (!form.authorization) return setError('L’autorisation parentale est obligatoire.');
    if (!signed) return setError('Merci de signer dans le cadre prévu.');

    setStatus('sending');
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, signature: signatureRef.current!.toDataURL('image/png'), website: honeypot }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || `HTTP ${res.status}`);

      if (result.pdf) {
        const bytes = Uint8Array.from(atob(result.pdf), c => c.charCodeAt(0));
        setCopy({ url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })), filename: result.filename });
      }
      setStatus('sent');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error && err.message && !err.message.startsWith('HTTP')
        ? err.message
        : 'L’envoi a échoué. Réessayez ou contactez le club au 77 644 51 72.');
    }
  };

  const reset = () => {
    if (copy) URL.revokeObjectURL(copy.url);
    setCopy(null);
    setForm(EMPTY_FORM);
    setSigned(false);
    setStatus('idle');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 rounded-[3rem] p-6 sm:p-10 md:p-20 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-black tracking-widest text-sm uppercase">Saison {SEASON}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4">FICHE D'INSCRIPTION</h2>
            <p className="text-gray-400 text-lg">Remplissez la fiche en ligne : elle est transmise directement au club au format PDF. Un formulaire par enfant.</p>
          </div>

          {status === 'sent' ? (
            <div className="text-center space-y-6 py-10">
              <div className="text-6xl">✅</div>
              <h3 className="text-3xl font-black">Inscription envoyée !</h3>
              <p className="text-gray-300 max-w-xl mx-auto">
                Le club a bien reçu la fiche et vous recontactera. Pensez à apporter les pièces du dossier lors de votre passage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {copy && (
                  <a href={copy.url} download={copy.filename} className="bg-orange-600 px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all">
                    TÉLÉCHARGER MA COPIE (PDF)
                  </a>
                )}
                <button onClick={reset} className="border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
                  INSCRIRE UN AUTRE ENFANT
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-14">
              {/* Champ piège anti-robots, invisible pour les visiteurs */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />

              <div className="flex flex-wrap gap-4">
                {(['Nouveau membre', 'Réinscription'] as const).map(type => (
                  <label key={type} className={`cursor-pointer px-6 py-3 rounded-full border font-bold transition-all ${form.memberType === type ? 'bg-orange-600 border-orange-600' : 'border-white/20 hover:bg-white/10'}`}>
                    <input type="radio" name="memberType" className="sr-only" checked={form.memberType === type} onChange={() => set('memberType', type)} />
                    {type}
                  </label>
                ))}
              </div>

              <section>
                <SectionTitle num="01" title="Le basketteur / la basketteuse" />
                <div className="grid md:grid-cols-2 gap-6">
                  {text('lastName', 'Nom', true)}
                  {text('firstNames', 'Prénom(s)', true)}
                  {text('birthDate', 'Date de naissance', true, 'date')}
                  {text('birthPlace', 'Lieu de naissance')}
                  {text('school', 'École / établissement')}
                  {text('schoolClass', 'Classe / niveau')}
                  {text('address', 'Adresse / quartier', true, 'text', 'Ex : Cité Fadia')}
                  <div>
                    <span className={labelClass}>Niveau basket *</span>
                    <div className="flex gap-2">
                      {BASKET_LEVELS.map(level => (
                        <label key={level} className={`flex-1 text-center cursor-pointer py-3.5 rounded-xl border text-sm font-bold transition-all ${form.level === level ? 'bg-orange-600 border-orange-600' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                          <input type="radio" name="level" className="sr-only" checked={form.level === level} onChange={() => set('level', level)} />
                          {level}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle num="02" title="Parent ou responsable légal" />
                <div className="grid md:grid-cols-2 gap-6">
                  {text('parentName', 'Nom et prénom', true)}
                  {text('parentRelation', 'Lien avec l’enfant', true, 'text', 'Ex : Mère, Père, Oncle…')}
                  {text('parentPhone', 'Téléphone / WhatsApp', true, 'tel', 'Ex : 77 123 45 67')}
                  {text('emergencyContact', 'Autre contact d’urgence', false, 'tel')}
                  <div className="md:col-span-2">{text('parentAddress', 'Adresse du parent / tuteur')}</div>
                </div>
              </section>

              <section>
                <SectionTitle num="03" title="Entraînements habituels" />
                <div className="grid sm:grid-cols-3 gap-4">
                  {TRAININGS.map(t => (
                    <label key={t.id} className={`cursor-pointer p-4 rounded-xl border transition-all ${form.trainings.includes(t.id) ? 'bg-orange-600 border-orange-600' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                      <input type="checkbox" className="sr-only" checked={form.trainings.includes(t.id)} onChange={() => toggleTraining(t.id)} />
                      <span className="block font-black uppercase">{t.day}</span>
                      <span className="text-sm opacity-80">{t.hours}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle num="04" title="Autorisation et engagement du parent" />
                <label className="flex items-start gap-4 cursor-pointer">
                  <input type="checkbox" checked={form.authorization} onChange={e => set('authorization', e.target.checked)} className="mt-1 w-5 h-5 accent-orange-600 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">
                    Je soussigné(e), parent ou responsable légal, <strong className="text-white">autorise mon enfant à participer aux entraînements et aux activités sportives encadrées</strong> organisés par ABC Basket Academy durant la saison académique {SEASON}, et je m’engage à m’acquitter des frais suivants.
                  </span>
                </label>
                <div className="mt-6 grid sm:grid-cols-2 gap-4 bg-orange-600/10 border border-orange-600/30 rounded-2xl p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Inscription</p>
                    <p className="text-2xl font-black text-orange-500">{FEES.inscription}</p>
                    <p className="text-sm text-gray-400">Réinscription : {FEES.reinscription}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Contribution mensuelle</p>
                    <p className="text-2xl font-black text-orange-500">{FEES.monthly} / mois</p>
                  </div>
                </div>
              </section>

              <section>
                <SectionTitle num="05" title="Pièces à apporter au club" />
                <ul className="space-y-2 text-gray-300">
                  {REQUIRED_DOCUMENTS.map(doc => (
                    <li key={doc} className="flex items-center gap-3"><span className="text-orange-500">▸</span>{doc}</li>
                  ))}
                </ul>
              </section>

              <section>
                <SectionTitle num="06" title="Validation et signature" />
                <div className="grid md:grid-cols-2 gap-6">
                  {text('signedAt', 'Fait à', true)}
                  <div>
                    <span className={labelClass}>Le</span>
                    <p className={`${inputClass} text-gray-400`}>{new Date().toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className={labelClass}>Signature du parent / tuteur *</span>
                    <SignaturePad canvasRef={signatureRef} onChange={setSigned} />
                  </div>
                </div>
              </section>

              {error && <p role="alert" className="bg-red-500/10 border border-red-500/40 text-red-300 rounded-xl px-5 py-4">{error}</p>}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/40 disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'sending' ? 'ENVOI EN COURS…' : 'ENVOYER MON INSCRIPTION'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;
