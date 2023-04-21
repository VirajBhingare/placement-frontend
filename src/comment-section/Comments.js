import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import Replies from "./Replies";
import { HOST } from "../App";

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = async () => {
      await axios
        .get(`${HOST}/api/v1/get-all-comments`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllComments();
  }, []);

  return (
    <>
      {comments ? (
        <section>
          {comments.map((comment, index) => (
            <>
              <Comment comment={comment} key={index} />
            </>
          ))}
        </section>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Comments;
