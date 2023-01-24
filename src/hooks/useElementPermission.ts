import { useUser } from './useUser';
import { Role } from '@/types/shared';

/**
 * 判断当前角色是否在给定的角色列表中。用于控制页面元素的展示权限
 * @param roleArray 给定的角色列表
 * @returns 是否有权限
 */
export const useElementPermission = (roleArray: Role[]): boolean => {
    const { role } = useUser();
    return !!role && roleArray.includes(role);
};
