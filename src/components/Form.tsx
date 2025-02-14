import { useEffect, useRef, useState } from 'react';
import { useAddParticipant } from '../state/hook/useAddParticipant';
import { useErrorMessage } from '../state/hook/useErrorMessage';

import './Form.css';
import { useResetListParticipants } from '../state/hook/useResetListParticipants';
import { useParticipantList } from '../state/hook/useParticipantList';
import { useSetErrorMessage } from '../state/hook/useSetErrorMessage';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const errorMessage = useErrorMessage();
    const setErrorMessage = useSetErrorMessage();

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const addToList = useAddParticipant();
    const resetList = useResetListParticipants();
    const participants = useParticipantList();

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = name.trim() !== '' && isValidEmail(email);

    const nameAlreadyExists = (name: string) => {
        return participants.some(
            (participant: string) => participant.split(',')[0].trim() === name
        );
    };

    const addParticipant = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormValid) {
            setErrorMessage('Please enter a valid name and email.');
            return;
        }
        if (nameAlreadyExists(name)) {
            setErrorMessage('Duplicate names are not allowed!');
            return;
        }
        addToList(name + ', ' + email);
        setName('');
        setEmail('');
        emailInputRef.current?.focus();
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage]);

    useEffect(() => {
        resetList();
    }, []);

    return (
        <form onSubmit={addParticipant}>
            <div className="input-btn-group">
                <input
                    ref={nameInputRef}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    placeholder="Name"
                    className="input-name"
                    maxLength={30}
                />
                <input
                    ref={emailInputRef}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="email"
                    placeholder="Email"
                    className="input-email"
                    maxLength={100}
                />
                <button disabled={!isFormValid}>Add</button>
            </div>
            {errorMessage && (
                <p className="alert error" role="alert">
                    {errorMessage}
                </p>
            )}
        </form>
    );
};

export default Form;
