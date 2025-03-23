import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function POST(request: Request) {
  try {
    const { location, date, category } = await request.json();
    const today = new Date().toISOString().split('T')[0];
    const checkDate = (date || today).trim();

    console.log('Odebrano dane:', { location, date, category });
    console.log('CheckDate:', checkDate);

    if (!location || !category) {
      return NextResponse.json(
        { error: 'Lokalizacja i kategoria są wymagane' },
        { status: 400 }
      );
    }

    const normalizedLocation = location.normalize('NFC');
    const scheduleKey = `schedule:${normalizedLocation}:${category}`;
    const subscriptionKey = `subscriptions:${normalizedLocation}`;

    const dates = await redis.smembers(scheduleKey);
    const subscribers = await redis.smembers(subscriptionKey);

    console.log('Dates z Redis:', dates);
    console.log('Subskrybenci:', subscribers);
    console.log('Czy checkDate w dates?', dates.includes(checkDate));

    if (dates.length === 0) {
      return NextResponse.json({ message: 'Brak harmonogramu dla tej lokalizacji i kategorii' });
    }
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'Brak subskrybentów dla tej lokalizacji' });
    }
    if (!dates.includes(checkDate)) {
      return NextResponse.json({
        message: `Brak zbiórki ${category} w ${normalizedLocation} na dzień ${checkDate}`,
      });
    }

    const categoryLabels: { [key: string]: string } = {
      mixed: 'Zmieszane odpady komunalne',
      plastics: 'Tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)',
      glass: 'Szkło białe i kolorowe (worek zielony)',
      paper: 'Papier, tektura (worek niebieski)',
      bio: 'Odpady biodegradowalne (worek brązowy)',
      bulky: 'Odpady wielkogabarytowe',
      electronics: 'Zużyty sprzęt elektryczny i elektroniczny',
    };

    const subject = `Zbiórka odpadów w ${normalizedLocation}`;
    const text = `Dzisiaj (${checkDate}) odbywa się zbiórka ${categoryLabels[category]} w ${normalizedLocation}.`;

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