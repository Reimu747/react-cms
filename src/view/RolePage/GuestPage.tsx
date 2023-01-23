import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { usePermission } from '@/hooks/usePermission';

const GuestPage: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);

    return <div>所有角色都能进入此页面</div>;
};

export default GuestPage;
