'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateArray = dates.replace(/\s/g, '').split(',').flat().map(d => d.trim());
      console.log('dateArray przed zapisem:', dateArray);
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, dates: dateArray }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessage(data.message || data.error);
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Błąd harmonogramu');
      setIsError(true);
    }
  };

  const handleNotify = async () => {
    // Twój istniejący kod...
    try {
      const notifyLocation = location || 'Duraczów'; // Użyj lokalizacji z formularza lub domyślnej
      const notifyDate = new Date().toISOString().split('T')[0]; // Dzisiejsza data

      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: notifyLocation,
          date: notifyDate,
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
      <h1>Powiadomienia o zbiórce odpadów</h1>
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
      </form><br />
      <label>Przetestuj powiadomienie e-mail. Po skorzystaniu z tej opcji powinieneś dostać natychmiast e-mail z informacją.<br /><button onClick={testEmail}>Test</button><br />Jeśli e-mail nie dotarł, warto sprawdzić folder SPAM i oznaczyć wiadomość jako "NIE SPAM".</label>
      <form onSubmit={handleSchedule}>
        <input
          type="text"
          placeholder="Daty zbiórek (np. 2025-03-18, 2025-04-15)"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          required
        />
        <button type="submit">Zapisz harmonogram</button>
      </form>
      <button onClick={handleNotify}>Wyślij powiadomienie</button>
      {message && <p style={{
        padding: '10px',
        marginTop: '15px',
        backgroundColor: isError ? '#ffe6e6' : '#e6ffe6',
        color: isError ? '#cc0000' : '#006600',
        border: isError ? '1px solid #ff3333' : '1px solid #00cc00',
        borderRadius: '5px',
      }} >{message}</p>}
    </div>
  );
}