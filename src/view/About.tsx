import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';

const About: React.FC = () => {
    useBeforeRouterEnter(false);

    return (
        <div>About</div>
    );
}

export default About;
