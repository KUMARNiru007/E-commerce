import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";

function AppLayout() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalQty = cartItems.reduce((a, c) => a + Number(c.qty), 0);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignout = () => {
    import("js-cookie").then((Cookies) => {
      Cookies.default.remove("userInfo");
      Cookies.default.remove("cartItems");
    });
    dispatch({ type: "USER_SIGNOUT" });
    window.location.href = "/";
  };

  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={() => setSidebarOpen(true)}>&#9776;</button>
          <Link to="/">Origami</Link>
        </div>
        <div className="header-links">
          <Link to="/cart" className="cart-link">
            <span className="material-icons">shopping_cart</span>
            {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </Link>
          {userInfo ? (
            <div className="user-menu">
              <span className="user-name">{userInfo.name}</span>
              {userInfo.isAdmin && (
                <Link to="/products" className="admin-link">Admin</Link>
              )}
              <button className="signout-btn" onClick={handleSignout}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <span className="material-icons">login</span>
            </Link>
          )}
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h3>Categories</h3>
        <button className="sidebar-close-button" onClick={() => setSidebarOpen(false)}>
          <span className="material-icons">arrow_back_ios</span>
        </button>
        <ul>
          {["Mens", "Women", "Unisex", "Children"].map((cat) => (
            <li key={cat}>
              <Link to={`/?category=${cat}`} onClick={() => setSidebarOpen(false)}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main">
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Origami — All rights reserved</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;