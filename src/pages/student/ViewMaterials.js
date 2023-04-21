import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button, Card, Modal } from "@material-ui/core";
import FileViewer from "react-file-viewer";

const ViewMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/get-all-materials/"
      );
      setMaterials(response.data);
    };

    fetchMaterials();
  }, []);
  return (
    <>
      <Paper className="col-12 p-4">
        <h3 className="text-center mb-5">Placement Material</h3>
        <section className="d-flex flex-wrap">
          {materials?.map((material, index) => (
            <>
              <Card className="col-12 col-md-4 p-3">
                <h5>{material?.title}</h5>
                <p>{material?.description}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleOpen}
                >
                  View File
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      overflowY: "scroll",
                      overflowX: "hidden",
                      height: "80vh",
                      width: "600px",
                    }}
                  >
                    <FileViewer fileType={"pdf"} filePath={material.material} />
                  </div>

                  {/* <div className="mx-auto">
                  <FileViewer fileType={"pdf"} filePath={material.material} />
                </div> */}
                </Modal>
              </Card>
            </>
          ))}
        </section>
      </Paper>
    </>
  );
};

export default ViewMaterials;
