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
        <main>
            <h3 className="title">Kontakt</h3>
            <p>Masz pytania lub sugestie? Chętnie poznamy Twoją opinię na temat projektu TrashAlert.</p>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name" className="label">
                        Imię i nazwisko
                    </label>
                    <input
                        className="input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Jak się nazywasz?"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="label">
                        Adres e-mail
                    </label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Twój adres e-mail"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="label">
                        Wiadomość
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="input"
                        placeholder="W czym możemy pomóc?"
                        rows={5}
                        required
                    />
                </div>

                <button type="submit" className="button">
                    Wyślij wiadomość
                </button>
            </form>

            {status && (
                <p className="status">{status}</p>
            )}
        </main>
    );
}
