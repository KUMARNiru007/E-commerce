import React from "react";

export default function Rating({ rating, numReviews }) {
  return (
    <div className="rating" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "rgb(212,175,55)", fontSize: "1.8rem" }}>
        {"★".repeat(Math.floor(rating))}
        {"☆".repeat(5 - Math.floor(rating))}
      </span>
      {numReviews !== undefined && (
        <span style={{ fontSize: "1.4rem", color: "#888" }}>({numReviews} reviews)</span>
      )}
    </div>
  );
}