import React, { useState } from "react";
import {
  useGetAllProductCategoriesQuery,
  useCreateProductMutation,
} from "../../../redux/main.js";
import toast from "react-hot-toast";
import RichTextEditor from "../components/RichTextEditor.jsx";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [createProduct] = useCreateProductMutation();
  const { data } = useGetAllProductCategoriesQuery();

  const categories = data?.data?.categories ?? [];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      return toast.error("Please fill all required fields");
    }

    const res = await createProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      brand,
      discount: Number(discount),
      image,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Product created successfully");
      setName("");
      setDescription("");
      setPrice("");
      setStock(0);
      setCategory("");
      setBrand("");
      setDiscount(0);
      setImage("");
      setPreview(null);
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
        Create New Product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold uppercase">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name..."
            className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">
              Price (Rs.)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
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

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Discount */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount..."
              className="w-full border border-gray-400 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold uppercase">
            Product Image
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
          Publish Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
