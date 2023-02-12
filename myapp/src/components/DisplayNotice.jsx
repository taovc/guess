import React from "react";

const DisplaySuccess = ({ message }) => {
  return (
    <span className="w-full inline-block rounded-xl p-1 bg-green-600 text-white text-center mb-4">
      {message}
    </span>
  );
};

const DisplayError = ({ message }) => {
  return (
    <span className="w-full inline-block rounded-xl p-1 bg-red-600 text-white text-center mb-4">
      <div>{message}</div>
    </span>
  );
};

export { DisplaySuccess, DisplayError };