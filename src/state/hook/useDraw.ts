import { useSetRecoilState } from 'recoil';
import { secretSantaResults } from '../atom';
import { performDraw } from '../helpers/performDraw';
import { useParticipantList } from './useParticipantList';

export const useDraw = () => {
    const participants = useParticipantList();
    const setResult = useSetRecoilState(secretSantaResults);
    return () => {
        const result = performDraw(participants);
        setResult(result);
    };
};
