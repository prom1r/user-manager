import React from "react";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
