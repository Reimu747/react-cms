import { ROLE_MAP, NOT_FOUND_PATH } from '@/types/variable';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { PageUrl } from '@/types/shared';
import { useEffect } from 'react';

/**
 * 根据用户角色判断权限，是否需要重定向至404页
 */
export const usePermission = (): void => {
    const { role } = useUser();
    const navigateTo = useNavigate();
    const { pathname } = useLocation();
    const hasPermission: boolean = ROLE_MAP.find(element => element.role === role)!.permissions.includes(
        pathname as PageUrl
    );

    useEffect(() => {
        if (!hasPermission) {
            navigateTo(NOT_FOUND_PATH);
        }
    }, [hasPermission]);
};
