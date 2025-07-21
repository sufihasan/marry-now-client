import React from 'react';
import { Spinner } from 'flowbite-react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Spinner aria-label="Loading..." size="xl" />
                <p className="mt-4 text-gray-600 text-lg">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
