import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
import {
    Button,
    Drawer,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
    TextInput,
} from "flowbite-react";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";
import { Link, Outlet } from "react-router";
import { FaHammer, FaHome } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiEditAlt, BiSolidData } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import { MdContacts, MdViewSidebar } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";

const SidebarContent = () => (
    <Sidebar aria-label="Sidebar navigation" className="h-full">
        <div className="flex h-full flex-col justify-between py-2">
            <div>
                {/* Mobile-only search input */}
                <form className="pb-3 md:hidden px-2">
                    <TextInput
                        icon={HiSearch}
                        type="search"
                        placeholder="Search"
                        required
                    />
                </form>
                <SidebarItems>
                    <SidebarItemGroup>
                        <Link to='/'>
                            {/* <SidebarItem >
                                <span className="flex items-center gap-2">
                                    <FaHome size={22}></FaHome>
                                    Home
                                </span>
                            </SidebarItem> */}

                            <SidebarItem icon={FaHome}>
                                Home
                            </SidebarItem>

                        </Link>

                        <Link to='/dashboard'>
                            <SidebarItem icon={HiChartPie}>
                                Dashboard Home
                            </SidebarItem>
                        </Link>

                        <Link to='/dashboard/createBioData'>
                            <SidebarItem icon={BiSolidData}>
                                Create Bio data
                            </SidebarItem>
                        </Link>

                        <Link to='/dashboard/editBioData'>
                            <SidebarItem icon={BiEditAlt}>
                                Edit Bio data
                            </SidebarItem>
                        </Link>

                        <Link to='/dashboard/viewBioData'>
                            <SidebarItem icon={MdViewSidebar}>
                                View Bio data
                            </SidebarItem>
                        </Link>

                        <Link to='/dashboard/viewBioData'>
                            <SidebarItem icon={MdContacts}>
                                My Contact Request
                            </SidebarItem>
                        </Link>

                        <Link to='/dashboard/favoritesBioData'>
                            <SidebarItem icon={GrFavorite}>
                                Favorites Bio data.
                            </SidebarItem>
                        </Link>

                        {/* <SidebarItem href="/e-commerce/products" icon={HiShoppingBag}>
                            Products
                        </SidebarItem> */}
                        {/* <SidebarItem href="/users/list" icon={HiUsers}>
                            Users List
                        </SidebarItem> */}
                        {/* <SidebarItem href="/authentication/sign-in" icon={HiLogin}>
                            Sign In
                        </SidebarItem> */}
                        {/* <SidebarItem href="/authentication/sign-up" icon={HiPencil}>
                            Sign Up
                        </SidebarItem> */}
                    </SidebarItemGroup>

                    <SidebarItemGroup>

                        <SidebarItem
                            // onClick={handleLogout}
                            icon={LuLogOut}
                        >
                            Logout
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </div>
        </div>
    </Sidebar>
);

const DashboardLayout = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Static sidebar (desktop & tablet) */}
            <div className="hidden md:block w-64">
                <SidebarContent />
            </div>

            {/* Mobile toggle button */}
            <div className="md:hidden fixed top-4 p-2 flex gap-2 bg-gray-200/30 w-full">
                <span className="" onClick={() => setOpenDrawer(true)}><RxHamburgerMenu size={24} /></span>
                Dashboard
            </div>

            {/* Drawer (mobile only) */}
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} position="left">
                <div className="w-64">
                    <SidebarContent />
                </div>
            </Drawer>

            {/* Main content */}
            <div className="flex-1 p-4 md:ml-64  md:mt-0 mt-14">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
