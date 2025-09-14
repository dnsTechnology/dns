import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor.jsx";
import {
  useGetAllCategoriesQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";

const UpdateBlog = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: blogData, isLoading, error } = useGetBlogByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();

  const categories = categoriesData?.data?.categories ?? [];
  const blog = blogData?.data;
  console.log(blog);
  // Prefill form with blog data when fetched
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setDescription(blog.description || "");
      setCategory(blog.category?._id || "");
      setTags(blog.tags?.join(", ") || "");
      if (blog.featuredImage) {
        setImage(blog.featuredImage);
        setPreview(
          `${import.meta.env.VITE_BACKEND_URL}/uploads/${blog.featuredImage}`
        );
      }
    }
  }, [blog]);

  if (isLoading) return <div>Loading blog...</div>;
  if (error) return <div className="text-red-600">Failed to load blog.</div>;

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.ok) {
          const data = await res.json();
          setImage(data.file.filename);
          setPreview(
            `import.meta.env.VITE_BACKEND_URL/uploads/${data.file.filename}`
          );
        } else {
          toast.error("Image upload failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong during upload");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      category,
      tags: tags.split(",").map((t) => t.trim()),
      image,
    };

    try {
      const res = await updateBlog({ id, body });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Blog updated successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Update Blog
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold uppercase">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-400 px-4 py-2 cursor-pointer focus:outline-none focus:border-black"
          />
          {preview && (
            <div className="border border-gray-400 p-2">
              <img src={preview} alt="Preview" className="w-full max-h-80" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 uppercase font-semibold tracking-wider hover:opacity-80 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
