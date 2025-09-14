// src/pages/ProjectDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../../redux/main.js"; // adjust path based on your setup

const ProjectDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProjectByIdQuery({ id });
  const project = data?.data;
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load project.</p>
    );
  if (!project) return <p className="text-center mt-10">No project found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      {/* Project Image */}
      <div className="w-full">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${project.image}`}
          alt={project.name}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Project Info */}
      <div className="mt-8">
        <h1 className="text-3xl font-semibold text-gray-900">{project.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: project?.description }} />

        {/* Clients */}
        {project.clients?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Clients</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {project.clients.map((client, i) => (
                <li key={i}>{client}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Services */}
        {project.services?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Services</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {project.services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 text-sm text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
