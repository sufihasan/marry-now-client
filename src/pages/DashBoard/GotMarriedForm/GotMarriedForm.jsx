// GotMarriedForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Label, TextInput, Textarea, Button, Rating } from 'flowbite-react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const GotMarriedForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/successStories', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['successStories']);
            Swal.fire('Success!', 'Your success story has been submitted.', 'success');
            reset();
        }
    });

    const onSubmit = (data) => {
        data.reviewStar = parseFloat(data.reviewStar);
        data.marriageDate = new Date(data.marriageDate).toISOString();
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mt-5 mx-auto space-y-4 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-center">Share Your Marriage Story</h2>

            <div>
                <Label>Self Biodata ID</Label>
                <TextInput type="number" {...register('selfBiodataId', { required: true })} />
            </div>

            <div>
                <Label>Partner Biodata ID</Label>
                <TextInput type="number" {...register('partnerBiodataId', { required: true })} />
            </div>

            <div>
                <Label>Couple Image URL</Label>
                <TextInput type="text" {...register('coupleImage', { required: true })} />
            </div>

            <div>
                <Label>Marriage Date</Label>
                <TextInput type="date" {...register('marriageDate', { required: true })} />
            </div>

            <div>
                <Label>Review Star (1 to 5)</Label>
                <TextInput type="number" min="1" max="5"  {...register('reviewStar', { required: true })} />
            </div>

            <div>
                <Label>Success Story Review</Label>
                <Textarea {...register('review', { required: true })} rows={4} />
            </div>

            <Button type="submit" className="w-full">Submit Story</Button>
        </form>
    );
};

export default GotMarriedForm;
