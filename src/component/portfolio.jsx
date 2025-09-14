import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useGetAllProjectsQuery } from "../redux/main.js";
import Loading from "../component/Loading.jsx";
import { useNavigate } from "react-router-dom";
import {
  FaCertificate,
  FaLink,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

const statsData = [
  {
    icon: <FaCertificate className="text-red-600 text-xl sm:text-2xl" />,
    value: "100+",
    title: "Reputations Restored",
    description: "With permanent solutions",
  },
  {
    icon: <FaLink className="text-red-600 text-xl sm:text-2xl" />,
    value: "98 +",
    title: "Client Satisfaction",
    description: "From search results",
  },
  {
    icon: <FaUserShield className="text-red-600 text-xl sm:text-2xl" />,
    value: "100%",
    title: "Custom Approach",
    description: "Tailored to each client",
  },
];

// Clients data
const clients = [
  { name: "First National Bank", logo: "🏦" },
  { name: "City Medical Center", logo: "🏥" },
  { name: "Urban Retail Chain", logo: "🛒" },
  { name: "State University", logo: "🎓" },
  { name: "Metro Transportation", logo: "🚆" },
  { name: "Global Logistics", logo: "🚚" },
  { name: "Tech Innovations", logo: "💻" },
  { name: "Green Energy Solutions", logo: "🌱" },
  { name: "Smart Home Systems", logo: "🏠" },
  { name: "Digital Marketing Agency", logo: "📈" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 500,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const Portfolio = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllProjectsQuery();
  const projects = data?.data || [];
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    console.log(error);
    return <div> some error occoured {error}</div>;
  }
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Projects Section */}
      <div className="bg-[#F2F2F2] py-12 sm:py-16 lg:py-20 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2939] mb-2">
              Recent Projects
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto mb-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {projects?.map((project) => (
              <div
                key={project._id}
                className="bg-white border border-gray-200 transition-all duration-300 transform group overflow-hidden hover:border-red-200"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      project.image
                    }`}
                    alt={project.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex items-start flex-col text-start">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    {project.name}
                  </h3>
                  <p className="font-medium mb-2 text-sm sm:text-base">
                    First Client:- {project.clients[0]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project?.services
                      ?.slice(0, 2)
                      ?.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="bg-red-100 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                        >
                          {service}
                        </span>
                      ))}
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/portfolio/project/${project?._id}`);
                    }}
                    className=" font-semibold cursor-pointer transition duration-300 text-sm sm:text-base"
                  >
                    View details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Stats Boxes */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:w-1/2 gap-6 sm:gap-8 w-full">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white border  p-6 sm:p-8 flex flex-col items-start gap-4 hover:bg-gray-50
                transition-colors duration-200 border-l-4 border-red-600 flex-1"
              >
                <div className="bg-red-100 p-3">{stat.icon}</div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-gray-700 text-base sm:text-lg">
                  {stat.title}
                </p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 text-left">
            <p className="text-red-600 font-semibold mb-2 text-sm sm:text-base">
              OUR NETWORK
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Largest Network Of <br />
              <span className="text-red-600">Anti-Defamation</span> Experts.
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              We've tapped experts from around the globe to create an
              unparalleled network of reputation experts with an unwavering
              passion to succeed. Our team includes former legal professionals,
              cybersecurity experts, and digital marketing specialists.
            </p>
            <button className="group relative border-2 border-red-600 text-red-600 px-6 sm:px-8 py-2 sm:py-3 font-semibold overflow-hidden hover:text-white hover:bg-red-600 transition-all duration-300 text-sm sm:text-base">
              <span className="relative z-10 flex items-center">
                LEARN MORE
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
              Trusted By
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Leading organizations across multiple sectors
            </p>
          </div>
          <div>
            <Slider {...settings}>
              {clients.map((client, index) => (
                <div key={index} className="px-2 sm:px-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl sm:text-4xl mb-2">
                      {client.logo}
                    </div>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">
                      {client.name}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
