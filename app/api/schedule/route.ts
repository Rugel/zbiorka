import { NextResponse } from 'next/server';
import redis from '../../lib/redis';
import { normalizeLocation } from '../../../utils/normalizeLocation'; // Import funkcji normalizeLocation

export async function POST(request: Request) {
  try {
    const { locations, postalCode, dates, category } = await request.json() as {
      locations: string[];
      postalCode: string;
      dates: string[];
      category: string;
    };

    // Walidacja danych wejściowych
    if (!locations || !Array.isArray(locations) || locations.length === 0 || !postalCode || !dates || !Array.isArray(dates) || !category) {
      return NextResponse.json(
        { error: 'Lista miejscowości, kod pocztowy, lista dat i kategoria są wymagane' },
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

    // Walidacja formatu dat (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const cleanDates: string[] = dates.map(d => String(d).trim());
    if (!cleanDates.every(date => dateRegex.test(date))) {
      return NextResponse.json(
        { error: 'Daty muszą być w formacie YYYY-MM-DD (np. 2025-03-18)' },
        { status: 400 }
      );
    }

    console.log('cleanDates przed zapisem:', cleanDates);

    // Zapis harmonogramu dla każdej miejscowości
    for (const location of locations) {
      // Normalizacja miejscowości za pomocą normalizeLocation
      const normalizedLocation = normalizeLocation(location);

      const scheduleKey = `schedule:${normalizedLocation}:${postalCode}:${category}`;

      await redis.del(scheduleKey); // Wyczyść stare dane (opcjonalne)
      await redis.sadd(scheduleKey, ...cleanDates as [string, ...string[]]);
      const savedDates = await redis.smembers(scheduleKey);
      console.log(`Zapisano harmonogram dla ${normalizedLocation} (${postalCode}, ${category}):`, savedDates);
    }

    return NextResponse.json({ message: 'Harmonogram zapisany pomyślnie dla wszystkich miejscowości' });
  } catch (error) {
    console.error('Błąd w /api/schedule:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera', details: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const postalCode = searchParams.get('postalCode');
  const category = searchParams.get('category');

  if (!location || !postalCode) {
    return NextResponse.json(
      { error: 'Miejscowość i kod pocztowy są wymagane' },
      { status: 400 }
    );
  }

  // Normalizacja miejscowości za pomocą normalizeLocation
  const normalizedLocation = normalizeLocation(location);

  const scheduleKey = category
    ? `schedule:${normalizedLocation}:${postalCode}:${category}`
    : `schedule:${normalizedLocation}:${postalCode}`;
  const dates = await redis.smembers(scheduleKey);

  console.log('Odczytane daty z GET:', dates);
  return NextResponse.json({ location: normalizedLocation, postalCode, category, dates });
}