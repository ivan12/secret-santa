import { useState } from 'react';
import Card from '../components/Card';
import { useParticipantList } from '../state/hook/useParticipantList';
import { useDrawResult } from '../state/hook/useDrawResult';

import './Drawing.css';
import { useNavigate } from 'react-router-dom';

const Drawing = () => {
    const participants = useParticipantList();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isDrew, setIsDrew] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    const navigateTo = useNavigate();
    const result = useDrawResult();

    const draw = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsShuffling(true); // Start shuffle animation
        setMessage('Shuffling names...');

        setTimeout(async () => {
            setIsShuffling(false); // Stop shuffle animation
            let secretFriend = null;
            console.log('draw!!');
            console.log('participants >> ', participants);
            console.log('result >> ', result);

            try {
                setIsDrew(true);
                for (const currentParticipant of participants) {
                    if (result.has(currentParticipant)) {
                        secretFriend =
                            result.get(currentParticipant) ?? 'Unable to get name! Try again!';
                        await sendEmail(currentParticipant, secretFriend);
                    }
                }
                setMessage('All emails sent successfully! Check your email ;)');

                // Show Congratulations message after 4 seconds
                setTimeout(() => {
                    setShowCongrats(true);
                }, 1000);
            } catch (error) {
                setMessage(
                    'An error occurred while trying to send one of the emails! Please try again later ;)'
                );
                setIsDrew(false);
                setShowCongrats(false);
                console.log(error);
            }
        }, 3000); // Simulate shuffling for 3 seconds
    };

    const sendEmail = async (currentParticipant: string, secretFriend: string) => {
        setLoading(true);
        const [friendName, friendEmail] = secretFriend.split(', ');
        const [name, email] = currentParticipant.split(', ');
        setMessage('Sending email to ' + name + '...');
        console.log(`currentParticipant >> ${name} & ${email}`);
        console.log(`secretFriend >> ${friendName} & ${friendEmail}`);

        try {
            await fetch(
                'https://script.google.com/macros/s/AKfycbx7LKj1xKCTUpN6fNhuf4wD2AXgTH9_NDmuG6agXv2c1RAoIq2JmVUDLQaDhXEPcb8n/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: email,
                        subject: `${name} - Your Secret Santa is here!`,
                        message: `Congratulations ${name}, you got -> ${friendName}!`,
                    }),
                }
            );
        } catch (error) {
            setMessage(
                'An error occurred while trying to send one of the emails! Please try again later ;)'
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const back = () => {
        navigateTo('/');
    };

    return (
        <Card>
            <section className="draw">
                <h2>Who will pick the paper?</h2>
                <form>
                    <p>
                        Click on "Draw" - The result of your Secret Santa will be sent to everyone's
                        email!
                    </p>
                    {!isDrew && (
                        <button
                            className={`draw-button ${isShuffling ? 'shuffling' : ''}`}
                            onClick={draw}
                            disabled={isShuffling}
                        >
                            {isShuffling ? 'Shuffling...' : 'Draw'}
                        </button>
                    )}
                </form>
                {loading && (
                    <p className="result" role="alert">
                        {message}
                    </p>
                )}
                {showCongrats && (
                    <>
                        <p className="congrats-message">
                            🎉 Congratulations! Check your emails! 🎉
                        </p>
                        <button className="draw-button" onClick={back}>
                            Back
                        </button>
                    </>
                )}
                <footer className="draw">
                    <img
                        src="/images/paper-plane.png"
                        className="paper-plane"
                        alt="A drawing of a paper airplane"
                    />
                </footer>
            </section>
        </Card>
    );
};

export default Drawing;
