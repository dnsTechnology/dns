import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetallApplicationswithJobIdQuery } from "../../../redux/main.js";
import {
  FiDownload,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const AllApplications = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } =
    useGetallApplicationswithJobIdQuery({ id });
  const [expandedRows, setExpandedRows] = useState({});

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p>Loading applications...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Error: {error?.data?.message || "Failed to load applications"}</p>
      </div>
    );
  }

  const applications = data?.data || [];

  const toggleExpand = (appId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Job Applications</h1>

      <div className="overflow-x-auto border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Full Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Mobile</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <React.Fragment key={app._id}>
                  <tr className="hover:bg-gray-100">
                    <td className="p-3 border border-gray-300">{index + 1}</td>
                    <td className="p-3 border border-gray-300">
                      {app.fullName}
                    </td>
                    <td className="p-3 border border-gray-300">{app.email}</td>
                    <td className="p-3 border border-gray-300">{app.mobile}</td>
                    <td className="p-3 border border-gray-300">
                      <button
                        onClick={() => toggleExpand(app._id)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        {expandedRows[app._id] ? (
                          <>
                            Collapse <FiChevronUp />
                          </>
                        ) : (
                          <>
                            Expand <FiChevronDown />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedRows[app._id] && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="p-3 border border-gray-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Resume */}
                          <div>
                            <strong>Resume:</strong>{" "}
                            {app.resume ? (
                              <a
                                href={`${import.meta.env.VITE_BACKEND_URL}/${
                                  app.resume
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                View <FiDownload />
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </div>

                          {/* Experience */}
                          <div>
                            <strong>Experience:</strong>{" "}
                            {app.experience || "N/A"}
                          </div>

                          {/* Skills */}
                          <div>
                            <strong>Skills:</strong>{" "}
                            {app?.skills?.foreach((skill) => {
                              return <span>{skill}</span>;
                            })}
                          </div>

                          {/* LinkedIn */}
                          <div>
                            <strong>LinkedIn:</strong>{" "}
                            {app.linkedin ? (
                              <a
                                href={app.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                Visit <FiExternalLink />
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </div>

                          {/* Portfolio */}
                          <div>
                            <strong>Portfolio:</strong>{" "}
                            {app.portfolio ? (
                              <a
                                href={app.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                Visit <FiExternalLink />
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </div>

                          {/* Additional Info */}
                          <div className="md:col-span-2">
                            <strong>Additional Info:</strong>{" "}
                            {app.additionalInfo || "N/A"}
                          </div>

                          {/* Cover Letter at the end */}
                          <div className="md:col-span-2 border-t border-gray-300 pt-4 mt-4">
                            <strong>Cover Letter:</strong>
                            <div className="whitespace-pre-wrap mt-1 text-gray-800 bg-gray-100 p-3">
                              {app.coverLetter || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-3">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApplications;
