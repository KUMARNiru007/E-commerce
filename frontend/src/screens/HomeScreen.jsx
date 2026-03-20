import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Corousel from "../components/Corousel";
import Rating from "../components/Rating";

export default function HomeScreen() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products = [], loading, error } = productList;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts());
  }, [dispatch]);

  const filtered = category
    ? products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div>
      <Corousel />
      {category && (
        <h2 style={{ textAlign: "center", margin: "2rem 0", fontSize: "2.4rem" }}>
          Category: {category}
        </h2>
      )}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", fontSize: "2rem" }}>Loading...</div>
      ) : error ? (
        <div className="alert alert-error" style={{ margin: "2rem" }}>{error}</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", fontSize: "2rem" }}>No products found.</div>
      ) : (
        <ul className="products">
          {filtered.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={`/product/${product._id}`}>
                  <img className="product-image" src={product.image} alt={product.name} />
                </Link>
                <Link to={`/product/${product._id}`}>
                  <div className="product-name">{product.name}</div>
                </Link>
                <div className="product-brand">{product.brand}</div>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div className="product-price">${product.price}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}