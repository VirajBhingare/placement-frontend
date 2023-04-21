import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button, Link } from "@material-ui/core";
import moment from "moment";
import { HOST } from "../../App";
const ViewTest = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    const getAllTests = async () => {
      await axios.get(`${HOST}/api/v1/user/get-all-tests`).then((res) => {
        setTests(res.data);
      });
    };
    getAllTests();
  }, []);
  return (
    <>
      <section className="my-5 d-flex justify-content-evenly flex-wrap">
        {tests &&
          tests.map((test, index) => {
            const startDate = moment(test.range[0]);
            const endDate = moment(test.range[1]);
            const now = moment();
            const isDisabled = now.isBefore(startDate) || now.isAfter(endDate);
            return (
              <>
                <Card
                  className="col-md-3 col-12 col-sm-5 p-3 my-3 mx-1 text-center"
                  style={{ position: "relative" }}
                >
                  <Typography
                    className="d-flex justify-content-center align-items-center mx-auto my-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "darkmagenta",
                      color: "whitesmoke",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography variant="h6" className="text-center my-3">
                    {test.title}
                  </Typography>

                  <Typography className="my-2">
                    <b>From</b> :
                    {moment(test.range[0]).format("DD MMM, YYYY - h:mm A")}
                  </Typography>
                  <Typography className="my-2">
                    <b>To </b> :
                    {moment(test.range[1]).format("DD MMM, YYYY - h:mm A")}
                  </Typography>

                  {isDisabled ? (
                    <Button disabled={isDisabled} variant="outlined">
                      Click Here
                    </Button>
                  ) : (
                    <a
                      className="my-3"
                      href={test.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blueviolet" }}
                    >
                      <Button variant="outlined">Click Here</Button>
                    </a>
                  )}
                </Card>
              </>
            );
          })}
      </section>
    </>
  );
};

export default ViewTest;
