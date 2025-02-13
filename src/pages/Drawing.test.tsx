import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useParticipantList } from '../state/hook/useParticipantList';
import { useDrawResult } from '../state/hook/useDrawResult';
import Drawing from './Drawing';

jest.mock('../state/hook/useParticipantList', () => {
    return {
        useParticipantList: jest.fn(),
    };
});
jest.mock('../state/hook/useDrawResult', () => {
    return {
        useDrawResult: jest.fn(),
    };
});

describe('on the draw page', () => {
    const participants = ['Ana', 'Catarina', 'Jorel'];
    const result = new Map([
        ['Ana', 'Jorel'],
        ['Jorel', 'Catarina'],
        ['Catarina', 'Ana'],
    ]);

    beforeEach(() => {
        (useParticipantList as jest.Mock).mockReturnValue(participants);
        (useDrawResult as jest.Mock).mockReturnValue(result);
    });
    test('all participants can view their secret friend', () => {
        render(
            <RecoilRoot>
                <Drawing />
            </RecoilRoot>
        );

        const options = screen.queryAllByRole('option');
        expect(options).toHaveLength(participants.length);
    });
    test('the secret friend is displayed when requested', () => {
        render(
            <RecoilRoot>
                <Drawing />
            </RecoilRoot>
        );

        const select = screen.getByPlaceholderText('Select your name');

        fireEvent.change(select, {
            target: {
                value: participants[0],
            },
        });

        const button = screen.getByRole('button');

        fireEvent.click(button);

        const secretFriend = screen.getByRole('alert');

        expect(secretFriend).toBeInTheDocument();
    });
});
