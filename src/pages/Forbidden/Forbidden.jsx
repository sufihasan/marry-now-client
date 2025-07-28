import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white max-w-md w-full sm:max-w-lg lg:max-w-xl p-6 sm:p-8 rounded-2xl shadow-xl text-center">
                <div className="flex justify-center mb-5">
                    <FaLock className="text-red-600 text-6xl sm:text-7xl lg:text-8xl" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                    403 Forbidden
                </h1>
                <p className="text-gray-600 text-base sm:text-lg mb-6">
                    You don't have permission to access this page. If you think this is an error, please contact support.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-5 sm:px-6 rounded-lg transition duration-300"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
