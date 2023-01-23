// 响应code
export type StatusCode = 200 | 404 | 500;

// 路由相关
// 页面路由
export type PageUrl =
    | '/'
    | '/homepage'
    | '/rolepage/guestpage'
    | '/rolepage/adminpage'
    | '/rolepage/superadminpage'
    | '/about'
    | '/login'
    | '*';
// router
export interface Router {
    path: PageUrl;
    element: any;
    children?: Router[];
}

// 权限相关
// 权限字段
export type Role = 'superAdmin' | 'admin' | 'guest';
// 权限表
export interface RoleMapElementImpl {
    role: Role;
    permissions: PageUrl[];
}

// 菜单相关
// 菜单节点类型
export interface MenuItem {
    id: number,
    name: string,
    children?: MenuItem[],
    key: string,
    icon?: string,
    label: string,
};
