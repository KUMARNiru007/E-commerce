import React from "react";

export default function MessageBox({ variant = "info", children }) {
  return (
    <div className={`alert alert-${variant === "error" ? "error" : variant === "success" ? "success" : "loading"}`}>
      {children}
    </div>
  );
}