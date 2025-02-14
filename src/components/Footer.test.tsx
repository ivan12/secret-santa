import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useParticipantList } from '../state/hook/useParticipantList';
import Footer from './Footer';

jest.mock('../state/hook/useParticipantList', () => {
    return {
        useParticipantList: jest.fn(),
    };
});

const mockNavigation = jest.fn();
const mockDraw = jest.fn();

jest.mock('../state/hook/useDraw', () => {
    return {
        useDraw: () => mockDraw,
    };
});

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigation,
    };
});

describe('when there are not enough participants', () => {
    beforeEach(() => {
        (useParticipantList as jest.Mock).mockReturnValue([]);
    });
    test('the game cannot be started', () => {
        render(
            <RecoilRoot>
                <Footer />
            </RecoilRoot>
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
});

describe('when there are enough participants', () => {
    beforeEach(() => {
        (useParticipantList as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina']);
    });
    test('the game can be started', () => {
        render(
            <RecoilRoot>
                <Footer />
            </RecoilRoot>
        );
        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
    });
    test('the game was started', () => {
        render(
            <RecoilRoot>
                <Footer />
            </RecoilRoot>
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockNavigation).toHaveBeenCalledTimes(1);
        expect(mockNavigation).toHaveBeenCalledWith('/drawing');
        expect(mockDraw).toHaveBeenCalledTimes(1);
    });
});
