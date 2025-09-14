import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../../redux/main";
import toast from "react-hot-toast";

const Blog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10; // You can adjust this
  const { data, isLoading, error, refetch } = useGetAllBlogsQuery({
    page: currentPage,
    limit: blogsPerPage,
  });

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.totalPages;
  const [deleteBlog] = useDeleteBlogMutation();

  const deleteBlogHandler = async (id) => {
    try {
      const res = await deleteBlog(id);
      if (res.data.success) {
        toast.success(res?.data?.message || "Blog deleted successfully");
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
        Failed to load blogs.
      </div>
    );
  if (!blogs.length)
    return (
      <div className="text-center py-20 text-gray-600">No blogs found.</div>
    );

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold uppercase">Blogs</h1>
        <button
          onClick={() => navigate("/admin/blogs/new?type=create")}
          className="flex items-center gap-2 text-blue-600 hover:underline border px-4 py-2"
        >
          <Plus size={16} /> New Blog
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`import.meta.env.VITE_BACKEND_URL/uploads/${blog?.featuredImage}`}
                  alt={blog.title}
                  className="w-20 h-14 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {blog?.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {blog?.description.slice(0, 30) + "..."}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/blogs/new?type=update&id=${blog._id}`)
                  }
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteBlogHandler(blog._id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
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
          className="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-point"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
