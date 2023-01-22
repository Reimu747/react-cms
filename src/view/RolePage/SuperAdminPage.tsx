import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';

const SuperAdminPage: React.FC = () => {
    useBeforeRouterEnter(false);

    return <div>SuperAdminPage</div>;
};

export default SuperAdminPage;
