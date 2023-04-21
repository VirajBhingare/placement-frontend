import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Button, Card, Tooltip } from "@material-ui/core";
import axios from "axios";
import Modal from "../components/Modal";

const ViewDrive = () => {
  const { id } = useParams();
  const [resume, setResume] = useState();
  const [company, setCompany] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/v1/user/get-drive/${id}`)
        .then((res) => {
          setCompany(res.data);
          setResume(res.data.jdfile);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, [id]);

  return (
    <>
      <Card
        className="company-details col-md-11 mx-auto px-3 py-5 col-12"
        style={{ overflowX: "scroll" }}
      >
        <h4>{company.companyName}</h4>
        <h6 className="mb-4">
          By- {company?.postedBy} -{new Date(company?.postedAt).toDateString()}
        </h6>
        <p dangerouslySetInnerHTML={{ __html: company.editorData }} />
        <p>
          <Tooltip title="View Job Description">
            <Button
              onClick={() => setModal(true)}
              variant="contained"
              color="primary"
            >
              View JD
            </Button>
          </Tooltip>

          {modal === true && <Modal setModal={setModal} resume={resume} />}
        </p>
      </Card>
    </>
  );
};

export default ViewDrive;
