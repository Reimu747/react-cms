import React, { useMemo, useState } from 'react';
import { Avatar, MenuProps, Modal } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import styles from './index.module.scss';
import { LOGIN_PATH, TOKEN_KEY } from '@/types/variable';
import { useUser } from '@/hooks/useUser';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
    return {
        key,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', '/homepage'),
    getItem('权限页', '/rolepage', [
        getItem('游客页', '/guestpage'),
        getItem('管理员页', '/adminpage'),
        getItem('超级管理员页', '/superadminpage'),
    ]),
    getItem('关于', '/about'),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigateTo = useNavigate();
    const { user, avatar } = useUser();
    // 点击左侧菜单回调
    const handleMenuClick = (e: { keyPath: string[] }) => {
        const { keyPath } = e;
        navigateTo(keyPath.reduceRight((pre, cur) => pre + cur));
    };
    const { pathname } = useLocation();
    // 默认选中菜单项，根据路由设置
    const defaultSelectedKeys: string[] = useMemo(() => {
        const splitArr = pathname.split('/');
        return [`/${splitArr[splitArr.length - 1]}`];
    }, [pathname]);
    // 默认展开菜单项，根据路由设置
    const defaultOpenKeys: string[] = useMemo(() => {
        const splitArr = pathname.split('/');
        if (splitArr.length > 2) {
            return [`/${pathname.split('/')[1]}`];
        }
        return [];
    }, [pathname]);
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
                <Menu
                    theme="dark"
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
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
