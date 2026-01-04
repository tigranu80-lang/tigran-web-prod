import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Email is stored in Vercel Environment Variable - NOT in code
const resend = new Resend(process.env['RESEND_API_KEY']);
const TO_EMAIL = process.env['CONTACT_EMAIL'] || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if email is configured
    if (!TO_EMAIL || !process.env['RESEND_API_KEY']) {
      console.error('Missing environment variables: CONTACT_EMAIL or RESEND_API_KEY');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'EsperaStudio Contact <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `New Contact Form: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0A; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #737373; font-size: 12px; text-transform: uppercase;">Name</p>
            <p style="margin: 5px 0; color: #0A0A0A; font-size: 16px;">${name}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #737373; font-size: 12px; text-transform: uppercase;">Email</p>
            <p style="margin: 5px 0; color: #0A0A0A; font-size: 16px;">
              <a href="mailto:${email}" style="color: #0A0A0A;">${email}</a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0; color: #737373; font-size: 12px; text-transform: uppercase;">Message</p>
            <p style="margin: 5px 0; color: #0A0A0A; font-size: 16px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;" />
          <p style="color: #a3a3a3; font-size: 11px;">
            Sent from EsperaStudio website contact form
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}










