import React, { useState } from "react";
import {
  useCreateJobApplicationMutation,
  useGetJobByIdQuery,
} from "../redux/main.js";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading.jsx";
const ApplicationProcessForjob = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;

  const [createJobApplication] = useCreateJobApplicationMutation();
  const [fileuploading, setfileUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobId: jobId || "",
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    country: "",
    resume: "",
    coverLetter: "",
    experience: "",
    skills: "",
    linkedin: "",
    portfolio: "",
    additionalInfo: "",
  });

  const { data, isLoading, isError } = useGetJobByIdQuery({ id: jobId });
  const jobdata = data?.data;

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen font-[25px]">
        <div className="error">some error occoured</div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = async (e) => {
    try {
      setfileUploading(true);

      const file = e.target.files?.[0];
      if (file) {
        if (!["application/pdf", "application/msword"].includes(file.type)) {
          return toast.error("Invalid file type");
        }
        if (file.size > 5 * 1024 * 1024) {
          return toast.error("File size should be less than 5MB");
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload/docs`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, resume: data.file.path }));
          toast.success(data?.message || "File uploaded successfully");
        } else {
          toast.error("Upload failed. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to upload resume.");
    } finally {
      setfileUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createJobApplication({ body: formData });
      if (response.data?.success) {
        toast.success(
          response?.data?.message || "Application submitted successfully!"
        );
        navigate("/careers/apply/done");
      } else {
        toast.error(
          response?.data?.message ||
            response?.error?.data?.message ||
            "Failed to submit application."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 mt-10">
      <div className="max-w-4xl mx-auto bg-white  p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Job Application for{" "}
          <span className="bold text-red-800">{jobdata?.title}</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Mobile <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Resume <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none"
            />
            <div>
              {fileuploading && (
                <div className="loading">
                  <span className="uppercase ">Loading...</span>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              rows="4"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>

          {/* Experience */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              min={0}
              max={80}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Optional Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Skills (comma separated){" "}
                <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                LinkedIn <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Portfolio <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Additional Info{" "}
                <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                name="additionalInfo"
                rows="2"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 font-semibold uppercase tracking-wide hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationProcessForjob;
