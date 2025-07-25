import { Table, Button, TableHead, TableHeadCell, TableRow, TableCell, TableBody } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyContactRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['contactRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact-requests/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = async (biodataId) => {
        // const confirmed = confirm('Are you sure you want to delete this request?');
        // if (confirmed) {
        //     await axiosSecure.delete(`/contact-requests/${biodataId}?email=${user?.email}`);
        //     refetch();
        // }

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
        <div className="overflow-x-auto">
            <Table striped>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Biodata ID</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Mobile</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
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
        </div>
    );
};

export default MyContactRequest;
