import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          boxShadow: "none", // 🚀 removes shadow
          border: "1px solid #e5e7eb", // optional: flat border
          background: "#fff", // light theme background
          color: "#000", // text color
          borderRadius: "0px",
          textTransform: "uppercase",
          fontSize: "12px",
        },
      }}
    />
    <App />
  </Provider>
);
