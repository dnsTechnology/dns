import React, { useState, useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useChangeStatusMutation,
} from "../../redux/main";
import { useNavigate } from "react-router-dom";

const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

const Order = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [limit] = useState(10); // items per page
  const [selectedOrder, setSelectedOrder] = useState(null); // for modal
  const [newStatus, setNewStatus] = useState("");

  const { data, error, isLoading, refetch } = useGetAllOrdersQuery({
    page,
    limit,
  });

  const orders = data?.data?.orders || [];
  const totalOrders = data?.data?.totalOrders || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  const [changeStatus] = useChangeStatusMutation();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) return [...Array(totalPages).keys()].map((i) => i + 1);
    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="p-4 m-2 bg-white">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {isLoading ? (
        <div className="text-center py-6">Loading orders...</div>
      ) : error ? (
        <div className="text-center py-6 text-red-600">
          Error loading orders.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 border">Customer</th>
                  <th className="py-3 px-4 border">Email</th>
                  <th className="py-3 px-4 border">Product</th>
                  <th className="py-3 px-4 border">Quantity</th>
                  <th className="py-3 px-4 border">Price (Rs)</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No orders available.
                    </td>
                  </tr>
                )}
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border">{order.customer.name}</td>
                    <td className="py-3 px-4 border">{order.customer.email}</td>
                    <td className="py-3 px-4 border">
                      {order.product.productName}
                    </td>
                    <td className="py-3 px-4 border">
                      {order.product.quantity}
                    </td>
                    <td className="py-3 px-4 border">
                      {order.product.productPrice}
                    </td>
                    <td
                      className={`py-3 px-4 border font-semibold ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-3 px-4 border flex gap-2">
                      <button
                        onClick={() => openStatusModal(order)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/admin/orders/${order?._id}`);
                        }}
                        className="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer"
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
                  className={`px-3 py-1 border ${
                    page === p ? "bg-gray-200" : ""
                  }`}
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
        </>
      )}

      {/* Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-96 border border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Change Order Status</h3>
            <p className="mb-2">Order: {selectedOrder.product.productName}</p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border px-3 py-2 mb-4"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 border">
                Cancel
              </button>
              <button
                onClick={async () => {
                  await changeStatus({
                    id: selectedOrder._id,
                    body: { status: newStatus },
                  });
                  closeModal();
                  refetch();
                }}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
