'use client';

import { useState } from 'react';
import Head from 'next/head';
import Main from './modules/Main';
import Header from './modules/Heder';

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');
  //const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  /*const wasteCategories = [
    { value: 'mixed', label: '🗑️zmieszane odpady komunalne' },
    { value: 'plastics', label: '🟡tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)' },
    { value: 'glass', label: '🟢szkło białe i kolorowe (worek zielony)' },
    { value: 'paper', label: '🔵papier, tektura (worek niebieski)' },
    { value: 'bio', label: '🟤odpady biodegradowalne (worek brązowy)' },
    { value: 'bulky', label: '🪑odpady wielkogabarytowe' },
    { value: 'electronics', label: '📻zużyty sprzęt elektryczny i elektroniczny' },
  ];*/

  const validatePostalCode = (code: string) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    return postalCodeRegex.test(code);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostalCode(postalCode)) {
      setMessage('Kod pocztowy musi być w formacie XX-XXX (np. 26-025)');
      setIsError(true);
      return;
    }
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location, postalCode }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessage(data.message || data.error); // Wyświetlamy pełny komunikat
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Wystąpił błąd');
      setIsError(true);
    }
  };

  const testEmail = async () => {
    try {
      const res = await fetch('/api/email-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessage(data.message || data.error);
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Błąd wysyłania e-maila');
      setIsError(true);
    }
  };

  /*const handleNotify = async () => {
    try {
      const notifyLocation = location || 'Duraczów';
      const notifyPostalCode = postalCode || '26-025'; // Domyślny kod dla testów
      const notifyDate = new Date().toISOString().split('T')[0];

      if (!validatePostalCode(notifyPostalCode)) {
        setMessage('Kod pocztowy musi być w formacie XX-XXX (np. 26-025)');
        setIsError(true);
        return;
      }

      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: notifyLocation,
          postalCode: notifyPostalCode,
          date: notifyDate,
          category,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      setMessage(data.message || data.error || 'Nieznany wynik');
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Błąd podczas wysyłania powiadomienia');
      setIsError(true);
    }
  };*/

  return (
    <>
      <Head>
        <meta property="og:url" content="https://sondaz.vercel.app/" />
        <meta property="og:title" content="Sondaż prezydencki 2025 - tworzony przez użytkowników - oddaj głos!" />
        <meta property="og:description" content="Odwiedź sondaż wyborczy tworzony przez i dla użytkowników, zobacz wyniki i oddaj głos na swojego kandydata prosto i anonimowo - wybory prezydenckie 2025" />
        <meta property="og:image" content="https://sondaz.vercel.app/web-app-manifest-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sondaż prezydencki 2025 - tworzony przez użytkowników - oddaj głos!" />
        <meta name="twitter:description" content="Odwiedź sondaż wyborczy tworzony przez i dla użytkowników, zobacz wyniki i oddaj głos na swojego kandydata prosto i anonimowo - wybory prezydenckie 2025" />
        <meta name="twitter:image" content="https://sondaz.vercel.app/web-app-manifest-512x512.png" />
      </Head>
      <div className="container">
        <Header />
        <Main />
        <div className='subsField'>
        <div className='link'><a href="/schedule">Dodaj harmonogram</a></div>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Twój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Miejscowość lub ulica"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Kod pocztowy (np. 26-025)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <button type="submit">Subskrybuj</button>
          </form>
          <br />
          <label>
            Przetestuj powiadomienie e-mail. Po skorzystaniu z tej opcji powinieneś dostać natychmiast e-mail z informacją.
            <br />
            <button onClick={testEmail}>Test</button>
            <br />
            Jeśli e-mail nie dotarł, należy sprawdzić folder SPAM i oznaczyć wiadomość jako "nie spam".
          </label>
          <br />
          {/*<select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" disabled>
          Wybierz kategorię odpadów
        </option>
        {wasteCategories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      <button onClick={handleNotify}>Wyślij powiadomienie</button>*/}
          {message && (
            <p
              style={{
                padding: '10px',
                marginTop: '15px',
                backgroundColor: isError ? '#ffe6e6' : '#e6ffe6',
                color: isError ? '#cc0000' : '#006600',
                border: isError ? '1px solid #ff3333' : '1px solid #00cc00',
                borderRadius: '5px',
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}