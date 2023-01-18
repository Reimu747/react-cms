import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "@/router";
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { SWRConfig } from 'swr';
import option from '@/swr/swrConfig';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <SWRConfig value={option}>
                <RouterProvider router={router} />
            </SWRConfig>
        </Provider>
    </React.StrictMode>
);
