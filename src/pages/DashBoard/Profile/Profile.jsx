import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Button, Card, Spinner } from 'flowbite-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, loading } = useAuth();

    const queryClient = useQueryClient();
    const axiosInstance = useAxios();

    // Fetch user data
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/profile/${user.email}`);
            return res.data;
        },
    });

    // Mutation to update profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.put(`/users/profile/${user.email}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user.email] });
            // alert('Profile updated successfully!');
            Swal.fire({
                title: "Good job!",
                text: "Profile updated successfully!",
                icon: "success"
            });
        },
        onError: (err) => {
            // alert('Error updating profile: ' + err.message);
            Swal.fire({
                title: "Good job!",
                text: "Profile not update, error",
                icon: "warning"
            });
        },
    });

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        updateProfileMutation.mutate({ phone, address });
    };

    const isProfileComplete = profile?.phone && profile?.address;

    return (
        <div>
            {
                loading || isLoading ? <div className='flex justify-center items-center mt-20'><Spinner aria-label="Loading..." size="xl" /></div> :
                    <div>
                        <Card className="p-4 md:p-8">
                            <h1 className='text-center text-2xl font-semibold mb-3 dark:text-gray-300'>Profile</h1>

                            {/* Profile Image & Name */}
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={user?.photoURL}
                                    alt={user?.displayName}
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-4 border-2 border-gray-300"
                                />
                                <h2 className="text-xl md:text-2xl font-bold dark:text-gray-200">{user?.displayName}</h2>
                                <p className="text-gray-500 dark:text-gray-300 text-sm">{user?.email}</p>
                                <p className="text-gray-500 dark:text-gray-300 ">Role: {profile?.role}</p>
                                {isProfileComplete && (
                                    <>
                                        <p className="text-gray-500 dark:text-gray-300">Phone: {profile.phone}</p>
                                        <p className="text-gray-500 dark:text-gray-300">Address: {profile.address}</p>
                                    </>
                                )}
                            </div>
                            {/* <Button className='w-40 mx-auto'>Complite Profile</Button> */}

                            {
                                isProfileComplete ? <h1 className='text-green-600 text-center font-bold'>Profile complete done</h1> : ""
                            }

                            {/* Complete Profile Form */}
                            {!isProfileComplete && (
                                <form onSubmit={handleSubmit} className="space-y-4 md:w-10/12 mx-auto">
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="Enter your phone number"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="address" className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            placeholder="Enter your address"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                            required
                                        />
                                    </div>

                                    <div className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Complete Profile
                                        </button>
                                    </div>
                                </form>
                            )}

                        </Card>
                    </div>
            }
        </div>
    );
};

export default Profile;