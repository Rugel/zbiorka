/*import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const location = searchParams.get('location');
    const postalCode = searchParams.get('postalCode');

    if (!token || !email || !location || !postalCode) {
      return NextResponse.json(
        { error: 'Brak wymaganych parametrów (token, email, location, postalCode)' },
        { status: 400 }
      );
    }

    const pendingKey = `pending-unsubscriptions:${location}:${postalCode}:${email}`;
    const subscriptionKey = `subscriptions:${location}:${postalCode}`;

    // Sprawdź, czy istnieje tymczasowe żądanie anulowania
    const pendingData = await redis.hgetall(pendingKey);
    if (!pendingData || pendingData.token !== token) {
      return NextResponse.json(
        { error: 'Nieprawidłowy lub wygasły token' },
        { status: 400 }
      );
    }

    // Usuń subskrypcję z Redis
    const result = await redis.srem(subscriptionKey, email);
    if (result === 0) {
      return NextResponse.json(
        { error: 'Subskrypcja nie została znaleziona' },
        { status: 404 }
      );
    }

    // Usuń tymczasowe żądanie anulowania
    await redis.del(pendingKey);

    // Wyślij email z potwierdzeniem
    const subject = 'Anulowanie subskrypcji potwierdzone';
    const text = ``;
    const html = `
      <h3 style="text-align:center; margin-bottom:20px;">Subskrypcja powiadomień została anulowana</h3>
      <p>Szanowni Państwo,</p>
      <p>Twoja subskrypcja powiadomień o zbiórce śmieci dla lokalizacji <span style="color: green;">${postalCode} ${location}</span> została pomyślnie anulowana.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;

    await sendEmail(email, subject, text, html);

    return NextResponse.json({ message: 'Subskrypcja została pomyślnie anulowana' });
  } catch (error) {
    console.error('Błąd w /api/confirm-unsubscription:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}*/



import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const location = searchParams.get('location');
    const postalCode = searchParams.get('postalCode');

    if (!token || !email || !location || !postalCode) {
      return NextResponse.redirect(
        new URL('/confirm-unsubscription?status=error&message=Brak wymaganych parametrów (token, email, location, postalCode)', request.url)
      );
    }

    const pendingKey = `pending-unsubscriptions:${location}:${postalCode}:${email}`;
    const subscriptionKey = `subscriptions:${location}:${postalCode}`;

    // Sprawdź, czy istnieje tymczasowe żądanie anulowania
    const pendingData = await redis.hgetall(pendingKey);
    if (!pendingData || pendingData.token !== token) {
      return NextResponse.redirect(
        new URL('/confirm-unsubscription?status=error&message=Nieprawidłowy lub wygasły token', request.url)
      );
    }

    // Usuń subskrypcję z Redis
    const result = await redis.srem(subscriptionKey, email);
    if (result === 0) {
      return NextResponse.redirect(
        new URL('/confirm-unsubscription?status=error&message=Subskrypcja nie została znaleziona', request.url)
      );
    }

    // Usuń tymczasowe żądanie anulowania
    await redis.del(pendingKey);

    // Wyślij email z potwierdzeniem
    const subject = 'Anulowanie subskrypcji potwierdzone';
    const text = ``;
    const html = `
      <h3 style="text-align:center; margin-bottom:20px;">Subskrypcja powiadomień została anulowana</h3>
      <p>Szanowni Państwo,</p>
      <p>Twoja subskrypcja powiadomień o zbiórce śmieci dla lokalizacji <span style="color: green;">${postalCode} ${location}</span> została pomyślnie anulowana.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;
    await sendEmail(email, subject, text, html);

    return NextResponse.redirect(
      new URL('/confirm-unsubscription?status=success&message=Subskrypcja została pomyślnie anulowana', request.url)
    );
  } catch (error) {
    console.error('Błąd w /api/confirm-unsubscription:', error);
    return NextResponse.redirect(
      new URL('/confirm-unsubscription?status=error&message=Wystąpił błąd serwera', request.url)
    );
  }
}