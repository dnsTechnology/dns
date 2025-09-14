import React, { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useCreateBlogMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";
import RichTextEditor from "./RichTextEditor.jsx";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [createBlog] = useCreateBlogMutation();
  const { data } = useGetAllCategoriesQuery();

  const categories = data?.data?.categories ?? [];

  if (!categories) {
    return <div>Loading...</div>;
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp"
      ) {
        return toast.error("Invalid file type");
      }
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("File size should be less than 5MB");
      }
      //)
      const formData = new FormData();
      formData.append("file", file); // <-- must match backend field name

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: formData, // don't set Content-Type, browser will handle it
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setImage(data.file.filename);
        setPreview(
          `${import.meta.env.VITE_BACKEND_URL}/uploads/${data.file.filename}`
        );
      } else {
        console.error("Upload failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createBlog({
      title,
      description,
      category,
      tags: tags.split(", ").map((t) => t.trim()),
      image,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message || "Blog created successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setTags("");
      setImage("");
      setPreview(null);
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Create New Blog
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

        <div className=" grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            >
              <option value="all">Select Category</option>
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
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
