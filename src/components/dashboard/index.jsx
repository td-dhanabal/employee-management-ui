import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Card, Col, Row } from 'antd';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { toast } from "react-toastify";
import LoaderView from '../loaderView';


export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const userResponse = await getRequest(serviceApi.allEmployees())
      if (userResponse) {
        setEmployeeData(userResponse.data.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  }
  if (loading) {
    return <div>
      <LoaderView />
    </div>
  }
  console.log('ff', employeeData);
  const workingEmployees = employeeData && employeeData.filter(data => data.status === "working");
  const leaveEmployees = employeeData && employeeData.filter(data => data.status === "leave");

  return (
    <div className='header'>
      <Row className='' gutter={16} >
        <Col className="gutter-row left-side-content" span={12} >
          <h3>Dashboard</h3>
        </Col>

      </Row>
      <Row className='' gutter={16} >
        <Col className="gutter-row employeeCard" span={8} >
          <Card title="Employees">
            <h2> Total Employees : <span>{employeeData && employeeData.length}</span></h2>
          </Card>
        </Col>
        <Col className="gutter-row workingCard" span={8} >
          <Card title="Working Employees">
            <h2>Working Employees : <span>{workingEmployees.length}</span></h2>
          </Card>
        </Col>
        <Col className="gutter-row leaveCard" span={8} >
          <Card title="Leave Employees">
            <h2>Leave Employees : <span>{leaveEmployees.length}</span></h2>
          </Card>
        </Col>
      </Row>
      <div className='empBtn'>
        <Button onClick={() => { navigate('/employees') }}>Go to Employees List</Button>
      </div>
    </div>
  )
}
