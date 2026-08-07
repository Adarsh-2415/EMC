import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LogOut, Clock, Calendar } from 'lucide-react'

export const AdminHeader: React.FC = () => {
  const { adminProfile, user, logout } = useAuth()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Dynamic Time-of-Day Greeting
  const getGreeting = () => {
    const hour = now.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const adminName = adminProfile?.name || user?.email?.split('@')[0] || 'Administrator'

  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return (
    <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4 shadow-xs select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Dynamic Greeting & Admin Name */}
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {getGreeting()}, <span className="text-emerald-600">{adminName}</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            EMC Corporate Portal • Real-Time Dashboard
          </p>
        </div>

        {/* Right: Date, Live Time & Logout */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Current Date */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>

          {/* Live Current Time */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" aria-hidden="true" />
            <span>{formattedTime}</span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
