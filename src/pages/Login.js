import { message, Form, Avatar } from "antd";
import { TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../styles/login.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
const Login = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    // dispatch(setLoading(true));
    await axios
      .post("http://localhost:8080/api/v1/auth/login", values)
      .then((res) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: res.data.token,
            user: res.data.user,
          })
        );

        setAuth({ ...auth, user: res.data.user, token: res.data.token });

        if (res.data.user.role === 0) {
          navigate("/student/dashboard");
          toast.success("student logIn success");
        } else if (res.data.user.role === 1) {
          navigate("/admin/dashboard");
          toast.success("admin logIn success");
        } else if (res.data.user.role === 2) {
          navigate(`/hr/dashboard/${res.data.user._id}`);
          toast.success("hr logIn success");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section className="login col-11 d-flex">
        <div className="flex-2">
          <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1680892600~exp=1680893200~hmac=11ac2401c67da5b6c304d53ea7b1b8a34dd9f60bcbb7399eaaa4457597e6ba17" />
        </div>
        <div className="col-md-5 col-sm-8 col-11 mx-auto text-center">
          <Form
            style={{
              // boxShadow: "1px 2px 10px aqua",
              background: "transparent",
              padding: "20px 10px",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Avatar className=" avatar my-3">
              <LockOutlinedIcon />
            </Avatar>

            <h4>Sign In</h4>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <TextField
                type={"email"}
                label="Email"
                placeholder="enter valid email"
                variant="outlined"
                className="col-12 my-3"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <TextField
                type={"password"}
                label="Password"
                placeholder="enter password"
                variant="outlined"
                className="col-12 my-3"
              />
            </Form.Item>

            <Button
              className="col-12"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
