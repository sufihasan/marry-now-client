import React from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import useAuth from '../../../hooks/useAuth';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";


const Navbar = () => {

    const { user, logOut } = useAuth();


    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to='/'>
                    <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <img src="https://i.ibb.co/d00NvDCZ/newlogobr.png" className="h-8" alt="logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MarryNow</span>

                    </div>
                </Link>
                {/* <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://i.ibb.co/d00NvDCZ/newlogobr.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MarryNow</span>

                </a> */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        user ? <Dropdown
                            label={<Avatar alt="User settings" img={user?.photoURL} rounded />}
                            arrowIcon={false}
                            inline
                        >
                            <DropdownHeader>
                                <span className="block text-sm">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </DropdownHeader>
                            {/* <DropdownItem>Dashboard</DropdownItem> */}
                            {/* <DropdownItem>Settings</DropdownItem> */}
                            {/* <DropdownItem>Earnings</DropdownItem> */}
                            <DropdownDivider />
                            <DropdownItem onClick={handleLogOut}>Sign out</DropdownItem>
                        </Dropdown> : <Link to='/login'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        </Link>

                    }


                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'block text-blue-700 py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'md:hover:text-blue-500 block  py-2 px-3 md:p-0'}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/biodatas' className={({ isActive }) => isActive ? 'block text-blue-700 py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'md:hover:text-blue-500 block  py-2 px-3 md:p-0'}>Biodatas</NavLink>
                        </li>
                        <li>
                            <NavLink to='/aboutUs' className={({ isActive }) => isActive ? 'block text-blue-700 py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'md:hover:text-blue-500 block  py-2 px-3 md:p-0'}> About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contactUs' className={({ isActive }) => isActive ? 'block text-blue-700 py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'md:hover:text-blue-500 block  py-2 px-3 md:p-0'}>Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'block text-blue-700 py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' : 'md:hover:text-blue-500 block  py-2 px-3 md:p-0'}>Dashboard</NavLink>
                        </li>


                        {/* <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;