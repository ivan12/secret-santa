import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Config from './pages/Config';
import Drawing from './pages/Drawing';

function App() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path="/" element={<Config />} />
                    <Route path="/drawing" element={<Drawing />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default App;
