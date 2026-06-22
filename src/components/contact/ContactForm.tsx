import { useState, useRef, type FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EASING = [0.25, 0.46, 0.45, 0.94] as const;

const INPUT_CLASS = "liquid-glass rounded-xl px-3 py-2.5 md:px-5 md:py-3.5 text-[#18102E] text-sm bg-transparent outline-none focus:ring-1 focus:ring-[#6C5CA8]/30 transition-all";

interface Field {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  maxLength?: number;
}

const fields: Field[] = [
  { id: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom', maxLength: 100 },
  { id: 'firstname', label: 'Prénom', type: 'text', placeholder: 'Votre prénom', maxLength: 100 },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com', maxLength: 254 },
  {
    id: 'subject',
    label: 'Objet',
    type: 'select',
    options: [
      { value: 'inscription', label: 'Inscription' },
      { value: 'planning', label: 'Planning / Cours' },
      { value: 'evenement', label: 'Événement' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Votre message...', rows: 5, maxLength: 2000 },
];

function renderField(field: Field) {
  if (field.type === 'textarea') {
    return (
      <motion.textarea
        id={field.id}
        name={field.id}
        required
        rows={field.rows}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        whileFocus={{ scale: 1.01 }}
        className={`${INPUT_CLASS} placeholder:text-[#18102E]/25 resize-none`}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        id={field.id}
        name={field.id}
        required
        className={`${INPUT_CLASS} appearance-none`}
      >
        <option value="">Sélectionnez un objet</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }

  return (
    <motion.input
      type={field.type}
      id={field.id}
      name={field.id}
      required
      maxLength={field.maxLength}
      placeholder={field.placeholder}
      whileFocus={{ scale: 1.01 }}
      className={`${INPUT_CLASS} placeholder:text-[#18102E]/25`}
    />
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const ref = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="liquid-glass rounded-3xl p-6 md:p-10 flex flex-col items-center gap-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle size={36} className="text-[#6C5CA8]" />
          </motion.div>
          <h3
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[#18102E] text-2xl"
          >
            Message envoyé
          </h3>
          <p className="text-[#18102E]/50 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          <motion.button
            onClick={() => setStatus('idle')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 liquid-glass rounded-full px-6 py-2.5 text-sm text-[#18102E]/60 hover:text-[#6C5CA8] transition-colors"
          >
            Envoyer un autre message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {fields.map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="flex flex-col gap-2"
            >
              <label htmlFor={field.id} className="text-[#18102E]/40 text-xs tracking-widest uppercase font-ui">
                {field.label}
              </label>
              {renderField(field)}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-[#6C5CA8] hover:bg-[#524490] text-white rounded-full px-6 py-3 md:px-8 md:py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
          >
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
            <Send size={16} />
          </motion.button>

          {status === 'error' && (
            <p className="text-sm text-red-500 text-center mt-2">
              Erreur d'envoi, réessayez.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export { ContactForm };
