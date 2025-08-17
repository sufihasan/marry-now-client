import React, { use, useEffect } from 'react';
import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner
} from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { DarkContext } from '../../../context/DarkContext/DarkContext';

const divisions = [
    'Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'
];

// const heights = ["5'0", "5'2", "5'4", "5'6", "5'8", "6'0"];
const heights = ["4'10", "4'11", "5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "5'10", "5'11", "6'0"];
// const weights = ['45kg', '50kg', '55kg', '60kg', '65kg', '70kg'];
const weights = ["46kg", "48kg", "50kg", "51kg", "52kg", "53kg", "54kg", "55kg", "56kg", "57kg", "58kg",
    "59kg", "60kg", "61kg", "62kg", "63kg", "64kg", "65kg", "66kg", "67kg", "68kg", "69kg",
    "70kg", "72kg", "74kg", "76kg", "78kg", "80kg"];
const races = ['Fair', 'Medium', 'Dark'];
const occupations = ['Engineer', 'Doctor', 'Teacher', 'Student', 'Business', 'Other'];

const EditBiodata = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { bgDarkw, textDarkW } = use(DarkContext);

    const { register, handleSubmit, reset } = useForm();

    // Get user biodata
    const { data: biodata, isLoading } = useQuery({
        queryKey: ['biodata', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bioDatas/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Update mutation
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/bioDatas/${user.email}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['biodata', user.email]);

            // Swal.fire('Edited!', 'Biodata updated successfully!', 'successfully');
            Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Biodata updated successfully!",
                showConfirmButton: false,
                background: bgDarkw,
                color: textDarkW,
                timer: 1500
            });
        },
        onError: (error) => {
            Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    });

    // Pre-fill form when biodata loads
    useEffect(() => {
        if (biodata) {
            reset(biodata);
        }
    }, [biodata, reset]);

    const onSubmit = (data) => {
        data.age = parseInt(data.age);
        data.expectedPartnerAge = parseInt(data.expectedPartnerAge);
        Swal.fire({
            title: 'Edit Biodata',
            text: 'Do you want to edit?',
            icon: 'question',
            background: bgDarkw,
            color: textDarkW,
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(data);
            }
        });

    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Spinner aria-label="Loading" size="xl" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-800 md:px-5 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">Edit Your Biodata</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Biodata Type *</Label>
                    <Select {...register('biodataType')} required>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Select>
                </div>
                <div>
                    <Label>Name *</Label>
                    <TextInput {...register('name')} required />
                </div>
                <div>
                    <Label>Profile Image URL *</Label>
                    <TextInput {...register('image')} required />
                </div>
                <div>
                    <Label>Date of Birth *</Label>
                    <TextInput type="date" {...register('dob')} required />
                </div>
                <div>
                    <Label>Height *</Label>
                    <Select {...register('height')} required>
                        <option value="">Select</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Weight *</Label>
                    <Select {...register('weight')} required>
                        <option value="">Select</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Age *</Label>
                    <TextInput type="number" {...register('age')} required />
                </div>
                <div>
                    <Label>Occupation *</Label>
                    <Select {...register('occupation')} required>
                        <option value="">Select</option>
                        {occupations.map(o => <option key={o}>{o}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Race *</Label>
                    <Select {...register('race')} required>
                        <option value="">Select</option>
                        {races.map(r => <option key={r}>{r}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Father's Name *</Label>
                    <TextInput {...register('fatherName')} required />
                </div>
                <div>
                    <Label>Mother's Name *</Label>
                    <TextInput {...register('motherName')} required />
                </div>
                <div>
                    <Label>Permanent Division *</Label>
                    <Select {...register('permanentDivision')} required>
                        <option value="">Select</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Present Division *</Label>
                    <Select {...register('presentDivision')} required>
                        <option value="">Select</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Expected Partner Age *</Label>
                    <TextInput type="number" {...register('expectedPartnerAge')} required />
                </div>
                <div>
                    <Label>Expected Partner Height *</Label>
                    <Select {...register('expectedPartnerHeight')} required>
                        <option value="">Select</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Expected Partner Weight *</Label>
                    <Select {...register('expectedPartnerWeight')} required>
                        <option value="">Select</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </Select>
                </div>
                <div>
                    <Label>Email *</Label>
                    <TextInput readOnly {...register('email')} />
                </div>
                <div>
                    <Label>Mobile *</Label>
                    <TextInput {...register('mobile')} required />
                </div>

                <div className="col-span-1 md:col-span-2 text-right">
                    <Button type="submit" isProcessing={mutation.isPending}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditBiodata;
