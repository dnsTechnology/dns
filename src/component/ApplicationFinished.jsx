import React from "react";
import { CheckCircle, Mail, Clock } from "lucide-react";

const ApplicationFinished = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 flex flex-col items-center text-center">
        {/* Success Icon */}
        <CheckCircle size={64} className="text-green-600 mb-6" />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Application Submitted!
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6">
          Thank you for applying. We will review your application and get back
          to you soon.
        </p>

        {/* Info Section */}
        <div className="w-full flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-800">
            <Mail size={24} className="text-blue-600" />
            <span>Check your email for confirmation and updates</span>
          </div>
          <div className="flex items-center gap-3 text-gray-800">
            <Clock size={24} className="text-yellow-600" />
            <span>We will get back to you within 5 business days</span>
          </div>
        </div>

        {/* Back to Jobs Button */}
        <button
          onClick={() => (window.location.href = "/careers")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 uppercase tracking-wide"
        >
          Back to Careers
        </button>
      </div>
    </div>
  );
};

export default ApplicationFinished;
