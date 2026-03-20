import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) navigate(`/${redirect}`);
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li><h2>Sign In</h2></li>
          <li>
            {loading && <div className="alert alert-loading">Loading...</div>}
            {error && <div className="alert alert-error">{error}</div>}
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
            <button type="submit" className="button primary">Sign In</button>
          </li>
          <li>New to Origami?</li>
          <li>
            <Link
              to={redirect === "/" ? "/register" : `/register?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Create your Origami account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}