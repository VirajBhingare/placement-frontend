import { Button, Checkbox, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Card } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AddMaterial = () => {
  const [material, setMaterial] = useState("");
  const onFinish = (values) => {
    axios
      .post("http://localhost:8080/api/v1/admin/add-placement-material", {
        ...values,
        material,
      })
      .then((res) => {
        toast.success(res.data);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card className="col-md-11 col-12 mx-auto p-3">
        <h4 className="text-center mb-4">Add Placement Material Form</h4>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Upload Material"
            rules={[{ required: true, message: "Please input material!" }]}
          >
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setMaterial(base64)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddMaterial;
