import React, { useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const divisions = [
    'Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet',
];

const Biodatas = () => {
    const axiosInstance = useAxios();

    const [filters, setFilters] = useState({
        minAge: '',
        maxAge: '',
        biodataType: '',
        permanentDivision: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { data: biodatas = [], isLoading } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosInstance.get('/bioDatas');
            return res.data;
        },
    });

    const filtered = biodatas.filter((b) => {
        const { minAge, maxAge, biodataType, permanentDivision } = filters;
        if (minAge && b.age < parseInt(minAge)) return false;
        if (maxAge && b.age > parseInt(maxAge)) return false;
        if (biodataType && b.biodataType !== biodataType) return false;
        if (permanentDivision && b.permanentDivision !== permanentDivision) return false;
        return true;
    });

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // reset to page 1 when filters change
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4">

            {/* Filter Section */}
            <div className="lg:w-1/4 w-full space-y-4 dark:text-gray-200">
                <div>
                    <label className="block mb-1 font-medium">Age Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="minAge"
                            placeholder="Min"
                            onChange={handleChange}
                            className="w-1/2 p-2 border border-gray-300 dark:border-gray-500 rounded dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-200"
                        />
                        <input
                            type="number"
                            name="maxAge"
                            placeholder="Max"
                            onChange={handleChange}
                            className="w-1/2 p-2 border border-gray-300 dark:border-gray-500 rounded dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-200"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Biodata Type</label>
                    <select
                        name="biodataType"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded dark:bg-gray-600 dark:text-gray-200"
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Division</label>
                    <select
                        name="permanentDivision"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded dark:bg-gray-600 dark:text-gray-200"
                    >
                        <option value="">All</option>
                        {divisions.map((div) => (
                            <option key={div} value={div}>
                                {div}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Biodata Cards Section */}
            <div className="lg:w-3/4 w-full">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {isLoading ? (
                        <div className="w-full col-span-full flex justify-center">
                            <Spinner aria-label="Loading biodata" size="xl" />
                        </div>
                    ) : currentItems.length === 0 ? (
                        <p className="text-center col-span-full text-red-500 font-medium">No biodata found based on selected filters.</p>
                    ) : (
                        currentItems.map((biodata) => (
                            <Card key={biodata._id} className="h-full ">
                                <img
                                    src={biodata.image}
                                    alt={biodata.name}
                                    className="h-48 w-full  rounded"
                                />
                                <div className="mt-2 space-y-1  dark:text-gray-200">
                                    <p className="font-bold">Biodata ID: {biodata.biodataId}</p>
                                    <p className="text-sm">Type: {biodata.biodataType}</p>
                                    <p className="text-sm">Division: {biodata.permanentDivision}</p>
                                    <p className="text-sm">Age: {biodata.age}</p>
                                    <p className="text-sm">Occupation: {biodata.occupation}</p>
                                    <Link to={`/biodataDetails/${biodata.biodataId}`}>
                                        <button className="mt-2 px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination Buttons */}
                {filtered.length > itemsPerPage && (
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="font-semibold text-blue-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Biodatas;
