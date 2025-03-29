'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../modules/Heder';
import Footer from '../modules/Footer';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleUnsubscribe = async () => {
    // Walidacja pól
    if (!email || !location || !postalCode) {
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Proszę podać email, miejscowość i kod pocztowy.',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location, postalCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Wyświetl błąd za pomocą SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: data.error || 'Wystąpił błąd podczas anulowania subskrypcji.',
          confirmButtonText: 'OK',
        });
        return;
      }

      // Wyświetl sukces za pomocą SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: data.message || 'Subskrypcja została pomyślnie anulowana.',
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
      <Header />
      <ul className='links'>
        <li><Link className='link' href="/">HOME</Link></li>
        <li><Link className='link' href="/schedule">Dodaj harmonogram</Link></li>
      </ul>
      <div className='subsField'>
        <h3>Anuluj subskrypcję</h3>
        <input
          type="email"
          placeholder="Twój email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Miejscowość"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kod pocztowy (np. 26-038)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button onClick={handleUnsubscribe}>Anuluj subskrypcję</button>
      </div>
      <Footer />
    </div>
  );
}