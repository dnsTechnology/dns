import { useState } from "react";
import { useCreateOrderMutation } from "../redux/main";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from ".././redux/main.js";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

export default function BookingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  !id && navigate("/products");
  id.length !== 24 && navigate("/products");
  const [createOrder] = useCreateOrderMutation();
  const product = useGetProductByIdQuery({ id }).data?.data;
  const [formData, setFormData] = useState({
    quantity: 1,
    name: "",
    email: "",
    mobile: "",
    queries: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) {
      toast.error("No product selected");
      return;
    }

    if (formData.quantity < 1 || formData.quantity > product.stock) {
      toast.error(`Quantity must be between 1 and ${product.stock}`);
      return;
    }

    const orderData = {
      name: formData.name, // In a real app, you'd get this from user auth
      email: formData.email,
      phone: formData.mobile,
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productStock: product.stock,
      quantity: formData.quantity,
      queries: formData.queries,
    };

    try {
      setLoading(true);
      await createOrder(orderData)
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast.success(response.message || "Order placed successfully");
            setFormData({
              quantity: 1,
              email: "",
              mobile: "",
              queries: "",
            });
            navigate("/products");
          } else {
            toast.error(response.message || "Failed to place order");
          }
        })
        .catch((error) => {
          console.error("Order error:", error);
          toast.error(error.data?.message || "Failed to place order");
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-lg m-10 mt-32 mx-auto bg-white border border-gray-200 p-8">
      {/* Product Info */}
      {product && (
        <div className="flex items-center gap-4 mb-6 pb-4">
          <img
            src={
              product.image
                ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${product.image}`
                : "/placeholder.svg"
            }
            alt={product.name}
            className="w-20 h-20 object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-red-600 font-semibold mt-1">${product.price}</p>
            <p
              className={`text-sm mt-1 ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book This Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min="1"
            max={product?.stock || 1}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Extra Queries */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Queries
          </label>
          <textarea
            name="queries"
            value={formData.queries}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Any special request or query..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wide"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
