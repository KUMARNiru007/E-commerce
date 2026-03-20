import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!shipping.address) navigate("/shipping");
    else if (!payment.paymentMethod) navigate("/payment");
  }, [shipping, payment, navigate]);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = parseFloat((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const placeOrderHandler = () => {
    // TODO: connect to orders API
    dispatch(clearCart());
    alert("Order placed successfully! Thank you for shopping with Origami.");
    navigate("/");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <p>
              {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
            </p>
          </div>
          <div>
            <h3>Payment</h3>
            <p>Method: {payment.paymentMethod}</p>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Order Items</h3>
                <div style={{ fontWeight: "600" }}>Price</div>
              </li>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-name">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <div style={{ fontSize: "1.4rem", color: "#666", marginTop: "0.3rem" }}>
                      Qty: {item.qty}
                    </div>
                  </div>
                  <div className="cart-price">${(item.price * item.qty).toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            <li>
              <button className="button primary full-width" onClick={placeOrderHandler}>
                Place Order
              </button>
            </li>
            <li><h3>Order Summary</h3></li>
            <li><div>Items</div><div>${itemsPrice.toFixed(2)}</div></li>
            <li><div>Shipping</div><div>${shippingPrice.toFixed(2)}</div></li>
            <li><div>Tax (15%)</div><div>${taxPrice}</div></li>
            <li><div>Total</div><div>${totalPrice}</div></li>
          </ul>
        </div>
      </div>
    </div>
  );
}