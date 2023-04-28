import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { Layout } from './pages/Layout.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Home, employeeHomeLoader } from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Users } from './pages/Users';
import { Projects } from './pages/Projects';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home/:id',
        element: <Home />,
        loader: employeeHomeLoader,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="245798680314-qccosi1k52l198qfrh71ep04bu0mb86m.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
)
