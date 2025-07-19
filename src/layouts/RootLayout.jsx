import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer1 from '../pages/shared/Footer1/Footer1';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer1></Footer1>
        </div>
    );
};

export default RootLayout;