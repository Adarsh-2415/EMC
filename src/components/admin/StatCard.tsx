import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

interface StatCardProps {
  title: string
  count: number | null
  loading: boolean
  icon: LucideIcon
  color: 'emerald' | 'blue' | 'indigo' | 'amber'
  subtitle?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  loading,
  icon: Icon,
  color,
  subtitle,
}) => {
  const colorStyles = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      iconText: 'text-emerald-600',
      accent: 'bg-emerald-500',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      iconText: 'text-blue-600',
      accent: 'bg-blue-500',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      iconText: 'text-indigo-600',
      accent: 'bg-indigo-500',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      iconText: 'text-amber-600',
      accent: 'bg-amber-500',
    },
  }[color]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 hover:shadow-xl transition-all relative overflow-hidden group select-none">
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colorStyles.accent}`} />

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>

          <div className="flex items-baseline gap-2">
            {loading ? (
              <div className="flex items-center gap-2 py-1">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                <span className="text-sm font-medium text-slate-400">Updating...</span>
              </div>
            ) : (
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {(count ?? 0).toLocaleString()}
              </h3>
            )}
          </div>

          {subtitle && <p className="text-xs text-slate-500 font-medium pt-1">{subtitle}</p>}
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${colorStyles.bg} ${colorStyles.border}`}
        >
          <Icon className={`w-6 h-6 ${colorStyles.iconText}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
