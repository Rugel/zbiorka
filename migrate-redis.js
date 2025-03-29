//require('dotenv').config({ path: '.env.local' });
const Redis = require('ioredis');
const { normalizeLocation } = require('./utils/normalizeLocation.ts'); // Import funkcji

// Loguj REDIS_URL, aby upewnić się, że jest wczytywany
console.log('REDIS_URL:', process.env.REDIS_URL || 'redis://localhost:6379');

// Połączenie z Redis z lepszą obsługą błędów
const redis = new Redis("rediss://default:AYPNAAIjcDEyNzkxM2FjYTBlNmQ0NTlkYTRmOTI5ODJkNzI3ZjBmOXAxMA@open-muskrat-33741.upstash.io:6379");

redis.on('error', (err) => {
  console.error('Błąd połączenia z Redis:', err.message);
});

async function migrateRedisData() {
  try {
    console.log('Rozpoczynanie migracji danych w Redis...');

    // Sprawdź, czy połączenie działa
    const pingResponse = await redis.ping();
    console.log('Połączenie z Redis działa! Odpowiedź PING:', pingResponse);

    // Pobierz wszystkie klucze subskrypcji i harmonogramów
    const subscriptionKeys = await redis.keys('subscriptions:*:*');
    const scheduleKeys = await redis.keys('schedule:*:*');

    // Migracja kluczy subskrypcji
    console.log(`Znaleziono ${subscriptionKeys.length} kluczy subskrypcji do migracji.`);
    for (const oldKey of subscriptionKeys) {
      const [, oldLocation, postalCode] = oldKey.split(':');
      const newLocation = await normalizeLocation(oldLocation); // Użyj nowej funkcji
      const newKey = `subscriptions:${newLocation}:${postalCode}`;

      if (oldKey !== newKey) {
        const subscribers = await redis.smembers(oldKey);
        if (subscribers.length > 0) {
          await redis.sadd(newKey, ...subscribers);
          console.log(`Przeniesiono subskrypcje z ${oldKey} do ${newKey}`);
        }
        await redis.del(oldKey);
        console.log(`Usunięto stary klucz: ${oldKey}`);
      } else {
        console.log(`Klucz ${oldKey} już jest znormalizowany, pomijam.`);
      }
    }

    // Migracja kluczy harmonogramów
    console.log(`Znaleziono ${scheduleKeys.length} kluczy harmonogramów do migracji.`);
    for (const oldKey of scheduleKeys) {
      const [, oldLocation, postalCode, category] = oldKey.split(':');
      const newLocation = await normalizeLocation(oldLocation); // Użyj nowej funkcji
      const newKey = `schedule:${newLocation}:${postalCode}:${category}`;

      if (oldKey !== newKey) {
        const dates = await redis.smembers(oldKey);
        if (dates.length > 0) {
          await redis.sadd(newKey, ...dates);
          console.log(`Przeniesiono harmonogram z ${oldKey} do ${newKey}`);
        }
        await redis.del(oldKey);
        console.log(`Usunięto stary klucz: ${oldKey}`);
      } else {
        console.log(`Klucz ${oldKey} już jest znormalizowany, pomijam.`);
      }
    }

    console.log('Migracja zakończona pomyślnie!');
  } catch (error) {
    console.error('Błąd podczas migracji:', error.message);
  } finally {
    await redis.quit();
  }
}

// Uruchom migrację
migrateRedisData();