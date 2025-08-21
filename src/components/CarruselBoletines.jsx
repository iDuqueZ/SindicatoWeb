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
      <Swiper 
        slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      navigation={true} 
      modules={[Navigation, Autoplay]} 
      className="mySwiper">
        <SwiperSlide>
          <a href="/boletines/documentos/bol1.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen1.jpg" alt="Imagen 1" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol2.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen2.jpg" alt="Imagen 2" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol3.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen3.jpg" alt="Imagen 3" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol4.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen4.jpg" alt="Imagen 4" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol5.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen5.jpg" alt="Imagen 5" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol6.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen6.jpg" alt="Imagen 6" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol7.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen7.jpg" alt="Imagen 7" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol8.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen8.jpg" alt="Imagen 8" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="/boletines/documentos/bol9.pdf" target="_blank" rel="noopener noreferrer">
            <img className='object-cover w-full h-full' src="boletines/imagenes/imagen9.jpg" alt="Imagen 9" />
          </a>
        </SwiperSlide>
      </Swiper>
    </>
  );
}