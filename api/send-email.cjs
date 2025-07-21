import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, company, phone, category, message, urgency } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Configure the SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@ipmedicare.co.tz',
      pass: 'Ipmedicare@123',
    },
  });

  const mailOptions = {
    from: 'info@ipmedicare.co.tz',
    to: 'info@ipmedicare.co.tz',
    subject: `New Inquiry from ${name} (${email}) [${category || 'General'}]`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nCategory: ${category}\nUrgency: ${urgency}\n\nMessage:\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
} 