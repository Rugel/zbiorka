"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./cookie-consent.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
    document.body.style.overflow = 'auto';
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-overlay" />
      <div className="cookie-banner">
        <p>
          Używamy plików cookies, aby poprawić jakość korzystania ze strony.
          <Link href="/cookies" className="cookie-link">Dowiedz się więcej</Link>
        </p>
        <button onClick={acceptCookies}>AKCEPTUJĘ</button>
      </div>
    </>
  );
}
