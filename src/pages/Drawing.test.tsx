import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Drawing from '../pages/Drawing'; // Ajuste o caminho conforme necessário

jest.useFakeTimers(); // Habilita o mock de timers

test('button changes from "Start Game" to "Shuffling..." and then displays "Congratulations"', async () => {
    render(
        <MemoryRouter>
            <RecoilRoot>
                <Drawing />
            </RecoilRoot>
        </MemoryRouter>
    );

    // Encontra o botão "Start Game"
    const startButton = screen.getByText('Start Game');

    // Clica no botão
    fireEvent.click(startButton);

    // Avança o tempo para simular a execução do timer (se houver algum delay)
    jest.advanceTimersByTime(1000); // Ajuste o tempo conforme necessário para o seu caso

    // Aguarda que o texto "Shuffling..." apareça
    await waitFor(
        () => {
            expect(
                screen.queryByText(content => content.includes('Shuffling'))
            ).toBeInTheDocument();
        },
        { timeout: 5000 }
    );

    // Avança o tempo novamente para simular a mudança para "Congratulations"
    jest.advanceTimersByTime(1000); // Ajuste o tempo conforme necessário

    // Aguarda que o texto "Congratulations" apareça
    await waitFor(
        () => {
            expect(
                screen.queryByText(content => content.includes('Congratulations'))
            ).toBeInTheDocument();
        },
        { timeout: 5000 }
    );
});
