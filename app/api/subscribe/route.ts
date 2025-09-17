import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';
import { normalizeLocation } from '../../../utils/normalizeLocation';
import { wasteCategories } from '../../../utils/wasteCategories';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, location, postalCode } = await request.json();

    if (!email || !location || !postalCode) {
      return NextResponse.json(
        { error: 'Email, miejscowość i kod pocztowy są wymagane' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format adresu email' },
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

    const normalizedLocation = normalizeLocation(location);
    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;
    const pendingKey = `pending-subscriptions:${normalizedLocation}:${postalCode}:${email}`;

    // Sprawdź, czy subskrypcja już istnieje
    const existingSubscription = await redis.sismember(subscriptionKey, email);
    if (existingSubscription) {
      return NextResponse.json(
        { message: 'Ten email jest już zasubskrybowany dla tej lokalizacji i kodu pocztowego' },
        { status: 400 }
      );
    }

    // Sprawdź, czy istnieje harmonogram dla tej lokalizacji
    let hasSchedule = false;
    for (const category of wasteCategories) {
      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const dates = await redis.smembers(scheduleKey);
      if (dates.length > 0) {
        hasSchedule = true;
        break;
      }
    }

    if (!hasSchedule) {
      return NextResponse.json(
        { error: 'Brak harmonogramu dla tej lokalizacji i kodu pocztowego' },
        { status: 400 }
      );
    }

    // Wygeneruj unikalny token
    const token = crypto.randomBytes(32).toString('hex');

    // Zapisz tymczasową subskrypcję w Redis z tokenem (wygasa po 24 godzinach)
    await redis.hset(pendingKey, {
      email,
      location: normalizedLocation,
      postalCode,
      token,
    });
    await redis.expire(pendingKey, 24 * 60 * 60); // 24 godziny

    // Wygeneruj link potwierdzający
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-subscription?token=${token}&email=${encodeURIComponent(email)}&location=${encodeURIComponent(normalizedLocation)}&postalCode=${encodeURIComponent(postalCode)}`;

    // Wyślij email z linkiem potwierdzającym
    const subject = 'Potwierdź subskrypcję powiadomień o zbiórce śmieci';
    const text = `Szanowni Państwo,\n\nOtrzymaliśmy prośbę o subskrypcję powiadomień o zbiórce śmieci dla lokalizacji ${normalizedLocation} (${postalCode}).\n\nAby potwierdzić subskrypcję, kliknij w poniższy link:\n${confirmLink}\n\nLink jest ważny przez 24 godziny. Jeśli nie chcesz subskrybować powiadomień, zignoruj tę wiadomość.\n\nPozdrawiamy,\nZespół Zbiorka`;
    const html = `
      <h3>Potwierdź subskrypcję powiadomień o zbiórce śmieci</h3>
      <p>Szanowni Państwo,</p>
      <p>Otrzymaliśmy prośbę o subskrypcję powiadomień o zbiórce śmieci dla lokalizacji ${normalizedLocation} (${postalCode}).</p>
      <p>Aby potwierdzić subskrypcję, kliknij w poniższy link:</p>
      <p><a href="${confirmLink}">Potwierdź subskrypcję</a></p>
      <p>Link jest ważny przez 24 godziny. Jeśli nie chcesz subskrybować powiadomień, zignoruj tę wiadomość.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;

    await sendEmail(email, subject, text, html);

    return NextResponse.json({ message: 'Prośba o subskrypcję została wysłana. Sprawdź email, aby potwierdzić.' });
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}