import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useSendMailBackForOrderMutation,
  useUpdateOrderMutation,
} from "../../redux/main.js";
import Loading from "../../component/Loading.jsx";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetOrderByIdQuery(id);
  const [sendMailBack] = useSendMailBackForOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const orderDetail = data?.data;
  const productDetail = orderDetail?.product;

  // Popups
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mail states
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // Separate Update states
  const [discount, setDiscount] = useState("0");
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fill states after fetching data
  useEffect(() => {
    if (orderDetail && productDetail) {
      setSubject(`Order Confirmation - ${orderDetail?._id}`);
      setBody(
        `Hello ${orderDetail?.customer?.name},\n\nThank you for your order.`,
      );
      setDiscount(orderDetail?.product?.discount || "0");
      setName(orderDetail?.customer?.name || "");
      setProductName(productDetail?.productName || "");
      setProductPrice(productDetail?.productPrice || "");
      setQuantity(productDetail?.quantity || "");
    }
  }, [orderDetail, productDetail]);

  if (id?.length !== 24) navigate("/admin/orders");
  if (isLoading && loading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-6 text-red-600">Error loading order.</div>
    );

  return (
    <div className="w-full bg-white text-gray-900 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Order Details</h1>

        {/* Order Info */}
        <section className="bg-white p-4 md:p-6 border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Customer:</p>
              <p>{orderDetail?.customer?.name}</p>
            </div>
            <div>
              <p className="font-medium">Order Date:</p>
              <p>{orderDetail?.createdAt}</p>
            </div>
            <div>
              <p className="font-medium">Status:</p>
              <p>{orderDetail?.status}</p>
            </div>
            <div>
              <p className="font-medium">Total:</p>
              <p>Rs. {orderDetail?.totalPrice}</p>
            </div>

            <div>
              <p className="font-medium">Discount:</p>
              <p>{productDetail?.discount || 0} %</p>
            </div>
          </div>
        </section>

        {/* Product Info */}
        <section className="bg-white p-4 md:p-6 border   border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Product</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border  border-gray-300">Product</th>
                  <th className="p-2 border  border-gray-300">Quantity</th>
                  <th className="p-2 border  border-gray-300">Price</th>
                  <th className="p-2 border  border-gray-300">Discount</th>
                  <th className="p-2 border  border-gray-300">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border  border-gray-300">
                    {productDetail?.productName}
                  </td>
                  <td className="p-2 border  border-gray-300">
                    {productDetail?.quantity}
                  </td>
                  <td className="p-2 border  border-gray-300">
                    {productDetail?.productPrice}
                  </td>
                  <td className="p-2 border  border-gray-300">
                    {productDetail?.discount} %
                  </td>
                  <td className="p-2 border  border-gray-300">
                    {Number(productDetail?.quantity) *
                      Number(productDetail?.productPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-white p-4 md:p-6 border  border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowMailPopup(true)}
              className="px-4 py-2 bg-blue-600 text-white uppercase text-xs font-semibold"
            >
              Send Mail Reply
            </button>
            <button
              onClick={() => setShowUpdatePopup(true)}
              className="px-4 py-2 bg-green-600 text-white uppercase text-xs font-semibold"
            >
              Edit Order
            </button>
          </div>
        </section>

        {/* Mail Popup */}
        {showMailPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 border border-gray-300 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Automated Mail Reply</h2>
                <button onClick={() => setShowMailPopup(false)}>✕</button>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 p-2 text-sm"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mail Body:
                </label>
                <textarea
                  rows="5"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full border border-gray-300 p-2 text-sm"
                />
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-300 border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Quantity</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Discount</th>
                      <th className="p-2 border">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">
                        {productDetail?.productName}
                      </td>
                      <td className="p-2 border">{productDetail?.quantity}</td>
                      <td className="p-2 border">
                        {productDetail?.productPrice}
                      </td>
                      <td className="p-2 border">{productDetail?.discount}</td>
                      <td className="p-2 border">
                        {Number(productDetail?.quantity) *
                          Number(productDetail?.productPrice) -
                          (Number(productDetail?.quantity) *
                            Number(productDetail?.productPrice) *
                            Number(productDetail?.discount)) /
                            100}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowMailPopup(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const bodyData = {
                        id,
                        subject,
                        mailbody: body,
                      };
                      const response = await sendMailBack(bodyData);
                      if (response.data?.success) {
                        toast.success(
                          response?.data?.message ||
                            "successfully send mail to user.",
                        );
                      } else {
                        toast.error(
                          response?.data?.message ||
                            "Failed to send mail to user.",
                        );
                      }
                    } catch (err) {
                      console.log(err);
                      toast.err("Internal server error.");
                    } finally {
                      setShowMailPopup(false);
                      setLoading(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-xs uppercase"
                >
                  Send Mail
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Order Popup */}
        {showUpdatePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 border border-gray-300 space-y-4 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Update Order</h2>
                <button onClick={() => setShowUpdatePopup(false)}>✕</button>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 uppercase">
                    Discount
                  </label>
                  <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 uppercase">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 uppercase">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 uppercase">
                    Product Price
                  </label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 uppercase">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 p-2 text-sm"
                  />
                </div>
              </form>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowUpdatePopup(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await updateOrder({
                      id,
                      body: {
                        discount,
                        name,
                        productName,
                        productPrice,
                        quantity,
                      },
                    });
                    setShowUpdatePopup(false);
                    refetch(); // refresh after update
                  }}
                  className="px-4 py-2 bg-green-600 text-white text-xs uppercase"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
