import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [matchError, setMatchError] = useState("");

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) navigate(`/${redirect}`);
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMatchError("Passwords do not match.");
      return;
    }
    setMatchError("");
    dispatch(register(name, email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li><h2>Create Account</h2></li>
          <li>
            {loading && <div className="alert alert-loading">Loading...</div>}
            {error && <div className="alert alert-error">{error}</div>}
            {matchError && <div className="alert alert-error">{matchError}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
          </li>
          <li>
            <label htmlFor="repassword">Confirm Password</label>
            <input type="password" id="repassword" required onChange={(e) => setRePassword(e.target.value)} />
          </li>
          <li>
            <button type="submit" className="button primary">Register</button>
          </li>
          <li>Already have an account?</li>
          <li>
            <Link
              to={redirect === "/" ? "/signin" : `/signin?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}