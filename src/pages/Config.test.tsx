import { render } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Configuration from './Config';

const mockNavigation = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigation,
    };
});

describe('the configuration page', () => {
    test('should be rendered correctly', () => {
        const { container } = render(
            <RecoilRoot>
                <Configuration />
            </RecoilRoot>
        );

        expect(container).toMatchSnapshot();
    });
});
