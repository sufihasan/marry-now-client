import { Button } from 'flowbite-react';
import React, { use } from 'react';
import { Link } from 'react-router';
import { DarkContext } from '../../context/DarkContext/DarkContext';

const ErrorPage = () => {
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
        <div className='dark:bg-gray-800 min-h-screen'>

            <div className='text-center pt-14 '>
                <img className='mx-auto' src="https://i.ibb.co/8Bynchs/pagenofound.png" alt="" />
                {/* <h3 className='mt-5 text-red-600 text-2xl font-semibold'>404 - Page Not Found</h3> */}
                <p className='my-3 dark:text-gray-200'>Oops! The page you are looking for does not exits</p>
                <Link to='/'>

                    <Button className='text-center mx-auto'>Go Back Home</Button>

                </Link>
            </div>

        </div>
    );
};

export default ErrorPage;