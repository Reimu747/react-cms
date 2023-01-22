import { RoleMapElementImpl } from './shared';
// 全局变量

// 权限相关
export const GUEST_ROLE = 'guest';
// 权限表
export const ROLE_MAP: RoleMapElementImpl[] = [
    {
        role: 'guest',
        permissions: [
            '/',
            '/homepage',
            '/rolepage/guestpage',
            '/about',
        ],
    },
    {
        role: 'admin',
        permissions: [
            '/',
            '/homepage',
            '/rolepage/guestpage',
            '/rolepage/adminpage',
            '/about',
        ],
    },
    {
        role: 'superAdmin',
        permissions: [
            '/',
            '/homepage',
            '/rolepage/guestpage',
            '/rolepage/adminpage',
            '/rolepage/superadminpage',
            '/about',
        ],
    },
];

// local storage中，token key名称
export const TOKEN_KEY = 'token';

// 页面相关
// 登录页路由
export const LOGIN_PATH = '/login';
// 首页路由
export const HOME_PATH = '/';
