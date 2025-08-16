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
import { FaHammer, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiEditAlt, BiSolidData } from "react-icons/bi";
import { GrContact, GrFavorite } from "react-icons/gr";
import { ImManWoman } from "react-icons/im";
import { MdContacts, MdViewSidebar, MdWorkspacePremium } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const SidebarContent = () => {
    // const navigate = useNavigate();
    const { role, roleLoading } = useUserRole();
    // console.log(role);

    const { logOut } = useAuth();

    const handleLogout = () => {
        // console.log('handle logout clink');
        logOut()
            .then(result => {
                // console.log(result);
                // navigate('/');
            })
            .catch(error => {
                // console.log(error);
            })
    }

    return (
        <Sidebar aria-label="Sidebar navigation" className="h-full ">
            <div className="flex h-full flex-col justify-between py-2">
                <div>
                    {/* Mobile-only search input */}
                    {/* <form className="pb-3 md:hidden px-2">
                        <TextInput
                            icon={HiSearch}
                            type="search"
                            placeholder="Search"
                            required
                        />
                    </form> */}
                    <SidebarItems>
                        <SidebarItemGroup>

                            <SidebarItem icon={FaHome} as={Link} to="/">
                                Home
                            </SidebarItem>


                            {/* user dashboard */}
                            {!roleLoading && role === 'user' && <>
                                <SidebarItem icon={HiChartPie} as={Link} to="/dashboard">
                                    User Dashboard
                                </SidebarItem>

                                <SidebarItem icon={BiSolidData} as={Link} to="/dashboard/createBioData">
                                    Create Bio data
                                </SidebarItem>

                                <SidebarItem icon={BiEditAlt} as={Link} to="/dashboard/editBioData">
                                    Edit Bio data
                                </SidebarItem>

                                <SidebarItem icon={MdViewSidebar} as={Link} to="/dashboard/viewBioData">
                                    View Bio data
                                </SidebarItem>

                                <SidebarItem icon={MdContacts} as={Link} to="/dashboard/contactRequest">
                                    My Contact Request
                                </SidebarItem>

                                <SidebarItem icon={GrFavorite} as={Link} to="/dashboard/favoritesBioData">
                                    Favorites Bio data.
                                </SidebarItem>
                                <SidebarItem icon={ImManWoman} as={Link} to="/dashboard/gotMarried">
                                    Got Married
                                </SidebarItem>
                            </>}



                            {/* admin dashboard item */}
                            {!roleLoading && role === 'admin' && <>

                                <SidebarItem icon={HiChartPie} as={Link} to="/dashboard">
                                    Admin Dashboard
                                </SidebarItem>

                                <SidebarItem icon={FaUsers} as={Link} to="/dashboard/manageUsers">
                                    Manage Users
                                </SidebarItem>

                                <SidebarItem icon={MdWorkspacePremium} as={Link} to="/dashboard/approvedPremium">
                                    Approved Premium
                                </SidebarItem>

                                <SidebarItem icon={GrContact} as={Link} to="/dashboard/approvedContactRequest">
                                    Approved Contact Request
                                </SidebarItem>

                                <SidebarItem icon={ImManWoman} as={Link} to="/dashboard/successStory">
                                    Success Story
                                </SidebarItem>

                            </>}

                        </SidebarItemGroup>

                        <SidebarItemGroup>

                            <SidebarItem
                                onClick={handleLogout}
                                icon={LuLogOut}
                                className="cursor-pointer"
                            >
                                Logout
                            </SidebarItem>
                        </SidebarItemGroup>
                    </SidebarItems>
                </div>
            </div>
        </Sidebar>
    );
}


const DashboardLayout = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    // c1 c2 c3

    return (
        <div className="flex min-h-screen">
            {/* Static sidebar (desktop & tablet) */}
            <div className="hidden md:block w-64 ">
                <SidebarContent />
            </div>

            {/* Mobile toggle button */}
            <div className="md:hidden fixed text-white z-20  p-2 flex gap-2 bg-gray-400 w-full">
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
            <div className="flex-1 p-4   md:mt-0 mt-5 dark:bg-gray-700">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
