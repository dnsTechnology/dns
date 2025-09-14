import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // this auto updates when URL changes

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // or "auto"
    });
  }, [pathname]); // re-run useEffect every time the path changes

  return null;
}
