'use client';

import { useState } from 'react';
import Main from './modules/Main';

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const wasteCategories = [
    { value: 'mixed', label: 'Zmieszane odpady komunalne' },
    { value: 'plastics', label: 'Tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)' },
    { value: 'glass', label: 'Szkło białe i kolorowe (worek zielony)' },
    { value: 'paper', label: 'Papier, tektura (worek niebieski)' },
    { value: 'bio', label: 'Odpady biodegradowalne (worek brązowy)' },
    { value: 'bulky', label: 'Odpady wielkogabarytowe' },
    { value: 'electronics', label: 'Zużyty sprzęt elektryczny i elektroniczny' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessage(data.message || data.error);
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

  const handleNotify = async () => {
    try {
      const notifyLocation = location || 'Duraczów';
      const notifyDate = new Date().toISOString().split('T')[0];

      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: notifyLocation,
          date: notifyDate,
          category, // Dodajemy kategorię
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
  };

  return (
    <div className="container">
      <Main/>
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
        <button type="submit">Subskrybuj</button>
      </form>
      <br />
      <label>
        Przetestuj powiadomienie e-mail. Wpisz swój e-mail w odpowiednim polu i wciśnij przycisk "Test". Po skorzystaniu z tej opcji powinieneś dostać natychmiast e-mail z informacją.
        <br />
        <button onClick={testEmail}>Test</button>
        <br />
        Jeśli e-mail nie dotarł, należy sprawdzić folder SPAM i oznaczyć wiadomość jako "nie spam".<br/>
      </label>
      <br />
      <select
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
      <button onClick={handleNotify}>Wyślij powiadomienie</button>
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
      <br />
      <a href="/schedule">Dodaj harmonogram</a>
    </div>
  );
}