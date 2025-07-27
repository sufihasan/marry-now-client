import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>

            <div className='text-center mt-14'>
                <img className='mx-auto' src="https://i.ibb.co/8Bynchs/pagenofound.png" alt="" />
                {/* <h3 className='mt-5 text-red-600 text-2xl font-semibold'>404 - Page Not Found</h3> */}
                <p className='my-3'>Oops! The page you are looking for does not exits</p>
                <Link to='/'>

                    <Button className='text-center mx-auto'>Go Back Home</Button>

                </Link>
            </div>

        </div>
    );
};

export default ErrorPage;