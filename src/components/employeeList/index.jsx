import React from 'react';
import { Table, Row, Col, Button, Avatar, Tag, Breadcrumb } from 'antd';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { MoreOutlined, BarsOutlined } from '@ant-design/icons';
import moment from 'moment'
import { toast } from "react-toastify";
import './index.scss';
import LoaderView from '../loaderView';

const columns = [
  {
    title: 'SI.No',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'ID',
    dataIndex: 'employee_id',
    key: 'employee_id',
  },
  {
    title: 'Image',
    dataIndex: 'employee_logo',
    key: 'employee_logo',
    render: (record) => {
      return (
        <div>
          <Avatar src={`${process.env.REACT_APP_API_BASE_URL}/${record}`} />
        </div>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: 'Joined on',
    dataIndex: 'join_date',
    key: 'join_date',
    render: (record) => {
      return (
        <div>
          <p className='m0'>{moment(record?.join_date).format("LLL")}</p>
        </div>
      );
    },
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => {
      return (
        <div>
          <Tag key={status} style={{ backgroundColor: (status === "working") ? '#34C38F' : '#eba834', color: '#fff' }}>
            {status.toUpperCase()}
          </Tag>
        </div>
      );
    },
  }
]

const TableData = () => {
  const [employeeData, setEmployeeData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      <div className='listContainer'>
        <Row className='AddEmployeeTitle' gutter={16} >
          <Col className="gutter-row left-side-content" span={12} >
            <h3>Employee</h3>
          </Col>
          <Col className="gutter-row right-side-content" span={12} >
            <Breadcrumb
              items={[
                {
                  title: 'Dashboard',
                },
                {
                  title: 'Employee',
                }
              ]}
            />
          </Col>
        </Row>
        <Row className='title-body' gutter={16} style={{ margin: 0 }}>
          <Col className="gutter-row left-side-content" span={12} >
            <Button onClick={() => { navigate('/addEmployee') }}>Add Employee </Button>
          </Col>
          <Col className="gutter-row filterIcons" span={12} >
            <BarsOutlined className='barIcon' />
            <MoreOutlined className='menuIcon' />
          </Col>
        </Row>
        <div className='table-container'>
          <Table
            columns={columns}
            dataSource={employeeData&&employeeData}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  navigate(`/viewEmployee/${record.id}`)
                  console.log(record)
                },
              };
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TableData;
