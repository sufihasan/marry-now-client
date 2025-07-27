import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer1 from '../pages/shared/Footer1/Footer1';
import Loading from '../components/Loading';

const RootLayout = () => {
    const { state } = useNavigation();
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-283px)]'>
                {state == 'loading' ? <Loading></Loading> : <Outlet></Outlet>}
            </div>
            {/* <Outlet></Outlet> */}
            <Footer1></Footer1>
        </div>
    );
};

export default RootLayout;