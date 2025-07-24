import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from '../Slider/Slider';
import PremiumMember from '../PremiumMember/PremiumMember';
import HowItWorks from '../HowItWorks/HowItWorks';
import SuccessCounter from '../SuccessCounter/SuccessCounter';
import useAxios from '../../../hooks/useAxios';
import HomeSuccessStories from '../HomeSuccessStories/HomeSuccessStories';


const Home = () => {
    const axiosInstance = useAxios();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/bioDatas/stats');
            return res.data;
        }
    });

    const totalBiodata = Number(stats?.totalBiodata);
    const totalBoys = Number(stats?.totalBoys);
    const totalGirls = Number(stats?.totalGirls);
    const totalMarriages = Number(stats?.totalMarried);

    return (
        <div>
            <Slider></Slider>
            <PremiumMember></PremiumMember>
            <HowItWorks></HowItWorks>

            {isLoading ? <p>Loading...</p> : <SuccessCounter
                totalBiodata={totalBiodata}
                totalBoys={totalBoys}
                totalGirls={totalGirls}
                totalMarriages={totalMarriages}
            ></SuccessCounter>}

            <HomeSuccessStories></HomeSuccessStories>

        </div>
    );
};

export default Home;