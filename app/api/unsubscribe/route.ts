import { NextResponse } from 'next/server';
import redis from '../../lib/redis';

export async function POST(request: Request) {
  try {
    const { email, location, postalCode } = await request.json();

    if (!email || !location || !postalCode) {
      return NextResponse.json(
        { error: 'Email, miejscowość i kod pocztowy są wymagane' },
        { status: 400 }
      );
    }

    const normalizedLocation = location.normalize('NFC');
    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

    // Usuń email z subskrypcji
    const result = await redis.srem(subscriptionKey, email);

    if (result === 0) {
      return NextResponse.json(
        { error: 'Subskrypcja nie została znaleziona dla podanego emaila' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Subskrypcja została pomyślnie anulowana' });
  } catch (error) {
    console.error('Błąd w /api/unsubscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}