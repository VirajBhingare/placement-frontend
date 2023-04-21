import { DatePicker, Form, Input, message, Radio, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, Card } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HOST } from "../../App";

const CreateProfile = () => {
  const [details, setDetails] = useState();
  const [form] = Form.useForm();
  const params = useParams();
  const id = params.id;
  const [{ user }] = useAuth();

  const disabledDate = (current) => {
    // Disable dates with year greater than 2001
    return current && current.year() > 2001;
  };

  useEffect(() => {
    const getprofiledetails = async () => {
      await axios
        .get(`${HOST}/api/v1/user/get-profile-details/${params.id}`)
        .then((res) => {
          // form.setFieldsValue(res.data[0]);

          setDetails(res.data[0]);
        });
    };
    id && getprofiledetails();
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({ ...details, dob: moment(details?.dob) });
  }, [details]);

  const onFinish = async (values) => {
    if (id) {
      axios
        .put("http://localhost:8080/api/v1/user/update-profile", {
          ...details,
          ...values,
        })
        .then((res) => {
          toast.success(res.data.message);
          // alert(res.data.message);
        })
        .catch((error) => {
          toast.error("failed to update profile");
        });
    } else {
      axios
        .post("http://localhost:8080/api/v1/user/create-profile", {
          ...details,
          ...values,
          user: user?._id,
        })
        .then((res) => {
          setDetails();
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <Card className="col-md-11 col-sm-11 col-12 mx-auto py-3 px-2 my-3">
      {id ? (
        <h4 style={{ color: "var(--form-heading-color)" }}>Update Profile</h4>
      ) : (
        <h4 style={{ color: "var(--form-heading-color)" }}>Create Profile</h4>
      )}
      {
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={details}
          layout={"vertical"}
          className="d-flex justify-content-between flex-wrap"
        >
          {/* <Form.Item
            name={"dob"}
            label="Date of Birth"
            rules={[{ required: true, message: "Please input your DOB!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <DatePicker
              format={"DD-MM-YYYY"}
              disabledDate={disabledDate}
              // defaultValue={moment("2002-01-02")}
            />
          </Form.Item> */}
          {/* <Form.Item
            name="phone"
            label="Phone No"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item> */}
          {/* <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input.TextArea rows={3} />
          </Form.Item> */}
          <Form.Item
            label="profile photo"
            rules={[{ required: true, message: "Please input your photo!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
            required
          >
            <FileBase64
              multiple={false}
              onDone={({ base64 }) =>
                setDetails({ ...details, photourl: base64 })
              }
            />
          </Form.Item>

          {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please input your gender!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item> */}
          {/* <Form.Item
            name="sscschoolname"
            label="10th School Name"
            rules={[
              { required: true, message: "Please input your school name!" },
            ]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="class10th"
            label="10th %"
            rules={[{ required: true, message: "Please input your 10th %!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="hsccollege"
            label="12th college"
            rules={[
              { required: true, message: "Please input your 12th college!" },
            ]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="class12th"
            label="12th %"
            rules={[{ required: true, message: "Please input your 12th %!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="engcollege"
            label="Engineering College"
            rules={[{ required: true, message: "Please input your college!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="branch"
            label="Engineering Branch"
            rules={[{ required: true, message: "Please input your branch!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="Computer Engineering">
                Computer Engineering
              </Select.Option>
              <Select.Option value="IT Engineering">
                IT Engineering
              </Select.Option>
              <Select.Option value="Electronics Engineering">
                Electronics Engineering
              </Select.Option>
              <Select.Option value="Electronics & Telecommunication Engineering">
                Electronics & Telecommunication Engineering
              </Select.Option>
              <Select.Option value="Bio-Medical Engineering">
                Bio-Medical Engineering
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="engineering_division"
            label="Engineering Division"
            rules={[{ required: true, message: "Please input your division!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="engineeringpercent"
            label="Engineering %"
            rules={[{ required: true, message: "Please input your %!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="engineeringAggrpercent"
            label="Engineering Aggregate CGPA"
            rules={[{ required: true, message: "Please input your cgpa!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="liveKt"
            label="Live KT"
            rules={[{ required: true, message: "Please input your kt!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <Select>
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="upload resume"
            rules={[{ required: true, message: "Please input your resume!" }]}
            className="col-md-3 col-sm-5 col-10 mx-2"
          >
            <FileBase64
              multiple={false}
              onDone={({ base64 }) =>
                setDetails({ ...details, resume: base64 })
              }
            />
          </Form.Item>

          <div className="col-12 text-center ">
            {id ? (
              <Button variant="contained" color="primary" type="submit">
                Edit
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      }
    </Card>
  );
};

export default CreateProfile;
