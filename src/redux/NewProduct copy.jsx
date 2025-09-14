import React from "react";
import { useSearchParams } from "react-router-dom";
import CreateProduct from "./CreateProduct.jsx";
import UpdateProduct from "./UpdateProduct.jsx";

const NewProduct = () => {
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

export default NewProduct;
