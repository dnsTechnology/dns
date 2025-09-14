import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetEnquiryByIdQuery } from "../../redux/main";

const EnquiryDetail = () => {
  const { id } = useParams();
  if (!id) return <div>No enquiry ID provided</div>;
  if (id?.length !== 24) return <div>Invalid enquiry ID</div>;

  const { data, error, isLoading } = useGetEnquiryByIdQuery({ id });
  const enquiry = data?.data;

  if (isLoading) return <div className="p-4">Loading enquiry details...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to fetch enquiry.</div>;
  if (!enquiry) return <div className="p-4">No enquiry found.</div>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Enquiry Details
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            enquiry.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {enquiry.status}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-medium">Name:</span> {enquiry.firstname}{" "}
          {enquiry.lastname || ""}
        </p>
        <p>
          <span className="font-medium">Email:</span> {enquiry.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {enquiry.phone}
        </p>
        <p>
          <span className="font-medium">Message:</span>
        </p>
        <div className="p-3 bg-gray-100 rounded-none">{enquiry.message}</div>
      </div>

      {/* Dates */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Submitted on: {new Date(enquiry.createdAt).toLocaleString()}</p>
        {enquiry.updatedAt !== enquiry.createdAt && (
          <p>Last updated: {new Date(enquiry.updatedAt).toLocaleString()}</p>
        )}
      </div>

      {/* Back button */}
      <div className="mt-6">
        <Link
          to="/admin/enquiries"
          className="px-4 py-2 bg-blue-600 text-white rounded-none  hover:bg-blue-700"
        >
          Back to Enquiries
        </Link>
      </div>
    </div>
  );
};

export default EnquiryDetail;
