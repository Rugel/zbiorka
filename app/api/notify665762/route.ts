/*import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';
import { normalizeLocation } from '../../../utils/normalizeLocation';
import { categoryLabels, wasteCategories } from '../../../utils/wasteCategories';

export async function POST(request: Request) {
  return handleNotify(request); // Przekazujemy obsługę do wspólnej funkcji
}

export async function GET() {
  return handleNotify(null); // Dla cron, bez ciała żądania
}

async function handleNotify(request: Request | null) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Cron: Sprawdzanie harmonogramu na dzień:', today);

    let location: string | undefined, postalCode: string | undefined, category: string | undefined, date: string | undefined;

    // Jeśli jest request (POST), pobierz dane z ciała
    if (request) {
      const body = await request.json();
      location = body.location;
      postalCode = body.postalCode;
      category = body.category;
      date = body.date;
    }

    const checkDate = date || today;

    // Jeśli dane są podane w POST, obsłuż konkretną lokalizację
    if (location && postalCode && category) {
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      if (!postalCodeRegex.test(postalCode)) {
        return NextResponse.json(
          { error: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025)' },
          { status: 400 }
        );
      }

      // Normalizacja miejscowości za pomocą normalizeLocation
      const normalizedLocation = normalizeLocation(location);

      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

      const dates = await redis.smembers(scheduleKey);
      const subscribers = await redis.smembers(subscriptionKey);

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

      const subject = `${categoryLabels[category]} w ${normalizedLocation}`;
      const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci z kategorii "${categoryLabels[category]}" w ${postalCode} ${normalizedLocation}. Pamiętaj o wystawieniu pojemników!`;

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
    }

    // Jeśli brak danych (GET od cron), obsłuż wszystkie subskrypcje
    const subscriptionKeys = await redis.keys('subscriptions:*:*');
    if (subscriptionKeys.length === 0) {
      console.log('Brak subskrybentów w bazie');
      return NextResponse.json({ message: 'Brak subskrybentów' });
    }

    for (const subKey of subscriptionKeys) {
      const [, loc, pCode] = subKey.split(':');
      const subscribers = await redis.smembers(subKey);

      for (const cat of wasteCategories) {
        const scheduleKey = `schedule:${loc}:${pCode}:${cat}`;
        const dates = await redis.smembers(scheduleKey);

        if (dates.includes(checkDate)) {
          const subject = `Śmieci! ${categoryLabels[cat]} w ${loc}`;
          const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci z kategorii ${categoryLabels[cat]} w ${pCode} ${loc}. Pamiętaj o wystawieniu pojemników!`;

          await Promise.all(
            subscribers.map(async (email) => {
              try {
                await sendEmail(email, subject, text);
                console.log(`Wysłano e-mail do ${email} dla ${loc} (${pCode}, ${cat})`);
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
    console.error('Błąd w /api/notify:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}*/




/*import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { sendEmail } from '../../lib/email';
import { normalizeLocation } from '../../../utils/normalizeLocation';
import { categoryLabels, wasteCategories } from '../../../utils/wasteCategories';

export async function POST(request: Request) {
  return handleNotify(request); // Przekazujemy obsługę do wspólnej funkcji
}

export async function GET() {
  return handleNotify(null); // Dla cron, bez ciała żądania
}

async function handleNotify(request: Request | null) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Cron: Sprawdzanie harmonogramu na dzień:', today);

    let location: string | undefined, postalCode: string | undefined, date: string | undefined;

    // Jeśli jest request (POST), pobierz dane z ciała
    if (request) {
      const body = await request.json();
      location = body.location;
      postalCode = body.postalCode;
      date = body.date;
    }

    const checkDate = date || today;

    // Jeśli dane są podane w POST, obsłuż konkretną lokalizację
    if (location && postalCode) {
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      if (!postalCodeRegex.test(postalCode)) {
        return NextResponse.json(
          { error: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025)' },
          { status: 400 }
        );
      }

      // Normalizacja miejscowości
      const normalizedLocation = normalizeLocation(location);
      const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;
      const subscribers = await redis.smembers(subscriptionKey);

      if (subscribers.length === 0) {
        return NextResponse.json({ message: 'Brak subskrybentów dla tej lokalizacji i kodu pocztowego' });
      }

      // Znajdź wszystkie kategorie z zbiórką w danym dniu
      const categoriesWithPickup: string[] = [];
      for (const cat of wasteCategories) {
        const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${cat}`;
        const dates = await redis.smembers(scheduleKey);
        if (dates.includes(checkDate)) {
          categoriesWithPickup.push(cat);
        }
      }

      console.log(`[POST] Kategorie z zbiórką w dniu ${checkDate}:`, categoriesWithPickup);

      if (categoriesWithPickup.length === 0) {
        return NextResponse.json({
          message: `Brak zbiórek w ${normalizedLocation} (${postalCode}) na dzień ${checkDate}`,
        });
      }

      // Przygotuj treść emaila z listą wszystkich kategorii
      const subject = `Zbiórka odpadów w ${normalizedLocation}`;
      const categoriesText = categoriesWithPickup
        .map(cat => `- ${categoryLabels[cat]}`)
        .join('\n');
      const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci w ${postalCode} ${normalizedLocation}. Kategorie:\n${categoriesText}\n\n. Pamiętaj o wystawieniu pojemników!!!`;

      // Wyślij jeden email do wszystkich subskrybentów
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
    }

    // Jeśli brak danych (GET od cron), obsłuż wszystkie subskrypcje
    const subscriptionKeys = await redis.keys('subscriptions:*:*');
    if (subscriptionKeys.length === 0) {
      console.log('Brak subskrybentów w bazie');
      return NextResponse.json({ message: 'Brak subskrybentów' });
    }

    for (const subKey of subscriptionKeys) {
      const [, loc, pCode] = subKey.split(':');
      const subscribers = await redis.smembers(subKey);

      // Znajdź wszystkie kategorie z zbiórką w danym dniu
      const categoriesWithPickup: string[] = [];
      for (const cat of wasteCategories) {
        const scheduleKey = `schedule:${loc}:${pCode}:${cat}`;
        const dates = await redis.smembers(scheduleKey);
        if (dates.includes(checkDate)) {
          categoriesWithPickup.push(cat);
        }
      }

      console.log(`[GET] Kategorie z zbiórką w dniu ${checkDate} dla ${loc} (${pCode}):`, categoriesWithPickup);

      // Jeśli są kategorie z zbiórką, wyślij jeden email
      if (categoriesWithPickup.length > 0) {
        const subject = `Zbiórka odpadów w ${loc}`;
        const categoriesText = categoriesWithPickup
          .map(cat => `- ${categoryLabels[cat]}`)
          .join('\n');
        const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci w ${pCode} ${loc}. Kategorie:/n${categoriesText}/n/n. Pamiętaj o wystawieniu pojemników!`;

        await Promise.all(
          subscribers.map(async (email) => {
            try {
              await sendEmail(email, subject, text);
              console.log(`Wysłano e-mail do ${email} dla ${loc} (${pCode})`);
            } catch (error) {
              console.error(`Błąd wysyłania do ${email}:`, error);
            }
          })
        );
      }
    }

    return NextResponse.json({ message: 'Powiadomienia cron wysłane' });
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
import { normalizeLocation } from '../../../utils/normalizeLocation';
import { categoryLabels, wasteCategories } from '../../../utils/wasteCategories';

export async function POST(request: Request) {
  return handleNotify(request); // Przekazujemy obsługę do wspólnej funkcji
}

export async function GET() {
  return handleNotify(null); // Dla cron, bez ciała żądania
}

async function handleNotify(request: Request | null) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Cron: Sprawdzanie harmonogramu na dzień:', today);

    let location: string | undefined, postalCode: string | undefined, category: string | undefined, date: string | undefined;

    // Jeśli jest request (POST), pobierz dane z ciała
    if (request) {
      const body = await request.json();
      location = body.location;
      postalCode = body.postalCode;
      category = body.category;
      date = body.date;

      // Walidacja kategorii w metodzie POST
      if (category && !wasteCategories.includes(category)) {
        return NextResponse.json(
          { error: `Nieprawidłowa kategoria: ${category}. Dostępne kategorie: ${wasteCategories.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const checkDate = date || today;

    // Jeśli dane są podane w POST, obsłuż konkretną lokalizację
    if (location && postalCode && category) {
      const postalCodeRegex = /^\d{2}-\d{3}$/;
      if (!postalCodeRegex.test(postalCode)) {
        return NextResponse.json(
          { error: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025)' },
          { status: 400 }
        );
      }

      // Normalizacja miejscowości za pomocą normalizeLocation
      const normalizedLocation = normalizeLocation(location);

      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

      const dates = await redis.smembers(scheduleKey);
      const subscribers = await redis.smembers(subscriptionKey);

      console.log(`[POST] Klucz harmonogramu: ${scheduleKey}, Daty: ${dates}, Subskrybenci: ${subscribers}`);

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

      // Sprawdzenie, czy categoryLabels zawiera etykietę dla kategorii
      if (!categoryLabels[category]) {
        console.error(`Brak etykiety dla kategorii ${category} w categoryLabels`);
        return NextResponse.json(
          { error: `Brak etykiety dla kategorii ${category}` },
          { status: 500 }
        );
      }

      const subject = `${categoryLabels[category]} w ${normalizedLocation}`;
      const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci z kategorii "${categoryLabels[category]}" w ${postalCode} ${normalizedLocation}. Pamiętaj o wystawieniu pojemników!`;

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
    }

    // Jeśli brak danych (GET od cron), obsłuż wszystkie subskrypcje
    const subscriptionKeys = await redis.keys('subscriptions:*:*');
    if (subscriptionKeys.length === 0) {
      console.log('Brak subskrybentów w bazie');
      return NextResponse.json({ message: 'Brak subskrybentów' });
    }

    // Przetwarzaj każdą subskrypcję
    for (const subKey of subscriptionKeys) {
      const [, loc, pCode] = subKey.split(':');
      const subscribers = await redis.smembers(subKey);

      // Zbieraj wszystkie kategorie dla danego dnia w jednej wiadomości
      const categoriesForToday: string[] = [];

      for (const cat of wasteCategories) {
        const scheduleKey = `schedule:${loc}:${pCode}:${cat}`;
        const dates = await redis.smembers(scheduleKey);

        console.log(`[GET] Klucz harmonogramu: ${scheduleKey}, Daty: ${dates}`);

        if (dates.includes(checkDate)) {
          if (!categoryLabels[cat]) {
            console.error(`Brak etykiety dla kategorii ${cat} w categoryLabels`);
            continue; // Pomiń tę kategorię, ale kontynuuj dla innych
          }
          categoriesForToday.push(categoryLabels[cat]);
        }
      }

      // Jeśli są jakieś kategorie do wysłania, utwórz jedną wiadomość
      if (categoriesForToday.length > 0) {
        const subject = `Śmieci! Zbiórka w ${loc} (${checkDate})`;
        const categoriesText = categoriesForToday.map(cat => `- ${cat}`).join('\r\n'); // Każda kategoria w nowej linii
        const text = `Dzisiaj ${checkDate} odbywa się zbiórka śmieci w ${pCode} ${loc}:\r\n${categoriesText}\r\n\r\nPamiętaj o wystawieniu pojemników!`;

        await Promise.all(
          subscribers.map(async (email) => {
            try {
              await sendEmail(email, subject, text);
              console.log(`Wysłano e-mail do ${email} dla ${loc} (${pCode}) z kategoriami: ${categoriesForToday.join(', ')}`);
            } catch (error) {
              console.error(`Błąd wysyłania do ${email}:`, error);
            }
          })
        );
      }
    }

    return NextResponse.json({ message: 'Powiadomienia cron wysłane' });
  } catch (error) {
    console.error('Błąd w /api/notify:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}