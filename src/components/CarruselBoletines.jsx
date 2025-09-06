// Import Swiper React components
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
     <h2 className='text-3xl! font-semibold text-gray-800! mb-4!'>Ultimos Boletines</h2>
      <Swiper 
        slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      navigation={true} 
      modules={[Navigation, Autoplay]} 
      className="mySwiper">
        <SwiperSlide>
          <a href="/boletines/documentos/bol1.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="/boletines/imagenes/imagen1.jpg" alt="Imagen 1" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol2.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen2.jpg" alt="Imagen 2" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol3.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="/boletines/imagenes/imagen3.jpg" alt="Imagen 3" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol4.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="/boletines/imagenes/imagen4.jpg" alt="Imagen 4" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol5.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="/boletines/imagenes/imagen5.jpg" alt="Imagen 5" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol6.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="/boletines/imagenes/imagen6.jpg" alt="Imagen 6" />
          </a>
        </SwiperSlide>
      </Swiper>
    </>
  );
}