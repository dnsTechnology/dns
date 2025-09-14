import React, { useState } from "react";
import {
  useGetAllJobCategoriesQuery,
  useCreateJobMutation,
} from "../../../redux/main.js"; // adjust to your API slices
import toast from "react-hot-toast";
import RichTextEditor from "../components/RichTextEditor.jsx";

const NewJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Onsite");
  const [type, setType] = useState("Full-time");
  const [salaryRange, setSalaryRange] = useState("");
  const [requirements, setRequirements] = useState("");
  const [company, setCompany] = useState("");
  const [deadline, setDeadline] = useState("");

  const [createJob] = useCreateJobMutation();
  const { data } = useGetAllJobCategoriesQuery();

  const categories = data?.data?.categories ?? [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      return toast.error("Please fill all required fields");
    }

    const res = await createJob({
      title,
      description,
      category,
      location,
      type,
      salaryRange,
      requirements: requirements
        ? requirements.split(",").map((r) => r.trim())
        : [],
      company,
      deadline,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Job created successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("Onsite");
      setType("Full-time");
      setSalaryRange("");
      setRequirements("");
      setCompany("");
      setDeadline("");
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Post New Job
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Job Title */}
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
          <label className="text-sm font-semibold uppercase">Description</label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        {/* Category + Company */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Location + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            >
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Job Type</label>
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
        </div>

        {/* Salary + Deadline */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Requirements */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">
            Requirements
          </label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter requirements (comma separated)..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 uppercase font-semibold tracking-wider hover:opacity-80 transition"
        >
          Publish Job
        </button>
      </form>
    </div>
  );
};

export default NewJob;
