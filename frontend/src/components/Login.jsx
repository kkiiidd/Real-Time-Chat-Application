import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="account login">
      <div className="card">
        <div className="card-head">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={state.email}
                onInput={inputHandler}
              />
            </div>

            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onInput={inputHandler}
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="form-item">
              <input type="button" value="Login" className="button" />
            </div>

            <Link to="/register">Doesn't have an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
