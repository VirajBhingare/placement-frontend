import * as React from "react";
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
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { message } from "antd";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
var emailarray = [];

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link to={`/student/dashboard/view-profile/${params.row._id}`}>
        <Avatar alt="Travis Howard" src={`${params.row.photourl}`} />
      </Link>
    ),
  },
  {
    field: "user",
    headerName: "Name",
    valueGetter: (params) => params.row.user.name,
    width: 200,
  },
  {
    field: "user",
    headerName: "Email",
    valueGetter: (params) => params.row.user.email,
    width: 300,
  },

  { field: "branch", headerName: "Branch", width: 200 },
  { field: "engineering_division", headerName: "Division", width: 130 },
  { field: "engineeringAggrpercent", headerName: "Aggr CGPA", width: 150 },
  { field: "engineeringpercent", headerName: "Eng Aggr %", width: 170 },

  {
    field: "action",
    headerName: "Action",
    width: "130",
    renderCell: (params) => (
      <Link to={`/student/dashboard/edit-student/${params.row._id}`}>
        <EditIcon />
      </Link>
    ),
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
// doc_id name company_name package
const AllStudentsTable = () => {
  const [loading, setLoading] = useAuth();

  const [rows, setRows] = React.useState([]); //all students
  // const [selectedRows, setSelectedRows] = React.useState([]); // id of selected rows
  // const [companies, setCompanies] = React.useState([]);
  // const [formData, setFormData] = React.useState({
  //   companyName: "",
  //   package: "",
  // });

  const getAllStudents = async () => {
    // setLoading(true);
    await axios
      .get("http://localhost:8080/api/v1/admin/get-allstudents/")
      .then((res) => {
        console.log(res.data);
        setRows(res.data.allstudents);
        // setLoading(false);
        // dispatch(setDrives(res.data.allCompanies));
        // setCompanies(res.data.allCompanies);
      })
      .catch((err) => {
        // setLoading(true);
      });
  };

  React.useEffect(() => {
    getAllStudents();
  }, []);

  // const callFunc = async () => {
  //   //  setData([...data, { ...formData, _id: selectedRows[i] }]);
  //   var i = 0;
  //   const arrr = [];
  //   for (i; i < selectedRows?.length; i++) {
  //     arrr.push({
  //       company: formData.companyName,
  //       package: formData.package,
  //       username: selectedRows[i].name,
  //       branch: selectedRows[i].branch,
  //     });

  //     emailarray.push(selectedRows[i].email);
  //   }
  //   return arrr;
  // };
  // const updateStudent = async (e) => {
  //   e.preventDefault();
  //   const rrr = await callFunc();

  //   await axios
  //     .post("/api/v1/admin/add-placed-students", rrr)
  //     .then(async (res) => {
  //       // message.success(res.data.message);
  //       alert(res.data.message);
  //       await axios
  //         .post("/api/v1/admin/send-email-notification", {
  //           emailarray,
  //           formData,
  //         })
  //         .then((res) => {
  //           message.success(res.data.message);
  //         });
  //       setFormData({
  //         companyName: "",
  //         package: "",
  //       });
  //     })
  //     .catch((error) => {
  //       message.error(error.response.data.message);
  //       setFormData({
  //         companyName: "",
  //         package: "",
  //       });
  //     });
  // };
  return (
    <>
      <section className="col-11 mx-auto">
        <h4 style={{ color: "var(--form-heading-color)" }}>
          All Students List
        </h4>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
          // onSelectionModelChange={(ids) => {
          //   const selectedIDs = new Set(ids);
          //   const selectedRowData = rows.filter((row) =>
          //     selectedIDs.has(row._id.toString())
          //   );
          //   setSelectedRows(selectedRowData);
          // }}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
        {/* <form
          className="col-10 mx-auto my-3 text-center"
          onSubmit={updateStudent}
        >
          <TextField
            variant="outlined"
            name="package"
            type={"number"}
            label="Package"
            required
            value={formData.package}
            onChange={(e) =>
              setFormData({ ...formData, package: e.target.value })
            }
            className="col-md-6 col-11 my-4"
          />
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="col-md-6 col-11 my-4 text-left"
          >
            {companies &&
              companies.map((company) => (
                <MenuItem value={company?.companyName}>
                  {company?.companyName}
                </MenuItem>
              ))}
          </Select>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="col-md-6 col-11 my-4"
          >
            Update Selected Rows
          </Button>
        </form> */}
      </section>
    </>
  );
};

export default AllStudentsTable;
