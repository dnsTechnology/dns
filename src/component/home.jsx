"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homehero from "./homehero";
import Producthome from "./producthome";
import businessimage from "../assets/new.jpg";
import life from "../assets/life-cycle.jpg";

import {
  ArrowRight,
  Globe,
  Code,
  Smartphone,
  Palette,
  Shield,
  Server,
  Network,
  Database,
  CheckCircle,
  Star,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { fadeIn, slideIn, fadeUp, zoomIn, staggerContainer } from "../variants";

const Home = () => {
  // Premium service data with enhanced visuals
  const hardwareServices = [
    {
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Enterprise Server Solutions",
      description:
        "High-performance server infrastructure with 99.9% uptime guarantee",
      icon: <Server className="w-8 h-8" />,
      features: [
        "24/7 Monitoring",
        "Scalable Architecture",
        "Disaster Recovery",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Advanced Security Systems",
      description:
        "Comprehensive CCTV and access control with AI-powered analytics",
      icon: <Shield className="w-8 h-8" />,
      features: ["AI Analytics", "Remote Access", "Cloud Storage"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Network Infrastructure",
      description:
        "Enterprise-grade networking solutions with fiber optic technology",
      icon: <Network className="w-8 h-8" />,
      features: ["Fiber Optic", "Load Balancing", "Network Security"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Cybersecurity Solutions",
      description:
        "Multi-layered security architecture protecting against modern threats",
      icon: <Database className="w-8 h-8" />,
      features: ["Threat Detection", "Compliance", "Risk Assessment"],
    },
  ];

  const softwareServices = [
    {
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Custom Software Development",
      icon: <Code className="w-8 h-8" />,
      description: "Tailored enterprise applications with modern tech stack",
      features: ["React/Node.js", "Cloud Native", "API Integration"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Cloud Infrastructure",
      icon: <Globe className="w-8 h-8" />,
      description: "Scalable cloud hosting with global CDN and auto-scaling",
      features: ["AWS/Azure", "Auto Scaling", "Global CDN"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Mobile Solutions",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Cross-platform mobile apps with native performance",
      features: ["React Native", "Flutter", "Progressive Web Apps"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Digital Experience Design",
      icon: <Palette className="w-8 h-8" />,
      description: "User-centered design with conversion optimization",
      features: ["User Research", "Prototyping", "A/B Testing"],
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Discover",
      description:
        "We start by understanding your business needs and challenges through in-depth consultations.",
    },
    {
      number: "2",
      title: "Design",
      description:
        "Our team creates detailed plans and designs tailored to your specific requirements.",
    },
    {
      number: "3",
      title: "Develop",
      description:
        "We build your solution using cutting-edge technologies and best practices.",
    },
    {
      number: "4",
      title: "Deploy",
      description:
        "We implement your solution seamlessly into your existing infrastructure.",
    },
    {
      number: "5",
      title: "Support",
      description:
        "We provide ongoing maintenance and support to ensure your solution continues to perform optimally.",
    },
  ];

  const portfolioItems = [
    {
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Fortune 500 Network Transformation",
      description: "Complete infrastructure overhaul for 10,000+ employees",
      category: "Enterprise",
      metrics: "99.99% Uptime",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Banking Security Implementation",
      description: "Multi-layer security for financial institution",
      category: "Security",
      metrics: "Zero Breaches",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Smart City IoT Platform",
      description: "Connected infrastructure for modern urban management",
      category: "IoT",
      metrics: "50K+ Devices",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Healthcare Cloud Migration",
      description: "HIPAA-compliant cloud infrastructure",
      category: "Healthcare",
      metrics: "100% Compliance",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "E-commerce Platform",
      description: "High-traffic retail solution with AI recommendations",
      category: "E-commerce",
      metrics: "1M+ Users",
    },
    {
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      title: "Educational Technology Suite",
      description: "Comprehensive learning management system",
      category: "Education",
      metrics: "500K+ Students",
    },
  ];

  // Premium reusable components
  const SectionHeader = ({
    title,
    subtitle,
    className = "",
    centered = false,
  }) => (
    <div
      className={`mb-20 sm:mb-24 ${className} ${centered ? "text-center" : ""}`}
    >
      <div className={`inline-block ${centered ? "mx-auto" : ""}`}>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div
          className={`w-32 sm:w-40 h-2 bg-gradient-to-r from-red-600 to-red-800 mb-6 ${
            centered ? "mx-auto" : ""
          }`}
        ></div>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const ServiceCard = ({ service, index }) => (
    <div className="bg-white border border-gray-100 h-full">
      <div className="relative">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-6 left-6 border border-red-600 bg-white p-4 text-red-600 shadow-lg rounded-full"> 
          {service.icon}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
          {service.description}
        </p>
        {service.features && (
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ProcessStep = ({ step, index, isLast }) => (
    <motion.div
      key={index}
      className="flex gap-6 w-full"
      variants={slideIn("left", index * 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-red-600 text-white relative shadow-lg">
        <span className="font-bold text-lg">{step.number}</span>
        {!isLast && (
          <div className="absolute w-0.5 bg-red-100 top-12 left-1/2 -translate-x-1/2 h-[calc(100%+1.5rem)] hidden sm:block"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg break-words">
          {step.description}
        </p>
      </div>
    </motion.div>
  );

  const PortfolioCard = ({ item, index }) => (
    <div className="bg-white border border-gray-100 h-full">
      <div className="relative">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
          {item.category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 flex-1">
            {item.title}
          </h3>
          <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-2 ml-4">
            {item.metrics}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed text-lg">
          {item.description}
        </p>
      </div>
    </div>
  );

  const LearnMoreButton = ({ to = "/services", text = "Explore More" }) => (
    <div className="flex justify-center mt-16">
      <Link to={to}>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-12 flex items-center text-lg transition-colors shadow-lg">
          {text}
          <ArrowRight className="ml-4 w-6 h-6" />
        </button>
      </Link>
    </div>
  );

  // New premium components
  const StatsCard = ({ stat, index }) => (
    <div className="text-center p-8 bg-white border border-gray-100">
      <div className="bg-red-100 p-4 inline-flex mb-6">{stat.icon}</div>
      <div className="text-4xl font-bold text-gray-900 mb-3">{stat.number}</div>
      <div className="text-gray-600 font-semibold uppercase tracking-wide text-sm">
        {stat.label}
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial, index }) => (
    <div className="bg-white p-10 border border-gray-100 h-full">
      <div className="flex mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
        ))}
      </div>
      <blockquote className="text-gray-700 mb-8 leading-relaxed italic text-lg font-medium">
        "{testimonial.quote}"
      </blockquote>
      <div className="pt-6 border-t border-gray-100">
        <div className="font-bold text-gray-900 text-lg">
          {testimonial.author}
        </div>
        <div className="text-gray-600 font-medium">{testimonial.position}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Hero Section */}
      <Homehero />

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
            <div className="relative w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <img
                  src={businessimage}
                  alt="DNS Technology Team"
                  className="w-full h-80 lg:h-[48rem] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Certified Excellence
                      </div>
                      <div className="text-sm text-gray-600">
                        ISO 27001 Compliant
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <SectionHeader
                title="Transforming Business Through Technology"
                subtitle="Leading the digital transformation with innovative solutions that drive growth and efficiency across industries."
              />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 mt-1">
                    <Award className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Industry Leadership
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Over 15 years of expertise delivering cutting-edge network
                      solutions and IT services to Fortune 500 companies and
                      growing businesses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 mt-1">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Security First
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Comprehensive security architecture protecting against
                      modern threats with multi-layered defense systems and
                      compliance frameworks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 mt-1">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Scalable Solutions
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Future-ready infrastructure that grows with your business,
                      ensuring optimal performance and seamless scalability.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/about">
                <button className="bg-red-600 text-white font-semibold py-3 px-6 flex items-center mt-8">
                  Discover Our Story
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <Producthome />

      {/* What We Do Section */}
      <section className="bg-white py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid gap-20 lg:gap-24 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                <img
                  src={life}
                  alt="Our Development Process"
                  className="w-full h-96 lg:h-[50rem] object-cover"
                />
                <div className="absolute -top-6 -right-6 bg-white p-4 border border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2">
                      <Code className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Agile Methodology
                      </div>
                      <div className="text-xs text-gray-600">
                        Iterative Development
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 border border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Quality Assured
                      </div>
                      <div className="text-xs text-gray-600">
                        99.9% Success Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 text-red-700 mb-6">
                <div className="w-2 h-2 bg-red-500"></div>
                <span className="text-sm font-medium">Our Proven Process</span>
              </div>
              <SectionHeader
                title="How We Deliver Excellence"
                subtitle="Our systematic approach ensures successful project delivery from concept to deployment."
              />
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={index}
                    step={step}
                    index={index}
                    isLast={index === processSteps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            title="Enterprise Solutions"
            subtitle="Comprehensive technology services designed to accelerate your digital transformation and drive business growth."
            centered={true}
          />

          {/* Hardware Services */}
          <div className="mb-24">
            <div className="flex items-center justify-center mb-16">
              <div className="flex items-center gap-4 bg-white px-8 py-4 border border-gray-100">
                <Server className="w-6 h-6 text-red-600" />
                <span className="font-bold text-gray-900 text-lg">
                  Infrastructure Solutions
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {hardwareServices.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>

          {/* Software Services */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-16">
              <div className="flex items-center gap-4 bg-white px-8 py-4 border border-gray-100">
                <Code className="w-6 h-6 text-red-600" />
                <span className="font-bold text-gray-900 text-lg">
                  Digital Solutions
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {softwareServices.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>

          <LearnMoreButton to="/services" text="View All Services" />
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-white py-28 lg:py-36">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            title="Success Stories"
            subtitle="Discover how we've transformed businesses across industries with innovative technology solutions and measurable results."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={index} item={item} index={index} />
            ))}
          </div>
          <LearnMoreButton to="/portfolio" text="View All Projects" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-24 lg:py-28">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have accelerated their
              growth with our cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-white text-red-600 font-semibold py-4 px-8">
                  Get Started Today
                </button>
              </Link>
              <Link to="/services">
                <button className="border-2 border-white text-white font-semibold py-4 px-8">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
