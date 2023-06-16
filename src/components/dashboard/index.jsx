import React from 'react';
import './index.scss';
import { Button } from 'antd';
import { BrowserRouter as Router, useNavigate  } from 'react-router-dom';

export default function Dashboard() {
  const navigate =useNavigate();
  return (
    <div className='header'>
      <h3>Dashboard</h3>
      <Button onClick={()=>{navigate('/employees')}}>Go to Employees List</Button>
      </div>
  )
}
