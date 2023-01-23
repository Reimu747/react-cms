import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import { MenuItem } from '@/types/shared';
import useSWR from 'swr';
import { ResponseImpl } from '@/types/request';
import { ROUTER_MAP } from '@/types/variable';
import { MENULIST_API } from '@/types/variable';

const Menu: React.FC = () => {
    // 获取菜单树接口
    const { data: res, error, isLoading } = useSWR<ResponseImpl<MenuItem[]>>(MENULIST_API);
    // 拼接菜单数据
    const items = useMemo<MenuItem[]>(() => {
        if (isLoading || error || !res) {
            return [];
        }
        const setItems = (items: MenuItem[]): MenuItem[] => {
            if (!items || !items.length) {
                return [];
            }
            return items.map(item => {
                const children = item.children && item.children.length ? setItems(item.children) : undefined;
                return {
                    ...item,
                    label: item.name,
                    key: ROUTER_MAP.find(element => element.label === item.name)!.key,
                    children,
                };
            });
        };
        return setItems(res?.data || []);
    }, [res, isLoading, error]);

    const navigateTo = useNavigate();
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

    return (
        <AntdMenu
            theme="dark"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
        />
    );
};

export default Menu;
