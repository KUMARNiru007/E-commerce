import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product = {}, loading, error } = productDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <div className="back-to-result" style={{ padding: "1rem 2rem" }}>
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", fontSize: "2rem" }}>Loading...</div>
      ) : error ? (
        <div className="alert alert-error" style={{ margin: "2rem" }}>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="details-info">
            <ul>
              <li><h4 style={{ color: "#888", fontSize: "1.6rem" }}>{product.brand}</h4></li>
              <li><h1 style={{ fontSize: "3rem" }}>{product.name}</h1></li>
              <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
              <li style={{ fontSize: "3rem", fontWeight: "bold" }}>${product.price}</li>
              <li style={{ color: "#555" }}>{product.description}</li>
              <li>
                <label style={{ marginRight: "1rem" }}>Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{ padding: "0.5rem", fontSize: "1.6rem" }}
                >
                  {product.countInStock > 0
                    ? [...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))
                    : <option>0</option>}
                </select>
              </li>
              <li>
                <span style={{ fontWeight: "600", color: product.countInStock > 0 ? "green" : "red" }}>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}