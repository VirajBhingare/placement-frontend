import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { HOST } from "../App";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get(`${HOST}/api/v1/auth/check-auth`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))?.token,
        },
      });

      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    checkAuth();
  }, []);

  return ok ? children : navigate("/login");
};

export default PrivateRoute;
