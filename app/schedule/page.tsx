/*'use client';

import { useState } from 'react';

export default function Schedule() {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
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

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateArray = dates.replace(/\s/g, '').split(',').flat().map(d => d.trim());
      console.log('dateArray przed zapisem:', dateArray);
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, dates: dateArray, category }),
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
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
}*/



'use client';

import { useState } from 'react';

export default function Schedule() {
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dates, setDates] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const wasteCategories = [
    { value: 'mixed', label: '🗑️zmieszane odpady komunalne' },
    { value: 'plastics', label: '🟡tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)' },
    { value: 'glass', label: '🟢szkło białe i kolorowe (worek zielony)' },
    { value: 'paper', label: '🔵papier, tektura (worek niebieski)' },
    { value: 'bio', label: '🟤odpady biodegradowalne (worek brązowy)' },
    { value: 'bulky', label: '🪑odpady wielkogabarytowe' },
    { value: 'electronics', label: '📻zużyty sprzęt elektryczny i elektroniczny' },
  ];

  const validatePostalCode = (code: string) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    return postalCodeRegex.test(code);
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostalCode(postalCode)) {
      setMessage('Kod pocztowy musi być w formacie XX-XXX (np. 26-025)');
      setIsError(true);
      return;
    }
    try {
      const dateArray = dates.replace(/\s/g, '').split(',').flat().map(d => d.trim());
      console.log('dateArray przed zapisem:', dateArray);
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, postalCode, dates: dateArray, category }),
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
          placeholder="Kod pocztowy (np. 26-025)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Daty zbiórek (np. 2025-03-18,2025-04-15)"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
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