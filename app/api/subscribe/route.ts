/*import { NextResponse } from 'next/server';
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

    // Lista kategorii odpadów do sprawdzenia
    const wasteCategories = [
      'mixed',
      'plastics',
      'glass',
      'paper',
      'bio',
      'bulky',
      'electronics',
    ];

    // Sprawdzenie, czy istnieje harmonogram dla danej lokalizacji i kodu pocztowego
    let hasSchedule = false;
    for (const category of wasteCategories) {
      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const dates = await redis.smembers(scheduleKey);
      if (dates.length > 0) {
        hasSchedule = true;
        break; // Znaleziono harmonogram, nie ma potrzeby dalszego sprawdzania
      }
    }

    // Dodanie subskrybenta
    await redis.sadd(subscriptionKey, email);
    console.log(`Dodano subskrybenta ${email} dla ${normalizedLocation} (${postalCode})`);

    // Przygotowanie odpowiedzi
    const response = {
      message: 'Subskrypcja dodana pomyślnie',
    };
    if (!hasSchedule) {
      response.message +=
        '. Uwaga: brak harmonogramu zbiórek dla tej lokalizacji w bazie danych - dodaj harmonogram dla tej lokalizacji, aby otrzymywać powiadomienia.';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}*/



/*import { NextResponse } from 'next/server';
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

    // Normalizacja miejscowości
    const normalizedLocation = location
      .trim() // Usuwa białe znaki na początku i końcu
      .toLowerCase() // Zamienia na małe litery
      .replace(/\s+/g, ' '); // Zamienia wielokrotne spacje na pojedynczą

    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

    // Lista kategorii odpadów do sprawdzenia
    const wasteCategories = [
      'mixed',
      'plastics',
      'glass',
      'paper',
      'bio',
      'bulky',
      'electronics',
    ];

    // Sprawdzenie, czy istnieje harmonogram dla danej lokalizacji i kodu pocztowego
    let hasSchedule = false;
    for (const category of wasteCategories) {
      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const dates = await redis.smembers(scheduleKey);
      if (dates.length > 0) {
        hasSchedule = true;
        break; // Znaleziono harmonogram, nie ma potrzeby dalszego sprawdzania
      }
    }

    // Dodanie subskrybenta
    await redis.sadd(subscriptionKey, email);
    console.log(`Dodano subskrybenta ${email} dla ${normalizedLocation} (${postalCode})`);

    // Przygotowanie odpowiedzi
    const response = {
      message: 'Subskrypcja dodana pomyślnie',
    };
    if (!hasSchedule) {
      response.message +=
        '. Uwaga: brak harmonogramu zbiórek dla tej lokalizacji w bazie danych - dodaj harmonogram dla tej lokalizacji, aby otrzymywać powiadomienia.';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}*/



import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { normalizeLocation } from '../../../utils/normalizeLocation';
import { wasteCategories } from '../../../utils/wasteCategories';

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

    // Normalizacja miejscowości za pomocą normalizeLocation
    const normalizedLocation = normalizeLocation(location);

    const subscriptionKey = `subscriptions:${normalizedLocation}:${postalCode}`;

    // Lista kategorii odpadów do sprawdzenia
    
    /*const wasteCategories = [
      'mixed',
      'plastics',
      'glass',
      'paper',
      'bio',
      'bulky',
      'electronics',
    ];*/

    // Sprawdzenie, czy istnieje harmonogram dla danej lokalizacji i kodu pocztowego
    let hasSchedule = false;
    for (const category of wasteCategories) {
      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;
      const dates = await redis.smembers(scheduleKey);
      if (dates.length > 0) {
        hasSchedule = true;
        break; // Znaleziono harmonogram, nie ma potrzeby dalszego sprawdzania
      }
    }

    // Dodanie subskrybenta
    await redis.sadd(subscriptionKey, email);
    console.log(`Dodano subskrybenta ${email} dla ${normalizedLocation} (${postalCode})`);

    // Przygotowanie odpowiedzi
    const response = {
      message: 'Subskrypcja dodana pomyślnie',
    };
    if (!hasSchedule) {
      response.message +=
        '. Uwaga: brak harmonogramu zbiórek dla tej lokalizacji w bazie danych - dodaj harmonogram dla tej lokalizacji, aby otrzymywać powiadomienia.';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Błąd w /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}