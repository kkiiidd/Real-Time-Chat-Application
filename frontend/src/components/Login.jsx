import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { userLogin } from "../store/actions/authAction";
import { CLEAR_FAIL, CLEAR_SUCCESS } from "../store/types/authType";

const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, authenticated, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
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
  const submitHandler = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // console.log(state.email, state.password);
    // formData.append("email", state.email);
    // formData.append("password", state.password);
    dispatch(userLogin(state));
  };
  useEffect(() => {
    if (authenticated) {
      // 如果已授权，则跳转至首页 @kofeine 031023
      navigate("/");
    }
    if (successMessage) {
      // 显示成功信息 @kofeine 031023
      alert.success(successMessage);
      dispatch({ type: CLEAR_SUCCESS });
    }
    if (error) {
      // 显示所有错误信息 @kofeine 031023
      error.map((err) => alert.error(err));
      dispatch({ type: CLEAR_FAIL });
    }
  }, [successMessage, error, authenticated]);
  return (
    <div className="account login">
      <div className="card">
        <div className="card-head">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={submitHandler}>
            <div className="form-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={state.email}
                onChange={inputHandler}
              />
            </div>

            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={inputHandler}
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="form-item">
              <input type="submit" value="Login" className="button" />
            </div>

            <Link to="/register">Doesn't have an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
