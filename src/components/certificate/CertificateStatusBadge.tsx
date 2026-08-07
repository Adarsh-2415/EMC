import React from 'react'
import { ShieldCheck, AlertTriangle } from 'lucide-react'

export type CertificateStatusType = 'VERIFIED' | 'RENEWAL_DUE'

interface CertificateStatusBadgeProps {
  status: CertificateStatusType
}

export const CertificateStatusBadge: React.FC<CertificateStatusBadgeProps> = ({ status }) => {
  if (status === 'VERIFIED') {
    return (
      <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3.5 shadow-sm">
        <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-emerald-900 leading-tight">
            Verified
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 font-medium leading-relaxed">
            This certificate is currently valid and verified by Excel Management Certifications.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3.5 shadow-sm">
      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-amber-900 leading-tight">
          Renewal Due
        </h3>
        <p className="text-xs sm:text-sm text-amber-800 font-medium leading-relaxed">
          This certificate has expired. Please contact Excel Management Certifications for renewal.
        </p>
      </div>
    </div>
  )
}
