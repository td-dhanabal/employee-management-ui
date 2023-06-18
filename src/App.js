// Filename: App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './components/dashboard';
import Header from './components/header';
import TableData from './components/employeeList';
import { Row, Col } from 'antd';
import SideMenu from './components/sideMenu';
import EmployeeAdd from './components/employeeAdd';
import EmployeeView from './components/employeeView';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeEdit from './components/employeeEdit';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Row className='body-container' gutter={16} >
          <Col className="gutter-row right-content" span={5} >
            <SideMenu />
          </Col>
          <Col className="gutter-row left-side-content" span={19} >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<TableData />} />
              <Route path="/addEmployee" element={<EmployeeAdd />} />
              <Route path="/viewEmployee/:id" element={<EmployeeView />} />
              <Route path="/editEmployee/:id" element={<EmployeeEdit />} />
            </Routes>
          </Col>
        </Row>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
