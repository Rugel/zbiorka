import { NextResponse } from 'next/server';
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
}