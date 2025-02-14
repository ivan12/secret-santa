import { useEffect, useRef, useState } from 'react';
import { useAddParticipant } from '../state/hook/useAddParticipant';
import { useErrorMessage } from '../state/hook/useErrorMessage';

import './Form.css';
import { useResetListParticipants } from '../state/hook/useResetListParticipants';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const addToList = useAddParticipant();
    const resetList = useResetListParticipants();

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = name.trim() !== '' && isValidEmail(email);

    const addParticipant = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormValid) {
            setErrorMessage('Please enter a valid name and email.');
            return;
        }
        addToList(name + ', ' + email);
        setName('');
        setEmail('');
        inputRef.current?.focus();
    };

    useEffect(() => {
        resetList();
    }, []);

    return (
        <form onSubmit={addParticipant}>
            <div className="input-btn-group">
                <input
                    ref={inputRef}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    placeholder="Name"
                    className="input-name"
                    maxLength={30}
                />
                <input
                    ref={inputRef}
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
