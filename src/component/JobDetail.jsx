import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../redux/main.js"; // your RTK Query hook
import { useNavigate } from "react-router-dom";
const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetJobByIdQuery({ id });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Error: {error?.data?.message || "Failed to load job"}</p>
      </div>
    );
  }

  const job = data?.data || {};

  return (
    <div className="mt-12 p-8 bg-gray-100 min-h-screen w-full">
      <div className=" container mx-auto bg-white p-8">
        {/* Header Section */}
        <div className="border-b border-gray-100 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-lg font-medium text-gray-700 mt-1">
            {job.company || "Company not specified"}
          </p>
        </div>

        {/* Job Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="text-gray-800 font-medium">{job.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-800 font-medium">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-gray-800 font-medium">{job.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salary Range</p>
            <p className="text-gray-800 font-medium">
              Rs: {job.salaryRange || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="text-gray-800 font-medium">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`font-medium ${
                job.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {job.isActive ? "Active" : "Closed"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Job Description
          </h2>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Requirements
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply Section */}
        <div className="pt-6 border-t border-gray-200">
          <button
            disabled={new Date(job.deadline) < Date.now()}
            onClick={() => {
              if (job.isActive && new Date(job.deadline) > Date.now()) {
                navigate(`/careers/apply/${job._id}`);
              }
            }}
            className={`px-8 py-3 cursor-pointer disabled:cursor-default text-white font-medium uppercase tracking-wide ${
              job.isActive ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            }`}
          >
            {new Date(job.deadline) > Date.now() && job.isActive
              ? "Apply Now"
              : "Job Closed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
