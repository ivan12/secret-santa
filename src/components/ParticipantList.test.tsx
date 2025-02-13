import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useParticipantList } from '../state/hook/useParticipantList';
import ParticipantList from './ParticipantList';

jest.mock('../state/hook/useParticipantList', () => {
    return {
        useParticipantList: jest.fn(),
    };
});

describe('an empty participant list', () => {
    beforeEach(() => {
        (useParticipantList as jest.Mock).mockReturnValue([]);
    });
    test('should be rendered without any items', () => {
        render(
            <RecoilRoot>
                <ParticipantList />
            </RecoilRoot>
        );

        const items = screen.queryAllByRole('listitem');
        expect(items).toHaveLength(0);
    });
});

describe('a populated participant list', () => {
    const participants = ['Ana', 'Catarina'];
    beforeEach(() => {
        (useParticipantList as jest.Mock).mockReturnValue(participants);
    });
    test('should be rendered with the correct number of items', () => {
        render(
            <RecoilRoot>
                <ParticipantList />
            </RecoilRoot>
        );

        const items = screen.queryAllByRole('listitem');
        expect(items).toHaveLength(participants.length);
    });
});
