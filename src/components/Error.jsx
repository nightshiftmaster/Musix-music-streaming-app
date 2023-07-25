import React from "react";

const Error = ({ title }) => (
  <div className="w-full flex justify-center items-center p-8 mt-5 mb-5">
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || "Somthing went wrong. Please try again."}
    </h1>
  </div>
);

export default Error;
