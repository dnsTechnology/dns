import React, { useState } from "react";
import { useCreateProjectMutation } from "../../../redux/main.js";
import toast from "react-hot-toast";
import RichTextEditor from "../components/RichTextEditor.jsx";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [clients, setClients] = useState([]);
  const [tags, setTags] = useState([]);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [createProject] = useCreateProjectMutation();

  // ✅ Split comma-separated values into arrays
  const handleCommaSeparated = (setter) => (e) => {
    const values = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    setter(values);
  };

  // ✅ Upload Image
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        ![
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp",
        ].includes(file.type)
      ) {
        return toast.error("Invalid file type");
      }
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("File size should be less than 5MB");
      }

      const formData = new FormData();
      formData.append("file", file);

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
          `${import.meta.env.VITE_BACKEND_URL}/uploads/${data.file.filename}`
        );
      } else {
        toast.error("Upload failed");
      }
    }
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      clients.length === 0 ||
      services.length === 0 ||
      !image
    ) {
      return toast.error("Please fill all required fields");
    }

    const res = await createProject({
      name,
      description,
      clients,
      services,
      tags,
      image,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Project created successfully");
      setName("");
      setDescription("");
      setClients([]);
      setServices([]);
      setTags([]);
      setImage("");
      setPreview(null);
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Project Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">
            Project Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Clients */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Clients</label>
            <input
              type="text"
              onChange={handleCommaSeparated(setClients)}
              placeholder="Enter clients (comma separated)..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Services</label>
            <input
              type="text"
              onChange={handleCommaSeparated(setServices)}
              placeholder="Enter services (comma separated)..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">Tags</label>
          <input
            type="text"
            onChange={handleCommaSeparated(setTags)}
            placeholder="Enter tags (comma separated)..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Featured Image */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold uppercase">
            Project Image
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
          Publish Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
