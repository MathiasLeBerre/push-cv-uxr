# Push CV · UX-Republic

Outil interne de matching et push de CV consultants.

## Stack
- React 18 + Vite
- Netlify Functions (proxy API Anthropic)
- localStorage pour la persistance

## Déploiement sur Netlify

### 1. Prépare le repo Git

```bash
git init
git add .
git commit -m "Initial commit — Push CV tool"
git remote add origin https://github.com/TON_USERNAME/push-cv-uxr.git
git push -u origin main
```

### 2. Connecte à Netlify

1. Va sur [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
2. Sélectionne ton repo GitHub
3. Netlify détecte automatiquement la config depuis `netlify.toml` :
   - Build command : `npm run build`
   - Publish directory : `dist`
   - Functions directory : `netlify/functions`
4. Clique **Deploy site**

### 3. (Optionnel) Clé API en variable d'environnement

Si tu veux que la clé soit pré-configurée sans saisie au démarrage :

1. Netlify → **Site settings** → **Environment variables**
2. Ajoute : `ANTHROPIC_API_KEY` = `sk-ant-api03-…`
3. Redéploie

Sans cette variable, l'outil affiche un écran de saisie de clé au démarrage (stockée en sessionStorage, effacée à la fermeture).

## Développement local

```bash
# Installe les dépendances
npm install

# Lance en local avec Netlify CLI (pour les fonctions)
npx netlify dev

# Ou juste le frontend (sans les fonctions)
npm run dev
```

## Structure

```
push-cv-netlify/
├── netlify/
│   └── functions/
│       └── claude.js        ← Proxy sécurisé vers l'API Anthropic
├── src/
│   ├── main.jsx             ← Entry point React
│   ├── App.jsx              ← Écran de saisie clé API + routing
│   ├── PushCVTool.jsx       ← Composant principal (tool complet)
│   └── api.js               ← Client → proxy Netlify
├── index.html
├── netlify.toml
├── package.json
└── vite.config.js
```

## Différences vs version claude.ai

| | Artifact claude.ai | Netlify |
|---|---|---|
| Rate limit | Proxy interne fixe | Ta clé API → limits panel |
| Stockage | window.storage (session) | localStorage (persistant) |
| Sync Drive | ✓ (MCP) | ✗ (supprimé, export JSON disponible) |
| Déploiement | Aucun | ~2 min sur Netlify |
