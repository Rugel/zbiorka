"use client";

const Main = () =>
    <main>
        <h3 className="title">O aplikacji</h3>
        <p>Czy zdarza Ci się zapomnieć o dniu odbioru śmieci? A może zastanawiasz się, kiedy wystawić żółty worek na plastiki, a kiedy zielony na szkło? Prawidłowa <strong>ekologiczna gospodarka odpadami</strong> zaczyna się od organizacji zadań.</p>
        <p>Dzięki aplikacji <strong>TrashAlert</strong> możesz pożegnać się z uciążliwym sprawdzaniem papierowych haromonogramów. To proste, intuicyjne rozwiązanie, które pomoże Ci zadbać o porządek i ekologię bez instalowania zbędnych aplikacji na telefonie. Otrzymuj darmowe <strong>powiadomienia e-mail o wywozie śmieci</strong> bezpośrednio na swoją skrzynkę.</p>

        <h4>📍 Obsługiwane lokalizacje (gmina Łagów, gmina Górno, Cedzyna)</h4>
        <p>Obecnie wspieramy <strong>harmonogram odbioru odpadów</strong> dla następujących obszarów i gmin:</p>
        <ul className="locations-list">
            <li><a href="https://www.lagowgmina.pl/asp/harmonogram-zbiorki-odpadow-komunalnych,108,,1" target="_blank" rel="noopener noreferrer">gm. Łagów (powiat kielecki)</a> – aktualne terminy odbioru 2026.</li>
            <li><a href="https://www.gorno.pl/asp/pliki/2025/12/haronogram_gorno_2026.pdf" target="_blank" rel="noopener noreferrer">Cedzyna (powiat kielecki)</a> – zbiórka odpadów komunalnych.</li>
            <li><a href="https://www.gorno.pl/asp/pliki/2025/12/haronogram_gorno_2026.pdf" target="_blank" rel="noopener noreferrer">gm. Górno (powiat kielecki)</a> – harmonogram wywozu śmieci 2026.</li>
        </ul>

        <h4>🚀 Dlaczego warto korzystać z TrashAlert?</h4>
        <p>Segregacja odpadów to nasz wspólny obowiązek, ale śledzenie różnych terminów dla plastiku, szkła czy bio bywa kłopotliwe - nasza aplikacja ułatwia to zadanie:</p>
        <ul className="benefits-list">
            <li><strong>Automatyczne powiadomienia e-mail</strong> – Przypomnienie o wywozie trafi do Ciebie wieczorem lub rano, dokładnie wtedy, gdy jest potrzebne.</li>
            <li><strong>Wszystkie frakcje odpadów</strong> – Obsługujemy odpady zmieszane, plastik, szkło, papier, odpady bio oraz wielkogabaryty.</li>
            <li><strong>Darmowa subskrypcja</strong> – Usługa jest całkowicie bezpłatna dla mieszkańców obsługiwanych miejscowości.</li>
        </ul>

        <h4>🛠️ Jak aktywować powiadomienia o zbiórce?</h4>
        <ol className="steps-list">
            <li><strong>Wybierz swoją lokalizację</strong><br />Podaj swój adres e-mail i kod pocztowy, a następnie wybierz miejscowość lub ulicę z bazy <strong>harmonogramów 2026</strong>.</li>
            <li><strong>Odbieraj przypomnienia</strong><br />W dniu zbiórki (lub dzień wcześniej) otrzymasz czytelną informację o tym, jakie odpady są dziś odbierane.</li>
            <li><strong>Dbaj o środowisko</strong><br />Dzięki terminowemu wystawianiu worków wspierasz proces recyklingu w swojej gminie.</li>
        </ol>

        <style jsx>{`
            .locations-list, .benefits-list, .steps-list {
                margin: 1.5rem 0;
            }
            li {
                margin-bottom: 0.75rem;
            }
            li a {
                font-weight: 700;
            }
            .steps-list li {
                margin-bottom: 1.25rem;
            }
        `}</style>
    </main>;

export default Main;