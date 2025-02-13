import { useNavigate } from 'react-router-dom';
import { useParticipantList } from '../state/hook/useParticipantList';
import { useDraw } from '../state/hook/useDraw';

import './Footer.css';

const Footer = () => {
    const participants = useParticipantList();

    const navigateTo = useNavigate();

    const draw = useDraw();

    const start = () => {
        draw();
        navigateTo('/drawing');
    };

    return (
        <footer className="footer-settings">
            <button className="button" disabled={participants.length < 3} onClick={start}>
                Start the game
            </button>
            <img src="/images/bags.png" alt="Shopping bags" />
        </footer>
    );
};

export default Footer;
