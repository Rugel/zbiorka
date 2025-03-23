/*import { NextResponse } from 'next/server';
import redis from '../../lib/redis';

export async function POST(request: Request) {
  try {
    const { email, location } = await request.json();
    if (!email || !location) {
      return NextResponse.json({ error: 'Email i lokalizacja są wymagane' }, { status: 400 });
    }

    // Normalizacja lokalizacji do NFC
    const normalizedLocation = location.normalize('NFC');
    await redis.sadd(`subscriptions:${normalizedLocation}`, email);
    console.log(`Zapisano ${email} dla ${normalizedLocation}`);

    return NextResponse.json({ message: 'Zasubskrybowano pomyślnie' });
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json({ error: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}*/



import { NextResponse } from 'next/server';
import redis from '../../lib/redis';

export async function POST(request: Request) {
  try {
    const { email, location, postalCode } = await request.json();

    if (!email || !location || !postalCode) {
      return NextResponse.json(
        { error: 'E-mail, lokalizacja i kod pocztowy są wymagane' },
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
    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

    await redis.sadd(subscriptionKey, email);
    console.log(`Dodano subskrybenta ${email} dla ${normalizedLocation} (${postalCode})`);

    return NextResponse.json({ message: 'Subskrypcja dodana pomyślnie' });
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}