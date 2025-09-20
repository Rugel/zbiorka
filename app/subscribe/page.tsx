'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Swal from 'sweetalert2';

export default function Subscribe() {
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Lista sugestii miejscowości/ulic

  // Pobieranie sugestii na podstawie kodu pocztowego
  const fetchSuggestions = async (code: string) => {
    if (!code || !validatePostalCode(code)) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/locations?postalCode=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (!res.ok) {
        setSuggestions([]);
        return;
      }

      setSuggestions(data.locations || []);
    } catch (error) {
      setSuggestions([]);
      console.error('Błąd podczas pobierania sugestii:', error);
    }
  };

  const validatePostalCode = (code: string) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    return postalCodeRegex.test(code);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !location || !postalCode) {
      setStatus('❌ Proszę wypełnić wszystkie pola.');
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Proszę podać email, miejscowość i kod pocztowy.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!validatePostalCode(postalCode)) {
      setStatus('❌ Nieprawidłowy format kodu pocztowego.');
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Kod pocztowy musi być w formacie XX-XXX (np. 26-025).',
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
        setStatus('❌ Coś poszło nie tak...');
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: data.error || 'Wystąpił błąd podczas dodawania subskrypcji.',
          confirmButtonText: 'OK',
        });
        return;
      }

      setStatus('✅ Subskrypcja dodana!');
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: data.message || 'Subskrypcja dodana pomyślnie.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      setStatus('❌ Coś poszło nie tak...');
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: error instanceof Error ? error.message : 'Wystąpił błąd sieciowy.',
        confirmButtonText: 'OK',
      });
    }
  };

  const testEmail = async () => {
    if (!email) {
      setStatus('❌ Proszę podać adres e-mail.');
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: 'Proszę podać adres e-mail.',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const res = await fetch('/api/email-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('❌ Coś poszło nie tak...');
        Swal.fire({
          icon: 'error',
          title: 'Błąd!',
          text: data.error || 'Wystąpił błąd podczas wysyłania e-maila.',
          confirmButtonText: 'OK',
        });
        return;
      }

      setStatus('✅ E-mail testowy wysłany!');
      Swal.fire({
        icon: 'success',
        title: 'Sukces!',
        text: data.message || 'E-mail testowy został wysłany.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      setStatus('❌ Coś poszło nie tak...');
      Swal.fire({
        icon: 'error',
        title: 'Błąd!',
        text: error instanceof Error ? error.message : 'Wystąpił błąd sieciowy.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Efekt do pobierania sugestii przy zmianie kodu pocztowego
  useEffect(() => {
    if (postalCode) {
      fetchSuggestions(postalCode);
    } else {
      setSuggestions([]);
    }
  }, [postalCode]);

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
      <main className="container">
        <u><h3 className="title">Subskrypcja powiadomień e-mail</h3></u>
        <p className="description">
          <b>Wypełnij poniższe pola, aby aktywować subskrypcję a następnie potwierdź akcję w otrzymanej wiadomości e-mail klikając w odpowiedni link.</b>
        </p>
        <form onSubmit={handleSubscribe} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Twój e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode" className="label">
              Kod pocztowy
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder='np. "26-038"'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="label">
              Ulica i miejscowość
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              required
            >
              <option value="" disabled>
                wybierz lokalizację
              </option>
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion}>
                  {suggestion}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">
            Subskrybuj
          </button>
        </form>
        <div className="test">
          <p className="description"><b>Przetestuj wysyłkę e-mail.</b></p>
          <p className="description">
            Wpisz swój adres e-mail w pierwsze pole formularza i wykonaj test wysyłki powiadomienia. Po skorzystaniu z tej opcji powinieneś dostać e-mail z informacją. Jeśli e-mail nie dotarł, sprawdź folder SPAM i <b>oznacz wiadomość jako &quot;nie spam&quot;</b>.
          </p>
          <button type="button" onClick={testEmail} className="button">
            Test
          </button>
        </div>
        {status && <p className="status">{status}</p>}
      </main>
    </>
  );
}