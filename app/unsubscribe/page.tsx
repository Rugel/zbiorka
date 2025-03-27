'use client';

import { useState } from 'react';
import Header from '../modules/Heder';
import Footer from '../modules/Footer';

export default function Home() {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email || !location || !postalCode) {
      setMessage('Proszę podać email, miejscowość i kod pocztowy');
      setIsError(true);
      return;
    }

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location, postalCode }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessage(data.message || data.error);
      setIsError(!!data.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Błąd anulowania subskrypcji');
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <Header /><br /><br />
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