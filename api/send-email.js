import { Resend } from 'resend';

// Simple in-memory rate limit (per-IP). Note: resets on cold start; for production use a shared store.
const ipToTimestamps = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, company, phone, category, message, urgency, turnstileToken } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Basic IP rate limit
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = ipToTimestamps.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    ipToTimestamps.set(ip, recent);
    if (recent.length > MAX_REQUESTS_PER_WINDOW) {
      res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
      return;
    }
  } catch {}

  // Optional Cloudflare Turnstile verification if env provided and token sent
  if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
    try {
      const formData = new URLSearchParams();
      formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        res.status(400).json({ error: 'Bot verification failed' });
        return;
      }
    } catch (e) {
      res.status(400).json({ error: 'Bot verification error' });
      return;
    }
  }

  try {
    const subject = `New Inquiry from ${name} (${email}) [${category || 'General'}]`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || ''}`,
      `Phone: ${phone || ''}`,
      `Category: ${category || ''}`,
      `Urgency: ${urgency || ''}`,
      '',
      'Message:',
      message,
    ].join('\n');

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      reply_to: email,
      subject,
      text,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}