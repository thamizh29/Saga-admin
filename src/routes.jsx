import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);
const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/signup',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    exact: 'true',
    path: '/signin',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/user-ui',
    element: lazy(() => import('./views/user/index'))
  },
  {
    exact: 'true',
    path: '/verify',
    element: lazy(() => import('./views/auth/verification/verify'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard/mainindex'))
      },
      {
        exact: 'true',
        path: '/domains/adddomain',
        element: lazy(() => import('./views/domains/adddomain'))
      },
      {
        exact: 'true',
        path: '/domains/viewdomain',
        element: lazy(() => import('./views/domains/viewdomain'))
      },
      {
        exact: 'true',
        path: '/domains/editdomain',
        element: lazy(() => import('./views/domains/editdomain'))
      },
      {
        exact: 'true',
        path: '/email/dnsrecords',
        element: lazy(() => import('./views/domains/dns'))
      },
      {
        exact: 'true',
        path: '/email/users',
        element: lazy(() => import('./views/email/viewmail'))
      },
      {
        exact: 'true',
        path: '/email/editemail',
        element: lazy(() => import('./views/email/editmail'))
      },
      {
        exact: 'true',
        path: '/email/addemail',
        element: lazy(() => import('./views/email/addemail'))
      },
      {
        exact: 'true',
        path: '/plans',
        element: lazy(() => import('./views/plans/index'))
      },
      {
        exact: 'true',
        path: '/profile',
        element: lazy(() => import('./views/profile/index'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
