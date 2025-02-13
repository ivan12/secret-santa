import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorState, participantsListState } from '../atom';

export const useAddParticipant = () => {
    const setList = useSetRecoilState(participantsListState);
    const list = useRecoilValue(participantsListState);
    const setError = useSetRecoilState(errorState);
    return (participantName: string) => {
        if (list.includes(participantName)) {
            setError('Duplicate names are not allowed!');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        return setList(currentList => [...currentList, participantName]);
    };
};
