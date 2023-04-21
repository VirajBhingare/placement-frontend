import { Button, Card, TextField, TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddNotice = () => {
  const [state, setState] = useState({
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/v1/admin/add-notice", state)
      .then((res) => {
        toast.success(res.data.message);
        setState("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Card className="col-md-11 col-12 mx-auto p-3">
        <form onSubmit={handleSubmit}>
          <h4> Add placement notice</h4>

          <TextField
            label="description"
            multiline
            rows={6}
            placeholder="Enter your text here"
            value={state.description}
            variant="outlined"
            className="my-3 col-12"
            name="Description"
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />

          <Button
            variant="contained"
            color="primary"
            className="my-3 me-3"
            type="submit"
          >
            Add Notice
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="my-3"
            onClick={() => setState(" ")}
          >
            Clear
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddNotice;
