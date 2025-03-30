import { NextResponse } from 'next/server';
import { sendEmail } from '../../lib/email';

export async function POST(request: Request) {
  try {
    const { to } = await request.json();

    if (!to) {
      return NextResponse.json({ error: 'Adres e-mail jest wymagany' }, { status: 400 });
    }

    const subject = 'Test powiadomienia o zbiórce odpadów';
    const text = 'To jest testowy e-mail z aplikacji Waste Collection Notifier.';

    await sendEmail(to, subject, text, text);

    return NextResponse.json({ message: 'E-mail wysłany pomyślnie' });
  } catch (error) {
    console.error('Błąd w email-test:', error);
    return NextResponse.json(
      {
        error: 'Błąd wysyłania e-maila',
        details: error instanceof Error ? error.message : 'Nieznany błąd',
      },
      { status: 500 }
    );
  }
}