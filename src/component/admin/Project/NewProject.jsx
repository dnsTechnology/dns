import React from "react";
import { useSearchParams } from "react-router-dom";
import CreateProduct from "./CreateProject.jsx";
import UpdateProduct from "./UpdateProject.jsx";

const NewProject = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id"); // if you pass ?id=123 in url
  console.log(type);
  if (type === "create") {
    return <CreateProduct />;
  } else if (type === "update") {
    return <UpdateProduct id={id} />;
  }

  return <div>No valid type found</div>;
};

export default NewProject;
