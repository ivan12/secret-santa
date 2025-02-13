import { performDraw } from './performDraw';

describe('given a secret santa draw', () => {
    test('no participant should draw their own name', () => {
        const participants = ['Ana', 'Catarina', 'Vinicios', 'Juliana', 'João', 'Nathália'];

        const draw = performDraw(participants);
        participants.forEach(participant => {
            const secretFriend = draw.get(participant);
            expect(secretFriend).not.toEqual(participant);
        });
    });
});
