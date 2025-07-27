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
import ViewBioData from "../pages/DashBoard/ViewBioData/ViewBioData";
import ApprovedPremium from "../pages/DashBoard/ApprovedPremium/ApprovedPremium";
import MyFavouritesBiodata from "../pages/DashBoard/MyFavouritesBiodata/MyFavouritesBiodata";
import EditBiodata from "../pages/DashBoard/EditBiodata/EditBiodata";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import ManageUsers from "../pages/DashBoard/ManageUsers/ManageUsers";
import GotMarriedForm from "../pages/DashBoard/GotMarriedForm/GotMarriedForm";
import SuccessStory from "../pages/DashBoard/SuccessStory/SuccessStory";
import Checkout from "../pages/Payment/Checkout/Checkout";
import ApprovedContactRequest from "../pages/DashBoard/ApprovedContactRequest/ApprovedContactRequest";
import MyContactRequest from "../pages/DashBoard/MyContactRequest/MyContactRequest";
import AboutUs from "../pages/AboutUs/AboutUs";
import PrivateRoute from "../routes/PrivateRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: '/aboutUs',
                Component: AboutUs
            },
            {
                path: 'biodataDetails/:biodataId',
                element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>
            },
            {
                path: 'checkout/:biodataId',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: '/forbidden',
                Component: Forbidden
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashBoardHome
            },

            // user route

            {
                path: 'createBioData',
                element: <CreateBioData></CreateBioData>
            },
            {
                path: 'viewBioData',
                Component: ViewBioData
            },
            {
                path: 'favoritesBioData',
                element: <MyFavouritesBiodata></MyFavouritesBiodata>
            },
            {
                path: 'editBioData',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'gotMarried',
                element: <GotMarriedForm></GotMarriedForm>
            },
            {
                path: 'contactRequest',
                element: <MyContactRequest></MyContactRequest>
            },


            // admin route

            {
                path: 'approvedPremium',
                element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'successStory',
                element: <AdminRoute><SuccessStory></SuccessStory></AdminRoute>
            },
            {
                path: 'approvedContactRequest',
                element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>
            }
        ]
    }
]);