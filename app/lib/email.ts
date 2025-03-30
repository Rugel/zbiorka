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
    html:
      `<h4>Przypomnienie!<h4/>
     ${html}
      <small>Jeśli nie subskrybowałeś powiadomień, zignoruj tę wiadomość.</small>
      <footer>
        <small>Waste Collection Notifier © 2025 <a href='https://zbiorka.vercel.app'>zbiorka.vercel.app</a></small>
      </footer>
    `,
    encoding: 'utf8', // Jawne ustawienie kodowania
    charset: 'utf8',  // Ustawienie zestawu znaków
  };

  await transporter.sendMail(mailOptions);
  console.log('E-mail wysłany do:', to);
}