import React, { useState } from 'react';
import { DarkContext } from './DarkContext';

const DarkProvider = ({ children }) => {

    const [dmode, setDemode] = useState(() =>
        localStorage.getItem('theme') === 'dark');


    const darkInfo = {
        setDemode,
        dmode
    }

    return (
        <DarkContext value={darkInfo}>
            {children}
        </DarkContext>
    );
};

export default DarkProvider;