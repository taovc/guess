import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios.defaults.headers.common["authorization"] = token;
    } else {
      delete axios.defaults.headers.common["authorization"];
      navigate("/login");
    }
  }, [token, navigate]);

  return <AuthContext.Provider value={{ token, setToken }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
