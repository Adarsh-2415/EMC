/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { GlobalLayout } from '@/layout/GlobalLayout'
import { AuthProvider } from '@/context/AuthContext'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ApplicationPage } from '@/pages/ApplicationPage'
import { TrainingPage } from '@/pages/TrainingPage'
import { SupportPage } from '@/pages/SupportPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { CertificateVerificationPage } from '@/pages/CertificateVerificationPage'
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AuthLoadingScreen } from '@/components/admin/AuthLoadingScreen'

// Lazy-loaded Admin Components for performance code-splitting
const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
)
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
)
const AdminCertificatesPage = lazy(() =>
  import('@/pages/admin/AdminCertificatesPage').then((m) => ({ default: m.AdminCertificatesPage }))
)
const AdminApplicationsPage = lazy(() =>
  import('@/pages/admin/AdminApplicationsPage').then((m) => ({ default: m.AdminApplicationsPage }))
)
const AdminSupportPage = lazy(() =>
  import('@/pages/admin/AdminSupportPage').then((m) => ({ default: m.AdminSupportPage }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <GlobalLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'application-form',
        element: <ApplicationPage />,
      },
      {
        path: 'apply',
        element: <ApplicationPage />,
      },
      {
        path: 'online-application-form',
        element: <ApplicationPage />,
      },
      {
        path: 'training',
        element: <TrainingPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'services',
        element: <ServiceDetailPage />,
      },
      {
        path: 'services/:slug',
        element: <ServiceDetailPage />,
      },
      {
        path: 'certification-search',
        element: <CertificateVerificationPage />,
      },
      {
        path: 'verify-certificate',
        element: <CertificateVerificationPage />,
      },
      {
        path: 'search-certificate',
        element: <CertificateVerificationPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <AdminProtectedRoute />
      </AuthProvider>
    ),
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<AuthLoadingScreen />}>
                <AdminDashboardPage />
              </Suspense>
            ),
          },
          {
            path: 'certificates',
            element: (
              <Suspense fallback={<AuthLoadingScreen />}>
                <AdminCertificatesPage />
              </Suspense>
            ),
          },
          {
            path: 'applications',
            element: (
              <Suspense fallback={<AuthLoadingScreen />}>
                <AdminApplicationsPage />
              </Suspense>
            ),
          },
          {
            path: 'support',
            element: (
              <Suspense fallback={<AuthLoadingScreen />}>
                <AdminSupportPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <AuthProvider>
        <Suspense fallback={<AuthLoadingScreen />}>
          <AdminLoginPage />
        </Suspense>
      </AuthProvider>
    ),
  },
])
