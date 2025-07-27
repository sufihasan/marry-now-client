import { Table, Button, TableHead, TableHeadCell, TableRow, TableCell, TableBody } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyContactRequest = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['contactRequests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact-requests/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = async (biodataId) => {


        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this contact request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/contact-requests/delete/${biodataId}?email=${user?.email}`);
                    refetch();

                    Swal.fire(
                        'Deleted!',
                        'Your contact request has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    );
                }
            }
        });
    };




    return (

        <div>
            {
                isLoading || loading ? <p>Loading...</p> : requests.length > 0 ?
                    <div className="overflow-x-auto">
                        <h1 className="md:text-center text-2xl font-semibold my-3">My Contact Request</h1>

                        <Table striped>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>Biodata ID</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>Mobile</TableHeadCell>
                                    <TableHeadCell>Email</TableHeadCell>
                                    <TableHeadCell>Action</TableHeadCell>
                                </TableRow>

                            </TableHead>
                            <TableBody className="divide-y">
                                {requests.map((req) => (
                                    <TableRow key={req.biodataId}>
                                        <TableCell>{req.name}</TableCell>
                                        <TableCell>{req.biodataId}</TableCell>
                                        <TableCell>{req.status}</TableCell>
                                        <TableCell>{req.mobile}</TableCell>
                                        <TableCell>{req.email}</TableCell>
                                        <TableCell>
                                            <Button color="red" onClick={() => handleDelete(req.biodataId)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div> : <p className="text-center text-red-500">You have no request contact</p>
            }

            {/* || requests.length === 0 */}

        </div>



    );
};

export default MyContactRequest;
