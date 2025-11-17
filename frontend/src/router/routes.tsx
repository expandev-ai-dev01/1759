import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/layouts/RootLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const VehicleDetailPage = lazy(() => import('@/pages/VehicleDetail'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'vehicles/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VehicleDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
