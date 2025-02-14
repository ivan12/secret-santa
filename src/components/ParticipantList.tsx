import { useParticipantList } from '../state/hook/useParticipantList';
import { useRemoveParticipant } from '../state/hook/useRemoveParticipant';
import './ParticipantList.css';

const ParticipantList = () => {
    const participants: string[] = useParticipantList();
    const removeParticipant = useRemoveParticipant();

    return (
        <>
            {participants.length > 0 && (
                <div className="participant-container">
                    <table className="participant-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map(participant => {
                                const [name, email] = participant.split(', '); // Assumindo que os dados vêm como 'Nome, Email'
                                return (
                                    <tr key={participant}>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => removeParticipant(participant)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ParticipantList;
