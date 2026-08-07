import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  title: string
  message: string
  type: ToastType
}

/* eslint-disable no-unused-vars */
interface ToastNotificationProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}
/* eslint-enable no-unused-vars */

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/40 text-white'
              : toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/40 text-white'
              : 'bg-slate-900/95 border-slate-700 text-white'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
          )}

          <div className="flex-1 space-y-0.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {toast.title}
            </h4>
            <p className="text-xs font-medium text-slate-300 leading-snug">{toast.message}</p>
          </div>

          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-lg"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Close notification</span>
          </button>
        </div>
      ))}
    </div>
  )
}
