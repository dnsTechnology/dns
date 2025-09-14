import React, { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor.jsx";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useGetAllJobCategoriesQuery,
} from "../../../redux/main.js";
import toast from "react-hot-toast";

const UpdateJob = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Onsite");
  const [type, setType] = useState("Full-time");
  const [salaryRange, setSalaryRange] = useState("");
  const [requirements, setRequirements] = useState("");
  const [company, setCompany] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: jobData, isLoading, error } = useGetJobByIdQuery({ id });
  const { data: categoriesData, refetch } = useGetAllJobCategoriesQuery();
  const [updateJob] = useUpdateJobMutation();

  const job = jobData?.data;
  const categories = categoriesData?.data?.categories ?? [];

  useEffect(() => {
    if (job) {
      setTitle(job.title || "");
      setDescription(job.description || "");
      setCategory(job.category || "");
      setLocation(job.location || "Onsite");
      setType(job.type || "Full-time");
      setSalaryRange(job.salaryRange || "");
      setRequirements(job.requirements?.join(", ") || "");
      setCompany(job.company || "");
      setDeadline(job.deadline ? job.deadline.split("T")[0] : "");
      setIsActive(job.isActive ?? true);
    }
  }, [job]);

  if (isLoading) return <div>Loading job...</div>;
  if (error) return <div className="text-red-600">Failed to load job.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      category,
      location,
      type,
      salaryRange,
      requirements: requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
      company,
      deadline,
      isActive,
    };

    try {
      const res = await updateJob({ id, body });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Job updated successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to update job");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    } finally {
      refetch();
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Update Job
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (Onsite/Remote/Hybrid)..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Salary Range */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">
              Salary Range
            </label>
            <input
              type="text"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="$2000 - $3000"
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">
            Requirements
          </label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter skills separated by commas..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Company */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Is Active */}
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-semibold uppercase">Is Active</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 uppercase font-semibold tracking-wider hover:opacity-80 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
