import { useState } from 'react';
import Card from '../components/Card';
import { useParticipantList } from '../state/hook/useParticipantList';
import { useDrawResult } from '../state/hook/useDrawResult';

import './Drawing.css';

const Drawing = () => {
    const participants = useParticipantList();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const result = useDrawResult();

    const draw = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let secretFriend = null;
        console.log('draw!!');
        console.log('participants >> ', participants);
        console.log('result >> ', result);
        try {
            participants.forEach(async currentParticipant => {
                if (result.has(currentParticipant)) {
                    secretFriend = result.get(currentParticipant);
                    let secretFriendName =
                        secretFriend?.split(', ')[0] ||
                        "Could not fetch your secret friend's name! Correct input format is 'Name, Email of your friend!'";
                    await sendEmail(currentParticipant, secretFriendName);
                }
            });
            setMessage('All emails sent successfully! Check your email ;)');
        } catch (error) {
            setMessage(
                'An error occurred while trying to send one of the emails! Please try again later ;)'
            );
            console.log(error);
        }
    };

    const sendEmail = async (currentParticipant: string, friendName: string) => {
        console.log('sendEmail >> currentParticipant >> ', currentParticipant);
        console.log('sendEmail >> friendName >> ', friendName);
        setLoading(true);
        const [name, email] = currentParticipant.split(', ');
        setMessage('Sending email to ' + name + '...');

        try {
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbxLJUz2LovHdz5JrhBy0Db4scuK1dTssvqG8S1OcL08no6V4Jmlc-_1wiGyUctwkNiGUg/exec',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: email,
                        subject: `${name} - Your Secret Santa is here!`,
                        message: `Congratulations ${name}, you got -> ${friendName}!`,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage(
                'An error occurred while trying to send one of the emails! Please try again later ;)'
            );
            console.error(error); // Exibe o erro no console para depuração
        } finally {
            setLoading(false);
        }
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
                    <button className="draw-button" onClick={event => draw(event)}>
                        Draw
                    </button>
                </form>
                {loading && (
                    <p className="result" role="alert">
                        {message}
                    </p>
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
