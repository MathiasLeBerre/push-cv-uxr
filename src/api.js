// src/api.js
// Toutes les appels API passent par ici → proxy Netlify Function

export async function callClaude(body, apiKey) {
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;

  const response = await fetch('/api/claude', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || err.error || `Erreur API (${response.status})`);
  }

  return response.json();
}
