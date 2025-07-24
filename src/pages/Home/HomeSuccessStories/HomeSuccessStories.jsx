// HomeSuccessStories.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Spinner, Rating, RatingStar } from 'flowbite-react';
import useAxios from '../../../hooks/useAxios';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const HomeSuccessStories = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const res = await axiosInstance.get('/successStories');
            return res.data;
        },
    });

    if (isLoading) return <Spinner color="green" />;

    return (
        <div className='w-11/12 mx-auto'>
            <div className="grid md:grid-cols-3 gap-6  my-10">
                {stories.map((story, i) => (
                    <Card key={i} className="shadow-lg">
                        <img src={story.coupleImage} alt="Couple" className="rounded-lg h-48 w-full " />
                        <div className="text-center mt-3">
                            <p className="text-sm text-gray-500">Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}</p>
                            <div className='flex justify-center mt-3'>
                                <Rating >
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <RatingStar key={index} filled={index < story.reviewStar} />
                                    ))}
                                </Rating>
                            </div>
                            <p className="text-gray-600 mt-2 text-justify">{story.review}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomeSuccessStories;
