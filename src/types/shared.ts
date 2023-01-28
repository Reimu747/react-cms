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
    | '/UI/dragpage'
    | '/about'
    | '/login'
    | '/404'
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
