import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Card } from 'flowbite-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: dashboardData = {}, isLoading } = useQuery({
        queryKey: ['adminDashboardStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/dashboard');
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center">Loading dashboard...</p>;

    const {
        totalBiodata,
        maleBiodata,
        femaleBiodata,
        premiumBiodata,
        totalRevenue,
    } = dashboardData;

    const chartData = [
        { name: 'Total Biodata', value: totalBiodata },
        { name: 'Male Biodata', value: maleBiodata },
        { name: 'Female Biodata', value: femaleBiodata },
        { name: 'Premium Biodata', value: premiumBiodata },
        { name: 'Total Revenue ($)', value: totalRevenue },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'];

    return (
        <div className="px-1 py-2 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-200">Admin Dashboard</h2>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                <Card className='rounded-full text-center dark:text-gray-200'>
                    <img className='w-20 h-12 mx-auto' src="https://i.ibb.co.com/qLcbJpS2/successstaffs.png" alt="" />
                    <p className="text-xl  font-semibold">Total Biodata</p>
                    <p className='font-bold text-xl'>{totalBiodata}</p>
                </Card>

                <Card className='rounded-full text-center dark:text-gray-200'>
                    <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/Z0QS7zx/man.png" alt="" />
                    <p className="text-xl font-semibold">Male Biodata</p>
                    <p className='font-bold text-xl'>{maleBiodata}</p>
                </Card>

                <Card className='rounded-full text-center dark:text-gray-200'>
                    <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/YT2Q1kxB/wonam.png" alt="" />
                    <p className="text-xl font-semibold">Female Biodata</p>
                    <p className='font-bold text-xl'>{femaleBiodata}</p>
                </Card>

                <Card className='rounded-full text-center dark:text-gray-200'>
                    <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/9k93pf42/premium.jpg" alt="" />
                    <p className="text-xl font-semibold">Premium Biodata</p>
                    <p className='font-bold text-xl'>{premiumBiodata}</p>
                </Card>

                <Card className='rounded-full text-center dark:text-gray-200'>
                    <img className='w-20 h-20 mx-auto' src="https://i.ibb.co/Cpdq7PQ6/dolar.png" alt="" />
                    <p className="text-xl font-semibold">Total Revenue</p>
                    <p className='font-bold text-xl'>${totalRevenue}</p>
                </Card>

            </div>

            <div className="mt-10">
                <h3 className="text-xl  font-semibold text-center mb-4 dark:text-gray-200">Biodata & Revenue Overview</h3>
                <div className=''>
                    <ResponsiveContainer width="100%" height={420}>
                        <PieChart>
                            <Pie

                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={160}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
