import React, { useState, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor.jsx";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";

const UpdateProject = ({ id }) => {
  const [name, setName] = useState("");
  const [clients, setClients] = useState([]);
  const [tags, setTags] = useState([]);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const {
    data: projectData,
    isLoading,
    error,
  } = useGetProjectByIdQuery({ id });
  const [updateProject] = useUpdateProjectMutation();

  const project = projectData?.data;

  // Prefill form when project is fetched
  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setClients(project.clients || []);
      setTags(project.tags || []);
      setServices(project.services || []);
      setDescription(project.description || "");
      if (project.image) {
        setImage(project.image);
        setPreview(
          `${import.meta.env.VITE_BACKEND_URL}/uploads/${project.image}`
        );
      }
    }
  }, [project]);

  if (isLoading) return <div>Loading project...</div>;
  if (error) return <div className="text-red-600">Failed to load project.</div>;

  // Handle image upload
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

  // Handle comma-separated input (for tags, services, clients)
  const handleCommaSeparatedInput = (value, setter) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setter(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name,
      clients,
      tags,
      services,
      description,
      image,
    };

    try {
      const res = await updateProject({ id, body });

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Project updated successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to update project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Update Project
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name */}
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
              value={clients.join(", ")}
              onChange={(e) =>
                handleCommaSeparatedInput(e.target.value, setClients)
              }
              placeholder="Enter clients separated by commas..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Services</label>
            <input
              type="text"
              value={services.join(", ")}
              onChange={(e) =>
                handleCommaSeparatedInput(e.target.value, setServices)
              }
              placeholder="Enter services separated by commas..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Tags</label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={(e) =>
                handleCommaSeparatedInput(e.target.value, setTags)
              }
              placeholder="Enter tags separated by commas..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
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
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
