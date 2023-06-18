import React from 'react';
import './index.scss';
import { Row, Col, Avatar } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../assets/M8-Logo.png';

const Header = () => {
    return (
        <div className='header-body'>
            <Row className='title-body' gutter={16} style={{ margin: 0 }}>
                <Col className="gutter-row left-side-content" span={12} >
                    <div className='logoContent'>
                        <img src={Logo} alt='' />
                        <h3>Employee Management</h3>
                    </div>
                </Col>
                <Col className="gutter-row filterIcons" span={12} >
                    <div className='icons'>
                        <SearchOutlined />
                        <BellOutlined />
                        <SettingOutlined />
                    </div>
                    <Avatar icon={<UserOutlined />} />
                    Super Admin

                </Col>
            </Row>
        </div>
    );
}

export default Header;
