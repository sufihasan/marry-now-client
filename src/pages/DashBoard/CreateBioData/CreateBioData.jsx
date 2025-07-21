import React, { useEffect } from 'react';
import {
    Button,
    Label,
    TextInput,
    Select
} from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';


const divisions = [
    "Dhaka", "Chattagra", "Rangpur", "Barisal",
    "Khulna", "Mymensingh", "Sylhet"
];

const heights = ["5'0", "5'2", "5'4", "5'6", "5'8", "6'0"];
const weights = ["50kg", "55kg", "60kg", "65kg", "70kg"];
const occupations = ["Student", "Engineer", "Doctor", "Business", "Teacher"];
const skinColors = ["Fair", "Medium", "Dark"];

const CreateBioData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue  // new add
    } = useForm();


    //n
    useEffect(() => {
        if (user?.email) {
            setValue('email', user.email);
        }
    }, [user, setValue]);
    //n

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.post('/bioDatas', formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['biodatas']);
            reset();
            // alert("Biodata published successfully!");
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: (error) => {
            console.error(error);
            alert("Failed to publish biodata");
        }
    });

    const onSubmit = (data) => {
        const bioData = {
            ...data,
            age: Number(data.age),
            expectedPartnerAge: Number(data.expectedPartnerAge),
            bioDataStatus: 'not_premium',
            createAt: new Date().toISOString()
        }
        mutation.mutate(bioData);
        console.log('onsubmit', bioData);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md my-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Bio Data</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Biodata Type */}
                <div>
                    <Label >Biodata Type*</Label>
                    <Select {...register('biodataType', { required: true })}>
                        <option value="">Select Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Select>
                    {errors.biodataType && <p className="text-red-500 text-sm">Biodata type is required</p>}
                </div>

                {/* Name */}
                <div>

                    <Label >Full Name *</Label>
                    <TextInput {...register('name', { required: true })} />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>

                {/* Image Link */}
                <div>

                    <Label >Profile Image Link *</Label>
                    <TextInput {...register('image', { required: true })} />
                    {errors.image && <p className="text-red-500 text-sm">Image link is required</p>}
                </div>

                {/* Date of Birth */}
                <div>

                    <Label >Date of Birth *</Label>
                    <TextInput type="date" {...register('dob', { required: true })} />
                    {errors.dob && <p className="text-red-500 text-sm">DOB is required</p>}
                </div>

                {/* Height */}
                <div>

                    <Label >Height *</Label>
                    <Select {...register('height', { required: true })}>
                        <option value="">Select Height</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </Select>
                    {errors.height && <p className="text-red-500 text-sm">Height is required</p>}
                </div>

                {/* Weight */}
                <div>

                    <Label >Weight *</Label>
                    <Select {...register('weight', { required: true })}>
                        <option value="">Select Weight</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </Select>
                    {errors.weight && <p className="text-red-500 text-sm">Weight is required</p>}
                </div>

                {/* Age */}
                <div>

                    <Label >Age *</Label>
                    <TextInput type="number" min={18} {...register('age', {
                        required: true, min: {
                            value: 18,
                            message: 'Minimum age is 18',
                        }
                    })} />
                    {/* {errors.age && <p className="text-red-500 text-sm">Age is required</p>} */}
                    {errors.age && (
                        <p className="text-red-500 text-sm">
                            {errors.age.message || 'Required'}
                        </p>
                    )}
                </div>

                {/* Occupation */}
                <div>

                    <Label >Occupation *</Label>
                    <Select {...register('occupation', { required: true })}>
                        <option value="">Select Occupation</option>
                        {occupations.map(o => <option key={o}>{o}</option>)}
                    </Select>
                    {errors.occupation && <p className="text-red-500 text-sm">Occupation is required</p>}
                </div>

                {/* Race */}
                <div>

                    <Label >Skin Color *</Label>
                    <Select {...register('race', { required: true })}>
                        <option value="">Select Color</option>
                        {skinColors.map(c => <option key={c}>{c}</option>)}
                    </Select>
                    {errors.race && <p className="text-red-500 text-sm">Race is required</p>}
                </div>

                {/* Father's Name */}
                <div>

                    <Label >Father's Name *</Label>
                    <TextInput {...register('fatherName', { required: true })} />
                    {errors.fatherName && <p className="text-red-500 text-sm">Father's name is required</p>}
                </div>

                {/* Mother's Name */}
                <div>

                    <Label >Mother's Name *</Label>
                    <TextInput {...register('motherName', { required: true })} />
                    {errors.motherName && <p className="text-red-500 text-sm">Mother's name is required</p>}
                </div>

                {/* Permanent Division */}
                <div>

                    <Label >Permanent Division *</Label>
                    <Select {...register('permanentDivision', { required: true })}>
                        <option value="">Select Division</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </Select>
                    {errors.permanentDivision && <p className="text-red-500 text-sm">Required</p>}
                </div>

                {/* Present Division */}
                <div>

                    <Label >Present Division *</Label>
                    <Select {...register('presentDivision', { required: true })}>
                        <option value="">Select Division</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </Select>
                    {errors.presentDivision && <p className="text-red-500 text-sm">Required</p>}
                </div>

                {/* Expected Partner Age */}
                <div>

                    <Label >Expected Partner Age *</Label>
                    <TextInput type="number" min={18} {...register('expectedPartnerAge', {
                        required: true, min: {
                            value: 18,
                            message: 'Minimum age is 18',
                        }
                    })} />
                    {errors.expectedPartnerAge && (
                        <p className="text-red-500 text-sm">
                            {errors.expectedPartnerAge.message || 'Required'}
                        </p>
                    )}
                </div>

                {/* Expected Partner Height */}
                <div>

                    <Label >Expected Partner Height *</Label>
                    <Select {...register('expectedPartnerHeight', { required: true })}>
                        <option value="">Select Height</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </Select>
                    {errors.expectedPartnerHeight && <p className="text-red-500 text-sm">Required</p>}
                </div>

                {/* Expected Partner Weight */}
                <div>

                    <Label >Expected Partner Weight *</Label>
                    <Select {...register('expectedPartnerWeight', { required: true })}>
                        <option value="">Select Weight</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </Select>
                    {errors.expectedPartnerWeight && <p className="text-red-500 text-sm">Required</p>}
                </div>

                {/* Email (readonly) */}
                <div>

                    <Label >Contact Email *</Label>
                    <TextInput readOnly  {...register('email')} />
                </div>

                {/* Mobile */}
                <div>

                    <Label >Mobile Number *</Label>
                    <TextInput {...register('mobile', { required: true })} />
                    {errors.mobile && <p className="text-red-500 text-sm">Mobile is required</p>}
                </div>
            </form>

            <div className="mt-8 text-center">
                <Button onClick={handleSubmit(onSubmit)} isProcessing={mutation.isLoading} type="submit" >
                    Save & Publish Now
                </Button>
            </div>
        </div>
    );
};

export default CreateBioData;
