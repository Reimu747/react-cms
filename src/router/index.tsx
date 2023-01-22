import LoginPage from '@/view/LoginPage';
import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@/view/Home'));
const About = lazy(() => import('@/view/About'));
const HomePage = lazy(() => import('@/view/HomePage'));

const withLoadingComponent = (component: JSX.Element) => (
    <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

export default createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/homepage" />,
    },
    {
        path: '/',
        element: withLoadingComponent(<Home />),
        children: [
            { path: '/homepage', element: withLoadingComponent(<HomePage />) },
            { path: '/about', element: withLoadingComponent(<About />) },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '*',
        element: <Navigate to="/homepage" />,
    }
]);
