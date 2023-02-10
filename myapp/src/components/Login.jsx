import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const urlLogin = "http://localhost:8080/api/auth/login";
  const urlRegister = "http://localhost:8080/api/auth/register";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(register ? urlRegister : urlLogin, data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = () => {
    setRegister(!register);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          {!register ? <h3 className="Auth-form-title">Sign In</h3> : <h3 className="Auth-form-title">Sign Up</h3>}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {!register ? (
            <p className="forgot-password text-right mt-2" onClick={handleRegister}>
              <a href="#register">register</a>
            </p>
          ) : (
            <p className="forgot-password text-right mt-2" onClick={handleRegister}>
              <a href="#login">login</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
