import shuffle from 'just-shuffle';

export function performDraw(participants: string[]) {
    const totalParticipants = participants.length;
    const shuffled = shuffle(participants);
    const result = new Map<string, string>();

    for (let index = 0; index < totalParticipants; index++) {
        const friendIndex = index === totalParticipants - 1 ? 0 : index + 1;
        result.set(shuffled[index], shuffled[friendIndex]);
    }

    return result;
}
