import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/main.js";
import Loading from "./Loading.jsx";
import { useDispatch } from "react-redux";
import { setProduct } from "../redux/productReducer.js";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error, isError } = useGetProductByIdQuery({ id });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message}
      </div>
    );
  if (!data) return <div className="text-center py-10">No product found</div>;

  const product = data?.data?.product || data?.data; // handle both structures

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 mb-6 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
      </button>

      <div className="gap-8 bg-white p-6">
        {/* Product Image */}
        <div className=" overflow-hidden flex items-center justify-center ">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          {product.category?.name && (
            <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 w-fit">
              {product.category.name}
            </span>
          )}

          {/* Name */}
          <h1 className="font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl">
            {product.name}
          </h1>

          {/* Brand */}
          {product.brand && (
            <p className="text-gray-600 text-sm sm:text-base">
              Brand: {product.brand}
            </p>
          )}

          {/* Stock */}
          <p
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {/* Price */}
          <p className="text-gray-900 font-semibold text-xl sm:text-2xl md:text-3xl">
            Rs {product.price}
          </p>

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h2 className="font-semibold text-lg mb-2 text-gray-800">
                Description
              </h2>
              <div
                className="text-gray-700 space-y-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6">
            <button
              disabled={product.stock === 0}
              onClick={() => {
                dispatch(setProduct(product));
                navigate(`/product/${product._id}`);
              }}
              className={`w-full bg-blue-400 text-white py-3 px-6 text-lg rounded-md hover:bg-blue-500 cursor-pointer transition-colors ${
                product.stock === 0 && "opacity-50 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Book This Product" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
