import React, { useState } from 'react';
import { Avatar, Modal } from 'antd';
import { Breadcrumb, Layout, theme } from 'antd';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import styles from './index.module.scss';
import { LOGIN_PATH, TOKEN_KEY } from '@/types/variable';
import { useUser } from '@/hooks/useUser';
import Menu from './Menu';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigateTo = useNavigate();
    const { user, avatar } = useUser();
    const { pathname } = useLocation();

    // 渲染面包屑子元素
    const breadcrumbItem = (): JSX.Element[] => {
        const path = pathname.split('/').slice(1);
        return path.map((pathName: string, index: number) => (
            <Breadcrumb.Item key={index}>
                <Link to={pathname}>{pathName}</Link>
            </Breadcrumb.Item>
        ));
    };
    // 点击头像回调 - 退出登录
    const handleAvatarClick = () => {
        Modal.info({
            title: '退出登录？',
            onOk() {
                // 清理token
                localStorage.removeItem(TOKEN_KEY);
                // 跳转至登录页
                navigateTo(LOGIN_PATH);
            },
        });
    };

    return (
        <Layout className={styles.layout}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className={styles.logo} />
                <Menu />
            </Sider>
            <Layout>
                <Header style={{ background: colorBgContainer }} className={styles.header}>
                    <Breadcrumb className={styles.breadcrumb}>{breadcrumbItem()}</Breadcrumb>
                    <Avatar size="large" src={avatar} alt={user} onClick={handleAvatarClick} />
                </Header>
                <Content className={styles.content} style={{ background: colorBgContainer }}>
                    <Outlet />
                </Content>
                <Footer className={styles.footer}>React cms</Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
