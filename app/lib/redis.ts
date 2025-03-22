import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
redis.ping()
  .then(() => console.log('Redis działa poprawnie'))
  .catch((err) => console.error('Błąd połączenia z Redis:', err));

export default redis;