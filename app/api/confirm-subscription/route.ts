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

    const pendingKey = `pending-subscriptions:${location}:${postalCode}:${email}`;
    const subscriptionKey = `subscriptions:${location}:${postalCode}`;

    // Sprawdź, czy istnieje tymczasowa subskrypcja
    const pendingData = await redis.hgetall(pendingKey);
    if (!pendingData || pendingData.token !== token) {
      return NextResponse.json(
        { error: 'Nieprawidłowy lub wygasły token' },
        { status: 400 }
      );
    }

    // Zapisz subskrypcję w Redis
    await redis.sadd(subscriptionKey, email);

    // Usuń tymczasową subskrypcję
    await redis.del(pendingKey);

    // Wyślij email z potwierdzeniem
    const subject = 'Subskrypcja potwierdzona';
    const text = ``;
    const html = `
      <h3 style="text-align:center; margin-bottom:20px;">Subskrypcja powiadomień została potwierdzona</h3>
      <p>Szanowni Państwo,</p>
      <p>Twoja subskrypcja powiadomień o zbiórce śmieci dla lokalizacji <span style="color: green;">${postalCode} ${location}</span> została pomyślnie potwierdzona.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;

    await sendEmail(email, subject, text, html);

    return NextResponse.json({ message: 'Subskrypcja została pomyślnie potwierdzona' });
  } catch (error) {
    console.error('Błąd w /api/confirm-subscription:', error);
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
        new URL('/confirm-subscription?status=error&message=Brak wymaganych parametrów (token, email, location, postalCode)', request.url)
      );
    }

    const pendingKey = `pending-subscriptions:${location}:${postalCode}:${email}`;
    const subscriptionKey = `subscriptions:${location}:${postalCode}`;

    // Sprawdź, czy istnieje tymczasowa subskrypcja
    const pendingData = await redis.hgetall(pendingKey);
    if (!pendingData || pendingData.token !== token) {
      return NextResponse.redirect(
        new URL('/confirm-subscription?status=error&message=Nieprawidłowy lub wygasły token', request.url)
      );
    }

    // Zapisz subskrypcję w Redis
    await redis.sadd(subscriptionKey, email);

    // Usuń tymczasową subskrypcję
    await redis.del(pendingKey);

    // Wyślij email z potwierdzeniem
    const subject = 'Subskrypcja potwierdzona';
    const text = ``;
    const html = `
      <h3 style="text-align:center; margin-bottom:20px;">Subskrypcja powiadomień została potwierdzona</h3>
      <p>Szanowni Państwo,</p>
      <p>Twoja subskrypcja powiadomień o zbiórce śmieci dla lokalizacji <span style="color: green;">${postalCode} ${location}</span> została pomyślnie potwierdzona.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;

    await sendEmail(email, subject, text, html);

    return NextResponse.redirect(
      new URL('/confirm-subscription?status=success&message=Subskrypcja została pomyślnie potwierdzona', request.url)
    );
  } catch (error) {
    console.error('Błąd w /api/confirm-subscription:', error);
    return NextResponse.redirect(
      new URL('/confirm-subscription?status=error&message=Wystąpił błąd serwera', request.url)
    );
  }
}