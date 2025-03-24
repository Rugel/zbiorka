/*import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function POST(request: Request) {
  try {
    const { location, postalCode, date, category } = await request.json();
    const today = new Date().toISOString().split('T')[0];
    const checkDate = (date || today).trim();

    console.log('Odebrano dane:', { location, postalCode, date, category });
    console.log('CheckDate:', checkDate);

    if (!location || !postalCode || !category) {
      return NextResponse.json(
        { error: 'Lokalizacja, kod pocztowy i kategoria są wymagane' },
        { status: 400 }
      );
    }

    const postalCodeRegex = /^\d{2}-\d{3}$/;
    if (!postalCodeRegex.test(postalCode)) {
      return NextResponse.json(
        { error: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025)' },
        { status: 400 }
      );
    }

    const normalizedLocation = location.normalize('NFC');
    const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

    const dates = await redis.smembers(scheduleKey);
    const subscribers = await redis.smembers(subscriptionKey);

    console.log('Dates z Redis:', dates);
    console.log('Subskrybenci:', subscribers);
    console.log('Czy checkDate w dates?', dates.includes(checkDate));

    if (dates.length === 0) {
      return NextResponse.json({ message: 'Brak harmonogramu dla tej lokalizacji, kodu pocztowego i kategorii' });
    }
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'Brak subskrybentów dla tej lokalizacji i kodu pocztowego' });
    }
    if (!dates.includes(checkDate)) {
      return NextResponse.json({
        message: `Brak zbiórki ${category} w ${normalizedLocation} (${postalCode}) na dzień ${checkDate}`,
      });
    }

    const categoryLabels: { [key: string]: string } = {
      mixed: '🗑️zmieszane odpady komunalne',
      plastics: '🟡tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)',
      glass: '🟢szkło białe i kolorowe (worek zielony)',
      paper: '🔵papier, tektura (worek niebieski)',
      bio: '🟤odpady biodegradowalne (worek brązowy)',
      bulky: '🪑odpady wielkogabarytowe',
      electronics: '📻zużyty sprzęt elektryczny i elektroniczny',
    };

    const subject = `Zbiórka odpadów w ${normalizedLocation}`;
    const text = `Dzisiaj ${checkDate} odbywa się zbiórka odpadów z kategorii "${categoryLabels[category]}" w ${normalizedLocation} (${postalCode}). Pamiętaj o wystawieniu śmieci!`;

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
}*/



import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function POST(request: Request) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Cron: Sprawdzanie harmonogramu na dzień:', today);

    // Lista kategorii odpadów
    const wasteCategories = [
      'mixed',
      'plastics',
      'glass',
      'paper',
      'bio',
      'bulky',
      'electronics',
    ];

    const categoryLabels: { [key: string]: string } = {
      mixed: '🗑️zmieszane odpady komunalne',
      plastics: '🟡tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)',
      glass: '🟢szkło białe i kolorowe (worek zielony)',
      paper: '🔵papier, tektura (worek niebieski)',
      bio: '🟤odpady biodegradowalne (worek brązowy)',
      bulky: '🪑odpady wielkogabarytowe',
      electronics: '📻zużyty sprzęt elektryczny i elektroniczny',
    };

    // Pobierz wszystkie klucze subskrypcji
    const subscriptionKeys = await redis.keys('subscriptions:*:*');
    if (subscriptionKeys.length === 0) {
      console.log('Brak subskrybentów w bazie');
      return NextResponse.json({ message: 'Brak subskrybentów' });
    }

    for (const subKey of subscriptionKeys) {
      const [, location, postalCode] = subKey.split(':'); // subscriptions:Duraczow:26-025
      const subscribers = await redis.smembers(subKey);

      for (const category of wasteCategories) {
        const scheduleKey = `schedule:${location}:${postalCode}:${category}`;
        const dates = await redis.smembers(scheduleKey);

        if (dates.includes(today)) {
          const subject = `Przypomnienie: Zbiórka ${categoryLabels[category]} w ${location} (${postalCode})`;
          const text = `Dzisiaj (${today}) odbywa się zbiórka ${categoryLabels[category]} w ${location} (${postalCode}).`;

          await Promise.all(
            subscribers.map(async (email) => {
              try {
                await sendEmail(email, subject, text);
                console.log(`Wysłano e-mail do ${email} dla ${location} (${postalCode}, ${category})`);
              } catch (error) {
                console.error(`Błąd wysyłania do ${email}:`, error);
              }
            })
          );
        }
      }
    }

    return NextResponse.json({ message: 'Powiadomienia cron wysłane' });
  } catch (error) {
    console.error('Błąd w /api/notify (cron):', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}