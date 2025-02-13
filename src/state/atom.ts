import { atom } from 'recoil';

export const participantsListState = atom<string[]>({
    key: 'participantsListState',
    default: [],
});

export const secretSantaResults = atom<Map<string, string>>({
    key: 'secretSantaResults',
    default: new Map(),
});

export const errorState = atom<string>({
    key: 'errorState',
    default: '',
});
