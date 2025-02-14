import { useSetRecoilState } from 'recoil';
import { errorState, participantsListState } from '../atom';

export const useResetListParticipants = () => {
    const setList = useSetRecoilState(participantsListState);
    const setError = useSetRecoilState(errorState);

    return () => {
        setList([]); // Reset list to empty
        setError(''); // Clear any errors
    };
};
