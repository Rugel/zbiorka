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
        <main
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "24px",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                fontFamily: "sans-serif",
            }}
        >
            <h1 style={{ fontSize: "2rem", marginBottom: "16px", color: "black" }}>
                Kontakt
            </h1>
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
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{
                            marginTop: "0px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "1rem",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label htmlFor="email" style={{ fontWeight: 500 }}>
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            marginTop: "0px",
                        }}
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
                        style={{
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            resize: "vertical",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        padding: "10px 24px",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
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
