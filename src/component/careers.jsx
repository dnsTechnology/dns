import React, { useState } from "react";
import {
  useGetAllJobCategoriesQuery,
  useGetAllJobsQuery,
} from "../redux/main.js";
import { useNavigate } from "react-router-dom";

// Company Values
const companyValues = [
  { title: "Continuous Learning", icon: "📘" },
  { title: "Teamwork", icon: "🤝" },
  { title: "Innovation", icon: "💡" },
  { title: "Mentorship", icon: "👨‍🏫" },
  { title: "Tangible Impact", icon: "👍" },
];

const Careers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const jobsPerPage = 4;

  const { data } = useGetAllJobsQuery({
    page: currentPage,
    limit: jobsPerPage,
  });
  const { data: category } = useGetAllJobCategoriesQuery();
  const jobsData = data?.data?.jobs || [];
  const categoriesData = category?.data?.categories || [];
  const categories = [{ _id: "All", name: "All" }, ...categoriesData];
  const filteredJobs =
    selectedCategory === "All"
      ? jobsData
      : jobsData.filter((job) => job.category === selectedCategory);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mt-24  px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">At DNS Technology</h1>
        <h2 className="text-3xl font-extrabold text-yellow-400">#WeAreOne</h2>
      </div>

      {/* Company Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {companyValues.map((value, index) => (
          <div
            key={index}
            className="border border-gray-300 p-6 flex flex-col items-center justify-center text-center"
          >
            <span className="text-4xl mb-2">{value.icon}</span>
            <p className="font-semibold">{value.title}</p>
          </div>
        ))}
      </div>

      {/* Jobs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Career Opportunities</h2>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="category" className="font-medium">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 px-3 py-2 focus:outline-none"
          >
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Job List */}
        <div className="flex flex-col gap-4">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 px-4 py-3 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">
                  {job.category} | {job.location} | {job.type}
                </p>
              </div>
              <button
                onClick={() => navigate(`/careers/${job._id}`)}
                className="border border-blue-500 text-blue-500 px-3 py-1 hover:bg-blue-500 hover:text-white transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="border border-gray-300 px-3 py-1"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`border px-3 py-1 ${
                currentPage === num
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="border border-gray-300 px-3 py-1"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
