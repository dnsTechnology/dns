import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";

const ProjectsAll = () => {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetAllProjectsQuery();
  const projects = data?.data || [];
  const [deleteProject] = useDeleteProjectMutation();

  const deleteProjectHandler = async (id) => {
    try {
      const res = await deleteProject({ id });
      if (res.data.success) {
        toast.success(res?.data?.message || "Project deleted successfully");
        refetch();
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load projects.
      </div>
    );

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold uppercase">Projects</h1>
        <button
          onClick={() => navigate("/admin/project/new?type=create")}
          className="flex items-center gap-2 text-blue-600 hover:underline border px-4 py-2"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Clients</th>
            <th className="border border-gray-300 px-4 py-2">Services</th>
            <th className="border border-gray-300 px-4 py-2">Tags</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!projects.length ? (
            <tr className="text-center">
              <td colSpan="6" className="py-2">
                No projects found
              </td>
            </tr>
          ) : (
            projects?.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {project.image ? (
                    <img
                      src={`import.meta.env.VITE_BACKEND_URL/uploads/${project.image}`}
                      alt={project.name}
                      className="w-10 h-6 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.clients?.join(", ") || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.services?.join(", ") || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.tags?.join(", ") || "-"}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/project/new?type=update&id=${project._id}`
                      )
                    }
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProjectHandler(project._id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsAll;
