import { PageUrl, Role, RoleMapElementImpl } from './shared';
// 全局变量

// 权限相关
// 权限字段
export const GUEST_ROLE: Role = 'guest';
export const ADMIN_ROLE: Role = 'admin';
export const SUPER_ADMIN_ROLE: Role = 'superAdmin';
// 角色权限表
const GUEST_PERMISSIONS: PageUrl[] = [
    '/homepage',
    '/rolepage/guestpage',
    '/UI/dragpage',
    '/businesscomponents/query',
    '/about',
    '/404',
];
export const ROLE_MAP: RoleMapElementImpl[] = [
    {
        role: 'guest',
        permissions: GUEST_PERMISSIONS,
    },
    {
        role: 'admin',
        permissions: GUEST_PERMISSIONS.concat(['/rolepage/adminpage']),
    },
    {
        role: 'superAdmin',
        permissions: GUEST_PERMISSIONS.concat(['/rolepage/adminpage', '/rolepage/superadminpage']),
    },
];

// local storage中，token key名称
export const TOKEN_KEY = 'token';

// 页面路由相关
// 登录页路由
export const LOGIN_PATH = '/login';
// 首页路由
export const HOME_PATH = '/';
// 404路由
export const NOT_FOUND_PATH = '/404';
// 菜单 - 路由表
export const ROUTER_MAP: { label: string; key: string }[] = [
    { label: '首页', key: '/homepage' },
    { label: '权限页', key: '/rolepage' },
    { label: '游客页', key: '/guestpage' },
    { label: '管理员页', key: '/adminpage' },
    { label: '超级管理员页', key: '/superadminpage' },
    { label: '组件', key: '/UI' },
    { label: '拖拽', key: '/dragpage' },
    { label: '业务组件', key: '/businesscomponents' },
    { label: '分页查询', key: '/query' },
    { label: '关于', key: '/about' },
];

// 请求相关
// dev 环境请求地址
export const DEV_PATH = 'https://mock.apifox.cn/m1/2150034-0-default';
// 登录接口
export const LOGIN_API = '/login';
/**
 * 返回菜单树接口 api
 * @param role 当前角色
 * @returns 菜单树接口 api
 */
export const MENULIST_API = (role: Role): string => `/menuList?role=${role}`;
// 列表分页接口
export const GETLIST_API: string = '/getList';
