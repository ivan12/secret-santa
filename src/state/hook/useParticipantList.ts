import { useRecoilValue } from 'recoil';
import { participantsListState } from '../atom';

export const useParticipantList = () => {
    return useRecoilValue(participantsListState);
};
