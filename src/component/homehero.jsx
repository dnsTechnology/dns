"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Server,
  Shield,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Award,
  Users,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";
import Nav from "./nav";
import { useEffect, useState, useRef } from "react";
import {
  fadeIn,
  slideIn,
  fadeUp,
  zoomIn,
  staggerContainer,
  bounceIn,
} from "../variants";

const HomeHero = () => {
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimatedStats(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const features = [
    { icon: Shield, text: "Enterprise Security" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Globe, text: "Global Reach" },
    { icon: Award, text: "Award Winning" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Nav />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-y-48 -translate-x-48"></div>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Left Content */}
            <motion.div
              className="flex flex-col justify-center space-y-8 order-2 lg:order-1"
              variants={slideIn("left", 0.2)}
              initial="hidden"
              animate="show"
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 px-4 py-2 text-sm font-semibold text-red-700"
                  variants={fadeIn("down", 0.3)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <Star className="w-4 h-4 text-red-600" />
                  #1 Technology Solutions Provider
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                  variants={fadeIn("left", 0.4)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Transform Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                    Digital Future
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl font-medium"
                  variants={fadeIn("left", 0.5)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  Empowering businesses with cutting-edge technology solutions,
                  innovative software development, and robust network
                  infrastructure that drives unprecedented growth.
                </motion.p>

                {/* Feature Pills */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={fadeUp(0.6)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2"
                    >
                      <feature.icon className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                variants={fadeUp(0.7)}
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
              >
                <Link to="/services" className="group">
                  <motion.button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer">
                    Explore Solutions
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>

                <motion.button
                  className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-red-600 text-gray-900 hover:text-red-600 font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group hover:cursor-pointer"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Visual */}
            <motion.div
              className="relative order-1 lg:order-2"
              variants={slideIn("right", 0.3)}
              initial="hidden"
              animate="show"
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Main Image Container */}
                <motion.div
                  className="relative bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl overflow-hidden"
                  variants={zoomIn(0.4)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-blue-50/50"></div>
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Advanced Technology Solutions"
                    className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover shadow-xl"
                  />

                  {/* Overlay Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </motion.div>

                {/* Floating Achievement Cards */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white p-6 border border-gray-200"
                  variants={fadeIn("up", 0.6)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        100% Secure
                      </p>
                      <p className="text-sm text-gray-600">
                        Enterprise-grade protection
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-white p-6 border border-gray-200"
                  variants={fadeIn("down", 0.7)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3">
                      <Server className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        99.9% Uptime
                      </p>
                      <p className="text-sm text-gray-600">Always available</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 bg-white p-4 border border-gray-200"
                  variants={fadeIn("right", 0.8)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      24/7
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                      Support
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
