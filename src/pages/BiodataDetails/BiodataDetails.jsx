import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, Card } from 'flowbite-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';



const BiodataDetails = () => {
    const { biodataId } = useParams();
    console.log(biodataId);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Get current user's biodata (to check if user is premium)
    const { data: myBiodata } = useQuery({
        queryKey: ['myBiodata', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioDatas/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Get biodata by ID
    const { data: biodata, isLoading } = useQuery({
        queryKey: ['biodataDetails', biodataId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioDatas/by-id/${biodataId}`);
            return res.data;
        },
    });

    // Get similar biodatas (max 3) by biodataType
    const { data: similarBiodatas = [] } = useQuery({
        queryKey: ['similarBiodatas', biodata?.biodataType, biodataId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/similar/${biodata?.biodataType}?excludeId=${biodataId}`);
            return res.data;
        },
        enabled: !!biodata?.biodataType && !!biodataId,
    });

    // Mutation to add favourite
    const mutation = useMutation({
        mutationFn: async () => {
            const favData = {
                biodataId: biodata.biodataId,
                userEmail: user.email,
            };
            const res = await axiosSecure.post('/bioDatas/favorites', favData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Added to favourites.', 'success');
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    });

    if (isLoading) return <p className="text-center my-10">Loading biodata...</p>;
    if (!biodata) return <p className="text-center my-10 text-red-500">Biodata not found.</p>;

    const handleAddToFavourites = () => {
        Swal.fire({
            title: 'Make Favorite Biodata',
            text: 'Do you want to Make it Favorite?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, favorite it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate();
            }
        });

    };

    const handleRequestContact = () => {
        navigate(`/checkout/${biodata.biodataId}`);
    };

    const isPremiumUser = myBiodata?.bioDataStatus === 'premium';

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <Card>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold mb-4">{biodata.name}'s Biodata</h2>
                    <img src={biodata.image} alt={biodata.name} className="w-40 h-40 rounded mb-4" />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <p><strong>Biodata ID:</strong> {biodata.biodataId}</p>
                    <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
                    <p><strong>Date of Birth:</strong> {biodata.dob}</p>
                    <p><strong>Age:</strong> {biodata.age}</p>
                    <p><strong>Height:</strong> {biodata.height}</p>
                    <p><strong>Weight:</strong> {biodata.weight}</p>
                    <p><strong>Occupation:</strong> {biodata.occupation}</p>
                    <p><strong>Race:</strong> {biodata.race}</p>
                    <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
                    <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
                    <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
                    <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
                    <p><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
                    <p><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>
                    <p><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>

                </div>

                {/* Contact Info Logic */}
                {isPremiumUser ? (
                    <>
                        <p><strong>Email:</strong> {biodata.email}</p>
                        <p><strong>Mobile:</strong> {biodata.mobile}</p>
                    </>
                ) : (
                    <Button onClick={handleRequestContact} className="my-2">
                        Request Contact Information
                    </Button>
                )}

                <Button onClick={handleAddToFavourites} color="purple" className="mt-4">
                    Add to Favourites
                </Button>
            </Card>

            {/* Similar Biodatas */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4 text-center">Similar Biodatas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBiodatas.map((similar) => (
                        <Card key={similar._id}>
                            <img src={similar.image} alt={similar.name} className="w-full h-32 object-cover rounded" />
                            <h4 className="text-lg font-medium">{similar.name}</h4>
                            <p>Biodata ID: {similar.biodataId}</p>
                            <p>Age: {similar.age}</p>
                            <Link to={`/biodataDetails/${similar.biodataId}`}>
                                <Button >View Profile</Button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
