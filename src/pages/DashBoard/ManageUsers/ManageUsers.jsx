import React, { useState } from 'react';
import { Button, Table, TextInput, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch users with optional search query
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    });

    // Fetch biodatas with pending status
    const { data: pendingBiodatas = [] } = useQuery({
        queryKey: ['pendingBiodatas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/biodatas/pending');
            return res.data;
        }
    });

    // const pendingEmails = pendingBiodatas.map(bio => bio.email);

    // Make Admin
    const makeAdminMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/admin/${userId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'User promoted to Admin.', 'success');
            queryClient.invalidateQueries(['users']);
        }
    });

    // Make Premium
    const makePremiumMutation = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.patch(`/biodatas/approve-premium-by-admin/${email}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'User biodata marked as Premium.', 'success');
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['pendingBiodatas']);
        }
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            <TextInput
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm mb-4"
            />

            <div className="overflow-x-auto">
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>User Name</TableHeadCell>
                        <TableHeadCell>User Email</TableHeadCell>
                        <TableHeadCell>Make Admin</TableHeadCell>
                        <TableHeadCell>Make Premium</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {users.map(user => (
                            <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.name || 'N/A'}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role === 'admin' ? <span className='font-bold'>Admin</span> : (
                                        <Button
                                            color="blue"
                                            size="xs"
                                            onClick={() => makeAdminMutation.mutate(user._id)}
                                        >
                                            Make Admin
                                        </Button>
                                    )}
                                </TableCell>
                                {/* <TableCell>
                                    {pendingEmails.includes(user.email) && (
                                        <Button
                                            color="success"
                                            size="xs"
                                            onClick={() => makePremiumMutation.mutate(user.email)}
                                        >
                                            Make Premium
                                        </Button>
                                    )}
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageUsers;
