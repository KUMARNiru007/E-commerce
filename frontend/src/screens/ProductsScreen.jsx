import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listProducts, saveProduct, deleteProduct } from "../actions/productActions";

export default function ProductsScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, products = [], error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/signin");
  }, [userInfo, navigate]);

  useEffect(() => {
    if (successSave) setModalVisible(false);
    dispatch(listProducts());
  }, [dispatch, successSave, successDelete]);

  const openModal = (product = {}) => {
    setModalVisible(true);
    setId(product._id || "");
    setName(product.name || "");
    setPrice(product.price || "");
    setImage(product.image || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setCountInStock(product.countInStock || "");
    setDescription(product.description || "");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ _id: id, name, price, image, brand, category, countInStock, description }));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3 style={{ fontSize: "2.4rem" }}>Products</h3>
        <button className="button primary" onClick={() => openModal()}>+ Create Product</button>
      </div>

      {modalVisible && (
        <div className="form" style={{ minHeight: "auto", padding: "2rem 0" }}>
          <form onSubmit={submitHandler}>
            <ul className="form-container" style={{ width: "50rem" }}>
              <li><h2>{id ? "Edit Product" : "Create Product"}</h2></li>
              <li>
                {loadingSave && <div className="alert alert-loading">Saving...</div>}
                {errorSave && <div className="alert alert-error">{errorSave}</div>}
              </li>
              {[
                { label: "Name", value: name, setter: setName, type: "text" },
                { label: "Price", value: price, setter: setPrice, type: "number" },
                { label: "Image URL", value: image, setter: setImage, type: "text" },
                { label: "Brand", value: brand, setter: setBrand, type: "text" },
                { label: "Category", value: category, setter: setCategory, type: "text" },
                { label: "Count In Stock", value: countInStock, setter: setCountInStock, type: "number" },
              ].map(({ label, value, setter, type }) => (
                <li key={label}>
                  <label>{label}</label>
                  <input type={type} value={value} required onChange={(e) => setter(e.target.value)} />
                </li>
              ))}
              <li>
                <label>Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </li>
              <li>
                <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
              </li>
              <li>
                <button type="button" className="button secondary" onClick={() => setModalVisible(false)}>
                  Cancel
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      {loading ? (
        <div className="alert alert-loading">Loading products...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="product-list" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Price</th>
                <th>Category</th><th>Brand</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={{ fontSize: "1.2rem", color: "#888" }}>{product._id.slice(-6)}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <button className="product-button" onClick={() => openModal(product)}>Edit</button>
                    {" "}
                    <button
                      className="product-button secondary"
                      onClick={() => window.confirm("Delete this product?") && dispatch(deleteProduct(product._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}