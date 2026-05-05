import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }

  const { name, email, message, _gotcha } = body;

  // Honeypot — bots fill hidden fields, humans don't
  if (_gotcha) {
    return json({ ok: false }, 200);
  }

  // Required fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ ok: false, error: 'Missing fields' }, 400);
  }

  // Length caps (mirrors client-side maxLength)
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return json({ ok: false, error: 'Field too long' }, 400);
  }

  // Basic email shape check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email' }, 400);
  }

  const apiKey  = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_RECEIVER_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL');
    return json({ ok: false, error: 'Server misconfigured' }, 500);
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, '<br>');

  const plainMessage = message
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const templateHtml = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Message</title>
      </head>
      <body style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb; padding:40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(15,23,42,0.08);">
                <tr>
                  <td style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding:32px 40px; color:#ffffff;">
                    <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.8;">Portfolio Contact</div>
                    <h1 style="margin:10px 0 0; font-size:28px; line-height:1.2;">New message from your website</h1>
                    <p style="margin:12px 0 0; font-size:15px; line-height:1.6; opacity:0.9;">A visitor submitted your contact form.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <div style="margin:0 0 16px; font-size:14px; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Sender Details</div>
                    <p style="margin:0 0 10px; font-size:16px;"><strong style="color:#111827;">Name:</strong> ${safeName}</p>
                    <p style="margin:0 0 10px; font-size:16px;"><strong style="color:#111827;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a></p>
                    <div style="margin:28px 0 16px; font-size:14px; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Message</div>
                    <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:20px; font-size:16px; line-height:1.7; color:#111827; white-space:pre-wrap;">
                      ${safeMessage}
                    </div>
                    <div style="margin-top:28px; padding-top:20px; border-top:1px solid #e5e7eb; font-size:13px; color:#6b7280; line-height:1.6;">Reply directly to this email to respond to the sender.</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 40px 36px;">
                    <a href="mailto:${safeEmail}" style="display:inline-block; background:#111827; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:10px; font-size:15px; font-weight:bold;">Reply to ${safeName}</a>
                  </td>
                </tr>
              </table>
              <div style="max-width:640px; margin-top:16px; font-size:12px; color:#94a3b8; line-height:1.6;">This email was generated from your website contact form.</div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const confirmationTemplateHtml = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Message Received</title>
      </head>
      <body style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb; padding:40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(15,23,42,0.08);">
                <tr>
                  <td style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding:32px 40px; color:#ffffff;">
                    <div style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.8;">Portfolio Contact</div>
                    <h1 style="margin:10px 0 0; font-size:28px; line-height:1.2;">Thanks for reaching out</h1>
                    <p style="margin:12px 0 0; font-size:15px; line-height:1.6; opacity:0.9;">Your message has been received successfully.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <p style="margin:0 0 14px; font-size:16px; line-height:1.7;">Hi ${safeName},</p>
                    <p style="margin:0 0 14px; font-size:16px; line-height:1.7;">Thank you for your message. I will get back to you as soon as possible.</p>
                    <p style="margin:0 0 20px; font-size:16px; line-height:1.7;">Best regards,<br/>Alessio</p>
                    <div style="margin-top:16px; padding-top:20px; border-top:1px solid #e5e7eb; font-size:13px; color:#6b7280; line-height:1.6;">If you need to add anything else, you can reply directly to this email.</div>
                  </td>
                </tr>
              </table>
              <div style="max-width:640px; margin-top:16px; font-size:12px; color:#94a3b8; line-height:1.6;">This is an automated confirmation from the portfolio contact form.</div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Portfolio Contact <contact@alessiomicciche.dev>',
        to:   toEmail,
        replyTo: email,
        subject: `[Portfolio] New message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${plainMessage}
        `.trim(),
        html: templateHtml,
      }),
      resend.emails.send({
        from: 'Portfolio Contact <contact@alessiomicciche.dev>',
        to: email,
        replyTo: toEmail,
        subject: 'We received your message',
        text: `
Hi ${name},

Thank you for your message. I will get back to you as soon as possible.

Best regards,
Alessio
        `.trim(),
        html: confirmationTemplateHtml,
      }),
    ]);

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('Resend error:', err);
    return json({ ok: false, error: 'Failed to send email' }, 500);
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
