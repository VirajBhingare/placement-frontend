import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { HOST } from "../../App";
const StudentDashboard = () => {
  const [{ user }] = useAuth();
  const [profile, setProfile] = useState({});
  const [applied, setApplied] = useState([]);
  useEffect(() => {
    axios.get(`${HOST}/api/v1/user/get-profile-url/${user._id}`).then((res) => {
      setProfile(res.data[0]);
      setApplied(res.data[0].drivesApplied);
    });
  }, []);

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 400,
    },
    {
      field: "driveDate",
      headerName: "Drive Date",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.driveDate).toDateString()}
        </p>
      ),
    },
    // {
    //   field: "postedBy",
    //   headerName: "Posted By",
    //   width: 200,
    //   valueGetter: (params) => params.row.postedBy.name,
    // },
    {
      field: "postedAt",
      headerName: "Posted on",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.postedAt).toDateString()}
        </p>
      ),
    },
  ];
  return (
    <>
      {profile && (
        <Paper className="p-3 d-flex justify-content-between align-items-center flex-wrap">
          <div className="col-12 col-md-4 col-lg-3 image-box mb-3">
            <h5 className="mb-2">Profile Picture</h5>
            <img src={profile?.photourl} width={"100%"} />
          </div>
          <div className="col-12 col-md-8 col-lg-8 ">
            <h5 className="mb-2">Profile Details</h5>
            <section className="col-12 d-flex flex-wrap justify-content-start">
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Name</b> :{user?.name}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Email</b> : {user?.email}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Branch</b> : {profile?.branch}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Division</b> : {profile?.engineering_division}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Aggregate CGPA</b> :{" "}
                {profile?.engineeringAggrpercent + " CGPA"}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Engineering Aggr Percentage </b> :{" "}
                {profile?.engineeringpercent} %
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Live KT</b>: {profile?.liveKt}
              </p>
              <p className="col-md-4 col-sm-5 col-11 mx-auto">
                <b>Resume</b> :{" "}
                <a href={profile?.resume} target="_blank">
                  Click here
                </a>
              </p>
            </section>
          </div>
        </Paper>
      )}

      {applied && (
        <Paper className="col-12 p-3 mt-5">
          <h4>Applied Drives</h4>
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={applied}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
          />
        </Paper>
      )}
    </>
  );
};

export default StudentDashboard;
