import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HOST } from "../App";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ allColumns: true }} />
    </GridToolbarContainer>
  );
}

const AllDrivesTable = () => {
  const [{ user }] = useAuth();

  const [rows, setRows] = useState([]);
  const [profile, setProfile] = useState();
  const [appliedDrives, setAppliedDrives] = useState([]);
  function ApplyButton({ driveId, applied, userId }) {
    const handleClick = async () => {
      await axios
        .put(`${HOST}/api/v1/user/apply-drive/${driveId}`, {
          userId,
        })
        .then((res) => {
          handleApply();
          toast.success(res.data.message);
        });
    };

    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </Button>
    );
  }

  const handleApply = async () => {
    await axios
      .get(
        `http://localhost:8080/api/v1/user/get-all-applied-drives/${user._id}`
      )
      .then((res) => {
        console.log(res.data);
        setAppliedDrives(res.data);
      });
    // // Handle applying to the drive, e.g. by sending a request to a server
    // setAppliedDrives([...appliedDrives, driveId]);
  };

  useEffect(() => {
    const alldrives = async () => {
      await axios
        .get("http://localhost:8080/api/v1/user/get-all-drives")
        .then((res) => {
          setRows(res.data);
        });
    };
    alldrives();
    handleApply();
  }, []);

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 300,
    },

    {
      field: "engAggrrpercentCriteria",
      headerName: "Engineering Aggregate",
      width: 180,
      renderCell: (params) => (
        <p className="my-auto">
          {params.row?.engAggrrpercentCriteria > 0
            ? params.row.engAggrrpercentCriteria + " % & Above"
            : "-"}
        </p>
      ),
    },
    {
      field: "branchcriteria",
      headerName: "Branch Criteria",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {params.row?.branchcriteria != [] ? (
            <FormControl style={{ width: "150px" }}>
              <Select labelId="demo-simple-select-helper-label">
                {params.row?.branchcriteria.map((branch) => (
                  <MenuItem>{branch}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            "-"
          )}
        </p>
      ),
    },
    {
      field: "Date",
      headerName: "Drive Date",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.driveDate).toDateString()}
        </p>
      ),
    },
    {
      field: "lastApplyDate",
      headerName: "Registration End Date",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.lastApplyDate).toDateString()}
        </p>
      ),
    },
    {
      field: "postedBy",
      headerName: "Posted By",
      width: 200,
      valueGetter: (params) => params.row.postedBy.name,
    },
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

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          component={Link}
          to={`/view-drive/${params.row._id}`}
          // onClick={() => <Navigate to={`/view-drive/${params.row._id}`} />}
        >
          view drive
        </Button>
      ),
    },

    {
      field: "apply",
      headerName: "Apply",
      width: 150,
      renderCell: (params) => (
        <ApplyButton
          userId={user?._id}
          driveId={params.row._id}
          applied={appliedDrives?.includes(params.row._id)}
          onClick={handleApply}
        />
      ),
    },
  ];
  return (
    <>
      <Card>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Card>
    </>
  );
};

export default AllDrivesTable;
