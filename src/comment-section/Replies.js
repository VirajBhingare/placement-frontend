import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { HOST } from "../App";

const Replies = ({ commentId }) => {
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    const getAllReplies = async () => {
      await axios
        .get(`${HOST}/api/v1/get-all-replies/${commentId}`)
        .then((res) => {
          setReplies(res.data.replies);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllReplies();
  }, []);

  return (
    <>
      {replies?.length > 0 && (
        <ul className="col-12 d-flex flex-column">
          <Accordion className="col-12">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="primary">
                Replies({replies?.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="col-12 d-flex flex-wrap">
              {replies.map((reply, index) => (
                <>
                  <Typography className="col-12">
                    <li key={index} className="col-12">
                      <div className="d-flex col-12">
                        <p className="letter-circle">
                          {reply?.user.toUpperCase().substring(0, 1)}
                        </p>
                        <h6>{reply?.user}</h6>
                        <span
                          style={{
                            color: "grey",
                            marginLeft: "10px",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                        >
                          {new Date(reply?.timestamp).toDateString()}
                        </span>
                      </div>
                      <p className="ms-5">{reply.reply}</p>
                    </li>
                  </Typography>
                </>
              ))}
            </AccordionDetails>
          </Accordion>
        </ul>
      )}
    </>
  );
};

export default Replies;
