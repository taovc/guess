import React from "react";

const DisplaySuccess = ({ message }) => {
  return <span className="display-success">{message}</span>;
};

const DisplayError = ({ message }) => {
  return (
    <span className="display-error">
      <b>{message}</b>
    </span>
  );
};

export { DisplaySuccess, DisplayError };
