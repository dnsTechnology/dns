import { useState } from "react";
import { Check, ThumbsUp, Star, Flame, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PricingCard = ({
  icon: Icon,
  title,
  price,
  description,
  features,
  index,
}) => {
  return (
    <div className="bg-gray-50 p-8 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="bg-gray-100 p-3 mr-4">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="ml-2 text-gray-500">/Month</span>
        </div>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      <div className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center text-gray-700">
            <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition-colors">
        Get started
      </button>
    </div>
  );
};

const License = () => {
  const plans = [
    {
      icon: ThumbsUp,
      title: "Basic plan",
      price: "99",
      description: "Essential tools for small businesses.",
      features: ["Unlimited Invoices", "Next-Day Payments", "Secure Gateway"],
    },
    {
      icon: Star,
      title: "Pro plan",
      price: "199",
      description: "Advanced tools for growing businesses.",
      features: ["Analytics", "Priority Support", "Secure Gateway"],
    },
    {
      icon: Flame,
      title: "Enterprise plan",
      price: "299",
      description: "Full-featured solution for enterprises.",
      features: ["Dedicated Manager", "Advanced Analytics", "24/7 Support"],
    },
  ];

  const faqData = [
    {
      question: "What IT services do you provide?",
      answer:
        "We provide full IT solutions including network setup, cloud migration, cybersecurity, managed IT support, system monitoring, backups, software maintenance, and 24/7 technical support.",
    },
    {
      question: "How quickly can you respond to outages?",
      answer:
        "Critical issues are addressed within 15 minutes, standard requests within 2 hours. Remote monitoring often resolves problems before impact.",
    },
    {
      question: "Do you provide cybersecurity services?",
      answer:
        "Yes, we offer firewall configuration, antivirus deployment, security audits, vulnerability assessments, employee training, and secure backups.",
    },
  ];

  const [openItem, setOpenItem] = useState(null);
  const toggleItem = (index) => setOpenItem(openItem === index ? null : index);

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      {/* Pricing Section */}
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple and Transparent Pricing
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Affordable and clear plans for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-2">
            {faqData.map((item, index) => (
              <div key={index} className="border border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-900">{item.question}</span>
                  {openItem === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>

                <AnimatePresence>
                  {openItem === index && (
                    <div className="px-4 py-3 text-gray-700">{item.answer}</div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default License;
