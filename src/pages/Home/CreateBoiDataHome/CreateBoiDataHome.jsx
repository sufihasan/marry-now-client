import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

const CreateBoiDataHome = () => {
    return (
        <div className='border border-gray-200 dark:border-slate-700 dark:text-gray-200 w-11/12 mx-auto p-14 rounded  mt-10'>
            <h1 className='text-center text-2xl md:text-3xl font-semibold'>create Bio-data free from MarryNow</h1>
            <div className='flex justify-center mt-5'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <Link to='/dashboard/createBioData' className="w-full md:w-auto">
                        <button className='w-full px-4 py-3 text-white bg-blue-600 rounded
                         hover:bg-blue-700 cursor-pointer'>Create Bio Data</button>
                    </Link>
                    <Link target='_blank' className="w-full md:w-auto" to='https://www.youtube.com/@LearnwithHasanSarder'>
                        <button className='w-full px-4 py-2 flex items-center gap-1 md:gap-2 border
                         border-gray-400 hover:border-gray-500 dark:border-gray-600
                         rounded cursor-pointer'><FaYoutube size={30} className='text-red-500'></FaYoutube> How to Create BioData</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default CreateBoiDataHome;