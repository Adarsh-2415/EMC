import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AuthLoadingScreen } from './AuthLoadingScreen'

export const AdminProtectedRoute: React.FC = () => {
  const { loading, isAuthorizedAdmin, session } = useAuth()

  if (loading) {
    return <AuthLoadingScreen />
  }

  if (!session || !isAuthorizedAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
