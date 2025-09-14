// utils/auth.js
export const getUser = () => {
  const userStr = localStorage.getItem("userInfo");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return null;
  }
};
