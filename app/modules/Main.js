"use client";

const Main = () =>
    <main>
        <h3 className="title">O aplikacji</h3>
        <p>Czy zdarza Ci się zapomnieć o dniu odbioru śmieci? A może zastanawiasz się, kiedy wystawić żółty worek na plastiki, a kiedy zielony na szkło?</p>
        <p>Dzięki aplikacji <strong>TrashAlert</strong> możesz pożegnać się z uciążliwym sprawdzaniem harmonogramu. To proste, intuicyjne rozwiązanie, które pomoże Ci zadbać o porządek bez instalowania zbędnych aplikacji na telefonie.</p>

        <h4>📍 Obsługiwane lokalizacje</h4>
        <p>Obecnie wspieramy powiadomienia dla następujących obszarów:</p>
        <ul className="locations-list">
            <li><a href="https://www.lagowgmina.pl/asp/harmonogram-zbiorki-odpadow-komunalnych,108,,1" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 'bold' }}>gm. Łagów (26-025), pow. kielecki</a></li>
            <li><a href="https://www.gorno.pl/asp/pliki/2025/12/haronogram_gorno_2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 'bold' }}>Cedzyna (25-351), pow. kielecki</a></li>
            <li><a href="https://www.gorno.pl/asp/pliki/2025/12/haronogram_gorno_2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 'bold' }}>gm. Górno (26-008), pow. kielecki</a></li>
        </ul>

        <h4>🚀 Dlaczego warto?</h4>
        <p>Segregacja odpadów to nasz wspólny obowiązek, ale śledzenie różnych terminów bywa kłopotliwe. TrashAlert ułatwia to zadanie:</p>
        <ul className="benefits-list">
            <li><strong>Powiadomienia e-mail</strong> – Przypomnienie trafi prosto na Twoją skrzynkę wtedy, gdy jest potrzebne.</li>
            <li><strong>Wszystkie frakcje</strong> – Obsługujemy odpady zmieszane, plastik, szkło, papier, bio oraz wielkogabaryty.</li>
            <li><strong>Pełna elastyczność</strong> – Sam wybierasz swoją lokalizację i kategorie, które Cię interesują.</li>
        </ul>

        <h4>🛠️ Jak to działa?</h4>
        <ol className="steps-list">
            <li><strong>Wybierz lokalizację</strong><br />Podaj swój e-mail i kod pocztowy, a następnie wybierz adres z listy.</li>
            <li><strong>Odbieraj przypomnienia</strong><br />W dniu zbiórki otrzymasz czytelną informację o tym, jakie odpady są dziś odbierane.</li>
            <li><strong>Testuj bez obaw</strong><br />Skorzystaj z opcji testu, aby upewnić się, że powiadomienia docierają do Ciebie poprawnie.</li>
        </ol>

        <style jsx>{`
            .locations-list, .benefits-list, .steps-list {
                margin: 1.5rem 0;
            }
            li {
                margin-bottom: 0.75rem;
            }
            .steps-list li {
                margin-bottom: 1.25rem;
            }
        `}</style>
    </main>;

export default Main;