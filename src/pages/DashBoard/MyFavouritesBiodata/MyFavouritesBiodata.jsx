import React from 'react';
import { Table, Button, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const MyFavouritesBiodata = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Load favorite biodatas
    const { data: favouriteBiodatas = [], isLoading } = useQuery({
        queryKey: ['favouriteBiodatas', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioDatas/favorites?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Delete from favorites mutation
    const mutation = useMutation({
        mutationFn: async (biodataId) => {
            const res = await axiosSecure.patch(`/users/remove-favorite`, {
                biodataId,
                email: user?.email,
            });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Removed from favourites.', 'success');
            queryClient.invalidateQueries(['favouriteBiodatas', user?.email]);
        },
    });

    const handleDelete = (biodataId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this biodata from favourites?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(Number(biodataId));
            }
        });
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">My Favourite Biodatas</h2>
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Biodata ID</TableHeadCell>
                    <TableHeadCell>Permanent Address</TableHeadCell>
                    <TableHeadCell>Occupation</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {favouriteBiodatas.map((biodata) => (
                        <TableRow key={biodata._id}>
                            <TableCell>{biodata.name}</TableCell>
                            <TableCell>{biodata.biodataId}</TableCell>
                            <TableCell>{biodata.permanentDivision}</TableCell>
                            <TableCell>{biodata.occupation}</TableCell>
                            <TableCell>
                                <Button color="red" size="xs" onClick={() => handleDelete(biodata.biodataId)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MyFavouritesBiodata;
