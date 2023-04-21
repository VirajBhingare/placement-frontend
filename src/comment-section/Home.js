import React, { useState } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import axios from "axios";
import { message } from "antd";
import Comments from "./Comments";
import { useAuth } from "../context/AuthContext";
const Home = () => {
  const [question, setQuestion] = useState("");
  const [auth] = useAuth();
  const { user } = auth;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/v1/add-query", {
        question,
        user: user,
      })
      .then((res) => {
        // setAskedQuestion(res.data.query);
        window.location.reload();
        message.success(res.data.message);
        setQuestion("");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  return (
    <>
      <main className="col-11 mx-auto d-flex flex-wrap justify-content-between py-4">
        <Card
          className="col-lg-5 col-11 mx-auto p-2"
          style={{ height: "fit-content" }}
        >
          <form onSubmit={handleSubmit}>
            <h4 style={{ color: "var(--form-heading-color)" }}>
              Add Topic Of Discussion
            </h4>
            <TextField
              className="col-12 my-3"
              type="text"
              label="Enter Message"
              multiline
              minRows={4}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Add Comment
            </Button>
          </form>
        </Card>
        <Card className="col-lg-6 col-12 mx-auto my-3 py-3 px-2 ">
          <Comments />
        </Card>
      </main>
    </>
  );
};

export default Home;
