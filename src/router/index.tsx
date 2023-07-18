import LoginPage from '@/view/LoginPage';
import { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Router } from '@/types/shared';

const Home = lazy(() => import('@/view/Home'));
const About = lazy(() => import('@/view/About'));
const HomePage = lazy(() => import('@/view/Home/HomePage'));
const GuestPage = lazy(() => import('@/view/RolePage/GuestPage'));
const AdminPage = lazy(() => import('@/view/RolePage/AdminPage'));
const SuperAdminPage = lazy(() => import('@/view/RolePage/SuperAdminPage'));
const NotFoundPage = lazy(() => import('@/view/NotFound'));
const DragPage = lazy(() => import('@/view/UI/DragPage'));
const QueryPage = lazy(() => import('@/view/BusinessComponents/Query'));

const withLoadingComponent = (component: JSX.Element) => (
    <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

const router: Router[] = [
    {
        path: '/',
        element: <Navigate to="/homepage" />,
    },
    {
        path: '/',
        element: withLoadingComponent(<Home />),
        children: [
            { path: '/homepage', element: withLoadingComponent(<HomePage />) },
            { path: '/rolepage/guestpage', element: withLoadingComponent(<GuestPage />) },
            { path: '/rolepage/adminpage', element: withLoadingComponent(<AdminPage />) },
            { path: '/rolepage/superadminpage', element: withLoadingComponent(<SuperAdminPage />) },
            { path: '/UI/dragpage', element: withLoadingComponent(<DragPage />) },
            { path: '/businesscomponents/query', element: withLoadingComponent(<QueryPage />) },
            { path: '/about', element: withLoadingComponent(<About />) },
            { path: '/404', element: withLoadingComponent(<NotFoundPage />) },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '*',
        element: <Navigate to="/homepage" />,
    },
];

export default createBrowserRouter(router);
