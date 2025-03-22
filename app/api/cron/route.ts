import { NextResponse } from 'next/server';
import cron from 'node-cron';
import { checkSchedules } from '../../lib/cron';

// Uruchom zadanie codziennie o 8:00
cron.schedule('0 8 * * *', () => {
  checkSchedules();
});

export async function GET() {
  await checkSchedules(); // Ręczne wywołanie dla testów
  return NextResponse.json({ message: 'Cron uruchomiony' });
}