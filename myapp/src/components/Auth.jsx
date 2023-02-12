import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthProvider = (props) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (token && user) {
      axios
        .post("http://localhost:8080/api/auth/verify",
        {
        } , {
          headers: {
            authorization: token,
          },
        })
        .then()
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        });

      axios.defaults.headers.common["authorization"] = token;
    } else {
      delete axios.defaults.headers.common["authorization"];
      navigate("/login");
    }
  }, [navigate, token, user]);

  return <div>{props.children}</div>;
};

export default AuthProvider;
