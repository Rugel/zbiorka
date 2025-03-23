import { NextResponse } from 'next/server';
import redis from '../../lib/redis';

export async function POST(request: Request) {
  try {
    const { location, dates, category } = await request.json() as {
      location: string;
      dates: string[];
      category: string;
    };

    if (!location || !dates || !Array.isArray(dates) || !category) {
      return NextResponse.json(
        { error: 'Lokalizacja, lista dat i kategoria są wymagane' },
        { status: 400 }
      );
    }

    const normalizedLocation = location.normalize('NFC');
    const scheduleKey = `schedule:${normalizedLocation}:${category}`; // Klucz z kategorią

    const cleanDates: string[] = dates.flat().map(d => String(d).trim());
    console.log('cleanDates przed zapisem:', cleanDates);

    await redis.del(scheduleKey); // Wyczyść stare dane dla testów
    //await redis.sadd(scheduleKey, cleanDates); // Zapisz jako zbiór
    await redis.sadd(scheduleKey, ...cleanDates as [string, ...string[]]);
    const savedDates = await redis.smembers(scheduleKey);
    console.log(`Zapisano harmonogram dla ${normalizedLocation} (${category}):`, savedDates);

    return NextResponse.json({ message: 'Harmonogram zapisany pomyślnie' });
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
  const category = searchParams.get('category');

  if (!location) {
    return NextResponse.json({ error: 'Lokalizacja jest wymagana' }, { status: 400 });
  }

  const normalizedLocation = location.normalize('NFC');
  const scheduleKey = category
    ? `schedule:${normalizedLocation}:${category}`
    : `schedule:${normalizedLocation}`;
  const dates = await redis.smembers(scheduleKey);

  console.log('Odczytane daty z GET:', dates);
  return NextResponse.json({ location: normalizedLocation, category, dates });
}