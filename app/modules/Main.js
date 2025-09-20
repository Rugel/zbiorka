const Main = () =>
    <main className="container">
        <u><h3 className="title">TrashAlert</h3></u>
        <h4>Aplikacja TrashAlert umożliwia darmową subskrypcję powiadomień e-mail o zbiórkach odpadów komunalnych w konkretnej lokalizacji.</h4>
        <p>Czy zdarza Ci się zapomnieć o dniu odbioru śmieci? A może zastanawiasz się, kiedy wystawić żółty worek na plastiki, a kiedy zielony na szkło?<br />Dzięki aplikacji <strong>TrashAlert</strong> możesz pożegnać się z harmonogramem wywozu odpadów komunalnych.<br />To proste, intuicyjne rozwiązanie - bez instalowania kolejnej aplikacji na Twoim telefonie - pomoże Ci zadbać o porządek w Twoim domu i otoczeniu.</p>
        <br />
        <h4>Obecna lista lokalizacji dla których można uzyskać powiadomienia o zbiórce:</h4>
        <ul>
            <li>gm. <b>Łagów</b> (26-025), pow. kielecki</li>
            <li><b>Cedzyna</b> (25-351), pow. kielecki</li>
            <li>gm. <b>Górno</b> (26-008), pow. kielecki</li>
        </ul>
        <br />
        <h4>Dlaczego warto skorzystać z aplikacji TrashAlert?</h4>
        <p>Żyjemy w czasach, gdy segregacja odpadów stała się obowiązekiem. Jednak śledzenie harmonogramów odbioru różnych frakcji – od zmieszanych odpadów komunalnych po zużyty sprzęt elektroniczny – może być uciążliwe. Nasza aplikacja powstała, by ułatwić Ci to zadanie.</p><br />
        <h4>Oto, co zyskujesz:</h4>
        <ul>
            <li><strong>Spersonalizowane powiadomienia e-mail</strong> – dostaniesz przypomnienie dokładnie wtedy, gdy będzie Ci potrzebne, prosto na swoją skrzynkę.</li>
            <li><strong>Rozróżnienie kategorii odpadów</strong> – zmieszane, tworzywa sztuczne, szkło, papier, bio, odpady wielkogabarytowe czy elektronika – każda frakcja ma swój harmonogram.</li>
            <li><strong>Elastyczność</strong> – dostosuj aplikację do swoich potrzeb, wybierając miejscowość i kategorie odpadów, które Cię interesują.</li>
        </ul>
        <br />
        <h4>Jak to działa?</h4>
        <ol>
            <li><strong>Ustaw powiadomienia dla wybranej lokalizacji</strong><br />Wpisz swój adres e-mail, kod pocztowy a następnie z rozwijanej listy wybierz swoją lokalizację.</li>
            <li><strong>Otrzymuj przypomnienia</strong><br />W dniu zbiórki dostaniesz e-mail z informacją, np.: <br />„Przypomnienie!<br />
                Zbiórka śmieci w 26-008 Radlin<br />
                Dzisiaj 2025-09-16 odbywa się zbiórka śmieci:<br />
                🟡 tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)<br />
                🟢 szkło białe i kolorowe (worek zielony)<br />
                🔵 papier, tektura (worek niebieski)<br />
                Pamiętaj o wystawieniu pojemników!”</li>
            <li><strong>Testuj i dostosuj</strong><br />Nie jesteś pewien, czy e-maile dotrą? Skorzystaj z testu, aby sprawdzić działanie powiadomień. Jeśli wiadomość wpadnie do spamu, oznacz ją jako „nie spam”.</li>
        </ol>
        <br />
        <h4>Kategorie odpadów pod kontrolą</h4>
        <p>Nasza aplikacja wspiera pełną segregację, obejmując wszystkie najważniejsze frakcje:</p>
        <p><strong>🗑️ Zmieszane odpady komunalne</strong> – dla odpadów, które nie nadają się do recyklingu.</p>
        <p><strong>🟡 Tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)</strong> – plastikowe butelki, puszki czy kartony po mleku.</p>
        <p><strong>🟢 Szkło białe i kolorowe (worek zielony)</strong> – słoiki i butelki, które zyskują nowe życie.</p>
        <p><strong>🔵 Papier, tektura (worek niebieski)</strong> – gazety, kartony i opakowania papierowe.</p>
        <p><strong>🟤 Odpady biodegradowalne (worek brązowy)</strong> – resztki jedzenia i odpady organiczne.</p>
        <p><strong>🪑 Odpady wielkogabarytowe</strong> – stare meble czy materace.</p>
        <p><strong>📻 Zużyty sprzęt elektryczny i elektroniczny</strong> – od zepsutych lodówek po stare telefony.</p>
        <p><strong>🚬popiół</strong> - popiół uzyskany ze spalania drewna lub węgla.</p>
        <p>Dzięki subskrypcji wiadomości e-mail masz pewność, że każdy worek trafi na ulicę w odpowiednim czasie.</p>
    </main>;

export default Main;