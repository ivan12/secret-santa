import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Form from './Form';

describe('Form.tsx behavior', () => {
    test('when the input is empty, new participants cannot be added', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        );
        const nameInput = screen.getByPlaceholderText('Name');
        expect(nameInput).toBeInTheDocument();
        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput).toBeInTheDocument();
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('add a participant when a name is filled in', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        );

        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const button = screen.getByRole('button');

        fireEvent.change(nameInput, {
            target: {
                value: 'Ana',
            },
        });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        expect(emailInput).toHaveFocus();
        expect(emailInput.value).toBe('');
    });

    test('duplicate names cannot be added to the list', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        );

        const input = screen.getByPlaceholderText('Name');
        const button = screen.getByRole('button');

        // 1° Add
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina',
            },
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: {
                value: 'ana@example.com',
            },
        });
        fireEvent.click(button);

        // 2° add repeated
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina',
            },
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: {
                value: 'ana2@example.com',
            },
        });
        fireEvent.click(button);

        // test error msg
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage.textContent).toBe('Duplicate names are not allowed!');
    });

    test('the error message should disappear after the timers', () => {
        jest.useFakeTimers();
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText('Name');
        const button = screen.getByRole('button');

        // 1° Add
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina',
            },
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: {
                value: 'ana@example.com',
            },
        });
        fireEvent.click(button);

        // 2° add repeated
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina',
            },
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: {
                value: 'ana2@example.com',
            },
        });
        fireEvent.click(button);

        let errorMessage = screen.queryByRole('alert');
        expect(errorMessage).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        errorMessage = screen.queryByRole('alert');
        expect(errorMessage).toBeNull();
    });
});
