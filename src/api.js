// src/api.js
// Appel direct vers l'API Anthropic depuis le navigateur.
// La clé est passée en header — même niveau de sécurité que sessionStorage.

export async function callClaude(body, apiKey) {
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

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || err.error || `Erreur API (${response.status})`);
  }

  return response.json();
}
