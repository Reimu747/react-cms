import { useAppSelector } from '@/store/hooks';
import UserImpl from '@/types/user';
import { TOKEN_KEY } from '../types/variable';

/**
 * 优先从 redux 中获取用户信息，其次从 local storage中获取
 * @returns 用户信息
 */
export const useUser = (): Partial<UserImpl> => {
    const reduxUser = useAppSelector(state => state.userReducer);
    const token = localStorage.getItem(TOKEN_KEY);
    let localStorageUser;
    if (token) {
        localStorageUser = JSON.parse(token);
    }

    return {
        user: reduxUser.user || localStorageUser?.user,
        avatar: reduxUser.avatar || localStorageUser?.avatar,
    };
};
