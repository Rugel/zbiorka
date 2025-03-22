import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function POST(request: Request) {
  try {
    const { location, date } = await request.json();
    const today = new Date().toISOString().split('T')[0];
    const checkDate = (date || today).trim();

    console.log('Odebrano dane:', { location, date });
    console.log('CheckDate:', checkDate);

    if (!location) {
      return NextResponse.json({ error: 'Lokalizacja jest wymagana' }, { status: 400 });
    }

    const normalizedLocation = location.normalize('NFC');
    const scheduleKey = `schedule:${normalizedLocation}`;
    const subscriptionKey = `subscriptions:${normalizedLocation}`;

    const dates = await redis.smembers(scheduleKey);
    const subscribers = await redis.smembers(subscriptionKey);

    console.log('Dates z Redis:', dates);
    console.log('Subskrybenci:', subscribers);
    console.log('Czy checkDate w dates?', dates.includes(checkDate));

    if (dates.length === 0) {
      return NextResponse.json({ message: 'Brak harmonogramu dla tej lokalizacji' });
    }
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'Brak subskrybentów dla tej lokalizacji' });
    }
    if (!dates.includes(checkDate)) {
      return NextResponse.json({ message: `Brak zbiórki w ${normalizedLocation} na dzień ${checkDate}` });
    }

    const subject = `Przypomnienie: Zbiórka odpadów w ${normalizedLocation}`;
    const text = `Dzisiaj (${checkDate}) odbywa się zbiórka odpadów w ${normalizedLocation}.`;

    await Promise.all(
      subscribers.map(async (email) => {
        try {
          await sendEmail(email, subject, text);
          console.log(`Wysłano e-mail do ${email}`);
        } catch (error) {
          console.error(`Błąd wysyłania do ${email}:`, error);
        }
      })
    );

    return NextResponse.json({ message: 'Powiadomienia wysłane' });
  } catch (error) {
    console.error('Błąd w /api/notify:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}