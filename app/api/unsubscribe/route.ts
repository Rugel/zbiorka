import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';
import { normalizeLocation } from '../../../utils/normalizeLocation';
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

    const normalizedLocation = normalizeLocation(location);
    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;
    const pendingKey = `pending-unsubscriptions:${normalizedLocation}:${postalCode}:${email}`;

    // Sprawdź, czy subskrypcja istnieje
    const exists = await redis.sismember(subscriptionKey, email);
    if (!exists) {
      return NextResponse.json(
        { error: 'Subskrypcja nie została znaleziona dla podanego emaila' },
        { status: 404 }
      );
    }

    // Wygeneruj unikalny token
    const token = crypto.randomBytes(32).toString('hex');

    // Zapisz tymczasowe żądanie anulowania w Redis (wygasa po 24 godzinach)
    await redis.hset(pendingKey, {
      email,
      location: normalizedLocation,
      postalCode,
      token,
    });
    await redis.expire(pendingKey, 24 * 60 * 60); // 24 godziny

    // Wygeneruj link potwierdzający
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-unsubscription?token=${token}&email=${encodeURIComponent(email)}&location=${encodeURIComponent(normalizedLocation)}&postalCode=${encodeURIComponent(postalCode)}`;

    // Wyślij email z linkiem potwierdzającym
    const subject = ' Potwierdzenie anulowania subskrypcji';
    const text = ``;
    const html = `
      <h3>Potwierdź anulowanie subskrypcji powiadomień</h3>
      <p>Szanowni Państwo,</p>
      <p>Otrzymaliśmy prośbę o anulowanie subskrypcji powiadomień o zbiórce śmieci dla lokalizacji <span style="color: green;">${postalCode} ${normalizedLocation}</span>.</p>
      <p>Aby potwierdzić anulowanie, kliknij w poniższy link:</p>
      <p><a href="${confirmLink}">Potwierdź anulowanie subskrypcji</a></p>
      <p>Link jest ważny przez 24 godziny. Jeśli nie chcesz anulować subskrypcji, zignoruj tę wiadomość.</p>
      <p>Pozdrawiamy,<br>Zespół Zbiorka</p>
    `;

    await sendEmail(email, subject, text, html);

    return NextResponse.json({ message: 'Prośba o anulowanie subskrypcji została wysłana. Sprawdź email, aby potwierdzić.' });
  } catch (error) {
    console.error('Błąd w /api/unsubscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}