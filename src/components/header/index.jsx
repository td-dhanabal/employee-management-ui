import React from 'react';
import './index.scss';
import {Row, Col,Avatar } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined ,UserOutlined} from '@ant-design/icons';

const Header = () => {
    return (
        <div className='header-body'>
            <Row className='title-body' gutter={16} style={{ margin: 0 }}>
                <Col className="gutter-row left-side-content" span={12} >
                    <h3>M8 Groups</h3>
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
