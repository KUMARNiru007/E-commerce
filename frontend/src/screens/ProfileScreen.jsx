import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (!userInfo) navigate("/signin");
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="profile">
      <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>My Profile</h2>
      <div style={{ background: "#fff", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "1.2rem", color: "#888", marginBottom: "0.3rem" }}>NAME</div>
          <div style={{ fontSize: "2rem", fontWeight: "600" }}>{userInfo.name}</div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "1.2rem", color: "#888", marginBottom: "0.3rem" }}>EMAIL</div>
          <div style={{ fontSize: "2rem" }}>{userInfo.email}</div>
        </div>
        <div>
          <div style={{ fontSize: "1.2rem", color: "#888", marginBottom: "0.3rem" }}>ROLE</div>
          <div style={{ fontSize: "2rem" }}>
            {userInfo.isAdmin ? (
              <span style={{ color: "rgb(212,175,55)", fontWeight: "bold" }}>Admin</span>
            ) : "Customer"}
          </div>
        </div>
      </div>
    </div>
  );
}