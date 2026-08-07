import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AuthLoadingScreen } from '@/components/admin/AuthLoadingScreen'
import { SEO } from '@/components/common/SEO'
import logoImg from '@/assets/images/emc-logo.png'
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react'

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthorizedAdmin, loading: authLoading, showToast } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState(() => localStorage.getItem('emc_remembered_email') || '')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Rate Limiting States (Max 5 attempts, 60s cooldown)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockoutTimer, setLockoutTimer] = useState(0)

  // Validation Error States
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Lockout countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [lockoutTimer])

  // Redirect authenticated admins to dashboard automatically
  if (!authLoading && isAuthorizedAdmin) {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (authLoading) {
    return <AuthLoadingScreen />
  }

  const validateForm = (): boolean => {
    let isValid = true
    setEmailError(null)
    setPasswordError(null)

    const trimmedEmail = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!trimmedEmail) {
      setEmailError('Email Address is required.')
      isValid = false
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      isValid = false
    }

    if (!password) {
      setPasswordError('Password is required.')
      isValid = false
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.')
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (lockoutTimer > 0) {
      showToast(
        'Account Locked',
        `Too many failed attempts. Please wait ${lockoutTimer} seconds before trying again.`,
        'error'
      )
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await login(email, password, rememberMe)
      setFailedAttempts(0)
      navigate('/admin/dashboard', { replace: true })
    } catch {
      const newAttempts = failedAttempts + 1
      setFailedAttempts(newAttempts)

      if (newAttempts >= 5) {
        setLockoutTimer(60)
        showToast(
          'Account Locked',
          'Too many failed login attempts. Account temporarily locked for 60 seconds.',
          'error'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      <SEO title="Admin Login | EMC" noindex={true} />
      {/* Background Micro-Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 opacity-90 pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-200/80 text-slate-900 animate-in fade-in zoom-in-95 duration-400">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <img
            src={logoImg}
            alt="Excel Management Certifications Logo"
            className="h-14 sm:h-16 mx-auto object-contain"
          />

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-300/80 text-slate-800 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>EMC Admin Panel</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
              Administrator Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Enter your credentials to access the executive dashboard.
            </p>
          </div>
        </div>

        {/* Lockout Warning Notification */}
        {lockoutTimer > 0 && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-bold flex items-center gap-2 animate-in fade-in"
          >
            <Lock className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              Too many failed attempts. Login locked for {lockoutTimer} seconds.
            </span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="adminEmail"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="adminEmail"
                type="email"
                required
                autoComplete="email"
                disabled={isSubmitting || lockoutTimer > 0}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError(null)
                }}
                placeholder="admin@emcindia.org"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                  emailError
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
              />
            </div>
            {emailError && (
              <p className="text-xs text-red-600 font-medium mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="adminPassword"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                disabled={isSubmitting || lockoutTimer > 0}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError(null)
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-500 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900 bg-white'
                }`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-600 font-medium mt-1">{passwordError}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <span className="text-xs font-semibold text-slate-700">Remember Me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || lockoutTimer > 0}
            className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Login to Panel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
