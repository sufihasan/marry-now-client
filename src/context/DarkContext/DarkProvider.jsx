import React, { useState } from 'react';
import { DarkContext } from './DarkContext';

const DarkProvider = ({ children }) => {

    const [dmode, setDemode] = useState(() =>
        localStorage.getItem('theme') === 'dark');

    let textDarkW;
    let bgDarkw

    if (dmode) {
        bgDarkw = 'black';
        textDarkW = 'white';
    }
    else {
        bgDarkw = 'white';
        textDarkW = 'black';
    }

    const darkInfo = {
        setDemode,
        dmode,
        textDarkW,
        bgDarkw
    }

    return (
        <DarkContext value={darkInfo}>
            {children}
        </DarkContext>
    );
};

export default DarkProvider;