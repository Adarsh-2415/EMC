import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
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

/* eslint-disable no-unused-vars */
interface AuthContextType {
  user: User | null
  session: Session | null
  adminProfile: AdminProfile | null
  loading: boolean
  isAuthorizedAdmin: boolean
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => Promise<void>
  showToast: (title: string, message: string, type?: ToastType) => void
  dismissToast: (id: string) => void
}
/* eslint-enable no-unused-vars */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState<boolean>(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

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
    async (authUser: User): Promise<{ authorized: boolean; profile: AdminProfile | null }> => {
      try {
        const userEmail = authUser.email?.trim().toLowerCase()
        if (!userEmail) {
          return { authorized: false, profile: null }
        }

        const { data, error } = await supabase
          .from('emc_admins')
          .select('*')
          .or(`user_id.eq.${authUser.id},email.ilike.${userEmail}`)
          .maybeSingle()

        if (error || !data) {
          console.warn('[Auth Warning] User is not registered in emc_admins:', userEmail)
          return { authorized: false, profile: null }
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
          return { authorized: true, profile }
        }

        // Account exists but is deactivated (status = false)
        return { authorized: false, profile: null }
      } catch (err) {
        console.error('[Auth Error] Failed to verify admin authorization:', err)
        return { authorized: false, profile: null }
      }
    },
    []
  )

  const handleSessionInit = useCallback(
    async (currentSession: Session | null) => {
      setLoading(true)
      if (currentSession?.user) {
        setSession(currentSession)
        setUser(currentSession.user)
        const { authorized, profile } = await checkAdminAuthorization(currentSession.user)
        if (authorized && profile) {
          setIsAuthorizedAdmin(true)
          setAdminProfile(profile)
        } else {
          setIsAuthorizedAdmin(false)
          setAdminProfile(null)
          await supabase.auth.signOut()
          showToast(
            'Unauthorized Access',
            'Your account does not have active administrator privileges.',
            'error'
          )
        }
      } else {
        setSession(null)
        setUser(null)
        setIsAuthorizedAdmin(false)
        setAdminProfile(null)
      }
      setLoading(false)
    },
    [checkAdminAuthorization, showToast]
  )

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionInit(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        setIsAuthorizedAdmin(false)
        setAdminProfile(null)
        setLoading(false)
      } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
        handleSessionInit(session)
      }
    })

    return () => {
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
    const { authorized, profile } = await checkAdminAuthorization(data.user)

    if (!authorized || !profile) {
      await supabase.auth.signOut()
      showToast(
        'Unauthorized Access',
        'Your account does not have active administrator privileges.',
        'error'
      )
      throw new Error('Unauthorized Access: You do not have active administrator privileges.')
    }

    setUser(data.user)
    setSession(data.session)
    setAdminProfile(profile)
    setIsAuthorizedAdmin(true)
    showToast('Login Successful', `Welcome back, ${profile.name}!`, 'success')
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setAdminProfile(null)
    setIsAuthorizedAdmin(false)
    showToast('Logged Out', 'You have been logged out successfully.', 'info')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        adminProfile,
        loading,
        isAuthorizedAdmin,
        login,
        logout,
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
