import { NextResponse } from 'next/server';
import redis from '../../lib/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postalCode = searchParams.get('postalCode');

  if (!postalCode || !validatePostalCode(postalCode)) {
    return NextResponse.json({ error: 'Nieprawidłowy kod pocztowy' }, { status: 400 });
  }

  try {
    // Pobierz wszystkie klucze związane z harmonogramami dla danego kodu pocztowego
    const keys = await redis.keys(`schedule:*:${postalCode}:*`);

    if (!keys.length) {
      return NextResponse.json({ locations: [] });
    }

    // Pobierz unikalne lokalizacje (location) z kluczy
    const locationsSet = new Set<string>();
    keys.forEach((key) => {
      const parts = key.split(':');
      if (parts.length >= 3) {
        locationsSet.add(parts[1]); // parts[1] to location
      }
    });

    const locations = Array.from(locationsSet);

    return NextResponse.json({ locations });
  } catch (error) {
    console.error('Błąd podczas pobierania lokalizacji z Redis:', error);
    return NextResponse.json({ error: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}

function validatePostalCode(code: string) {
  const postalCodeRegex = /^\d{2}-\d{3}$/;
  return postalCodeRegex.test(code);
}