'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function SubscribeForm() {
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
        <main>
            <h3 className="title">Zasubskrybuj i zapomnij</h3>
            <p className="description">
                Wypełnij poniższe pola, aby aktywować powiadomienia. Po wysłaniu formularza otrzymasz wiadomość z linkiem do potwierdzenia subskrypcji.
            </p>

            <form onSubmit={handleSubscribe} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="label">
                        Adres e-mail
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
                        placeholder='np. 26-038'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location" className="label">
                        Miejscowość i ulica
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
                            Wybierz swoją lokalizację
                        </option>
                        {suggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion}>
                                {suggestion}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="button">
                    Aktywuj subskrypcję
                </button>
            </form>

            <div className="test">
                <h4>🧪 Sprawdź działanie</h4>
                <p>Chcesz mieć pewność, że wszystko działa? Wpisz e-mail powyżej i kliknij przycisk testowy. Jeśli e-mail nie dotrze w ciągu kilku minut, sprawdź folder SPAM.</p>
                <button type="button" onClick={testEmail} className="button secondary">
                    Wyślij e-mail testowy
                </button>
            </div>

            {status && <p className="status">{status}</p>}

            <style jsx>{`
        .button.secondary {
          background: var(--bg-main);
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        .button.secondary:hover {
          background: #eee;
        }
      `}</style>
        </main>
    );
}
