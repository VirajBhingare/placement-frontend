import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Chart from "react-apexcharts";
import { Card } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "branch", headerName: "Branch", width: 200 },
  { field: "companyName", headerName: "Company Placed", width: 300 },
  { field: "packagePlaced", headerName: "Package", width: 200 },
];

const AdminDashboard = () => {
  const [setLoading] = useAuth();
  const [placed, setPlaced] = useState([]);
  const [rows, setRows] = useState([]);
  const [chart, setChart] = useState({});
  const [pieChartData, setPieChartData] = useState([]);
  useEffect(() => {
    const getAllPlaced = async () => {
      await axios
        .get("http://localhost:8080/api/v1/admin/all-placed-student")
        .then((res) => {
          setPlaced(res.data);
        });
    };
    getAllPlaced();
  }, []);

  useEffect(() => {
    const getRows = (data) => {
      const rows = [];
      data.forEach((placement) => {
        placement.placedStudentList.forEach((student) => {
          const { name, email } = student.user;
          const { branch } = student;
          const { companyName } = placement.driveId;
          const { packagePlaced } = placement;
          rows.push({
            id: `${name}-${companyName}`,
            name,
            branch,
            email,
            companyName,
            packagePlaced,
          });
        });
      });
      return rows;
    };

    setRows(getRows(placed));
  }, [placed]);

  useEffect(() => {
    const formatDataForChart = () => {
      const companyNames = [
        ...new Set(placed.map((placement) => placement.driveId.companyName)),
      ];
      const numOfStudentsPlaced = companyNames.map((companyName) => {
        const numOfStudents = placed
          .filter((placement) => placement.driveId.companyName === companyName)
          .reduce((acc, curr) => {
            return acc + curr.placedStudentList.length;
          }, 0);
        return { companyName, numOfStudents };
      });

      setChart(numOfStudentsPlaced);
    };
    formatDataForChart();
  }, [placed]);

  useEffect(() => {
    const formatDataForChart = () => {
      const branchCounts = {};
      placed.forEach((placement) => {
        placement.placedStudentList.forEach((student) => {
          const { branch } = student;
          if (branchCounts[branch]) {
            branchCounts[branch]++;
          } else {
            branchCounts[branch] = 1;
          }
        });
      });

      const labels = Object.keys(branchCounts);
      const series = labels.map((branch) => {
        const count = branchCounts[branch];
        return isNaN(count) ? 0 : count;
      });

      setPieChartData({ labels, series });
    };

    formatDataForChart();
  }, [placed]);
  return (
    <>
      <Card style={{ height: 400, width: "100%", margin: "30px 0px" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Card>

      <Card className="my-5">
        {placed.length > 0 && chart.length > 0 ? (
          <Chart
            options={{
              colors: ["#3f51b5"],
              chart: {
                id: "placed-students-chart",
              },
              xaxis: {
                categories: chart && chart.map((item) => item.companyName),
              },
            }}
            series={[
              {
                name: "Number of Students Placed",
                data: chart && chart.map((item) => item.numOfStudents),
              },
            ]}
            type="bar"
            width="100%"
            height="400px"
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Card>

      <Card className="my-5">
        {placed.length > 0 && pieChartData && (
          <Chart
            options={{
              chart: {
                id: "placed-students-chart",
              },
              labels: pieChartData.labels,
            }}
            series={pieChartData.series}
            type="donut"
            width="100%"
            height="400px"
          />
        )}
      </Card>
    </>
  );
};

export default AdminDashboard;
