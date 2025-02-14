import { useSetRecoilState } from 'recoil';
import { participantsListState } from '../atom';

export const useRemoveParticipant = () => {
    const setParticipants = useSetRecoilState(participantsListState);

    return (participant: string) => {
        setParticipants(currentList => currentList.filter(p => p !== participant));
    };
};
