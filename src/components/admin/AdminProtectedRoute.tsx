import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AuthLoadingScreen } from './AuthLoadingScreen'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export const AdminProtectedRoute: React.FC = () => {
  const {
    initialLoading,
    session,
    authorizationStatus,
    isAuthorizedAdmin,
    authError,
    retryAuthorization,
  } = useAuth()

  // 1. Initial Application Boot Loading Screen
  if (initialLoading) {
    return <AuthLoadingScreen />
  }

  // 2. Unauthenticated Session: Direct Navigate to Admin Login
  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  // 3. Case A: Initial Authorization Check Failed due to Network/Database Error
  // RETAIN session, DO NOT sign out, DO NOT redirect, DO NOT grant access automatically.
  if (authorizationStatus === 'AUTHORIZATION_ERROR') {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 select-none">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Authorization Connection Issue
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              {authError ||
                'Unable to reach the administrator authorization server. Your login session remains active.'}
            </p>
          </div>

          <button
            type="button"
            onClick={retryAuthorization}
            className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Authorization Verification</span>
          </button>
        </div>
      </div>
    )
  }

  // 4. Confirmed Unauthorized or Deactivated Admin
  if (authorizationStatus === 'UNAUTHORIZED' || !isAuthorizedAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  // 5. Confirmed Authorized Admin: Render Child Route Tree
  return <Outlet />
}

