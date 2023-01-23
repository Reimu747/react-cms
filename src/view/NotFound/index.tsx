import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';

const GuestPage: React.FC = () => {
    useBeforeRouterEnter(false);

    return <div>404 not found</div>;
};

export default GuestPage;
