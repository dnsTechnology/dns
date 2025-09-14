import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useRemoveProductMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";

const ProductsAll = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const { data, isLoading, error, refetch } = useGetAllProductsQuery({
    page: currentPage,
    limit: productsPerPage,
  });

  const products = data?.data?.products || [];
  const totalPages = data?.data?.pagination?.totalPages || 1;
  const [deleteProduct] = useRemoveProductMutation();

  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.data.success) {
        toast.success(res?.data?.message || "Product deleted successfully");
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
        Failed to load products.
      </div>
    );

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold uppercase">Products</h1>
        <button
          onClick={() => navigate("/admin/product/new?type=create")}
          className="flex items-center gap-2 text-blue-600 hover:underline border px-4 py-2"
        >
          <Plus size={16} /> New Product
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Discount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!products.length ? (
            <tr className="text-center">
              <td colSpan="8" className="py-2">
                No products found
              </td>
            </tr>
          ) : (
            products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {product.image ? (
                    <img
                      src={`import.meta.env.VITE_BACKEND_URL/uploads/${product.image}`}
                      alt={product.name}
                      className="w-20 h-14 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Rs. {product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.category?.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.brand || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.discount || 0}%
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/product/new?type=update&id=${product._id}`
                      )
                    }
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProductHandler(product._id)}
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border border-gray-300 ${
              currentPage === i + 1 ? "bg-gray-200" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsAll;
