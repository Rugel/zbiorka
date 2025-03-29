'use client';

import { useState } from 'react';
import Head from 'next/head';
import Main from './modules/Main';
import Header from './modules/Heder';
import Footer from './modules/Footer';
import Link from 'next/link';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const validatePostalCode = (code: string) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    return postalCodeRegex.test(code);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
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
      const res = await fetch('/api/subscribe', {
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
          text: data.error || 'Wystąpił błąd podczas dodawania subskrypcji.',
          confirmButtonText: 'OK',
        });
        return;
      }

      // Wyświetl sukces za pomocą SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: data.message || 'Subskrypcja dodana pomyślnie.',
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

  const testEmail = async () => {
    try {
      const res = await fetch('/api/email-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Wyświetl błąd za pomocą SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: data.error || 'Wystąpił błąd podczas wysyłania e-maila.',
          confirmButtonText: 'OK',
        });
        return;
      }

      // Wyświetl sukces za pomocą SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: data.message || 'E-mail testowy został wysłany.',
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
    <>
      <Head>
        <meta property="og:url" content="https://zbiorka.vercel.app/" />
        <meta property="og:title" content="Zbiórka odpadów komunalnych - ustawienie powiadomień e-mail - harmonogram" />
        <meta property="og:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych." />
        <meta property="og:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zbiórka odpadów - ustawienie powiadomień e-mail - harmonogram" />
        <meta name="twitter:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych." />
        <meta name="twitter:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
      </Head>
      <div className="container">
        <Header />
        <Main />
        <ul className='links'>
          <li><Link className='link' href="/schedule">Dodaj harmonogram</Link></li>
          <li><Link className='link' href="/unsubscribe">Anuluj subskrypcję</Link></li>
        </ul>
        <div className='subsField'>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Twój e-mail"
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
          </form><br />
          <label>
            Wpisz swój adres e-mail w odpowiednie pole i wykonaj test wysyłki powiadomienia. Po skorzystaniu z tej opcji powinieneś dostać e-mail z informacją.
            <br />
            Jeśli e-mail nie dotarł, należy sprawdzić folder SPAM i oznaczyć wiadomość jako &quot;nie spam&quot;.
            <br />
            <button onClick={testEmail}>Test</button>
          </label>
        </div>
        <Footer />
      </div>
    </>
  );
}