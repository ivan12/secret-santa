import { useParticipantList } from '../state/hook/useParticipantList';

const ParticipantList = () => {
    const participants: string[] = useParticipantList();
    return (
        <ul>
            {participants.map(participant => (
                <li key={participant}>{participant}</li>
            ))}
        </ul>
    );
};

export default ParticipantList;
