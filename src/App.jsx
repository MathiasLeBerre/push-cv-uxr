import { useState, useEffect } from 'react';
import PushCVTool from './PushCVTool.jsx';

const SESSION_KEY = 'uxr-api-key';

export default function App() {
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem(SESSION_KEY) || '');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  // Déjà une clé en session → on passe directement
  if (apiKey) return <PushCVTool apiKey={apiKey} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = input.trim();
    if (!key.startsWith('sk-ant-')) {
      setError("La clé doit commencer par sk-ant-");
      return;
    }
    setChecking(true);
    setError('');
    try {
      // Vérifie la clé avec un appel minimal directement vers Anthropic
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'ok' }],
        }),
      });
      if (res.status === 401 || res.status === 403) {
        setError("Clé invalide ou non autorisée.");
        return;
      }
      // Clé valide → on stocke en session
      sessionStorage.setItem(SESSION_KEY, key);
      setApiKey(key);
    } catch {
      setError("Impossible de vérifier la clé. Vérifie ta connexion.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Instrument Serif', Georgia, serif",
      minHeight: '100vh',
      background: '#FAF8F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .sans { font-family: 'Inter Tight', sans-serif; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B7E64', marginBottom: 8 }}>
            UX-Republic · Outil interne
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 400, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A' }}>
            Push <em style={{ color: '#7A8C6F' }}>CV</em>
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: 36,
          border: '1px solid #E8E2D5',
          boxShadow: '0 4px 24px rgba(26,26,26,0.06)',
        }}>
          <h2 className="sans" style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px 0', color: '#1A1A1A' }}>
            Clé API Anthropic
          </h2>
          <p className="sans" style={{ fontSize: 13, color: '#8B7E64', margin: '0 0 24px 0', lineHeight: 1.6 }}>
            Renseigne ta clé pour activer l'outil. Elle est stockée uniquement en session (effacée à la fermeture de l'onglet).
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(''); }}
                placeholder="sk-ant-api03-…"
                className="sans"
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${error ? '#F4C9A0' : '#E8E2D5'}`,
                  borderRadius: 12,
                  fontSize: 13,
                  fontFamily: "'Inter Tight', sans-serif",
                  background: '#FAF8F4',
                  outline: 'none',
                  color: '#1A1A1A',
                  transition: 'border-color 0.2s',
                }}
              />
              {error && (
                <p className="sans" style={{ fontSize: 12, color: '#C97B5C', margin: '6px 0 0 2px' }}>{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!input.trim() || checking}
              className="sans"
              style={{
                width: '100%',
                padding: '13px',
                background: !input.trim() || checking ? '#E8E2D5' : '#1A1A1A',
                color: !input.trim() || checking ? '#8B7E64' : '#FAF8F4',
                border: 'none',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: !input.trim() || checking ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background 0.2s',
              }}
            >
              {checking ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Vérification…
                </>
              ) : 'Accéder à l\'outil'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="sans" style={{ textAlign: 'center', fontSize: 11, color: '#B5A990', marginTop: 20 }}>
          Obtiens ta clé sur{' '}
          <a href="https://platform.claude.com/settings/keys" target="_blank" rel="noreferrer" style={{ color: '#7A8C6F' }}>
            platform.claude.com
          </a>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
