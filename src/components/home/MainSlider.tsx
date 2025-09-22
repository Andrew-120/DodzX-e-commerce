"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import slide1 from "@/assets/images/slider-image-1.jpeg"
import slide2 from "@/assets/images/slider-image-2.jpeg"
import slide3 from "@/assets/images/slider-image-3.jpeg"
import Image from 'next/image';

const swiperOptions = {
  modules: [Pagination, Autoplay],
  loop: true,
  pagination: {
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !size-4 border-2',
    bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 border-white',
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
};


const images = [
    {
        path: slide1.src,
        label: "Slide 1"
    },
    {
        path: slide2.src,
        label: "Slide 2"
    },
    {
        path: slide3.src,
        label: "Slide 3"
    }]

export default function MainSlider() {
  return (
    <section>
        <div className="container mx-auto">
             
         <Swiper {...swiperOptions}>
        {images.map((image, index) => (
            <SwiperSlide key={index}>
                <Image src={image.path} alt={image.label} width={1920} height={344} loading='lazy' className='w-full h-[21.5rem] object-cover' />
            </SwiperSlide>
        ))}
    </Swiper>
    
        </div>
    </section>
   
  )
}
