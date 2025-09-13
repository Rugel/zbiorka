import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Opcjonalnie: wymuś UTF-8 w konfiguracji transportera
transporter.set('charset', 'utf8');

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  // Normalizacja tekstu do NFC (dla spójności)
  const normalizedSubject = subject.normalize('NFC');
  const normalizedText = text.normalize('NFC');

  const mailOptions = {
    from: `"Zbiórka Odpadów" <${process.env.EMAIL_USER}>`,
    to,
    subject: normalizedSubject,
    text: normalizedText,
    html: `
  <div style="text-align:center; margin-bottom:20px;">
    <img src="https://zbiorka.vercel.app/logo.png" alt="Zbiórka Odpadów Logo" style="max-width:120px; height:auto;" />
  </div>
  ${normalizedText}
  ${html}
  <hr/>
  <div style="text-align:center; margin-top:10px; font-size:12px; color:#555;">
    TrashAlert © 2025
    <a href="https://zbiorka.vercel.app">
      zbiorka.vercel.app
    </a>
  </div>
`,
    encoding: 'utf8', // Jawne ustawienie kodowania
    charset: 'utf8',  // Ustawienie zestawu znaków
  };

  await transporter.sendMail(mailOptions);
  console.log('E-mail wysłany do:', to);
}