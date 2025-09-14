import React, { useState } from "react";
import { Pencil, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllJobsQuery,
  useDeleteJobMutation,
} from "../../../redux/main.js";
import Loading from "../../Loading.jsx";

const CareerManagement = () => {
  const navigate = useNavigate();
  const limit = 15; // number of jobs per page
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isError, refetch } = useGetAllJobsQuery({
    page: currentPage,
    limit,
  });

  const [deleteJob] = useDeleteJobMutation();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      const response = await deleteJob(id).unwrap();
      if (response.success) {
        alert(response.message || "Job deleted successfully");
        refetch();
      } else {
        alert(response.message || "Failed to delete job. Please try again.");
      }
    } catch (error) {
      console.error("Delete job error:", error);
      alert(error.data?.message || "Failed to delete job. Please try again.");
    }
  };

  const jobs = data?.data?.jobs || [];
  const totalPages = data?.data?.totalPages || 1;

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-600">
        Error: {error?.data?.message || "Failed to load jobs"}
      </div>
    );

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-6">Career Management</h1>
        <div className="right flex gap-2">
          <button
            onClick={() => navigate("/admin/careers/categories")}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => navigate("/admin/careers/new?type=create")}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Post New Job
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Category</th>
              <th className="p-3 border border-gray-300">Location</th>
              <th className="p-3 border border-gray-300">Type</th>
              <th className="p-3 border border-gray-300">Salary</th>
              <th className="p-3 border border-gray-300">Company</th>
              <th className="p-3 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{job.title}</td>
                  <td className="p-3 border border-gray-300">
                    {job.createdAt?.toString().substring(0, 10)}
                  </td>
                  <td className="p-3 border border-gray-300">{job.category}</td>
                  <td className="p-3 border border-gray-300">{job.location}</td>
                  <td className="p-3 border border-gray-300">{job.type}</td>
                  <td className="p-3 border border-gray-300">
                    {job.salaryRange}
                  </td>
                  <td className="p-3 border border-gray-300">{job.company}</td>
                  <td className="p-3 border border-gray-300 flex gap-3 justify-center">
                    {/* Update Job */}
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Update Job"
                      onClick={() =>
                        navigate(`/admin/careers/new?type=update&id=${job._id}`)
                      }
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete Job */}
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Job"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* View Applicants */}
                    <button
                      onClick={() =>
                        navigate(`/admin/careers/applications/${job._id}`)
                      }
                      className="text-green-600 hover:text-green-800"
                      title="View Applicants"
                    >
                      <Users size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-3 border border-gray-300"
                >
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            refetch();
          }}
          className="px-3 py-1 border border-gray-400 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              setCurrentPage(i + 1);
              refetch();
            }}
            className={`px-3 py-1 border border-gray-400 ${
              currentPage === i + 1 ? "bg-gray-200 font-bold" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            refetch();
          }}
          className="px-3 py-1 border border-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CareerManagement;
