import Image from "next/image";

const Header = () => {
    return (
        <header className='header'>
            <div className='logo'><Image src={'/web-app-manifest-512x512.png'} alt='Logo' width={130} height={130} /></div>
            <h1>
                Zbiórka odpadów – ustaw powiadomienia e-mail
            </h1><br/>
            <h2>dodaj harmonogram dla swojej miejscowości</h2>
        </header>
    )
}

export default Header;