import './styles.css';
import { APP_VERSION } from '../../version';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-image" role="img" aria-label="Raffle logo"></div>
            <div className="participant-container">
                <img
                    className="participant"
                    src="/images/participant.png"
                    alt="Participant holding a gift"
                />
                <span className="app-version">v{APP_VERSION}</span>
            </div>
        </header>
    );
};

export default Header;
