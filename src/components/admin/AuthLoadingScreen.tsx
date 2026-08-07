import React from 'react'
import { Loader2, Shield } from 'lucide-react'

export const AuthLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center space-y-4 px-4 select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <Shield className="w-7 h-7 text-emerald-400 absolute" aria-hidden="true" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-white tracking-wide">
          Checking Authentication...
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          Verifying security session and active admin privileges
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-widest pt-4">
        <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
        <span>Excel Management Certifications Admin Dashboard</span>
      </div>
    </div>
  )
}
