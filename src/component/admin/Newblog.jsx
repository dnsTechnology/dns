import React from "react";
import { useSearchParams } from "react-router-dom";
import CreateBlog from "./components/CreateBlog.jsx";
import UpdateBlog from "./components/UpdateBlog.jsx";

const Newblog = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id"); // if you pass ?id=123 in url

  if (type === "create") {
    return <CreateBlog />;
  } else if (type === "update") {
    return <UpdateBlog id={id} />;
  }

  return <div>No valid type found</div>;
};

export default Newblog;
