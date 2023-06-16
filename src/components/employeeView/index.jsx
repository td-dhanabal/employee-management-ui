import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Button, Form, Input, Radio, Select, Divider, DatePicker } from 'antd';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { MoreOutlined } from '@ant-design/icons';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { toast } from "react-toastify";
import './index.scss'

export default function EmployeeView() {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([])
    const { id } = useParams();
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        fetchEmployeeData();
    }, [id]);

    const fetchEmployeeData = async (id) => {
        try {
            const userResponse = await getRequest(serviceApi.getEmployees(1))
            if (userResponse) {
                console.log('vv', userResponse.data.data);
                setEmployeeData(userResponse.data.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }
    { console.log('employeeData', employeeData) }
    return (
        <div className='addEmployeeContainer'>
            {/* EMPLOYEE TITLE */}
            <Row className='AddEmployeeTitle' gutter={16} >
                <Col className="gutter-row left-side-content" span={12} >
                    <h3>Employee Info</h3>
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
                                title: 'Employee Info',
                            },
                        ]}
                    />
                </Col>
            </Row>

            {/* EMPLOYEE HEAD */}
            <Row className='AddEmployeeHeader' gutter={16} >
                <Col className="gutter-row left-side-content" span={17} >
                    <h3>{employeeData.user_name}</h3>
                </Col>
                <Col className="gutter-row right-side-content" span={7} >
                    <Button type="primary"
                        htmlType="submit"
                        className="form-submit-btn spacer updateBtn">Edit</Button>
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
                            <div className='cardBody'>
                                <label>Contact</label>
                                <label>{employeeData.mobile_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Mail Id</label>
                                <label>{employeeData.email}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Gender</label>
                                <label>{employeeData.gender}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Aadhar Id</label>
                                <label>{employeeData.aadhar_id}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Address</label>
                                <label>{employeeData.address}</label>
                            </div>


                        </Col>
                        <Col className="gutter-row right-side-content " span={12} >
                            <div className='cardBody'>
                                <label>Father Name</label>
                                <label>{employeeData.father_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Date Of Birth</label>
                                <label>{moment(employeeData.dob).format("LLL")}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Maritial Status</label>
                                <label>{employeeData.marital_status}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Caste/ Religion</label>
                                <label>{employeeData.casteRegion}</label>
                            </div>

                        </Col>
                    </Row>
                    <Divider />
                    {/* BANK ROW */}
                    <h4>Bank Account</h4>
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={12} >
                            <div className='cardBody'>
                                <label>Name</label>
                                <label>{employeeData.account_holder_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Acc. No</label>
                                <label>{employeeData.account_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>IFSC</label>
                                <label>{employeeData.IFSC}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PAN</label>
                                <label>{employeeData.PAN}</label>
                            </div>
                        </Col>
                        <Col className="gutter-row right-side-content " span={12} >
                            <div className='cardBody'>
                                <label>Bank Name</label>
                                <label>{employeeData.bank_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Branch</label>
                                <label>{employeeData.branch}</label>
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    {/* PAY ROW */}
                    <h4>Pay Scale</h4>
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={12} >
                        <div className='cardBody'>
                                <label>Basic</label>
                                <label>{employeeData.pay_basic}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PF</label>
                                <label>{employeeData.pay_PF}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Gross</label>
                                <label>{employeeData.pay_gross}</label>
                            </div>
                        </Col>

                    </Row>
                    <Divider />
                    {/* POSITION INFO ROW */}
                    <h4>Position Info</h4>
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={12} >
                        <div className='cardBody'>
                                <label>Branch</label>
                                <label>{employeeData.position_branch}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Department</label>
                                <label>{employeeData.position_department}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Designation</label>
                                <label>{employeeData.position_designation}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Reporter to</label>
                                <label>{employeeData.position_reporter}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Shift</label>
                                <label>{employeeData.position_shift}</label>
                            </div>
                        </Col>
                    </Row>

                    <Divider />
                    {/* EDUCATIONAL ROW */}
                    <h4>Educational Qualification</h4>
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={12} >
                        <div className='cardBody'>
                                <label>Qualification</label>
                                <label>{employeeData.edu_qualification}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Department</label>
                                <label>{employeeData.edu_department}</label>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row right-side-content" span={7} style={{ padding: '25px' }} >
                  
              <img className='uploadImg'  src={`${process.env.REACT_APP_API_BASE_URL}/${employeeData.employee_logo}`} alt=''/>
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={24} >
                        <div className='cardBody'>
                                <label>EMP.ID</label>
                                <label>{employeeData.employee_id}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Join Date</label>
                                <label>{moment(employeeData.join_date).format("LL")}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PF Number</label>
                                <label>{employeeData.PF_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Blood Group</label>
                                <label>{employeeData.blood_group}</label>
                            </div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </div >
    )
}
