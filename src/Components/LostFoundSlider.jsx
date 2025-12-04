import React from "react";
import Slider from "react-slick";

import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const slides = [
    {
      bg: "https://i.ibb.co/N6yZHPF5/pexels-eren-li-7241361.jpg",
      title: "Lost & Found Community",
      subtitle: "Secure. Reliable. Community Driven.",
      text: `Use our platform to report lost items or claim found ones. Make it easier for everyone to return what’s lost.`,
    },
    {
      bg: "https://i.ibb.co/N6yZHPF5/pexels-eren-li-7241361.jpg",
      title: "Post Lost or Found Items",
      subtitle: "Instant Upload & Visibility",
      text: `Create posts for lost or found items with images and details. Help your community members identify and claim them faster.`,
    },
    {
      bg: "https://i.ibb.co/N6yZHPF5/pexels-eren-li-7241361.jpg",
      title: "Check Lost Item Reports",
      subtitle: "Search & Match Easily",
      text: `Looking for something you lost? Browse through reports easily with smart filters and quick updates. You might find it now!`,
    },
  ];

  return (
    <div className="w-full mx-auto mt-2">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[50vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            <div className="absolute inset-0 bg-white-900 bg-opacity-40 z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 gap-6 text-white">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <h3 className="text-lg italic mb-3">{slide.subtitle}</h3>
                <p className="text-sm mb-4">{slide.text}</p>
              </div>
              <img
                src={slide.bg}
                alt="event"
                className="w-44 h-44 object-cover rounded-md hidden md:block"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
