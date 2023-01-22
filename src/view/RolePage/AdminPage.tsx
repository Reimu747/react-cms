import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';

const AdminPage: React.FC = () => {
    useBeforeRouterEnter(false);

    return <div>AdminPage</div>;
};

export default AdminPage;
