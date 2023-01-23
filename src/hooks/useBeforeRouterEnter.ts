import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH, HOME_PATH } from '@/types/variable';

/**
 * 根据登陆状态，判断是否进行页面重定向
 * @param isLoginPage 是否处于登录页
 * @param expireTime tokenId过期时间，以毫秒计，默认1小时
 */
export const useBeforeRouterEnter = (isLoginPage: boolean, expireTime: number = 1000 * 60 * 60) => {
    const navigateTo = useNavigate();

    useEffect(() => {
        // 验证tokenId
        const token = localStorage.getItem('token');
        if (token) {
            const { tokenId, timestamp } = JSON.parse(token);
            // 未过期且token有效
            if (timestamp && new Date().getTime() - timestamp < expireTime && tokenId) {
                // 如果处于登录页，跳转至首页
                isLoginPage && navigateTo(HOME_PATH);
            } else {
                // 清理token
                localStorage.removeItem('token');
                // 如果不处于登录页，跳转至登录页
                !isLoginPage && navigateTo(LOGIN_PATH);
            }
        } else {
            navigateTo(LOGIN_PATH);
        }
    }, []);
};
