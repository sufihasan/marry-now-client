// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CountUp, { useCountUp } from 'react-countup';


const SuccessCounter = ({ totalBiodata, totalBoys, totalGirls, totalMarriages }) => {


    useCountUp({
        ref: 'counter',
        end: totalBiodata,
        enableScrollSpy: true,
        scrollSpyDelay: 500,
    });
    useCountUp({
        ref: 'counter2',
        end: totalBoys,
        enableScrollSpy: true,
        scrollSpyDelay: 500,
    });
    useCountUp({
        ref: 'counter3',
        end: totalGirls,
        enableScrollSpy: true,
        scrollSpyDelay: 500,
    });
    useCountUp({
        ref: 'counter4',
        end: totalMarriages,
        enableScrollSpy: true,
        scrollSpyDelay: 500,
    });



    return (
        <div className="w-11/12 mx-auto mt-10">

            <h1 className="text-3xl font-bold text-center mb-5 dark:text-gray-200">Some Info about MarryNow</h1>

            <div className='grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10
             justify-center dark:text-gray-200'>
                <div className='bg-base-200 rounded-xl border border-gray-200 dark:border-slate-700 
                flex items-center justify-center py-5'>
                    <div >
                        <img className='w-20 h-20 mx-auto' src="https://i.ibb.co.com/qLcbJpS2/successstaffs.png" alt="" />
                        <h2 className='my-2 text-5xl font-bold'><span id="counter"></span>+</h2>
                        <p className='text-gray-500 dark:text-gray-300'>total biodata</p>
                    </div>
                </div>
                <div className='bg-base-200 rounded-xl border border-gray-200 dark:border-slate-700
                 flex items-center justify-center py-5'>
                    <div>
                        <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/Z0QS7zx/man.png" alt="" />
                        <h2 className='my-2 text-5xl font-bold'><span id="counter2"></span>+</h2>
                        <p className='text-gray-500 dark:text-gray-300'>Total boys biodata</p>
                    </div>
                </div>
                <div className='bg-base-200 rounded-xl border border-gray-200 dark:border-slate-700
                 flex items-center justify-center py-5'>
                    <div>
                        <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/YT2Q1kxB/wonam.png" alt="" />
                        <h2 className='my-2 text-5xl font-bold'><span id="counter3"></span>+</h2>
                        <p className='text-gray-500 dark:text-gray-300'>Total girls biodata</p>
                    </div>
                </div>
                <div className='bg-base-200 rounded-xl border border-gray-200 dark:border-slate-700
                 flex items-center justify-center py-5'>
                    <div>
                        <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/FknKRBWd/marrry.jpg" alt="" />
                        <h2 className='my-2 text-5xl font-bold'><span id="counter4"></span>+</h2>

                        <p className='text-gray-500 dark:text-gray-300'>Total marriages complete</p>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default SuccessCounter;