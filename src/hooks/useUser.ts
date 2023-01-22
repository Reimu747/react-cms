import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UserImpl from '@/types/user';
import { TOKEN_KEY } from '@/types/variable';
import { setUser } from '@/store/slice/userSlice';

/**
 * 优先从 redux 中获取用户信息，其次从 local storage中获取
 * @returns 用户信息
 */
export const useUser = (): Partial<UserImpl> => {
    const reduxUser = useAppSelector(state => state.userReducer);
    const token = localStorage.getItem(TOKEN_KEY);
    let localStorageUser;
    const dispatch = useAppDispatch();
    const onSetUser = (data: Partial<UserImpl>) => {
        dispatch(setUser(data));
    };
    if (token) {
        localStorageUser = JSON.parse(token);
        onSetUser({
            user: localStorageUser?.user,
            avatar: localStorageUser?.avatar,
            role: localStorageUser?.role,
        });
    }

    return {
        user: reduxUser.user,
        avatar: reduxUser.avatar,
        role: reduxUser.role,
    };
};
