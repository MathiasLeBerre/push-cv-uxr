// netlify/functions/claude.js
// Proxy sécurisé : reçoit les requêtes du frontend, ajoute la clé API, forward vers Anthropic.
// La clé API ne transite jamais dans le navigateur.

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Récupère la clé API : priorité à la variable d'env Netlify, fallback sur le header envoyé par le client
  const apiKey = process.env.ANTHROPIC_API_KEY || event.headers['x-api-key'];

  if (!apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Clé API manquante. Renseigne-la au démarrage ou configure ANTHROPIC_API_KEY dans Netlify.' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
