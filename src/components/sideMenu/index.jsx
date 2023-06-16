import React from 'react';
import { UserOutlined , AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { BrowserRouter as Router,useNavigate } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const SideMenu = () => {
    const navigate = useNavigate();
    const items = [
        getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
        getItem('Employee', 'employee',  <UserOutlined />, [
            getItem('Inhouse', 'sub3', null, [getItem('Add employee', 'AddEmployee'), getItem('Ex-employee', 'ExEmployee')]),
        ]),

    ];
    const onClick = (e) => {
        console.log('click', e.key);
        if (e.key === 'dashboard') {
            navigate('/');
        }else if(e.key==='ExEmployee'){
            navigate('/employees');
        }else if(e.key==='AddEmployee'){
            navigate('/addEmployee');
        }
    };
    return (
        <div>
            <Menu
                onClick={onClick}
                mode="inline"
                items={items}
            />
        </div>
    )
}

export default SideMenu;
