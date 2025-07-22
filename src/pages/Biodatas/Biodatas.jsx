// Biodatas.jsx
import React from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';



const divisions = [
    'Dhaka',
    'Chattogram',
    'Rangpur',
    'Barisal',
    'Khulna',
    'Mymensingh',
    'Sylhet',
];

const Biodatas = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    const [filters, setFilters] = useState({
        minAge: '',
        maxAge: '',
        biodataType: '',
        permanentDivision: '',
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4">

            {/* Filter Section */}
            <div className="lg:w-1/4 w-full space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Age Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="minAge"
                            placeholder="Min"
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded"
                        />
                        <input
                            type="number"
                            name="maxAge"
                            placeholder="Max"
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Biodata Type</label>
                    <select
                        name="biodataType"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
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
                        className="w-full p-2 border rounded"
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

            {/* c1 c2 c3 */}

            {/* Biodata Cards Section */}
            <div className="lg:w-3/4 w-full grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {isLoading ? (
                    <div className="w-full col-span-full flex justify-center">
                        <Spinner aria-label="Loading biodata" size="xl" />
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center col-span-full text-red-500 font-medium">No biodata found based on selected filters.</p>
                ) : (
                    filtered.map((biodata) => (
                        <Card key={biodata._id} className="h-full">
                            <img
                                src={biodata.image}
                                alt={biodata.name}
                                className="h-48 w-full object-cover rounded"
                            />
                            <div className="mt-2 space-y-1">
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
        </div>
    );
};

export default Biodatas;
