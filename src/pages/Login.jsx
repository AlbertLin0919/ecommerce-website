import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/front/Nav";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  //儲存Token
  const submit = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/v2/admin/signin", data);
      //這邊因為要傳資料進去，所以要使用post，後面記得要傳入要帶的資料。
      const { token, expired, success } = res.data;
      console.log(res.data);
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      //第一個是token要儲存的值，第二個是到期日
      setIsLoading(false);
      if (success) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      setLoginState(error.response.data);
      setIsLoading(false);
    }
  };

  const inputRef = useRef(null);
  const [openEye, setOpenEye] = useState(false);
  const openEyes = () => {
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
    }
    setOpenEye(!openEye);
  };

  return (
    <>
      <Nav />
      <Loading isLoading={isLoading} />
      <div
        className="position-absolute"
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616876195047-522271be4e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
          backgroundPosition: "center center",
          opacity: "0.7",
          objectFit: "cover",
          zIndex: "-1",
        }}
      ></div>
      <div className="container">
        <div
          className="container py-5 d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 56px)" }}
        >
          <div className="col-md-5 border border-3 rounded p-6">
            <h2>管理員登入</h2>

            <div
              className={`alert alert-danger ${
                loginState.message ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {loginState.message}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label w-100 ">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-2  login-password">
              <label htmlFor="password" className="form-label w-100">
                密碼
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="請輸入密碼"
                onChange={handleChange}
                ref={inputRef}
              />
              <i
                className={`bi ${
                  openEye ? "bi-eye" : "bi-eye-slash"
                } eye-close`}
                onClick={openEyes}
              ></i>
            </div>
            <button type="button" className="btn btn-primary" onClick={submit}>
              登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
