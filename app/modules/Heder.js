import Image from "next/image";

const Header = () => {
    return (
        <header className='header'>
            <div className='logo'><Image src={'/logo.png'} alt='Logo' width={130} height={130} /></div>
            <h1>
                Zbiórka odpadów komunalnych – ustaw powiadomienia e-mail
            </h1>
            <h2>dodaj harmonogram dla swojej miejscowości lub ulicy</h2>
        </header>
    )
}

export default Header;