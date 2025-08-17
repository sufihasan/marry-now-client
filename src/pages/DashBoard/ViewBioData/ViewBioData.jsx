
import React from 'react';
import { Card, Button } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
// import useAuth from '../hooks/useAuth';
// import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';

const ViewBioData = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    //  Get biodata by email
    const { data: biodata = {}, isLoading } = useQuery({
        queryKey: ['biodataByEmail', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioDatas/${user.email}`);
            return res.data;
        }
    });

    //  Mutation for premium request
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.patch(`/bioDatas/premium-request/${biodata.biodataId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['biodataByEmail', user?.email]);
            Swal.fire('Request Sent!', 'Your biodata is now pending for approval.', 'success');
        }
    });

    const handlePremiumRequest = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to make your biodata premium?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, make it premium!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate();
            }
        });
    };

    // if (isLoading) return <p className="text-center mt-10">Loading biodata...</p>;
    // if (!biodata) return <p className="text-center mt-10 text-red-500">No biodata found for your account.</p>;

    return (
        <div>
            {
                isLoading || loading ? <p className="text-center mt-10"><Loading></Loading></p> :
                    biodata.name ? <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:text-gray-200">
                        {/* <h1 className='text-center text-2xl font-semibold mb-3'>My Biodata</h1> */}
                        <Card className="p-4 md:p-8">
                            <h1 className='text-center text-2xl font-semibold mb-3'>My Biodata</h1>

                            {/* Profile Image & Name */}
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={biodata.image}
                                    alt={biodata.name}
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-4 border-2 border-gray-300"
                                />
                                <h2 className="text-xl md:text-2xl font-bold">{biodata.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{biodata.email}</p>
                            </div>

                            {/* Biodata Information */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                                <p><span className="font-semibold">Biodata Type:</span> {biodata.biodataType}</p>
                                <p><span className="font-semibold">Age:</span> {biodata.age}</p>
                                <p><span className="font-semibold">Date of Birth:</span> {biodata.dob}</p>
                                <p><span className="font-semibold">Height:</span> {biodata.height}</p>
                                <p><span className="font-semibold">Weight:</span> {biodata.weight}</p>
                                <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
                                <p><span className="font-semibold">Race:</span> {biodata.race}</p>
                                <p><span className="font-semibold">Father's Name:</span> {biodata.fatherName}</p>
                                <p><span className="font-semibold">Mother's Name:</span> {biodata.motherName}</p>
                                <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
                                <p><span className="font-semibold">Present Division:</span> {biodata.presentDivision}</p>
                                <p><span className="font-semibold">Expected Partner Age:</span> {biodata.expectedPartnerAge}</p>
                                <p><span className="font-semibold">Expected Partner Height:</span> {biodata.expectedPartnerHeight}</p>
                                <p><span className="font-semibold">Expected Partner Weight:</span> {biodata.expectedPartnerWeight}</p>
                                <p><span className="font-semibold">Mobile:</span> {biodata.mobile}</p>
                            </div>

                            {/* Premium Status Button */}
                            <div className="mt-8 text-center">
                                {biodata.bioDataStatus === 'not_premium' && (
                                    <Button onClick={handlePremiumRequest}>
                                        Make Biodata Premium
                                    </Button>
                                )}
                                {biodata.bioDataStatus === 'pending' && (
                                    <p className="text-yellow-500 font-medium">
                                        Premium Request Pending...
                                    </p>
                                )}
                                {biodata.bioDataStatus === 'premium' && (
                                    <p className="text-green-600 font-medium">
                                        This Biodata is Premium
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div> : <p className="text-center mt-10 text-red-500">No biodata found for your account.</p>

            }

        </div>

    );
};

export default ViewBioData;
