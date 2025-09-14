import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import about from "../image/aboutus.jpg";
import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <div className="relative h-[40vh] sm:h-[45vh] bg-gray-100">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              {/* Left text */}
              <div className="space-y-5 text-black">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug">
                  Perfect IT & Network Solutions
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-lg">
                  We empower businesses with innovative technology, tailored
                  networking, and reliable IT infrastructure to drive growth.
                </p>
                <Link to="/contact">
                  <button className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-full transition-all duration-300 text-sm sm:text-base">
                    Get Started
                  </button>
                </Link>
              </div>

              {/* Right image */}
              <div className="hidden lg:flex justify-center">
                <img
                  src={about || "/placeholder.svg"}
                  alt="IT Solutions"
                  className="w-[70%] h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-gradient-to-r">
            <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-5">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                Empowering Businesses with Technology
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                From cloud solutions to security, we deliver cutting-edge
                technology that keeps your business ahead of the curve.
              </p>
              <Link to="/services">
                <button className="px-8 py-3 bg-gray-800 hover:bg-black text-white font-medium rounded-full transition-all duration-300">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-gradient-to-r">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5 text-black">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                  Your Trusted IT Partner
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-lg">
                  We build long-term partnerships by offering scalable,
                  cost-effective, and future-ready IT solutions.
                </p>
                <Link to="/about">
                  <button className="px-8 py-3 bg-white text-red-700 border-2 border-red-700 font-semibold rounded-full hover:bg-red-700 hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="hidden lg:flex justify-center">
                <img
                  src={about || "/placeholder.svg"}
                  alt="About Us"
                  className="w-[70%] h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
