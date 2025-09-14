import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  // Dummy data for chart
  const userData = [
    { month: "Jan", users: 30 },
    { month: "Feb", users: 50 },
    { month: "Mar", users: 70 },
    { month: "Apr", users: 90 },
    { month: "May", users: 120 },
    { month: "Jun", users: 150 },
  ];

  const recentUsers = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Bob Johnson", email: "bob@example.com" },
    { name: "Alice Brown", email: "alice@example.com" },
  ];

  const recentBlogs = [
    { title: "How to Learn React in 2025", date: "2025-07-10" },
    { title: "Top 10 JavaScript Tips", date: "2025-07-08" },
    { title: "Next.js Advanced Features", date: "2025-07-05" },
    { title: "Understanding Redux Toolkit", date: "2025-07-01" },
  ];

  return (
    <div className="flex bg-gray-100">
 

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white  ">
            <h2 className="text-gray-700 font-semibold">Users</h2>
            <p className="text-2xl font-bold mt-2">150</p>
          </div>
          <div className="p-4 bg-white  ">
            <h2 className="text-gray-700 font-semibold">Products</h2>
            <p className="text-2xl font-bold mt-2">87</p>
          </div>
          <div className="p-4 bg-white  ">
            <h2 className="text-gray-700 font-semibold">Revenue</h2>
            <p className="text-2xl font-bold mt-2">$12,450</p>  
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white  ">
            <h2 className="text-gray-700 font-semibold mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white  ">
            <h2 className="text-gray-700 font-semibold mb-4">Recent Users</h2>
            <ul className="divide-y divide-gray-200">
              {recentUsers.map((user, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span>{user.name}</span>
                  <span className="text-gray-500 text-sm">{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="p-4 bg-white  ">
          <h2 className="text-gray-700 font-semibold mb-4">Recent Blogs</h2>
          <ul className="divide-y divide-gray-200">
            {recentBlogs.map((blog, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>{blog.title}</span>
                <span className="text-gray-500 text-sm">{blog.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
