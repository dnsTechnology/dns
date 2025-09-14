import React, { useState } from "react";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useCreateJobCategoryMutation,
  useGetAllJobCategoriesQuery,
  useUpdateJobCategoryMutation,
  useDeleteJobCategoryMutation,
} from "../../../redux/main.js";

const JobsCategories = () => {
  const { data, isLoading, refetch } = useGetAllJobCategoriesQuery();
  const [createCategory] = useCreateJobCategoryMutation();
  const [updateCategory] = useUpdateJobCategoryMutation();
  const [deleteCategory] = useDeleteJobCategoryMutation();

  const categories = data?.data?.categories ?? [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "" });
  console.log(formData);

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res?.data?.success) {
        toast.success("Job Category deleted");
        refetch();
      } else {
        toast.error(res?.data?.message || "Delete failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category?._id);
      setFormData({ name: category?.name, description: category?.description });
    } else {
      setEditingCategory("");
      setFormData({ name: "", description: "" });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        // update
        const res = await updateCategory({
          id: editingCategory,
          body: { ...formData },
        });
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Job Category updated");
          refetch();
        } else {
          toast.error(res?.data?.message || "Update failed");
        }
      } else {
        // create
        const res = await createCategory(formData);
        if (res?.data?.success) {
          toast.success("Job Category added");
          refetch();
        } else {
          toast.error(
            res?.data?.message || res?.error?.data?.message || "Create failed"
          );
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }

    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-4 w-full bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold uppercase">Job Categories</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Index</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {cat.description?.length > 50
                    ? cat.description.slice(0, 50) + "..."
                    : cat.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-200 hover:bg-gray-300"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat?._id)}
                    className="flex items-center gap-1 px-2 py-1 bg-red-200 hover:bg-red-300"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  No job categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 ">
          <div className="bg-white w-full max-w-md p-6 rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {editingCategory ? "Edit Job Category" : "Add New Job Category"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-400 px-3 py-2 focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border border-gray-400 px-3 py-2 focus:outline-none w-full"
                  rows={4}
                />
              </div>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800"
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

export default JobsCategories;
