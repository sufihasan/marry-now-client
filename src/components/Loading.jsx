import React, { use } from 'react';
import { Spinner } from 'flowbite-react';
import { DarkContext } from '../context/DarkContext/DarkContext';

const Loading = () => {
    const { dmode } = use(DarkContext); // for dark mode


    const root = window.document.documentElement;

    if (dmode) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        // setDemode(true);
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        // setDemode(false);
    }
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
            <div className="text-center">
                <Spinner aria-label="Loading..." size="xl" />
                <p className="mt-4 text-gray-600 text-lg dark:text-gray-200">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
