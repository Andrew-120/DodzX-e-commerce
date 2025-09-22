"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import React, { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import type { Swiper as SwiperClass } from "swiper";

export default function CategorySlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Thumbnails on the left */}
      <div className="col-span-1">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-[37.5rem]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <Image
                src={image}
                alt={`thumb-${index}`}
                width={150}
                height={150}
                className="w-full h-28 object-contain bg-gray-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main image on the right */}
      <div className="col-span-4">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-[37.5rem]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`main-${index}`}
                width={500}
                height={500}
                className="w-full h-[37.5rem] object-contain bg-gray-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
