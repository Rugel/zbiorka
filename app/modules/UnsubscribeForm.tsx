'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UnsubscribeForm() {
    const [email, setEmail] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]); // Lista sugestii miejscowości/ulic

    // Pobieranie sugestii na podstawie kodu pocztowego
    const fetchSuggestions = async (code: string) => {
        if (!code) {
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

    const handleUnsubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

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
                setStatus('❌ Coś poszło nie tak...');
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: data.error || 'Wystąpił błąd podczas anulowania subskrypcji.',
                    confirmButtonText: 'OK',
                });
                return;
            }

            setStatus('✅ Subskrypcja będzie anulowana po kliknięciu w link zawarty w wiadomości E-mail!');
            Swal.fire({
                icon: 'success',
                title: 'Sukces!',
                text: data.message || 'Subskrypcja została pomyślnie anulowana.',
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
            <h3 className="title">Anuluj subskrypcję</h3>
            <p className="description">
                Wypełnij poniższe pola, aby zrezygnować z powiadomień. Akcja ta musi zostać potwierdzona poprzez link wysłany na Twój adres e-mail.
            </p>

            <form className="form">
                <div className="form-group">
                    <label htmlFor="email" className="label">
                        Adres e-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Twój e-mail'
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

                <button type="button" onClick={handleUnsubscribe} className="button">
                    Wyślij link do dezaktywacji
                </button>
            </form>

            {status && <p className="status">{status}</p>}
        </main>
    );
}
