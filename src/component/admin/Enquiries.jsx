import React, { useState } from "react";
import {
  useGetAllEnquiriesQuery,
  useChangeEnquiryStatusMutation,
} from "../../redux/main.js";
import Loading from "../Loading.jsx";
import { useNavigate } from "react-router-dom";
const Enquiries = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [limit] = useState(10);
  const { data, isLoading, refetch } = useGetAllEnquiriesQuery({
    page: 1,
    limit: 5,
  });
  const [changeEnquiryStatus] = useChangeEnquiryStatusMutation();
  if (isLoading && !data?.data?.enquiries) {
    return <Loading />;
  }

  const enquiries = data?.data?.enquiries || [];
  const totalEnquiries = data?.data?.totalEnquiries || 0;
  const totalPages = Math.ceil(totalEnquiries / limit);

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const currentEnquiries = enquiries.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Pagination visibility
  const getVisiblePages = () => {
    if (totalPages <= 3) return [...Array(totalPages)].map((_, i) => i + 1);
    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  };

  return (
    <div className="p-4 m-2 bg-white">
      <h2 className="text-2xl font-bold mb-6">Enquiries</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border">S.N</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Phone</th>
              <th className="py-3 px-4 border">Message</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEnquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No enquiries available.
                </td>
              </tr>
            )}
            {currentEnquiries.map((enq, index) => (
              <tr key={enq.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border">{index + 1}</td>
                <td className="py-3 px-4 border">
                  {enq.firstname} {enq.lastname}
                </td>
                <td className="py-3 px-4 border">{enq.email}</td>
                <td className="py-3 px-4 border">{enq.phone}</td>
                <td className="py-3 px-4 border">
                  {enq?.message?.slice(0, 20)} ...
                </td>
                <td
                  className={`py-3 px-4 border font-semibold ${
                    enq.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {enq.status}
                </td>
                <td className="py-3 px-4 border flex gap-2">
                  <button
                    onClick={async () => {
                      const newStatus =
                        enq.status === "Pending" ? "Resolved" : "Pending";
                      const abc = await changeEnquiryStatus({
                        id: enq._id,
                        body: { status: newStatus },
                      });
                      console.log(abc);
                      refetch();
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm hover:bg-green-700"
                  >
                    {enq.status === "Pending" ? "Approve" : "Unresolve"}
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/admin/enquiries/${enq._id}`);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 border"
            disabled={page === 1}
          >
            Prev
          </button>
          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 border ${page === p ? "bg-gray-200" : ""}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 border"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
