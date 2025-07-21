import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashBoardHome from "../pages/DashBoard/DashBoardHome/DashBoardHome";
import CreateBioData from "../pages/DashBoard/CreateBioData/CreateBioData";
import Biodatas from "../pages/Biodatas/Biodatas";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/contactUs',
                Component: ContactUs
            },
            {
                path: '/biodatas',
                Component: Biodatas
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                Component: DashBoardHome
            },
            {
                path: '/dashboard/createBioData',
                element: <CreateBioData></CreateBioData>
            }
        ]
    }
]);