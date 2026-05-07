// netlify/functions/claude.js
// Proxy avec streaming : forward les chunks SSE d'Anthropic vers le client
// Évite le timeout de 30s car la connexion reste active pendant toute la génération

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || event.headers['x-api-key'];

  if (!apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Clé API manquante.' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // stream: true → Anthropic commence à envoyer des données immédiatement
    // ce qui maintient la connexion active et évite le timeout Netlify
    const streamBody = { ...body, stream: true };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31',
      },
      body: JSON.stringify(streamBody),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errData),
      };
    }

    // Lire le stream SSE et assembler le texte complet
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let inputTokens = 0;
    let outputTokens = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);

          if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
            fullText += parsed.delta.text;
          }
          if (parsed.type === 'message_start') {
            inputTokens = parsed.message?.usage?.input_tokens || 0;
          }
          if (parsed.type === 'message_delta') {
            outputTokens = parsed.usage?.output_tokens || 0;
          }
        } catch {}
      }
    }

    // Renvoie une réponse au format standard messages API
    // → le frontend (PushCVTool.jsx) n'a pas besoin de changer
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: [{ type: 'text', text: fullText }],
        usage: { input_tokens: inputTokens, output_tokens: outputTokens },
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

