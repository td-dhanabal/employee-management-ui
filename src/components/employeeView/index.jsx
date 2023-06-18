import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Button, Divider, Modal } from 'antd';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { MoreOutlined } from '@ant-design/icons';
import { getRequest, deleteRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { toast } from "react-toastify";
import LoaderView from '../loaderView';
import './index.scss';

export default function EmployeeView() {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchEmployeeData(id);
    }, [id]);

    const fetchEmployeeData = async (id) => {
        setLoading(true);
        try {
            setLoading(false);
            let employeeId = parseInt(id);
            const userResponse = await getRequest(serviceApi.getEmployees(employeeId))
            if (userResponse) {
                console.log('vv', userResponse.data.data);
                setEmployeeData(userResponse && userResponse.data && userResponse.data.data);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    }
    const deleteEmployeeClick = async (id) => {
        try {
            setLoading(false);
            const userResponse = await deleteRequest(serviceApi.deleteEmployee(id))
            if (userResponse) {
                toast.success("User Deleted Successfully");
                navigate('/employees');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                    <h3>{employeeData?.user_name}</h3>
                </Col>
                <Col className="gutter-row right-side-content" span={7} >
                    <Button type="primary"
                        htmlType="submit"
                        className="form-submit-btn spacer updateBtn" onClick={() => { navigate(`/editEmployee/${id}`) }}>Edit</Button>
                    <Button
                        className="form-submit-btn spacer deleteBtn" onClick={() => { showModal()}} >Delete</Button>
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
                                <label>{employeeData && employeeData.mobile_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Mail Id</label>
                                <label>{employeeData && employeeData.email}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Gender</label>
                                <label>{employeeData && employeeData?.gender}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Aadhar Id</label>
                                <label>{employeeData && employeeData.aadhar_id}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Address</label>
                                <label>{employeeData && employeeData.address}</label>
                            </div>


                        </Col>
                        <Col className="gutter-row right-side-content " span={12} >
                            <div className='cardBody'>
                                <label>Father Name</label>
                                <label>{employeeData && employeeData.father_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Date Of Birth</label>
                                <label>{moment(employeeData && employeeData.dob).format("LLL")}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Maritial Status</label>
                                <label>{employeeData && employeeData.marital_status}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Caste/ Religion</label>
                                <label>{employeeData && employeeData.casteRegion}</label>
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
                                <label>{employeeData && employeeData.account_holder_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Acc. No</label>
                                <label>{employeeData && employeeData.account_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>IFSC</label>
                                <label>{employeeData && employeeData.IFSC}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PAN</label>
                                <label>{employeeData && employeeData.PAN}</label>
                            </div>
                        </Col>
                        <Col className="gutter-row right-side-content " span={12} >
                            <div className='cardBody'>
                                <label>Bank Name</label>
                                <label>{employeeData && employeeData.bank_name}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Branch</label>
                                <label>{employeeData && employeeData.branch}</label>
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
                                <label>{employeeData && employeeData.pay_basic}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PF</label>
                                <label>{employeeData && employeeData.pay_PF}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Gross</label>
                                <label>{employeeData && employeeData.pay_gross}</label>
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
                                <label>{employeeData && employeeData.position_branch}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Department</label>
                                <label>{employeeData && employeeData.position_department}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Designation</label>
                                <label>{employeeData && employeeData.position_designation}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Reporter to</label>
                                <label>{employeeData && employeeData.position_reporter}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Shift</label>
                                <label>{employeeData && employeeData.position_shift}</label>
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
                                <label>{employeeData && employeeData.edu_qualification}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Department</label>
                                <label>{employeeData && employeeData.edu_department}</label>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row right-side-content" span={7} style={{ padding: '25px' }} >

                    <img className='uploadImg' src={`${process.env.REACT_APP_API_BASE_URL}/${employeeData && employeeData.employee_logo}`} alt='' />
                    <Row className='AddEmployeeContent' gutter={16} >
                        <Col className="gutter-row left-side-content" span={24} >
                            <div className='cardBody'>
                                <label>EMP.ID</label>
                                <label>{employeeData && employeeData.employee_id}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Join Date</label>
                                <label>{moment(employeeData && employeeData.join_date).format("LL")}</label>
                            </div>
                            <div className='cardBody'>
                                <label>PF Number</label>
                                <label>{employeeData && employeeData.PF_number}</label>
                            </div>
                            <div className='cardBody'>
                                <label>Blood Group</label>
                                <label>{employeeData && employeeData.blood_group}</label>
                            </div>
                        </Col>

                    </Row>
                </Col>
            </Row>
            <Modal footer={null} title="Are you sure want to Delete ?" open={isModalOpen} onCancel={handleCancel}>
               <div style={{textAlign:'center'}}>
               <Button className='deleteBtn' onClick={()=>{deleteEmployeeClick(id)}}>Delete</Button>
               <Button onClick={handleCancel}>Cancel</Button>
               </div>
            </Modal>
        </div >
    )
}
