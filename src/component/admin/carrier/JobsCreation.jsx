import React from "react";
import { useSearchParams } from "react-router-dom";
import NewJob from "./NewJob.jsx";
import UpdateJob from "./UpdateJob.jsx";

const JobsCreation = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id"); // if you pass ?id=123 in url
  console.log(type);
  if (type === "create") {
    console.log(type);
    return <NewJob />;
  } else if (type === "update") {
    return <UpdateJob id={id} />;
  }

  return <div>No valid type found</div>;
};

export default JobsCreation;
