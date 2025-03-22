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

export async function sendEmail(to: string, subject: string, text: string) {
  // Normalizacja tekstu do NFC (dla spójności)
  const normalizedSubject = subject.normalize('NFC');
  const normalizedText = text.normalize('NFC');

  const mailOptions = {
    from: `"Waste Notifier" <${process.env.EMAIL_USER}>`,
    to,
    subject: normalizedSubject,
    text: normalizedText,
    html: `
      <h1>${normalizedSubject}</h1>
      <p>${normalizedText}</p>
      <p>Ten e-mail został wysłany przez Waste Collection Notifier.</p>
      <p>Jeśli nie subskrybowałeś powiadomień, zignoruj tę wiadomość.</p>
      <footer>
        <small>Waste Collection Notifier © 2025</small>
      </footer>
    `,
    encoding: 'utf8', // Jawne ustawienie kodowania
    charset: 'utf8',  // Ustawienie zestawu znaków
  };

  await transporter.sendMail(mailOptions);
  console.log('E-mail wysłany do:', to);
}