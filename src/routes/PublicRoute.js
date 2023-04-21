import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { HOST } from "../App";

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    localStorage.getItem("authToken")
      ? setUser(JSON.parse(localStorage.getItem("authToken"))?.user)
      : setUser("");
  }, [user]);
  return user ? <Navigate to={`${HOST}/dashboard`} /> : children;
};

export default PublicRoute;
