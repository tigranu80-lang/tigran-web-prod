import type { VercelRequest, VercelResponse } from '@vercel/node';

const N8N_WEBHOOK_URL = process.env['N8N_WEBHOOK_URL'] || 'https://cpt-n8n.autodoc.dev/webhook/new_lid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers for production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { name, email, system, impact, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare payload for n8n
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      challenge: system || 'Not specified',
      impact: impact || 'Not specified',
      message: message.trim(),
      source: 'esperastudio.com',
      timestamp: new Date().toISOString(),
    };

    // Send to n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error('n8n webhook error:', n8nResponse.status, await n8nResponse.text());
      return res.status(502).json({ error: 'Failed to process lead' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
