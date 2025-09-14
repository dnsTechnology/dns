import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Blocks,
  Brain,
  Bot,
  Code,
  Globe,
  Smartphone,
  FileText,
  Users,
  Settings,
  Palette,
  TestTube,
  Star,
} from "lucide-react";
import ServiceDetailed from "./servicedetailed";

// Tech Stack Component
const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState("Databases");

  const techCategories = {
    Frontend: [
      { name: "React", logo: "⚛️", color: "text-cyan-500" },
      { name: "Angular", logo: "🅰️", color: "text-red-600" },
      { name: "Vue.js", logo: "V", color: "text-green-500" },
      { name: "JavaScript", logo: "JS", color: "text-yellow-500" },
      { name: "TypeScript", logo: "TS", color: "text-blue-600" },
      { name: "HTML5", logo: "🌐", color: "text-orange-500" },
      { name: "CSS3", logo: "🎨", color: "text-blue-500" },
      { name: "Bootstrap", logo: "B", color: "text-purple-600" },
      { name: "Tailwind CSS", logo: "🎯", color: "text-teal-500" },
    ],
    Backend: [
      { name: "Node.js", logo: "📗", color: "text-green-600" },
      { name: "Python", logo: "🐍", color: "text-yellow-600" },
      { name: "Java", logo: "☕", color: "text-orange-600" },
      { name: "PHP", logo: "🐘", color: "text-purple-600" },
      { name: "C#", logo: "#️⃣", color: "text-blue-600" },
      { name: "Ruby", logo: "💎", color: "text-red-600" },
      { name: "Go", logo: "🔵", color: "text-cyan-600" },
      { name: "Express.js", logo: "E", color: "text-gray-700" },
      { name: "Spring Boot", logo: "🍃", color: "text-green-600" },
    ],
    Databases: [
      { name: "MySQL", logo: "🐬", color: "text-blue-600" },
      { name: "SQL Server", logo: "🗄️", color: "text-red-600" },
      { name: "PostgreSQL", logo: "🐘", color: "text-blue-700" },
      { name: "MongoDB", logo: "🍃", color: "text-green-600" },
      { name: "Oracle Database", logo: "🔴", color: "text-red-600" },
      { name: "MariaDB", logo: "🐋", color: "text-blue-500" },
      { name: "Amazon DynamoDB", logo: "⚡", color: "text-orange-500" },
    ],
    "Mobile Development": [
      { name: "React Native", logo: "📱", color: "text-cyan-500" },
      { name: "Flutter", logo: "🐦", color: "text-blue-500" },
      { name: "Swift", logo: "🍎", color: "text-orange-500" },
      { name: "Kotlin", logo: "K", color: "text-purple-600" },
      { name: "Ionic", logo: "⚡", color: "text-blue-600" },
      { name: "Xamarin", logo: "🔷", color: "text-blue-600" },
      { name: "PhoneGap", logo: "📲", color: "text-green-600" },
    ],
    Blockchain: [
      { name: "Ethereum", logo: "⟠", color: "text-gray-700" },
      { name: "Bitcoin", logo: "₿", color: "text-orange-500" },
      { name: "Solidity", logo: "◆", color: "text-gray-600" },
      { name: "Web3.js", logo: "🌐", color: "text-blue-500" },
      { name: "Hyperledger", logo: "🔗", color: "text-blue-600" },
      { name: "Smart Contracts", logo: "📋", color: "text-green-600" },
      { name: "IPFS", logo: "🌍", color: "text-purple-600" },
    ],
    "Emerging Tech": [
      { name: "Artificial Intelligence", logo: "🤖", color: "text-blue-600" },
      { name: "Machine Learning", logo: "🧠", color: "text-purple-600" },
      { name: "IoT", logo: "📡", color: "text-green-600" },
      { name: "AR/VR", logo: "🥽", color: "text-orange-600" },
      { name: "Cloud Computing", logo: "☁️", color: "text-blue-500" },
      { name: "DevOps", logo: "⚙️", color: "text-gray-600" },
      { name: "Microservices", logo: "🔧", color: "text-indigo-600" },
    ],
  };

  return (
    <section className="bg-white py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tools & Tech Stack
          </h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-12 border-b border-gray-200 overflow-x-auto">
          {Object.keys(techCategories).map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`pb-3 sm:pb-4 px-2 text-xs sm:text-sm md:text-lg font-medium transition-colors duration-200 whitespace-nowrap hover:scale-105 ${activeTab === category
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {techCategories[activeTab]?.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200"
            >
              <div className="text-xl sm:text-2xl md:text-4xl mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-200">
                {tech.logo}
              </div>
              <h3
                className={`text-center font-semibold text-xs sm:text-sm md:text-base ${tech.color} group-hover:text-gray-900 transition-colors duration-200`}
              >
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Component
const OptimizedITServices = () => {
  const services = [
    {
      id: 1,
      title: "IT Services",
      description:
        "We offer secure and scalable blockchain development services to build decentralized apps, smart contracts, and enterprise blockchain ecosystems tailored to your business needs.",
      icon: Blocks,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Cloud Services",
      description:
        "Our Web3 development services empower your business with decentralized platforms, including dApps, wallets, DAOs, and NFT marketplaces—engineered for seamless performance and experience.",
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Hardware Services",
      description:
        "We specialize in Generative AI solutions that automate creativity and intelligence, ranging from content generation and virtual assistants to code and design generation.",
      icon: Brain,
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Mobile App Development",
      description:
        "Our AI development services are designed to help you build intelligent systems that learn, predict, and enhance decision-making across your operations.",
      icon: Bot,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Software Solutions",
      description:
        "We cater to unique business needs through fully customized software development—our team builds reliable, scalable, and business-aligned solutions from scratch.",
      icon: Code,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Consulting Services",
      description:
        "Our team develops high-performance mobile web applications with sleek UI, robust backend architecture, and cross-platform functionality to deliver seamless user experiences.",
      icon: Smartphone,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const processSteps = [
    {
      id: 1,
      title: "Requirement Gathering",
      icon: FileText,
      description:
        "The initial phase involves thorough communication with stakeholders to comprehend the needs and expectations. A detailed analysis of the gathered information helps in creating a clear and concise set of requirements that will serve as the foundation for the entire software development process.",
      position: "top",
    },
    {
      id: 2,
      title: "Development",
      icon: Users,
      description:
        "Developers follow coding standards, utilize chosen technologies, and work collaboratively to build the solution iteratively. Regular check-ins and code reviews are essential to maintain code quality and ensure adherence to the design specifications.",
      position: "top",
    },
    {
      id: 3,
      title: "Maintenance & Support",
      icon: Settings,
      description:
        "Post-deployment, the software enters the maintenance and support phase. This involves monitoring the system's performance, addressing any issues that may arise, and releasing updates or patches as needed. User feedback is crucial during this phase, guiding the development of future enhancements or features.",
      position: "top",
    },
    {
      id: 4,
      title: "Design and UI/UX",
      icon: Palette,
      description:
        "The design phase focuses on translating the gathered information into a blueprint for the software solution. This includes creating system architecture, database design, and user interface mock-ups. The design phase also involves making decisions about technologies, platforms, and frameworks that will be utilized in the development process.",
      position: "bottom",
    },
    {
      id: 5,
      title: "Testing and Deployment",
      icon: TestTube,
      description:
        "Quality assurance is paramount in the testing phase. Bugs and issues are identified, addressed, and retested before moving to the deployment phase. Continuous monitoring during and after deployment allows for prompt identification and resolution of any unforeseen issues.",
      position: "bottom",
    },
  ];

  const features = [
    {
      number: "01",
      title: "Fast Service Delivery",
      description:
        "We guarantee quick response times and efficient service completion to minimize your downtime.",
    },
    {
      number: "02",
      title: "Certified Professionals",
      description:
        "Our team consists of highly trained and certified IT experts with years of industry experience.",
    },
    {
      number: "03",
      title: "24/7 Customer Support",
      description:
        "Round-the-clock assistance to address your IT emergencies whenever they occur.",
    },
    {
      number: "04",
      title: "Trusted Partner",
      description:
        "We build long-term relationships based on reliability, transparency, and exceptional service.",
    },
  ];

  const images = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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

  const topSteps = processSteps.filter((step) => step.position === "top");
  const bottomSteps = processSteps.filter((step) => step.position === "bottom");

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section
        id="services"
        className="bg-gradient-to-br mt-16 py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Unlock The Future Of Tomorrow
            </h2>
            <div className="w-20 md:w-26 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-2 border-gray-300 p-6 sm:p-8 md:p-10 shadow-xl shadow-gray-400/20"
                >
                  {/* Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}
                  />
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-200/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-200/20 to-transparent" />

                  {/* Icon */}
                  <div
                    className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${service.gradient} p-3 md:p-4 mb-4 sm:mb-6 md:mb-8 shadow-lg`}
                  >
                    <IconComponent className="w-full h-full text-white drop-shadow-sm" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed line-height-loose">
                      {service.description}
                    </p>
                    
                    {/* Indicator */}
                    <div className="mt-4 sm:mt-6">
                      <div className={`w-12 h-1 bg-gradient-to-r ${service.gradient}`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service */}
      <ServiceDetailed />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Process Section */}
      <section
        id="process"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Execution Process
            </h2>
            <div className="w-20 md:w-26 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto"></div>
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
            {topSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-red-300 p-6 sm:p-8 shadow-xl shadow-red-100/50 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent" />
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 rounded-full h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 sm:mb-6 shadow-xl">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 mb-4 sm:mb-6">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white font-bold text-sm flex items-center justify-center">
                      {step.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connecting Lines */}
          <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
            <div className="hidden md:flex items-center">
              <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-red-300 to-red-500"></div>
              <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-br from-red-500 to-red-600 mx-3 shadow-lg"></div>
              <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-red-500 to-red-300"></div>
              <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-br from-red-500 to-red-600 mx-3 shadow-lg"></div>
              <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-red-300 to-red-500"></div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
            {bottomSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-red-300 p-6 sm:p-8 shadow-xl shadow-red-100/50 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent" />
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 rounded-full h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 sm:mb-6 shadow-xl">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 mb-4 sm:mb-6">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 text-white font-bold text-sm flex items-center justify-center">
                      {step.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptimizedITServices;
