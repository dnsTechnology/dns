import { Link } from "react-router-dom";
import {
  BiSolidCctv,
  BiNetworkChart,
  BiServer,
  BiShieldAlt,
  BiCloud,
} from "react-icons/bi";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import AboutHero from "./AboutHero";
import { useGetAllTeamsQuery } from "../redux/main.js";
import Loading from "./Loading.jsx";
import { Linkedin, LucideLinkedin, MailOpen, UserSquare2 } from "lucide-react";
import { MdEmail } from "react-icons/md";

const services = [
  {
    title: "CCTV Installations",
    description:
      "Protect your property with our expert CCTV installation services. We provide tailored surveillance solutions for homes, offices, and commercial premises.",
    icon: <BiSolidCctv className="text-red-600 text-2xl sm:text-3xl" />,
    bgColor: "bg-red-100",
  },
  {
    title: "Network Solutions",
    description:
      "From design to implementation, we provide robust network infrastructure that ensures seamless connectivity and optimal performance.",
    icon: <BiNetworkChart className="text-red-700 text-2xl sm:text-3xl" />,
    bgColor: "bg-red-200",
  },
  {
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets from evolving threats in today's complex cyber landscape.",
    icon: <BiShieldAlt className="text-red-600 text-2xl sm:text-3xl" />,
    bgColor: "bg-red-100",
  },
  {
    title: "Cloud Services",
    description:
      "Scalable cloud solutions that enhance flexibility, reduce costs, and improve collaboration across your organization.",
    icon: <BiCloud className="text-red-700 text-2xl sm:text-3xl" />,
    bgColor: "bg-red-200",
  },
];

const getSocialIcon = (platform) => {
  switch (platform) {
    case "linkedin":
      return <LucideLinkedin />;
    case "github":
      return <FaGithub />;
    case "portfolio":
      return <UserSquare2 />;
    case "email":
      return <MailOpen />;
    default:
      return null;
  }
};

export default function ITSolutionsSection() {
  const { data, isLoading, error, isError } = useGetAllTeamsQuery();
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const teamMembers = (data?.data || []).filter(
    (member) => !member.role?.toLowerCase().includes("ceo")
  );
  const ceo = data?.data?.find((member) => member.role === "CEO");

  return (
    <div className="min-h-screen overflow-x-hidden mt-24">
      {/* Hero Section */}
      <AboutHero />
      {/* Services Section */}
      <div className="bg-[#F2F2F2]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2939] mb-8">
            Our Core Services and Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 text-left">
                <div
                  className={`${service.bgColor} inline-block p-3 rounded-full`}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {service.description}
                </p>
                <button className="mt-4 text-red-800 font-medium text-sm">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CEO Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left order-1 lg:order-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2939] mb-2">
              Message from Our CEO
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-700 mb-6 mx-auto lg:mx-0"></div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
              {ceo?.name || "Dipesh Silwal"}
            </h3>
            <p className="text-red-600 font-medium mb-6 text-sm sm:text-base">
              Founder and Chief Executive Officer
            </p>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {ceo?.intro}
            </p>

            <div className="flex justify-center lg:justify-start space-x-3">
              <a
                href={`${ceo?.linkedin || "#"}`}
                className="text-[#1E2939] hover:text-red-600 transition-colors text-xl sm:text-2xl"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${ceo?.email || "#"}`}
                className="text-[#1E2939] hover:text-red-600 transition-colors text-xl sm:text-2xl"
              >
                <MailOpen />
              </a>
            </div>
          </div>

          {/* Image section */}
          <div className="lg:w-1/2 w-full max-w-lg order-0 lg:order-1  ">
            <div className="relative group">
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    ceo?.image
                  }`}
                  alt="Dipesh Silwal"
                  className="relative rounded-lg w-full h-auto shadow-xl z-10  group-hover:scale-105 transform duration-300 ease-in-out"
                />
                {/* Top-right L-shape */}
                <div className="absolute -top-4 -right-4 w-32 h-38 border-t-3 border-r-3 border-red-600 rounded-tr-lg z-20 "></div>
                {/* Bottom-left L-shape */}
                <div className="absolute -bottom-4 -left-4 w-32 h-38 border-b-3 border-l-3 border-red-600 rounded-bl-lg z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;{/* Team Section */}
      <div className="bg-[#F2F2F2] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2939] mb-8">
            Meet Our Amazing Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers?.map((member) => (
              <div
                key={member._id}
                className="bg-white border border-gray-200 overflow-hidden"
              >
                {/* Image */}
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    member.image
                  }`}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-semibold">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-2">{member.intro}</p>

                  {/* Social Icons */}
                  <div className="flex gap-5 mt-5 text-2xl text-gray-700">
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {getSocialIcon("linkedin")}
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                      >
                        {getSocialIcon("linkedin")}
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-500 transition-colors"
                      >
                        {getSocialIcon("email")}
                      </a>
                    )}
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 transition-colors"
                      >
                        {getSocialIcon("portfolio")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
