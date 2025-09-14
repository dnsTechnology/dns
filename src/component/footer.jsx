import logo from "../image/logo.png";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const productLinks = [
    { title: "Firewall Devices" },
    { title: "Network Cables" },
    { title: "CCTV and Surveillance" },
    { title: "Server and Network Rack" },
    { title: "Network Switches" },
    { title: "AP (Access Point Devices)" },
    { title: "Wireless Devices" },
    { title: "Servers and Computers" },
  ];

  const serviceLinks = [
    { title: "Hardware level Services" },
    { title: "Server and Computer Installation" },
    { title: "CCTV Installation" },
    { title: "Networking and Troubleshooting" },
    { title: "Firewall Configuration and Security" },
    { title: "Software and Application Services" },
  ];

  const whatToDoLinks = [
    { title: "Software Expertise" },
    { title: "Hardware Expertise" },
    { title: "Highlighted Success meter" },
  ];

  const portfolioLinks = [
    { title: "Recent Project" },
    { title: "View All Project" },
  ];

  const contactInfo = [
    { icon: <IoCall className="text-[#38DA54]" />, info: "9851155538" },
    {
      icon: <MdEmail className="text-[#08B1F0]" />,
      info: "info@dnstech.com.np",
    },
    {
      icon: <FaLocationDot className="text-[#FA5B5A]" />,
      info: "Baneshwor,Kathmandu",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="text-[#1A77F3] text-lg sm:text-xl" />,
      name: "Facebook",
      url: "https://www.facebook.com/dns.tech1",
    },
    {
      icon: <FaInstagram className="text-[#EF1488] text-lg sm:text-xl" />,
      name: "Instagram",
      url: "https://www.instagram.com/dns_tech1/",
    },
    {
      icon: <FaLinkedin className="text-[#1A77F3] text-lg sm:text-xl" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/d-n-s-technolgoy-pvt-ltd/posts/?feedView=all",
    },
  ];

  return (
    <footer className=" bg-gray-900 text-gray-100 py-4  relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mr-4">
                <img
                  src={
                    logo ||
                    "/placeholder.svg?height=32&width=32&query=DNS Technology logo"
                  }
                  alt="DNS Technology Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <div>
                <div className="font-bold text-xl sm:text-2xl text-white">
                  DNS Technology
                </div>
                <div className="text-sm text-blue-300">Pvt. Ltd</div>
              </div>
            </div>

            <p className="text-sm sm:text-base mb-8 leading-relaxed text-gray-300 max-w-md">
              Your trusted partner for comprehensive IT solutions and network
              infrastructure services. Building tomorrow's technology today.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg sm:text-xl text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3"></span>
                Stay Updated
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-slate-800/50 border border-gray-700 backdrop-blur-sm px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 placeholder-gray-400"
                />
                <button className="bg-gradient-to-r ml-2 from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-lg sm:text-xl text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-green-400 to-green-600 mr-3"></span>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl text-white mb-6 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-purple-600 mr-3"></span>
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 block py-1 pl-3 hover:pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-purple-400 before:transition-all before:duration-200 hover:before:w-1"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Portfolio */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl text-white mb-6 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-orange-400 to-orange-600 mr-3"></span>
              Services
            </h3>
            <ul className="space-y-3 mb-8">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 block py-1 pl-3 hover:pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-orange-400 before:transition-all before:duration-200 hover:before:w-1"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg text-white mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-teal-400 to-teal-600 mr-3"></span>
              Portfolio
            </h3>
            <ul className="space-y-3">
              {portfolioLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 block py-1 pl-3 hover:pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-teal-400 before:transition-all before:duration-200 hover:before:w-1"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl text-white mb-6 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-red-400 to-red-600 mr-3"></span>
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 block py-1 pl-3 hover:pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-red-400 before:transition-all before:duration-200 hover:before:w-1"
                >
                  About DNS
                </a>
              </li>
              {whatToDoLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 block py-1 pl-3 hover:pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-red-400 before:transition-all before:duration-200 hover:before:w-1"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg text-white mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="mt-1 mr-3 flex-shrink-0 text-lg group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-200">
                    {item.info}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 sm:mt-16 pt-8 text-center">
          <div className="w-full  bg-gradient-to-r from-transparent via-slate-600 to-transparent "></div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DNS Technology Pvt. Ltd. All rights
            reserved. | Crafted with ❤️ for better IT solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
