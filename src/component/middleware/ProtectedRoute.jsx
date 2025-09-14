// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  const data = JSON.parse(userInfo?.value)?.data;
  // Not logged in
  if (!data) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only access check
  if (!adminOnly && !data?.roles.includes("admin")) {
    return <Navigate to="/" replace />;
  }

  // User is allowed
  return children;
};

export default ProtectedRoute;
