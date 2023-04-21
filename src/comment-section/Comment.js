import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { message } from "antd";
import axios from "axios";
import Replies from "./Replies";
import { useAuth } from "../context/AuthContext";

const Comment = ({ comment }) => {
  const [togglereply, setToggleReply] = useState(false);
  const [answer, setAnswer] = useState("");
  const [auth] = useAuth();
  const { user } = auth;
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put("http://localhost:8080/api/v1/add-reply", {
        question_id: comment._id,
        username: user.name,
        reply: answer,
      })
      .then((res) => {
        message.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="d-flex align-items-center" style={{ height: "40px" }}>
        <p className="letter-circle my-auto">
          {comment.user.name?.toUpperCase().substring(0, 1)}
        </p>
        <h6 className="my-auto">{comment.user.name}</h6>
        <span
          className="my-auto"
          style={{
            color: "grey",
            marginLeft: "10px",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {new Date(comment?.timeStamp).toDateString()}
        </span>
      </div>
      <p className="ms-5">{comment.question}</p>
      <Button
        variant="outlined"
        color="secondary"
        className="ms-5 mb-3"
        onClick={() => setToggleReply(!togglereply)}
      >
        Reply
      </Button>

      {togglereply && (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              type={"text"}
              className="ms-5 mb-3 w-100"
              variant="standard"
              placeholder="Add a Reply...."
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <Button
                variant="text"
                color="secondary"
                onClick={() => setToggleReply(!togglereply)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="text" color="primary">
                Reply
              </Button>
            </div>
          </form>
        </>
      )}

      <Replies commentId={comment._id} />
    </>
  );
};

export default Comment;
