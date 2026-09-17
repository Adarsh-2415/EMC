import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { ToastMessage, ToastType } from '@/components/admin/ToastNotification'
import { ToastNotification } from '@/components/admin/ToastNotification'

export interface AdminProfile {
  name: string
  email: string
  role: string
  status: boolean
}

export type AuthorizationStatus =
  | 'IDLE'
  | 'LOADING'
  | 'AUTHORIZED'
  | 'UNAUTHORIZED'
  | 'AUTHORIZATION_ERROR'

/* eslint-disable no-unused-vars */
interface AuthContextType {
  user: User | null
  session: Session | null
  adminProfile: AdminProfile | null
  initialLoading: boolean
  isRefreshing: boolean
  loading: boolean // Backward compatibility mapping for initialLoading
  authorizationStatus: AuthorizationStatus
  isAuthorizedAdmin: boolean
  authError: string | null
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => Promise<void>
  retryAuthorization: () => Promise<void>
  showToast: (title: string, message: string, type?: ToastType) => void
  dismissToast: (id: string) => void
}
/* eslint-enable no-unused-vars */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [authorizationStatus, setAuthorizationStatus] = useState<AuthorizationStatus>('IDLE')
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // Track confirmed authorization status and initial boot completion across renders
  const isConfirmedAuthorizedRef = useRef<boolean>(false)
  const hasCompletedInitialBootRef = useRef<boolean>(false)

  useEffect(() => {
    isConfirmedAuthorizedRef.current = isAuthorizedAdmin
  }, [isAuthorizedAdmin])

  const showToast = useCallback((title: string, message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Strict Authorization Check against emc_admins table
  const checkAdminAuthorization = useCallback(
    async (
      authUser: User
    ): Promise<{
      status: 'AUTHORIZED' | 'UNAUTHORIZED' | 'AUTHORIZATION_ERROR'
      profile: AdminProfile | null
      error?: string
    }> => {
      try {
        const userEmail = authUser.email?.trim().toLowerCase()
        if (!userEmail) {
          return { status: 'UNAUTHORIZED', profile: null }
        }

        const { data, error } = await supabase
          .from('emc_admins')
          .select('*')
          .or(`user_id.eq.${authUser.id},email.ilike.${userEmail}`)
          .maybeSingle()

        if (error) {
          console.warn('[Auth Warning] Database query error while checking emc_admins:', error.message)
          return { status: 'AUTHORIZATION_ERROR', profile: null, error: error.message }
        }

        if (!data) {
          console.warn('[Auth Warning] User is not registered in emc_admins:', userEmail)
          return { status: 'UNAUTHORIZED', profile: null }
        }

        if (data.status === true) {
          // Associate user_id with emc_admins record if not set yet
          if (!data.user_id && authUser.id) {
            supabase
              .from('emc_admins')
              .update({ user_id: authUser.id })
              .eq('id', data.id)
              .then()
          }

          const profile: AdminProfile = {
            name: data.full_name || userEmail.split('@')[0],
            email: userEmail,
            role: data.role || 'Administrator',
            status: true,
          }
          return { status: 'AUTHORIZED', profile }
        }

        // Account exists but is deactivated (status = false)
        return { status: 'UNAUTHORIZED', profile: null }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Failed to verify admin authorization.'
        console.error('[Auth Error] Exception during admin authorization check:', err)
        return { status: 'AUTHORIZATION_ERROR', profile: null, error: errMsg }
      }
    },
    []
  )

  const handleSessionInit = useCallback(
    async (currentSession: Session | null, isInitialBoot: boolean = false) => {
      // Once initial boot has completed, force isInitialBoot to false for all subsequent events
      const actualInitialBoot = isInitialBoot && !hasCompletedInitialBootRef.current

      if (actualInitialBoot) {
        setInitialLoading(true)
      } else {
        setIsRefreshing(true)
      }

      setAuthError(null)

      if (currentSession?.user) {
        setSession(currentSession)
        setUser(currentSession.user)

        const authResult = await checkAdminAuthorization(currentSession.user)

        if (authResult.status === 'AUTHORIZED' && authResult.profile) {
          setIsAuthorizedAdmin(true)
          setAdminProfile(authResult.profile)
          setAuthorizationStatus('AUTHORIZED')
        } else if (authResult.status === 'UNAUTHORIZED') {
          setIsAuthorizedAdmin(false)
          setAdminProfile(null)
          setAuthorizationStatus('UNAUTHORIZED')
          await supabase.auth.signOut()
          showToast(
            'Unauthorized Access',
            'Your account does not have active administrator privileges.',
            'error'
          )
        } else if (authResult.status === 'AUTHORIZATION_ERROR') {
          setAuthError(authResult.error || 'Network error while verifying authorization privileges.')

          // DUAL-MODE ERROR HANDLING:
          if (isConfirmedAuthorizedRef.current) {
            // Case B: Active Session - Retain last confirmed AUTHORIZED state during background refresh failure
            console.warn('[Auth Warning] Background refresh failed to reach emc_admins. Retaining active session state.')
            setAuthorizationStatus('AUTHORIZED')
          } else {
            // Case A: Initial Boot - Set AUTHORIZATION_ERROR. Do NOT sign out, do NOT redirect, do NOT authorize.
            setIsAuthorizedAdmin(false)
            setAdminProfile(null)
            setAuthorizationStatus('AUTHORIZATION_ERROR')
          }
        }
      } else {
        setSession(null)
        setUser(null)
        setIsAuthorizedAdmin(false)
        setAdminProfile(null)
        setAuthorizationStatus('UNAUTHORIZED')
      }

      if (actualInitialBoot) {
        hasCompletedInitialBootRef.current = true
        setInitialLoading(false)
      } else {
        setIsRefreshing(false)
      }
    },
    [checkAdminAuthorization, showToast]
  )

  const retryAuthorization = useCallback(async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession()
    hasCompletedInitialBootRef.current = false
    await handleSessionInit(currentSession, true)
  }, [handleSessionInit])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        handleSessionInit(session, true)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return

      if (_event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        setIsAuthorizedAdmin(false)
        setAdminProfile(null)
        setAuthorizationStatus('UNAUTHORIZED')
        hasCompletedInitialBootRef.current = false
        setInitialLoading(false)
        setIsRefreshing(false)
      } else if (_event === 'SIGNED_IN') {
        // If initial boot is already done, treat SIGNED_IN as background refresh
        const isInitial = !hasCompletedInitialBootRef.current
        handleSessionInit(session, isInitial)
      } else if (_event === 'TOKEN_REFRESHED' || _event === 'USER_UPDATED') {
        // Background session activity - do NOT toggle initialLoading
        handleSessionInit(session, false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [handleSessionInit])

  const login = async (email: string, pass: string, rememberMe: boolean = true): Promise<boolean> => {
    const trimmedEmail = email.trim()
    if (!rememberMe) {
      localStorage.removeItem('emc_remembered_email')
    } else {
      localStorage.setItem('emc_remembered_email', trimmedEmail)
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: pass,
    })

    if (error || !data.user) {
      showToast('Authentication Failed', 'Invalid email or password. Please try again.', 'error')
      throw new Error(error?.message || 'Invalid email or password.')
    }

    // Verify emc_admins authorization
    const authResult = await checkAdminAuthorization(data.user)

    if (authResult.status !== 'AUTHORIZED' || !authResult.profile) {
      await supabase.auth.signOut()
      setAuthorizationStatus('UNAUTHORIZED')
      setIsAuthorizedAdmin(false)
      setAdminProfile(null)
      showToast(
        'Unauthorized Access',
        'Your account does not have active administrator privileges.',
        'error'
      )
      throw new Error('Unauthorized Access: You do not have active administrator privileges.')
    }

    setUser(data.user)
    setSession(data.session)
    setAdminProfile(authResult.profile)
    setIsAuthorizedAdmin(true)
    setAuthorizationStatus('AUTHORIZED')
    showToast('Login Successful', `Welcome back, ${authResult.profile.name}!`, 'success')
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setAdminProfile(null)
    setIsAuthorizedAdmin(false)
    setAuthorizationStatus('UNAUTHORIZED')
    showToast('Logged Out', 'You have been logged out successfully.', 'info')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        adminProfile,
        initialLoading,
        isRefreshing,
        loading: initialLoading,
        authorizationStatus,
        isAuthorizedAdmin,
        authError,
        login,
        logout,
        retryAuthorization,
        showToast,
        dismissToast,
      }}
    >
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

