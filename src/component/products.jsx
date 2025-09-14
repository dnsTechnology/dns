import { Link } from "react-router-dom";
import {
  Monitor,
  Building2,
  Smartphone,
  Check,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  ThumbsUp,
  Zap,
} from "lucide-react";
import product from "../image/product.png";
import { useGetAllProductsQuery } from "../redux/main.js";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const services = [
  {
    id: "01",
    icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />,
    title: "Digital Experience",
    features: [
      "Fusce venenatis orci quis varius lobortis.",
      "Duis gravida neque vel placerat molestie.",
      "Sed scelerisque massa quis orci ult.",
      "Pellentesque et ante vel tortor dignissim.",
    ],
  },
  {
    id: "02",
    icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />,
    title: "Business Planning",
    features: [
      "Duis gravida neque vel placerat molestie.",
      "Sed scelerisque massa quis orci ult.",
      "Fusce venenatis orci quis varius lobortis.",
      "Pellentesque et ante vel tortor dignissim.",
    ],
  },
  {
    id: "03",
    icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />,
    title: "App Development",
    features: [
      "Etiam dignissim purus in varius porttitor.",
      "Proin vitae tellus mollis tellus maximus.",
      "Integer tempus massa nec pellentesque.",
      "Pellentesque et ante vel tortor dignissim.",
    ],
  },
];

const features = [
  {
    title: "Quality Assurance",
    description:
      "We ensure every aspect of your product is thoroughly tested, covering functionality, performance, usability, and security.",
    icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Competitive Pricing",
    description:
      "We ensures that your product offers great value without compromising on quality, helping you stand out in the market.",
    icon: <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />,
    bgColor: "bg-green-50",
  },
  {
    title: "Trusted And Reliable",
    description:
      "Choosing our company means partnering with a trusted and reliable provider committed to delivering high-quality products and services.",
    icon: <ThumbsUp className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />,
    bgColor: "bg-purple-50",
  },
  {
    title: "Innovation Features",
    description:
      "We incorporate the latest technologies and innovative features, giving you a competitive edge and an enhanced user experience.",
    icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />,
    bgColor: "bg-yellow-50",
  },
];

const brands = [
  {
    name: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png",
  },
  {
    name: "HP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png",
  },
  {
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png",
  },
  {
    name: "TP-Link",
    logo: "https://static-01.daraz.com.np/p/bc29781ba7033c694ac7765ce7048956.jpg",
  },
];

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useGetAllProductsQuery();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }

  const products = data?.data?.products;

  if (!products || products.length === 0) {
    return <h1 className="text-center mt-20 text-2xl">No Products Found</h1>;
  }
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-xl">
                <img
                  src={product || "/placeholder.svg"}
                  alt="IT Solutions on multiple devices"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="text-black space-y-6 sm:space-y-8 order-1 lg:order-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Complete IT & Network Hardware Solutions for Modern Businesses
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore temporibus corporis laboriosam illo voluptas quisquam
                quo eum.
              </p>
              <div className="pt-4">
                <Link to="/contact">
                  <button className="px-4 sm:px-6 bg-red-700 hover:bg-red-800 text-white font-semibold transition-all rounded-md flex items-center py-2 sm:py-3 text-sm sm:text-base">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#F2F2F2"
          />
        </svg>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            Why Choose Our Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            We provide the best networking solutions with unmatched quality and
            service
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-none p-4 sm:p-6 md:p-8 flex flex-col items-center text-center hover:bg-opacity-80 transition duration-300`}
            >
              <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-white rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 sm:mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#101828] mb-2">
              Featured Products
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 mb-3 md:mb-4"></div>
            <p className="text-gray-500 text-sm sm:text-base">
              Browse our most popular networking solutions
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products?.map((product, index) => (
            <div
              key={product?._id}
              className="bg-gray-50 flex flex-col hover:bg-gray-100 transition duration-300 border border-gray-200 overflow-hidden"
            >
              {/* Product Image */}
              <div className="w-full h-40 sm:h-48 lg:h-56 overflow-hidden relative cursor-pointer">
                <img
                  onClick={() => {
                    navigate(`/products/${product?._id}`);
                  }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    product.image
                  }`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                />
                {/* Category Badge */}
                {product.category?.name && (
                  <span className=" absolute top-1 right-1 w-fit bg-transparent border border-gray-400 text-gray-800 uppercase text-xs font-semibold px-2 py-1">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2">
                {/* Product Name */}
                <h3
                  onClick={() => {
                    navigate(`/products/${product?._id}`);
                  }}
                  className="font-semibold hover:text-blue-700 cursor-pointer transition-colors duration-300 text-gray-800 text-base sm:text-lg md:text-xl line-clamp-1"
                >
                  {product.name}
                </h3>

                {/* Brand */}
                {product.brand && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {product.brand}
                  </p>
                )}

                {/* Stock */}
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>

                {/* Price & Arrow */}
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Starting at
                    </p>
                    <p className="text-gray-900 font-medium text-sm sm:text-base md:text-lg">
                      Rs {product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate(`/products/${product?._id}`);
                    }}
                    className="text-red-800 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="bg-gray-100 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-8 pb-6 sm:pb-8 md:pb-16">
            <div className="lg:w-1/2 w-full">
              <h1 className="text-red-800 text-xs md:text-sm font-semibold uppercase">
                # OUR PRODUCTS
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#101828] mt-1 md:mt-2">
                We Deal With High Quality Network and IT Products
              </h2>
            </div>
            <div className="lg:w-1/2 w-full">
              <p className="text-[#101828] text-sm md:text-base leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {services?.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-none p-4 md:p-6 hover:bg-gray-50 transition-colors duration-300 relative group"
              >
                <div className="absolute top-3 md:top-4 right-4 md:right-6 text-3xl sm:text-4xl md:text-6xl font-bold text-gray-100 group-hover:text-gray-50 transition-colors duration-300">
                  {service.id}
                </div>
                <div className="relative z-10">
                  <div className="mb-3 md:mb-4">{service.icon}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {service?.features?.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-2 md:space-x-3"
                      >
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E2939] mb-2">
            Trusted By Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            We partner with the best brands to bring you top-quality products
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-2 md:p-4 rounded-none hover:bg-gray-50 transition duration-300"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-6 sm:h-8 md:h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
