import React, { useState } from "react";
import {
  useCreateTeamMutation,
  useGetAllTeamsQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} from "../../redux/main";
import toast from "react-hot-toast";

const Team = () => {
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    qualification: "",
    linkedin: "",
    portfolio: "",
    intro: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState("create");

  const { data, isLoading, refetch } = useGetAllTeamsQuery();
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const team = data?.data || [];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Handle image change & preview
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    if (file.size > 5 * 1024 * 1024)
      return toast.error("File size must be < 5MB");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setNewMember({ ...newMember, image: data?.file?.filename });
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  // Handle add or update
  const handleSaveMember = async () => {
    try {
      if (editId && type === "update") {
        await updateTeam({ id: editId, body: newMember }).unwrap();
        toast.success("Team member updated successfully");
      } else {
        await createTeam({ body: newMember }).unwrap();
        toast.success("Team member created successfully");
      }
      refetch();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  // Handle edit
  const handleEdit = (member) => {
    setNewMember(member);
    setImagePreview(member.image || null);
    setEditId(member._id);
    setIsOpen(true);
  };

  const resetForm = () => {
    setNewMember({
      name: "",
      email: "",
      role: "",
      qualification: "",
      linkedin: "",
      portfolio: "",
      intro: "",
      image: "",
    });
    setImagePreview(null);
    setEditId(null);
    setIsOpen(false);
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Our Team</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          {editId ? "Edit Member" : "Add Member"}
        </button>
      </div>

      {/* Team Table */}
      <div className="overflow-x-auto border border-gray-200 ">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Qualification</th>
              <th className="border px-4 py-2">LinkedIn</th>
              <th className="border px-4 py-2">Portfolio</th>
              <th className="border px-4 py-2">Intro</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : team.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No team members found.
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <img
                      src={`
                        ${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        member.image
                      }
                        `}
                      alt={member.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="border px-4 py-2">{member.name}</td>
                  <td className="border px-4 py-2">{member.email}</td>
                  <td className="border px-4 py-2">{member.role}</td>
                  <td className="border px-4 py-2">{member.qualification}</td>
                  <td className="border px-4 py-2 text-blue-600 underline">
                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </td>
                  <td className="border px-4 py-2 text-blue-600 underline">
                    <a href={member.portfolio} target="_blank" rel="noreferrer">
                      Portfolio
                    </a>
                  </td>
                  <td className="border px-4 py-2">{member.intro}</td>
                  <td className="border px-4 py-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        // Handle edit
                        setType("update");
                        handleEdit(member);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        // Handle delete
                        if (
                          !window.confirm(
                            "Are you sure you want to delete this member?"
                          )
                        )
                          return;
                        try {
                          const res = await deleteTeam(member._id);
                          console.log(res);
                          toast.success("Team member deleted");
                          refetch();
                        } catch (err) {
                          console.error(err);
                          toast.error("Delete failed");
                        }
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Team Member" : "Add Team Member"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newMember.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newMember.role}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={newMember.qualification}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={newMember.linkedin}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio URL"
                value={newMember.portfolio}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="intro"
                placeholder="Intro"
                value={newMember.intro}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded"
              />
              {imagePreview && (
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/uploads/${imagePreview}`}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded mt-2"
                />
              )}
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button onClick={resetForm} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleSaveMember}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
