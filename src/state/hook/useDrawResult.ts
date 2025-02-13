import { useRecoilValue } from 'recoil';
import { secretSantaResults } from '../atom';

export const useDrawResult = () => {
    return useRecoilValue(secretSantaResults);
};
