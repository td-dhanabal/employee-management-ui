import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Button, Form, Input, Radio, Select, Divider, DatePicker } from 'antd';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { MoreOutlined, PaperClipOutlined } from '@ant-design/icons';
import { getRequest, postRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { toast } from "react-toastify";
import LoaderView from '../loaderView';
import './index.scss';

export default function EmployeeAdd() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [branches, setBranches] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [reporters, setReporters] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);


  const { TextArea } = Input;

  const onFinish = async (values) => {
    console.log('Success:', values);
    console.log('file', file);
    if (!file) {
      alert("Please first select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", values.email);
    formData.append("user_name", values.user_name);
    formData.append("mobile_number", values.mobile_number);
    formData.append("gender", values.gender);
    formData.append("aadhar_id", values.aadhar_id);
    formData.append("address", values.address);
    formData.append("father_name", values.father_name);
    formData.append("dob", values.dob);
    formData.append("marital_status", values.marital_status);
    formData.append("casteRegion", values.casteRegion);
    formData.append("account_holder_name", values.account_holder_name);
    formData.append("account_number", values.account_number);
    formData.append("IFSC", values.IFSC);
    formData.append("PAN", values.PAN);
    formData.append("bank_name", values.bank_name);
    formData.append("branch", values.branch);
    formData.append("pay_basic", values.pay_basic);
    formData.append("pay_PF", values.pay_PF);
    formData.append("pay_gross", values.pay_gross);
    formData.append("position_branch", values.position_branch);
    formData.append("position_department", values.position_department);
    formData.append("position_designation", values.position_designation);
    formData.append("position_reporter", values.position_reporter);
    formData.append("position_shift", values.position_shift);
    formData.append("edu_qualification", values.edu_qualification);
    formData.append("edu_department", values.edu_department);
    formData.append("employee_id", values.employee_id);
    formData.append("join_date", values.join_date);
    formData.append("PF_number", values.PF_number);
    formData.append("blood_group", values.blood_group);
    formData.append("status", values.status);
    try {
      setLoading(false);
      const response = await postRequest(serviceApi.createEmployee(), formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        toast.success("User Created Successfully");
        navigate('/employees');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }
  const fetchAllBranches = async () => {
    try {
      setLoading(true);
      const userResponse = await getRequest(serviceApi.allBranches())
      if (userResponse) {
        setLoading(false);
        console.log('userResponse', userResponse.data.data);
        setBranches(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const fetchAlldepartments = async () => {
    try {
      setLoading(true);
      const userResponse = await getRequest(serviceApi.allDepartments())
      if (userResponse) {
        setLoading(false);
        console.log('userResponse', userResponse.data.data);
        setdepartments(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const fetchAllDesignation = async () => {
    try {
      setLoading(true);
      const userResponse = await getRequest(serviceApi.allDesignations())
      if (userResponse) {
        setLoading(false);
        console.log('userResponse', userResponse.data.data);
        setDesignation(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const fetchAllReporters = async () => {
    try {
      setLoading(true);
      const userResponse = await getRequest(serviceApi.allReporters())
      if (userResponse) {
        setLoading(false);
        console.log('userResponse', userResponse.data.data);
        setReporters(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const fetchAllShifts = async () => {
    try {
      setLoading(true);
      const userResponse = await getRequest(serviceApi.allShifts())
      if (userResponse) {
        setLoading(false);
        console.log('userResponse', userResponse.data.data);
        setShifts(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllBranches();
    fetchAlldepartments();
    fetchAllDesignation();
    fetchAllReporters();
    fetchAllShifts();
  }, []);
  if (loading) {
    return <div>
      <LoaderView />
    </div>
  }
  return (
    <div className='addEmployeeContainer'>
      {/* EMPLOYEE TITLE */}
      <Row className='AddEmployeeTitle' gutter={16} >
        <Col className="gutter-row left-side-content" span={12} >
          <h3>Add Employee</h3>
        </Col>
        <Col className="gutter-row right-side-content" span={12} >
          <Breadcrumb
            items={[
              {
                title: 'Dashboard',
              },
              {
                title: 'Employee',
              },
              {
                title: 'Add Employee',
              },
            ]}
          />
        </Col>
      </Row>
      <Form
        name="userCreateForm"
        onFinish={onFinish}
        autoComplete="off"
        onFinishFailed={onFinishFailed}
      >
        {/* EMPLOYEE HEAD */}
        <Row className='AddEmployeeHeader' gutter={16} >
          <Col className="gutter-row left-side-content" span={17} >
            <Form.Item name="user_name" style={{ marginTop: '15px' }}>
              <Input
                placeholder="User Name"
                className="input-box"
                type="text"
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row right-side-content" span={7} >
            <Button type="primary"
              htmlType="submit"
              className="form-submit-btn spacer updateBtn">Add</Button>
            <Button onClick={() => { navigate('/employees') }} className='cancelBtn'>Cancel</Button>
            <MoreOutlined />
          </Col>
        </Row>

        <Divider />

        <Row className='AddEmployeeBody' gutter={16} >
          <Col className="gutter-row left-side-content scroll-content" span={17} >
            {/* BASIC INFO ROW */}
            <h4>Basic Info</h4>
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={12} >
                <Form.Item label="Contact" name="mobile_number" rules={[{ required: true, message: "Mobile Number name is required" }]}>
                  <Input
                    placeholder="Contact Number"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item label="Email Id" name="email" rules={[{ required: true, message: "Email name is required" }]} >
                  <Input
                    placeholder="Email"
                    className="input-box"
                    type="email"
                  />
                </Form.Item>
                <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Gender is required" }]}>
                  <Radio.Group>
                    <Radio value="male"> Male </Radio>
                    <Radio value="female"> Female </Radio>
                    <Radio value="others"> Others </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Aadhar ID" name="aadhar_id" rules={[{ required: true, message: "Aadhar number is required" }]} >
                  <Input
                    placeholder="Aadhar Number"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true, message: "Address is required" }]}>
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col className="gutter-row right-side-content " span={12} >
                <Form.Item label="Father Name" name="father_name" rules={[{ required: true, message: "Father Name is required" }]}>
                  <Input
                    placeholder="Father Name"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item
                  label="Date of Birth"
                  name="dob"
                  rules={[{ required: true, message: "Date of Birth is required" }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Marital status" name="marital_status" rules={[{ required: true, message: "Marital status is required" }]}>
                  <Input
                    placeholder="Marital Status"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item label="Caste/ Religion" name="casteRegion" rules={[{ required: true, message: "Caste/ Religion is required" }]}>
                  <Input
                    placeholder="Caste/Region"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            {/* BANK ROW */}
            <h4>Bank Account</h4>
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={12} >
                <Form.Item label="Name" name="account_holder_name" rules={[{ required: true, message: "Account Name is required" }]}>
                  <Input
                    placeholder="Account Holder Name"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item label="Acc. No" name="account_number" rules={[{ required: true, message: "Account number is required" }]}>
                  <Input
                    placeholder="Account Number"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item label="IFSC" name="IFSC" rules={[{ required: true, message: "IFSC is required" }]}>
                  <Input
                    placeholder="IFSC"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item label="PAN" name="PAN" rules={[{ required: true, message: "PAN is required" }]}>
                  <Input
                    placeholder="PAN"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row right-side-content " span={12} >
                <Form.Item label="Bank Name" name="bank_name" rules={[{ required: true, message: "Bank Name is required" }]}>
                  <Input
                    placeholder="Bank Name"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item label="Branch" name="branch" rules={[{ required: true, message: "Branch Name is required" }]}>
                  <Input
                    placeholder="Branch"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>

              </Col>
            </Row>
            <Divider />
            {/* PAY ROW */}
            <h4>Pay Scale</h4>
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={12} >
                <Form.Item label="Basic" name="pay_basic" rules={[{ required: true, message: "Pay Basic is required" }]}>
                  <Input
                    placeholder="Basic Pay"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item label="PF" name="pay_PF" rules={[{ required: true, message: "Pay PF number is required" }]}>
                  <Input
                    placeholder="PF"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item label="Gross" name="pay_gross" rules={[{ required: true, message: "pay Gross number is required" }]}>
                  <Input
                    placeholder="Gross"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
              </Col>

            </Row>
            <Divider />
            {/* POSITION INFO ROW */}
            <h4>Position Info</h4>
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={12} >
                <Form.Item name="position_branch" label="Branch" rules={[{ required: true, message: "Branch is required" }]}>
                  <Select>
                    {branches.map((branch, i) => (
                      <Select.Option key={i} value={branch.branch_name}>{branch.branch_name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="position_department" label="Department" rules={[{ required: true, message: "Department is required" }]}>
                  <Select>
                    {departments.map((department, i) => (
                      <Select.Option key={i} value={department.department}>{department.department}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="position_designation" label="Designation" rules={[{ required: true, message: "Designation is required" }]}>
                  <Select>
                    {designations.map((designation, i) => (
                      <Select.Option key={i} value={designation.desigantion_name}>{designation.desigantion_name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="position_reporter" label="Reporting to" rules={[{ required: true, message: "Reporter is required" }]}>
                  <Select>
                    {reporters.map((reporter, i) => (
                      <Select.Option key={i} value={reporter.reporter_name}>{reporter.reporter_name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="position_shift" label="Shift time" rules={[{ required: true, message: "Shift Name is required" }]}>
                  <Select>
                    {shifts.map((shift, i) => (
                      <Select.Option key={i} value={shift.shift}>{shift.shift}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            {/* EDUCATIONAL ROW */}
            <h4>Educational Qualification</h4>
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={12} >
                <Form.Item label="Qualification" name="edu_qualification" rules={[{ required: true, message: "Qualification is required" }]}>
                  <Input
                    placeholder="Qualification"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item label="Department" name="edu_department" rules={[{ required: true, message: "Department is required" }]}>
                  <Input
                    placeholder="Department"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row right-side-content" span={7} style={{ padding: '25px' }} >
            <div>
              <label name="employee_logo" className="fileUploadBtn greenBtn" >
                <PaperClipOutlined />
                Choose File
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={handleChange}
                />
              </label>
            </div>
            <img className='uploadImg' src={file ? URL.createObjectURL(file) : null} alt="" />
            <Row className='AddEmployeeContent' gutter={16} >
              <Col className="gutter-row left-side-content" span={24} >
                <Form.Item label="Emp.ID" name="employee_id" rules={[{ required: true, message: "Employee ID is required" }]}>
                  <Input
                    placeholder="Emp.ID"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item
                  label="Join Date"
                  name="join_date"
                  rules={[{ required: true, message: "Join Date is required" }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="PF Number" name="PF_number" rules={[{ required: true, message: "PF Number is required" }]}>
                  <Input
                    placeholder="PF Number"
                    className="input-box no-spinner"
                    type="number"
                  />
                </Form.Item>
                <Form.Item label="Blood Group" name="blood_group" rules={[{ required: true, message: "Blood Group is required" }]}>
                  <Input
                    placeholder="Blood Group"
                    className="input-box"
                    type="text"
                  />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: "Status is required" }]}>
                  <Select>
                    <Select.Option value="working">Working</Select.Option>
                    <Select.Option value="leave">Leave</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

            </Row>
          </Col>
        </Row>
      </Form >
    </div >
  )
}
