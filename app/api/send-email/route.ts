import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // transporter Gmail (wymaga hasła aplikacji, nie normalnego hasła!)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Formularz kontaktowy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nowa wiadomość od ${name}`,
      text: message,
      html: `<p><strong>Od:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd wysyłki maila:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
