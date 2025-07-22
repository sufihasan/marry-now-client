// src/pages/admin/ApprovedPremium.jsx
import React from 'react';
import { Table, Button, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // n1 Get all pending premium requests
    const { data: pendingBiodatas = [], isLoading } = useQuery({
        queryKey: ['pendingBiodatas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bioDatas/pending-premium');
            return res.data;
        }
    });

    // n2 Mutation to approve premium
    const mutation = useMutation({
        mutationFn: async (biodataId) => {
            const res = await axiosSecure.patch(`/bioDatas/approve-premium/${biodataId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['pendingBiodatas']);
            Swal.fire('Approved!', 'User biodata is now premium.', 'success');
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    });

    const handleApprove = (biodataId) => {
        Swal.fire({
            title: 'Approve Premium?',
            text: 'Do you want to make this user premium?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(biodataId);
            }
        });
    };

    if (isLoading) return <p className="text-center mt-10">Loading pending requests...</p>;
    if (pendingBiodatas.length === 0) return <p className="text-center mt-10 text-gray-500">No pending premium requests.</p>;

    return (
        <div className="overflow-x-auto px-4 py-10">
            <h2 className="text-xl font-bold mb-4 text-center">Pending Premium Biodata Requests</h2>
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Biodata ID</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {pendingBiodatas.map(biodata => (
                        <TableRow key={biodata._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell>{biodata.name}</TableCell>
                            <TableCell>{biodata.email}</TableCell>
                            <TableCell>{biodata.biodataId}</TableCell>
                            <TableCell>
                                <Button size="xs" onClick={() => handleApprove(biodata.biodataId)}>
                                    Make Premium
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApprovedPremium;
