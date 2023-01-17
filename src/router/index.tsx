import LoginPage from '@/view/LoginPage';
import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@/view/Home'));
const About = lazy(() => import('@/view/About'));
const Page1 = lazy(() => import('@/view/Page1'));
const Page3 = lazy(() => import('@/view/Page3'));
const Page4 = lazy(() => import('@/view/Page4'));

const withLoadingComponent = (component: JSX.Element) => (
    <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

export default createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/page1" />,
    },
    {
        path: '/',
        element: withLoadingComponent(<Home />),
        children: [
            { path: '/page1', element: withLoadingComponent(<Page1 />) },
            { path: '/page2/page3', element: withLoadingComponent(<Page3 />) },
            { path: '/page2/page4', element: withLoadingComponent(<Page4 />) },
            { path: '/about', element: withLoadingComponent(<About />) },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '*',
        element: <Navigate to="/page1" />,
    }
]);
