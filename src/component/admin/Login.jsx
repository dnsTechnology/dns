import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRegisterMutation, useLoginMutation } from "../../redux/main.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const saveWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, error, isLoading } = await register({
        name,
        email,
        password,
      });
      if (isLoading) setLoading(true);
      if (error) return toast.error(error.data.message);

      toast.success(data.message || "User registered successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await login({ email, password });

      // Handle RTK Query error
      if (error) {
        toast.error(error?.data?.message || "Login failed");
        setLoading(false);
        return;
      }

      const userData = data;

      if (!userData?.success) {
        toast.error(userData?.message || "Login failed. Try again.");
        setLoading(false);
        return;
      }

      // Save user to localStorage with 2 days expiry
      saveWithExpiry(
        "userInfo",
        JSON.stringify(userData),
        2 * 24 * 60 * 60 * 1000
      );

      // Redirect based on role
      if (userData?.data?.roles?.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success(userData?.message || "Logged in successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 p-8">
        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 text-center py-2 font-medium transition ${
              activeTab === "login"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 text-center py-2 font-medium transition ${
              activeTab === "register"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Forms */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "login" ? (
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                onClick={loginHandler}
                className="w-full py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                onClick={registerHandler}
                className="w-full py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Register
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
