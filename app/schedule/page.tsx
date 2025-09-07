'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { wasteCategoryOptions } from '../../utils/wasteCategories';

export default function Schedule() {
  const [locations, setLocations] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dates, setDates] = useState('');
  const [category, setCategory] = useState('');

  const wasteCategories = wasteCategoryOptions;
  const validatePostalCode = (code: string) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    return postalCodeRegex.test(code);
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    // Walidacja kodu pocztowego
    if (!validatePostalCode(postalCode)) {
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025)',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      // Przetwarzanie listy miejscowości
      const locationList = locations.split(',').map(loc => loc.trim()).filter(loc => loc);
      if (locationList.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: 'Proszę podać co najmniej jedną miejscowość.',
          confirmButtonText: 'OK',
        });
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

      const data = await res.json();

      if (!res.ok) {
        // Wyświetl błąd za pomocą SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: data.error || 'Wystąpił błąd podczas zapisywania harmonogramu.',
          confirmButtonText: 'OK',
        });
        return;
      }

      // Wyświetl sukces za pomocą SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: `Harmonogram zapisany dla miejscowości: ${locationList.join(', ')}`,
        confirmButtonText: 'OK',
      });
    } catch (error) {
      // Wyświetl błąd sieciowy za pomocą SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: error instanceof Error ? error.message : 'Wystąpił błąd sieciowy.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container">
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
      </div>
    </div>
  );
}