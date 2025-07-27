import React, { useState } from 'react';
import { Button, Table, TextInput, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Spinner } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch users with optional search query
    // const { data: users = [], isLoading } = useQuery({
    //     queryKey: ['users', search],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users?search=${search}`);
    //         return res.data;
    //     }
    // });

    // Fetch users with server-side filtering
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['allUsersWithBiodataStatus', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users-with-biodata-status?search=${search}`);
            return res.data;
        },
    });

    console.log(users);

    // Fetch biodatas with pending status
    // const { data: pendingBiodatas = [] } = useQuery({
    //     queryKey: ['pendingBiodatas'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/bioDatas/pending-premium');
    //         return res.data;
    //     }
    // });

    // const pendingEmails = pendingBiodatas?.map(bio => bio.email);

    // Make Admin
    const makeAdminMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/admin/${userId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'User promoted to Admin.', 'success');
            queryClient.invalidateQueries(['allUsersWithBiodataStatus']);
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    });

    // Make Premium
    const makePremiumMutation = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.patch(`/bioDatas/approve-premium/${email}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'User biodata marked as Premium.', 'success');
            queryClient.invalidateQueries(['allUsersWithBiodataStatus']);
            // queryClient.invalidateQueries(['pendingBiodatas']);
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    });


    // Handle Premium Button Click with SweetAlert2
    const handleMakeAdmin = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to make this user Admin?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Make Admin',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                makeAdminMutation.mutate(userId)
            }
        });
    };


    // Handle Premium Button Click with SweetAlert2
    const handleMakePremium = (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to make this user Premium?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Make Premium',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                makePremiumMutation.mutate(email);
            }
        });
    };

    return (
        <div >

            {
                isLoading ? <div className="w-full col-span-full flex justify-center mt-20">
                    <Spinner aria-label="Loading biodata" size="xl" />
                </div> :

                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4 ">Manage Users</h2>

                        <TextInput
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-1/2  mb-4"
                        />

                        {/* md:max-w-sm  */}

                        <div className="overflow-x-auto">
                            <Table>

                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>User Name</TableHeadCell>
                                        <TableHeadCell>User Email</TableHeadCell>
                                        <TableHeadCell>Make Admin</TableHeadCell>
                                        <TableHeadCell>Make Premium</TableHeadCell>
                                    </TableRow>

                                </TableHead>

                                <TableBody className="divide-y">
                                    {users.map(user => (
                                        <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {user.name || 'N/A'}
                                            </TableCell>
                                            <TableCell >{user?.email}</TableCell>
                                            <TableCell>
                                                {user.role === 'admin' ? <span className='font-bold text-green-600'>Admin</span> : (
                                                    <Button
                                                        color="blue"
                                                        size="xs"
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                    >
                                                        Make Admin
                                                    </Button>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {/*  */}
                                                {user.bioDataStatus === 'pending' && (
                                                    <Button
                                                        size="xs"
                                                        color="yellow"
                                                        onClick={() => handleMakePremium(user.email)}
                                                    >
                                                        Make Premium
                                                    </Button>
                                                )}
                                                {user.bioDataStatus === 'not_premium' && (
                                                    <span className="text-gray-500">Not Premium</span>
                                                )}
                                                {user.bioDataStatus === 'premium' && (
                                                    <span className="text-green-600 font-semibold">Premium</span>
                                                )}
                                                {user.bioDataStatus === 'No Biodata' && (
                                                    <span className="text-red-500">No Biodata</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

            }

        </div>

    );
};

export default ManageUsers;
