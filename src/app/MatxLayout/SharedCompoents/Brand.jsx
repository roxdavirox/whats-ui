import React from "react";
import MatxLogo from "./MatxLogo";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        {/* <img src="/assets/images/logo.png" alt="company-logo" /> */}
        <MatxLogo className="" />
        <span className="brand__text ml-2">Whats UP</span>
      </div>
      {children}
    </div>
  );
};

export default Brand;
