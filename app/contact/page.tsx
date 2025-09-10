"use client";
import React, { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch("/api/send-email", {
            method: "POST",
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setStatus("✅ Wiadomość wysłana!");
            form.reset();
        } else {
            setStatus("❌ Coś poszło nie tak...");
        }
    };

    return (
        <main className="container"
        >
            <u><h3 className="title">
                Kontakt
            </h3></u>
            <p><b>Masz jakieś pytania lub sugestie, skontaktuj się z autorem projektu.</b></p><br />
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label htmlFor="name" style={{ fontWeight: 500 }}>
                        Imię i nazwisko
                    </label>
                    <input
                        className="input"
                        type="text"
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label htmlFor="email" style={{ fontWeight: 500 }}>
                        E-mail
                    </label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label htmlFor="message" style={{ fontWeight: 500 }}>
                        Wiadomość
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#1e40af")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.background = "#2563eb")
                    }
                >
                    Wyślij
                </button>
            </form>
            {status && (
                <p style={{ marginTop: "16px", fontWeight: 500 }}>{status}</p>
            )}
        </main>
    );
}
