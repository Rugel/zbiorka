'use client';

import { useState } from 'react';
import Header from '../modules/Heder';
import Footer from '../modules/Footer';
import Link from 'next/link';

export default function Schedule() {
  const [locations, setLocations] = useState('');
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

    // Walidacja kodu pocztowego
    if (!validatePostalCode(postalCode)) {
      setMessage('Kod pocztowy musi być w formacie XX-XXX (np. 26-025)');
      setIsError(true);
      return;
    }

    try {
      // Przetwarzanie listy miejscowości
      const locationList = locations.split(',').map(loc => loc.trim()).filter(loc => loc);
      if (locationList.length === 0) {
        setMessage('Proszę podać co najmniej jedną miejscowość');
        setIsError(true);
        return;
      }

      // Przetwarzanie dat
      const dateArray = dates.replace(/\s/g, '').split(',').map(d => d.trim());

      // Wysłanie żądania
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locations: locationList, postalCode, dates: dateArray, category }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Komunikat zwrotny
      setMessage(
        data.error
          ? data.error
          : `Harmonogram zapisany dla miejscowości: ${locationList.join(', ')}`
      );
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Błąd harmonogramu');
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className='links'>
        <div className='link'><Link href="/">HOME</Link></div>
        <div className='link'><Link href="/unsubscribe">Anuluj subskrypcję</Link></div>
      </div>
      <div className='subsField'>
        <h3>Dodaj harmonogram zbiórek</h3>
        <form onSubmit={handleSchedule}>
          <input
            type="text"
            placeholder="Miejscowości lub ulice (oddzielone przecinkami, np. Długa, Krótka)"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Kod pocztowy (np. 26-038)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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
          <input
            type="text"
            placeholder="Daty zbiórek (np. 2025-03-18, 2025-04-15)"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            required
          />
          <button type="submit">Zapisz harmonogram</button>
        </form>
        {message && (
          <p
            style={{
              fontSize: '.8rem',
              padding: '3px',
              marginTop: '15px',
              backgroundColor: isError ? '#ffe6e6' : '#e6ffe6',
              color: isError ? '#cc0000' : '#006600',
              border: isError ? '1px solid #ff3333' : '1px solid #00cc00',
              borderRadius: '2px',
            }}
          >
            {message}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}