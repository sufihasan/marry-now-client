// ApprovedContactRequest.jsx
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApprovedContactRequest = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all pending contact requests
    const { data: contactRequests = [], isLoading } = useQuery({
        queryKey: ['contactRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact-requests');
            return res.data;
        },
    });

    // Mutation to approve a request
    const approveMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/contact-requests/approve/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Contact request approved.', 'success');
            queryClient.invalidateQueries(['contactRequests']);
        },
        onError: () => {
            Swal.fire('Error!', 'Approval failed.', 'error');
        },
    });

    if (isLoading) return <p className="text-center mt-8">Loading...</p>;

    if (contactRequests.length === 0) return <h1 className='text-center 
    font-semibold text-2xl'>No Pending Contact Requests</h1>
    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl font-bold mb-4 text-center dark:text-gray-200">Pending Contact Requests</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Biodata ID</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                    </TableRow>

                </TableHead>
                <TableBody className="divide-y">
                    {contactRequests.map((request) => (
                        <TableRow key={request._id} className='dark:bg-gray-800 dark:border-gray-700'>
                            <TableCell>{request.userName}</TableCell>
                            <TableCell>{request.userEmail}</TableCell>
                            <TableCell>{request.biodataId}</TableCell>
                            <TableCell>
                                <Button
                                    size="xs"

                                    onClick={() => approveMutation.mutate(request._id)}
                                    disabled={request.status === 'approved'}
                                >
                                    {request.status === 'approved' ? 'Approved' : 'Approve'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApprovedContactRequest;
