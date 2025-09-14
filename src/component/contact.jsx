import { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { Plus, Minus } from "lucide-react";
import contactimg from "../image/contact.jpg";
import { useCreateEnquiryMutation } from "../redux/main.js";
import toast from "react-hot-toast";

const contactItems = [
  {
    icon: <IoMdCall className="text-2xl sm:text-3xl" />,
    title: "Call for inquiry",
    text: "+977 1-4782849",
  },
  {
    icon: <MdEmail className="text-2xl sm:text-3xl" />,
    title: "Send us email",
    text: "info@dnstech.com.np",
  },
  {
    icon: <IoTime className="text-2xl sm:text-3xl" />,
    title: "Opening hours",
    text: "Mon - Fri: 10AM - 6PM",
  },
  {
    icon: <IoLocationSharp className="text-2xl sm:text-3xl" />,
    title: "Office",
    text: "New Baneshwor, Kathmandu",
  },
];

const faqData = [
  {
    question: "What IT services do you provide for businesses?",
    answer:
      "We offer comprehensive IT solutions including network infrastructure setup, cloud migration, cybersecurity implementation, managed IT support, system monitoring, data backup and recovery, software installation and maintenance, and 24/7 technical support. Our services are tailored to meet the specific needs of small to enterprise-level businesses.",
  },
  {
    question:
      "How quickly can you respond to network outages or technical issues?",
    answer:
      "We provide 24/7 monitoring and support with guaranteed response times. For critical issues, we respond within 15 minutes, and for standard support requests, within 2 hours during business hours. Our remote monitoring systems often detect and resolve issues before they impact your operations, ensuring maximum uptime for your business.",
  },
  {
    question:
      "Do you offer cybersecurity solutions and data protection services?",
    answer:
      "Yes, we provide comprehensive cybersecurity services including firewall configuration, antivirus deployment, security audits, vulnerability assessments, employee training, multi-factor authentication setup, and compliance consulting. We also offer secure data backup solutions with encrypted storage and disaster recovery planning to protect your business from cyber threats.",
  },
  {
    question: "Can you help migrate our systems to the cloud?",
    answer:
      "We specialize in cloud migration services for businesses of all sizes. Our team will assess your current infrastructure, recommend the best cloud solutions (AWS, Azure, Google Cloud), handle the complete migration process, and provide ongoing cloud management. We ensure minimal downtime and enhanced security throughout the transition.",
  },
  {
    question: "What are your service packages and pricing options?",
    answer:
      "We offer flexible service packages including basic monitoring and support, comprehensive managed IT services, and enterprise-level solutions. Our pricing is transparent with monthly subscription options starting from $99/month for small businesses. We provide free consultations to assess your needs and recommend the most cost-effective solution for your organization.",
  },
];

const Contact = () => {
  const [openItem, setOpenItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [createEnquiry] = useCreateEnquiryMutation();

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  if (loading) {
    return <loading />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={contactimg}
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-balance">
                Contact Us
              </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
                Ready to transform your business with cutting-edge IT solutions?
                Get in touch with our expert team today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-900 text-balance">
              Ready to Transform Your IT Infrastructure?
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {contactItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-6 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-blue-600 flex-shrink-0 hover:text-purple-600 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="font-medium text-xs sm:text-sm lg:text-base text-gray-700">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Section */}
              <div className="bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Our Location
                </h3>
                <div className="overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.588953931806!2d85.33417710942105!3d27.693047176091486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1854352dab33%3A0x6ccf7b5fa93ba745!2sD.N.S%20Technology%20Pvt.%20Ltd!5e1!3m2!1sen!2sus!4v1745391999780!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="sm:h-[300px]"
                    title="DNS Technology Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="bg-white p-6 sm:p-8 hover:bg-gray-50 transition-colors duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                  Send Us a Message
                </h3>
                <p className="mb-6 text-sm sm:text-base text-gray-600">
                  We'll get back to you within 24 hours
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block font-semibold mb-2 text-sm sm:text-base text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        value={enquiryData.firstname}
                        onChange={(e) =>
                          setEnquiryData({
                            ...enquiryData,
                            firstname: e.target.value,
                          })
                        }
                        placeholder="Your name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block font-semibold mb-2 text-sm sm:text-base text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        value={enquiryData.lastname}
                        onChange={(e) =>
                          setEnquiryData({
                            ...enquiryData,
                            lastname: e.target.value,
                          })
                        }
                        placeholder="Your last name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-semibold mb-2 text-sm sm:text-base text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={enquiryData.email}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          email: e.target.value,
                        })
                      }
                      placeholder="Your email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-semibold mb-2 text-sm sm:text-base text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={enquiryData.phone}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Your phone number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-600 text-sm sm:text-base transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold mb-2 text-sm sm:text-base text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={enquiryData.message}
                      onChange={(e) =>
                        setEnquiryData({
                          ...enquiryData,
                          message: e.target.value,
                        })
                      }
                      placeholder="How can we help you?"
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-600 text-sm sm:text-base resize-none sm:rows-5 transition-colors duration-300"
                    ></textarea>
                  </div>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        setLoading(true);
                        if (
                          !enquiryData.firstname ||
                          !enquiryData.email ||
                          !enquiryData.phone ||
                          !enquiryData.message
                        ) {
                          toast.error("Please fill all the required fields");
                          return;
                        }

                        const res = await createEnquiry(enquiryData);
                        setEnquiryData({
                          firstname: "",
                          lastname: "",
                          email: "",
                          phone: "",
                          message: "",
                        });
                        if (res?.data?.success) {
                          toast.success(
                            res.data.message || "Message sent successfully"
                          );
                        } else {
                          toast.error(
                            res.data.message || "Failed to send message."
                          );
                        }
                      } catch (error) {
                        console.log(error);
                        toast.error("Failed to send message");
                        return;
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - FAQ */}
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-balance">
                  Frequently Asked Questions
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-pretty">
                  Get answers to common questions about our comprehensive IT and
                  network services. We're here to help your business stay
                  connected and secure.
                </p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3 sm:space-y-4">
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border-l-4 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base text-gray-900 pr-4">
                        {item.question}
                      </span>
                      <div
                        className="flex-shrink-0 transition-transform duration-300"
                        style={{
                          transform:
                            openItem === index
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        {openItem === index ? (
                          <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        )}
                      </div>
                    </button>

                    {openItem === index && item.answer && (
                      <div className="overflow-hidden transition-all duration-300">
                        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                          <div className="pt-2 border-t border-blue-200">
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="order-first lg:order-last">
              <div className="relative">
                <div className="bg-white overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-1850.jpg?ga=GA1.1.2040509304.1743746768&semt=ais_hybrid&w=740"
                    alt="IT professional working on network infrastructure and servers"
                    className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
