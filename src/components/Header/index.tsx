import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-image" role="img" aria-label="Raffle logo"></div>
            <img
                className="participant"
                src="/images/participant.png"
                alt="Participant holding a gift"
            />
        </header>
    );
};

export default Header;
