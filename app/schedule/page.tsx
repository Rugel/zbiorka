'use client';

import { useState } from 'react';

export default function Schedule() {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

  return (
    <div className="container">
      <h1>Dodaj harmonogram zbiórek</h1>
      <form onSubmit={handleSchedule}>
        <input
          type="text"
          placeholder="Miejscowość lub ulica"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Daty zbiórek (np. 2025-03-18,2025-04-15)"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          required
        />
        <button type="submit">Zapisz harmonogram</button>
      </form>
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
      <a href="/">Wróć do strony głównej</a>
    </div>
  );
}