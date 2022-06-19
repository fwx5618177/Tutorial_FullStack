import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import './layout.css'
import { routes } from './routes';

const { Header, Sider, Content } = Layout;
  
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
    <Layout style={{
        height: '100vh',
    }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            <div className='logoshow'>
                <h3>ZHENYANG</h3>
            </div>
            
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={routes('dashboard')}
        />
        </Sider>
        <Layout className="site-layout">
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                background: '#fff',
            }}
        >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            })}
        </Header>
        <Content
            className="site-layout-background"
            style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            }}
        >
            <Outlet />
        </Content>
        </Layout>
    </Layout>
    );
};

export default App;