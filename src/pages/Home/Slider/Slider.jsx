import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 2000)}s`;
    };

    return (
        // md:w-3/4
        <div className='w-full md:w-11/12  mx-auto mb-5 mt-5'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide><img className=' relative h-[200px]' src="https://i.ibb.co/v6ws1PGs/marrage1.jpg" alt="111" />
                    <span className='z-10 absolute p-2 bg-gray-700/25 text-white top-40'>This is new life</span></SwiperSlide>

                <SwiperSlide><img className=' relative h-[200px]' src="https://i.ibb.co/2zwTyxS/marrage2.jpg" alt="111" />
                    <span className='z-10 absolute p-2 bg-gray-700/25 text-white top-40'>This is your time to chose partner</span>
                </SwiperSlide>

                <SwiperSlide><img className=' relative h-[200px]' src="https://i.ibb.co/k2qTBMrH/marrage3.jpg" alt="111" />
                    <span className='z-10 absolute p-2 bg-gray-700/25 text-white top-40'>Our system is help you find partner</span>
                </SwiperSlide>
                {/* <SwiperSlide><img className='border' src="https://i.ibb.co/PGhB8s3c/reading-final.png" alt="111" /></SwiperSlide> */}




                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;