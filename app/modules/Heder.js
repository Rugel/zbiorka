import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className='header'>
            <div className='logo'><Link href="/" title="Przejdź na stronę główną"><Image src={'/logo.png'} alt='Logo' width={130} height={130} /></Link></div>
            <h1>
                Zbiórka odpadów komunalnych – ustaw powiadomienia e-mail
            </h1>
            <h2>dodaj harmonogram dla swojej miejscowości lub ulicy</h2>
        </header>
    )
}

export default Header;