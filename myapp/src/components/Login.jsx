import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import Form from "./Form";
import { DisplayError } from "./DisplayNotice";

const urlLogin = "http://localhost:8080/api/auth/login";
const urlRegister = "http://localhost:8080/api/auth/register";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [callbackmsg, setCallbackmsg] = useState("");
  const [isOk, setisOk] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e, values) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(register ? urlRegister : urlLogin, data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setisOk(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setCallbackmsg(err?.response?.data?.error);
        setisOk(false);
        setTimeout(() => {
          setisOk(true);
        }, 3000);
      });
  };

  const handleRegister = () => {
    setRegister(!register);
  };

  const formFields = [
    {
      type: "email",
      name: "email",
      label: "Email address",
      placeholder: "Enter email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const formTitle = !register ? "Sign In" : "Sign Up";

  return (
    <div className="Auth-form-container">
      {!isOk && <DisplayError message={callbackmsg} />}
      <Form fields={formFields} title={formTitle} onSubmit={handleSubmit} />
      <Button className="Auth-form-container-button" onClick={handleRegister}>
        {!register ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
}
