import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../App";
const Tp = () => {
  const [driveApplicants, setDriveApplicants] = useState([]);
  const params = useParams();
  const { Id } = params;
  useEffect(() => {
    const getDrive = async () => {
      await axios
        .get(`${HOST}/api/v1/hr/get-partcular-drive/${Id}`)
        .then((res) => {
          setDriveApplicants(res.data.applicants);
        });
    };
    getDrive();
  }, [Id]);
  return (
    <>
      <div>Tp {Id}</div>
      <div>length {driveApplicants?.length}</div>
    </>
  );
};

export default Tp;
