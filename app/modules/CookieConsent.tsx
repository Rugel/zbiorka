"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./cookie-consent.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent && pathname !== "/cookies") {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "auto";
    }
  }, [pathname]);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
    document.body.style.overflow = "auto";
  };

  const handleDismiss = () => {
    setVisible(false);
    document.body.style.overflow = "auto";
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-overlay" />
      <div className="cookie-banner">
        <p>
          Używamy plików cookies, aby poprawić jakość korzystania ze strony.
          <Link href="/cookies" className="cookie-link" onClick={handleDismiss}>Dowiedz się więcej</Link>
        </p>
        <button onClick={acceptCookies}>AKCEPTUJĘ</button>
      </div>
    </>
  );
}
