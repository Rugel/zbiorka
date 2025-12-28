const Footer = () => {
    return (
        <footer className="footer">
            <p>
                <strong>TrashAlert</strong> &copy; {new Date().getFullYear()}
            </p>
            <p>
                Masz pytania? Napisz do nas: <a href="mailto:zbiorkasmieci@gmail.com">zbiorkasmieci@gmail.com</a>
            </p>
        </footer>
    );
};

export default Footer;