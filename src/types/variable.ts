import { RoleMapElementImpl } from './shared';
// 全局变量

// 权限相关
// 游客权限
export const GUEST_ROLE = 'guest';
// 权限表
export const ROLE_MAP: RoleMapElementImpl[] = [
    {
        role: 'guest',
        permissions: ['/', '/homepage', '/rolepage/guestpage', '/about'],
    },
    {
        role: 'admin',
        permissions: ['/', '/homepage', '/rolepage/guestpage', '/rolepage/adminpage', '/about'],
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

// 页面路由相关
// 登录页路由
export const LOGIN_PATH = '/login';
// 首页路由
export const HOME_PATH = '/';
// 路由表
export const ROUTER_MAP: { label: string; key: string }[] = [
    { label: '首页', key: '/homepage' },
    { label: '权限页', key: '/rolepage' },
    { label: '游客页', key: '/guestpage' },
    { label: '管理员页', key: '/adminpage' },
    { label: '超级管理员页', key: '/superadminpage' },
    { label: '关于', key: '/about' },
];

// 请求相关
// dev 环境请求地址
export const DEV_PATH = 'https://mock.apifox.cn/m1/2150034-0-default';
// 登录接口
export const LOGIN_API = '/login';
// 菜单树接口
export const MENULIST_API = '/menuList';
