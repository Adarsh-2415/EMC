import React from 'react'
import { FileX2 } from 'lucide-react'

export const CertificateNotFoundState: React.FC = () => {
  return (
    <div
      role="alert"
      className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200/80 text-center space-y-4 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
        <FileX2 className="w-6 h-6" aria-hidden="true" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Certificate Not Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          We could not find any certificate matching the provided Certificate Number. Please verify
          your Certificate Number and try again.
        </p>
      </div>
    </div>
  )
}
