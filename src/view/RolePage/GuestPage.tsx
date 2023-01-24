import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { usePermission } from '@/hooks/usePermission';
import { useElementPermission } from '@/hooks/useElementPermission';
import { ADMIN_ROLE, GUEST_ROLE, SUPER_ADMIN_ROLE } from '@/types/variable';

const GuestPage: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);
    const hasPermissionA = useElementPermission([GUEST_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE]);
    const hasPermissionB = useElementPermission([ADMIN_ROLE, SUPER_ADMIN_ROLE]);
    const hasPermissionC = useElementPermission([SUPER_ADMIN_ROLE]);

    return (
        <div>
            <p>所有角色都能进入此页面</p>
            {hasPermissionA && <p>所有角色都能看到这行</p>}
            {hasPermissionB && <p>只有 superadmin，admin 能看到这行</p>}
            {hasPermissionC && <p>只有 superadmin 能看到这行</p>}
        </div>
    );
};

export default GuestPage;
