import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiChevronDown,
  HiPhone,
  HiMail,
  HiLocationMarker,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { BsArrowRight, BsShield, BsTelephone } from "react-icons/bs";
import logo from "../image/logo.png";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const megaMenuData = {
  about: {
    "Company Overview": [
      { label: "Our Story", href: "/about/story" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Core Values", href: "/about/values" },
      { label: "Leadership Team", href: "/about/team" },
    ],
    "Why Choose Us": [
      { label: "Industry Expertise", href: "/about/expertise" },
      { label: "Innovation Focus", href: "/about/innovation" },
      { label: "Client Success Stories", href: "/about/success" },
      { label: "Awards & Recognition", href: "/about/awards" },
    ],
    "Our Approach": [
      { label: "Methodology", href: "/about/methodology" },
      { label: "Quality Assurance", href: "/about/quality" },
      { label: "Project Management", href: "/about/management" },
      { label: "Support & Maintenance", href: "/about/support" },
    ],
    Careers: [
      { label: "Open Positions", href: "/careers/positions" },
      { label: "Company Culture", href: "/careers/culture" },
      { label: "Benefits & Perks", href: "/careers/benefits" },
      { label: "Apply Now", href: "/careers/apply" },
    ],
  },
  products: {
    "Hardware Solutions": [
      { label: "Servers & Storage", href: "/products/servers" },
      { label: "Networking Equipment", href: "/products/networking" },
      { label: "Security Appliances", href: "/products/security-hardware" },
      { label: "Workstations", href: "/products/workstations" },
    ],
    "Computing Infrastructure": [
      { label: "Cloud Solutions", href: "/products/cloud" },
      { label: "Virtualization", href: "/products/virtualization" },
      { label: "Data Center Solutions", href: "/products/datacenter" },
      { label: "Backup & Recovery", href: "/products/backup" },
    ],
    "Software & Licensing": [
      { label: "Operating Systems", href: "/products/os" },
      { label: "Productivity Suites", href: "/products/productivity" },
      { label: "Security Software", href: "/products/security-software" },
      { label: "Database Solutions", href: "/products/database" },
    ],
    "Specialized Solutions": [
      { label: "IoT Devices", href: "/products/iot" },
      { label: "AI & Machine Learning", href: "/products/ai" },
      { label: "Custom Hardware", href: "/products/custom" },
      { label: "Enterprise Mobility", href: "/products/mobility" },
    ],
  },
  services: {
    "IT Consulting": [
      { label: "Strategic Planning", href: "/services/strategy" },
      { label: "Technology Assessment", href: "/services/assessment" },
      { label: "Digital Transformation", href: "/services/transformation" },
    ],
    Implementation: [
      { label: "System Integration", href: "/services/integration" },
      { label: "Migration Services", href: "/services/migration" },
      { label: "Custom Development", href: "/services/development" },
    ],
    "Support Services": [
      { label: "24/7 Technical Support", href: "/services/support" },
      { label: "Maintenance Contracts", href: "/services/maintenance" },
      { label: "Training Programs", href: "/services/training" },
    ],
  },
  portfolio: {
    "Industry Solutions": [
      { label: "Healthcare IT", href: "/portfolio/healthcare" },
      { label: "Financial Services", href: "/portfolio/finance" },
      { label: "Education Technology", href: "/portfolio/education" },
    ],
    "Project Showcase": [
      { label: "Recent Projects", href: "/portfolio/recent" },
      { label: "Case Studies", href: "/portfolio/cases" },
      { label: "Client Testimonials", href: "/portfolio/testimonials" },
    ],
    Technologies: [
      { label: "Cloud Implementations", href: "/portfolio/cloud" },
      { label: "Security Deployments", href: "/portfolio/security" },
      { label: "Infrastructure Projects", href: "/portfolio/infrastructure" },
    ],
  },
};

const SocialIcon = ({ href, children, className = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white 
      rounded-full flex items-center justify-center transition-all duration-300 
      hover:scale-110 group ${className}`}
  >
    <span className="group-hover:scale-110 transition-transform">
      {children}
    </span>
  </a>
);

const CTAButton = ({ children, className = "" }) => (
  <button
    className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
      hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium 
      transition-all duration-300 hover:shadow-lg hover:scale-105 
      flex items-center space-x-2 ${className}`}
  >
    <span>{children}</span>
    <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </button>
);

const MegaMenuSection = ({
  title,
  items,
  isProductSection = false,
  isMobile = false,
}) => (
  <div className={isMobile ? "mb-6" : ""}>
    <div className="flex items-center space-x-2 mb-4">
      {!isMobile && <BsShield className="w-4 h-4 text-blue-600" />}
      <h3
        className={`font-bold text-gray-800 ${
          isMobile ? "text-base" : "text-sm uppercase tracking-wide"
        }`}
      >
        {title}
      </h3>
      {!isMobile && (
        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
      )}
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx}>
          {isMobile ? (
            <Link
              to={item.href}
              className="block py-2 text-gray-700 hover:text-blue-600 
                transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              to={item.href}
              className="text-gray-600 hover:text-blue-600 hover:translate-x-2 
                transition-all duration-200 flex items-center gap-2 group/item block"
            >
              <BsArrowRight
                className="w-3 h-3 opacity-0 group-hover/item:opacity-100 
                group-hover/item:translate-x-1 transition-all"
              />
              <span>{item.label}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const MegaMenu = ({ type, data, isMobile = false }) => {
  const baseClasses = isMobile
    ? `bg-white p-6 border-t border-gray-200`
    : `bg-white border border-gray-200  rounded-none p-6`;

  const getGridClasses = () => {
    if (isMobile) return "grid grid-cols-1 gap-6";

    if (type === "about" || type === "products")
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
  };

  if (type === "about") {
    return (
      <div className={baseClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={getGridClasses()}>
            {Object.entries(data).map(([title, items]) => (
              <MegaMenuSection key={title} title={title} items={items} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "products") {
    return (
      <div className={baseClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={getGridClasses()}>
            {Object.entries(data).map(([title, items]) => (
              <MegaMenuSection
                key={title}
                title={title}
                items={items}
                isProductSection={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={getGridClasses()}>
          {Object.entries(data).map(([title, items]) => (
            <MegaMenuSection
              key={title}
              title={title}
              items={items}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({
  to,
  label,
  hasDropdown = false,
  megaMenuType = null,
  isMobile = false,
  isOpen = false,
  onToggle = null,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (isMobile) {
    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <div
          className={`flex items-center justify-between px-6 py-4 cursor-pointer 
            hover:bg-blue-50 transition-all duration-300 group ${
              isActive ? "bg-blue-50 border-r-4 border-blue-600" : ""
            }`}
          onClick={onToggle}
        >
          <Link
            to={to}
            className={`flex-1 font-semibold text-lg transition-colors
              ${
                isActive ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
              }`}
            onClick={!hasDropdown ? onToggle : (e) => e.preventDefault()}
          >
            {label}
          </Link>
          {hasDropdown && (
            <IoChevronDown
              className={`font-semibold transition-all duration-300 text-blue-600
                ${isOpen ? "rotate-180 scale-110" : ""}`}
            />
          )}
        </div>
        {hasDropdown && isOpen && megaMenuType && (
          <div className="bg-gradient-to-b from-gray-50 to-white">
            <MegaMenu
              type={megaMenuType}
              data={megaMenuData[megaMenuType]}
              isMobile={true}
            />
          </div>

        )}
      </div>
    );
  }

  return (
    <div className="group">
      <Link
        to={to}
        className={`flex items-center space-x-2 px-4 py-2 font-semibold text-base
          rounded-lg transition-all duration-300 relative overflow-hidden
          ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600 "}
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-blue-600 before:to-blue-700 before:opacity-0 
          before:transition-opacity before:duration-300
          hover:before:opacity-5 active:scale-95`}
      >
        <span className="relative z-10 font-medium tracking-wide">{label}</span>
        {hasDropdown && (
          <IoChevronDown
            className="w-4 h-4 relative z-10 group-hover:rotate-180 
            transition-all duration-300 group-hover:text-blue-600"
          />
        )}
        {isActive && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
            w-6 h-0.5 bg-blue-600 rounded-full"
          ></div>
        )}
      </Link>
      {hasDropdown && megaMenuType && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 
          w-[95%] opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
        >
          <div className="pt-1">
            <MegaMenu type={megaMenuType} data={megaMenuData[megaMenuType]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location]);

  const contactInfo = [
    {
      icon: BsTelephone,
      text: "+977 14782849",
      href: "tel:+97714782849",
    },
    {
      icon: HiMail,
      text: "dnstechnology@gmail.com",
      href: "mailto:dnstechnology@gmail.com",
    },
    {
      icon: HiLocationMarker,
      text: "New Baneshwor, Kathmandu",
      href: "https://maps.google.com/?q=New+Baneshwor+Kathmandu",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://facebook.com/dnstechnology",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/dnstechnology",
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com/company/dnstechnology",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com/dnstechnology",
      label: "Twitter",
    },
  ];

  const navItems = [
    { to: "/", label: "Home" },
    {
      to: "/about",
      label: "About Us",
      hasDropdown: true,
      megaMenuType: "about",
    },
    {
      to: "/products",
      label: "Product",
      hasDropdown: true,
      megaMenuType: "products",
    },
    {
      to: "/services",
      label: "Services",
      hasDropdown: true,
      megaMenuType: "services",
    },
    {
      to: "/portfolio",
      label: "Portfolio",
      hasDropdown: true,
      megaMenuType: "portfolio",
    },
    { to: "/liscence", label: "Liscence" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = (index) => {
    setOpenMobileDropdown(openMobileDropdown === index ? null : index);
  };

  return (
    <>
      <nav
        className={`top-0 left-0 w-full z-50 fixed transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white shadow-none"
        }`}
      >
        {/* Top header removed */}
        <div className="py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <Link to={"/"} className="flex items-center space-x-3">
              <img src={logo} alt="DNS Technology Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-gray-800">
                DNS Technology
              </span>
            </Link>

            {/* Desktop Navigation items */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems?.map((item, idx) => (
                <NavItem key={idx} {...item} />
              ))}
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              className={`lg:hidden p-3 rounded-full hover:bg-blue-50 transition-all duration-300 
                z-50 relative hover:scale-110 ${
                  isMobileMenuOpen ? "bg-blue-50" : ""
                }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 scale-110" : ""
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <HiX className="w-6 h-6 text-blue-600" />
                  ) : (
                    <HiMenu className="w-6 h-6 text-gray-700" />
                  )}
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Animated Overlay */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          />

          {/* Premium Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-md 
              z-50 lg:hidden transform transition-all duration-500 ease-out shadow-2xl ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Enhanced Sidebar header */}
            <div
              className="flex items-center justify-between p-6 border-b border-gray-200 
              bg-gradient-to-r from-blue-50 to-blue-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Navigation</h2>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-3 rounded-full hover:bg-blue-200 transition-all duration-300 
                  hover:scale-110 group"
              >
                <HiX
                  className="w-6 h-6 text-gray-700 group-hover:text-blue-600 
                  group-hover:rotate-90 transition-all"
                />
              </button>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              {/* Enhanced Mobile contact info */}
              <div className="px-6 py-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm">
                  {contactInfo.map(({ icon: Icon, text, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 
                        transition-all duration-300 group"
                    >
                      <div
                        className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center 
                        group-hover:bg-blue-200 transition-colors"
                      >
                        <Icon className="text-blue-600 w-5 h-5" />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-blue-600">
                        {text}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Enhanced Social icons */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">
                    Follow Us
                  </h4>
                  <div className="flex space-x-3">
                    {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                      <SocialIcon
                        key={idx}
                        href={href}
                        className="w-10 h-10 hover:shadow-lg"
                      >
                        <Icon className="w-5 h-5" />
                      </SocialIcon>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation items */}
              <div className="flex-1">
                <div className="px-6 py-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                    Main Menu
                  </h3>
                </div>
                {navItems.map((item, idx) => (
                  <NavItem
                    key={idx}
                    {...item}
                    isMobile={true}
                    isOpen={openMobileDropdown === idx}
                    onToggle={() =>
                      item.hasDropdown
                        ? toggleMobileDropdown(idx)
                        : toggleMobileMenu()
                    }
                  />
                ))}

                {/* Mobile CTA Button */}
                <div className="px-6 py-6 border-t border-gray-200 mt-4">
                  <Link to="/contact" onClick={toggleMobileMenu}>
                    <CTAButton className="w-full justify-center text-base py-4">
                      Get Free Quote
                    </CTAButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

//  <div className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200 py-2 hidden lg:block">
//    <div className="flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8">
//      {/* Contact info */}
//      <div className="flex items-center space-x-6">
//        {contactInfo.map(({ icon: Icon, text, href }, idx) => (
//          <a
//            key={idx}
//            href={href}
//            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
//          >
//            <Icon className="text-blue-600 w-4 h-4" />
//            <span className="text-sm">{text}</span>
//          </a>
//        ))}
//      </div>

//      {/* Social media */}
//      <div className="flex items-center space-x-3">
//        <span className="text-xs text-gray-500 mr-2">Follow Us:</span>
//        {socialLinks.map(({ icon: Icon, href, label }, idx) => (
//          <a
//            key={idx}
//            href={href}
//            className="text-gray-400 hover:text-blue-600 transition-colors"
//          >
//            <Icon className="w-4 h-4" />
//          </a>
//        ))}
//      </div>
//    </div>
//  </div>;
