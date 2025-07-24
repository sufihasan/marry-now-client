import { Card } from 'flowbite-react';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { BsTelephoneOutbound } from "react-icons/bs";
import { ImManWoman } from "react-icons/im";

const HowItWorks = () => {
    return (
        <div className='w-11/12 mx-auto mt-10'>
            <h1 className='text-2xl text-center font-semibold mb-5'>How MarryNow works</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <Card className="max-w-sm" horizontal>
                    <CgProfile size={50} className='mx-auto'></CgProfile>
                    <h5 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        Make Bio Data
                    </h5>
                    <p className="font-normal text-justify text-gray-700 dark:text-gray-400">
                        Login in MarryNow. You can easily make Bio-Data.
                    </p>
                </Card>
                <Card className="max-w-sm" horizontal>
                    <IoSearch size={50} className='mx-auto'></IoSearch>
                    <h5 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        Search Biodata
                    </h5>
                    <p className="font-normal text-justify text-gray-700 dark:text-gray-400">
                        You can find bio-data from Biodatas. Also you can filter with age, Bio-data type and division.
                    </p>
                </Card>

                <Card className="max-w-sm" horizontal>
                    <BsTelephoneOutbound size={50} className='mx-auto'></BsTelephoneOutbound>
                    <h5 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        Contact him/her
                    </h5>
                    <p className="font-normal text-justify text-gray-700 dark:text-gray-400">
                        By premium or request contact you can contact with him/her. Same as other can find you.
                    </p>
                </Card>
                <Card className="max-w-sm" horizontal>
                    <ImManWoman size={50} className='mx-auto'></ImManWoman>
                    <h5 className="text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        Complete the Marriage
                    </h5>
                    <p className="font-normal text-justify text-gray-700 dark:text-gray-400">
                        If you like the biodata and conversations, please take full responsibility to investigate properly and proceed with  marriage.

                    </p>
                </Card>


            </div>
        </div>
    );
};

export default HowItWorks;