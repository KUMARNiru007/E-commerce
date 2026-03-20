import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li><h2>Payment Method</h2></li>
            {["PayPal", "Stripe", "Cash on Delivery"].map((method) => (
              <li key={method} style={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}>
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor={method}>{method}</label>
              </li>
            ))}
            <li>
              <button type="submit" className="button primary">Continue</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}