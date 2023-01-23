import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { usePermission } from '@/hooks/usePermission';

const AdminPage: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);

    return <div>只有 superadmin，admin 能进入此页面</div>;
};

export default AdminPage;
