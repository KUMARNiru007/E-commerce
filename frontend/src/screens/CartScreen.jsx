import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

export default function CartScreen() {
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    navigate("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h1 style={{ fontSize: "2.4rem" }}>Shopping Cart</h1>
            <div style={{ fontSize: "1.8rem", fontWeight: "600" }}>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <li style={{ justifyContent: "center", padding: "4rem" }}>
              <div>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </div>
            </li>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <label>Qty:</label>
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      style={{ padding: "0.3rem", fontSize: "1.4rem" }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                    <button
                      className="cart-button"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-price">${(item.price * item.qty).toFixed(2)}</div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="cart-action">
        <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
        </h3>
        <div style={{ fontSize: "2.8rem", fontWeight: "bold", marginBottom: "2rem" }}>
          ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
        </div>
        <button
          className="button primary full-width"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}