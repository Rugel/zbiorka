import redis from './redis';
import { sendEmail } from './email';

export async function checkSchedules() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`Sprawdzanie harmonogramów na dzień ${today}`);

  // Pobierz wszystkie klucze harmonogramów
  const scheduleKeys = await redis.keys('schedule:*');
  
  for (const scheduleKey of scheduleKeys) {
    const location = scheduleKey.replace('schedule:', '');
    const dates = await redis.smembers(scheduleKey);
    const subscribers = await redis.smembers(`subscriptions:${location}`);

    if (dates.includes(today) && subscribers.length > 0) {
      const subject = `Zbiórka odpadów w ${location}`;
      const text = `Dzisiaj ${today} odbywa się zbiórka odpadów w ${location}. Pamiętaj o wystawieniu pojemników!`;

      await Promise.all(
        subscribers.map(async (email) => {
          try {
            await sendEmail(email, subject, text, text);
            console.log(`Wysłano e-mail do ${email}`);
          } catch (error) {
            console.error(`Błąd wysyłania do ${email}:`, error);
          }
        })
      );
    }
  }
}