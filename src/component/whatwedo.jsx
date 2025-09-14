import React from "react";
import {
  FaCertificate,
  FaLink,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";
import {
  FaCode,
  FaServer,
  FaMicrochip,
  FaNetworkWired,
  FaStar,
} from "react-icons/fa";

import Nav from "./nav";
import Footer from "./footer";

const statsData = [
  {
    icon: <FaCertificate className="text-red-600 text-2xl" />,
    value: "100+",
    title: "Reputations Restored",
    description: "With permanent solutions",
  },
  {
    icon: <FaLink className="text-red-600 text-2xl" />,
    value: "98 +",
    title: "Client Satisfaction",
    description: "From search results",
  },
  {
    icon: <FaUserShield className="text-red-600 text-2xl" />,
    value: "100%",
    title: "Custom Approach",
    description: "Tailored to each client",
  },
];

const softwareServices = [
  {
    icon: <FaCode className="text-red-600 text-xl" />,
    title: "Custom Software Development",
    description:
      "Bespoke applications designed to streamline your operations, improve efficiency, and drive growth.",
    features: [
      "Web & Mobile Applications",
      "Enterprise Solutions",
      "Cloud-based Systems",
    ],
  },
  {
    icon: <FaServer className="text-red-600 text-xl" />,
    title: "System Integration",
    description:
      "Seamlessly connect your existing systems with new technologies for unified operations.",
    features: [
      "API Development",
      "Data Migration",
      "Legacy System Modernization",
    ],
  },
  {
    icon: <FaUserShield className="text-red-600 text-xl" />,
    title: "Cybersecurity Solutions",
    description:
      "Protect your digital assets with our comprehensive security frameworks and protocols.",
    features: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Compliance",
    ],
  },
];

const hardwareServices = [
  {
    icon: <FaMicrochip className="text-red-600 text-xl" />,
    title: "Enterprise Hardware",
    description:
      "High-performance hardware solutions tailored for enterprise needs.",
    features: ["Servers & Storage", "Workstations", "Data Center Solutions"],
  },
  {
    icon: <FaNetworkWired className="text-red-600 text-xl" />,
    title: "Networking Solutions",
    description:
      "Reliable and secure networking infrastructure for seamless connectivity.",
    features: [
      "LAN/WAN Implementation",
      "Wireless Solutions",
      "Network Security",
    ],
  },
  {
    icon: <FaCertificate className="text-red-600 text-xl" />,
    title: "Maintenance & Support",
    description:
      "Comprehensive hardware maintenance and technical support services.",
    features: [
      "Preventive Maintenance",
      "24/7 Technical Support",
      "Hardware Upgrades",
    ],
  },
];

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    initials: "JD",
    content:
      "The team completely transformed our online presence. Negative content that had plagued us for years was removed within weeks. Their expertise is unmatched.",
  },
  {
    name: "Alice Smith",
    role: "Marketing Director, Global Inc",
    initials: "AS",
    content:
      "Their rapid response to our crisis situation saved our brand reputation. The strategic approach and attention to detail were impressive.",
  },
  {
    name: "Robert Johnson",
    role: "Founder, Startup Ventures",
    initials: "RJ",
    content:
      "The comprehensive reporting and transparency throughout the process gave us complete confidence in their work. Exceptional service!",
  },
];

const WhatWeDo = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 mt-24">
      <Nav />
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div>
          <p className="text-red-600 font-semibold mb-2">OUR SERVICES</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What We <span className="text-red-600">Do</span>
          </h1>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-red-600 mb-6"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your business needs with
            precision and expertise
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Fight Back With <span className="text-red-600">Unmatched</span>{" "}
              Power.
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              We provide innovative solutions to empower businesses, streamline
              operations, and enhance customer experiences through cutting-edge
              technology.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 text-xl mr-3 mt-1">✓</span>
                <span className="text-lg">
                  Internet Defamation Removal with 24/7 monitoring
                </span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 text-xl mr-3 mt-1">✓</span>
                <span className="text-lg">
                  Online Reputation & Brand Protection strategies
                </span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 text-xl mr-3 mt-1">✓</span>
                <span className="text-lg">
                  Identify Anonymous Defamers & Cyber Attackers with forensic
                  precision
                </span>
              </li>
            </ul>
            <button className="group relative bg-red-600 text-white px-8 py-4 rounded-lg font-semibold overflow-hidden hover:bg-red-700 transition duration-300">
              <span className="relative z-10 flex items-center">
                FREE CONSULTATION
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 relative">
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/29/06/18/home-office-1867761_1280.jpg"
                alt="Professional working on laptop"
                className="w-full h-auto rounded-xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg w-3/4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Success Rate
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                  <span className="text-red-600 font-bold">98%</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Of cases resolved successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Stats Boxes */}
          <div className="flex flex-col md:flex-row md:w-1/2 gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-start gap-4 hover:shadow-xl 
                transition-shadow duration-300 border-l-4 border-red-600 hover:-translate-y-1"
              >
                <div className="bg-red-100 p-3 rounded-full">{stat.icon}</div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-700 text-lg">{stat.title}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 text-left">
            <p className="text-red-600 font-semibold mb-2">OUR NETWORK</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Largest Network Of <br />
              <span className="text-red-600">Anti-Defamation</span> Experts.
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              We've tapped experts from around the globe to create an
              unparalleled network of reputation experts with an unwavering
              passion to succeed. Our team includes former legal professionals,
              cybersecurity experts, and digital marketing specialists.
            </p>
            <button className="group relative border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold overflow-hidden hover:text-white transition duration-300">
              <span className="relative z-10 flex items-center">
                LEARN MORE
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-5" />
              </span>
              <span className="absolute inset-0 bg-red-600 w-0 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Software Expertise Section */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <p className="text-red-600 font-semibold mb-2">OUR EXPERTISE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Software <span className="text-red-600">Solutions</span>
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-red-600 mb-6"></div>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Cutting-edge software solutions tailored to your business
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {softwareServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl duration-300 border-t-4
                 border-red-600 hover:-translate-y-2 transition-transform"
              >
                <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="text-red-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware Expertise Section */}
      <div className="container mx-auto px-4 my-16">
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold mb-2">INFRASTRUCTURE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hardware <span className="text-red-600">Expertise</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-red-600 mb-6"></div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Robust hardware solutions to support your technological
            infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hardwareServices.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-600 hover:-translate-y-2 transition-transform"
            >
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="text-red-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your IT Infrastructure?
          </h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Our team of experts is ready to assess your needs and provide
            customized software and hardware solutions.
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center mx-auto">
            GET STARTED TODAY
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-red-400 font-semibold mb-2">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted By <span className="text-red-400">Businesses</span>{" "}
              Worldwide
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-red-600 mb-6"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default WhatWeDo;
