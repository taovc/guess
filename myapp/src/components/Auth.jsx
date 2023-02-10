import React, { useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["authorization"] = token;
    } else {
      delete axios.defaults.headers.common["authorization"];
      navigate("/login");
    }
  }, [navigate]);

  return <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
