import React, { useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Page 1', '/page1'),
    getItem('Page 2', '/page2', undefined, [getItem('Page 3', '/page3'), getItem('Page 4', '/page4')]),
    getItem('About', '/about'),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigateTo = useNavigate();
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
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
                <Header style={{ paddingLeft: '1rem', background: colorBgContainer }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '1rem' }}>
                    <div style={{ padding: '2rem', minHeight: '40rem', background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
