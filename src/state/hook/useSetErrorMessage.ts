import { useSetRecoilState } from 'recoil';
import { errorState } from '../atom';

export const useSetErrorMessage = () => {
    const setErrorMessage = useSetRecoilState(errorState);
    return setErrorMessage;
};
