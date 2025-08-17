import React, { useState } from 'react';
import { Card, Button, Select } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const PremiumMember = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: members = [], isLoading } = useQuery({
        queryKey: ['premium-members', sortOrder],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bioDatas/premium-members?sort=${sortOrder}`);
            return res.data;
        },
    });

    return (
        <div className="p-4 max-w-7xl mx-auto mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold dark:text-gray-200">Premium Members</h2>
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-40"
                >
                    <option value="asc">Age: Ascending</option>
                    <option value="desc">Age: Descending</option>
                </Select>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                        <Card key={member._id} className="w-full">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="h-56 w-full     rounded-t-lg"
                            />
                            <div className="p-4 dark:text-gray-200">
                                <p><strong>Biodata ID:</strong> {member.biodataId}</p>
                                <p><strong>Type:</strong> {member.biodataType}</p>
                                <p><strong>Division:</strong> {member.permanentDivision}</p>
                                <p><strong>Age:</strong> {member.age}</p>
                                <p><strong>Occupation:</strong> {member.occupation}</p>
                                <Link to={`/biodataDetails/${member.biodataId}`}>
                                    <Button className="mt-2 w-full">View Profile</Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PremiumMember;
