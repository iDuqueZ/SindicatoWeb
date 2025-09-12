// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
    <h2 className='text-3xl! font-semibold text-gray-800! mb-4!'>Ultimos Eventos</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <a href="https://www.instagram.com/p/DOGtL5BAOJI/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
                <img className='w-full h-full hover:scale-110 transition-all duration-300' src="Images/Recuerden.jpg" alt="Recuerden" />
            </a>
        </SwiperSlide>
        <SwiperSlide>
            <a href="https://www.instagram.com/p/DOGtL5BAOJI/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
                <img className='object-contain! w-full h-full hover:scale-110 transition-all duration-300' src="Images/Recuerden.jpg" alt="Recuerden" />
            </a>
        </SwiperSlide>
      </Swiper>
    </>
  );
}