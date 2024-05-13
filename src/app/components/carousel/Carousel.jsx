"use client"
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';  // Assuming you have custom styles in Carousel.css
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Carousel = () => {
    const router = useRouter()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const onItemClick = () => {
        router.push("/xpoarena")
    }

    return (
        <div className="carousel-container">
            <p className='font-poppins text-[30px] leading-none font-bold pb-6'>Popular Releases from XpoArena</p>
            <Slider {...settings}>
                <div onClick={onItemClick} className="carousel-item transition duration-500 hover:scale-105 cursor-pointer">
                    <img src="https://images.crazygames.com/penalty-rivals_16x9/20231123095210/penalty-rivals_16x9-cover?auto=format%2Ccompress&q=65&cs=strip&ch=DPR&fit=crop" alt="Item 1" />
                    
                </div>
                <div onClick={onItemClick} className="carousel-item transition duration-500 hover:scale-105 cursor-pointer">
                    <img src="https://images.crazygames.com/gridpunk---3v3-battle-royale_16x9/20231103100157/gridpunk---3v3-battle-royale_16x9-cover?auto=format%2Ccompress&q=90&cs=strip&ch=DPR&w=178&h=100&fit=crop" alt="Item 2" />
                 
                </div>
                <div onClick={onItemClick}className="carousel-item transition duration-500 hover:scale-105 cursor-pointer">
                    <img src="https://images.crazygames.com/shellshockersio_16x9/20231109061618/shellshockersio_16x9-cover?auto=format%2Ccompress&q=65&cs=strip&ch=DPR&fit=crop" alt="Item 3" />
                   
                </div>
                <div onClick={onItemClick} className="carousel-item transition duration-500 hover:scale-105 cursor-pointer">
                    <img src="https://images.crazygames.com/games/crazy-combat/cover_16x9-1693299622823.png?auto=format%2Ccompress&q=75&cs=strip&ch=DPR&w=461" alt="Item 4" />
                   
                </div>
                <div onClick={onItemClick} className="carousel-item transition duration-500 hover:scale-105 cursor-pointer">
                    <img src="https://images.crazygames.com/evowarsio_16x9/20231116180052/evowarsio_16x9-cover?auto=format%2Ccompress&q=65&cs=strip&ch=DPR&fit=crop" alt="Item 5" />
                   
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
